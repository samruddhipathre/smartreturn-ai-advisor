import { useState, useEffect, useCallback, Suspense, useMemo, useRef } from 'react';
import ProductCatalog from '../components/ProductCatalog';
import CartSummary from '../components/CartSummary';
import RiskAnalyzer from '../components/RiskAnalyzer';
import { Product, CartItem } from '../types/product';
import { sampleProducts } from '../data/products';
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';
import { Search, Moon, Sun } from 'lucide-react';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showRiskAnalysis, setShowRiskAnalysis] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [variant, setVariant] = useState<'A' | 'B'>(() => (Math.random() > 0.5 ? 'A' : 'B'));
  
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // Optimized filtered products using useMemo
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  // Load sample products (simulating API call)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(sampleProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
        toast.error('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Load cart from localStorage with error handling
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('smartReturnCart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      toast.error('Failed to restore your cart');
    }
  }, []);

  // Save cart to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem('smartReturnCart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
      toast.error('Failed to save your cart');
    }
  }, [cart]);

  // Dark mode handling
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Debounced search handler
  const handleSearchChange = useCallback((value: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const getTotalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    setSelectedProduct(product);
    setShowRiskAnalysis(true);
  };

  const confirmAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
    
    toast.success(`${product.name} added to cart`);
    setShowRiskAnalysis(false);
    setSelectedProduct(null);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    toast.error('Item removed from cart');
  };

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = useCallback(() => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }, [cart]);

  const generateInvoice = () => {
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.text('SmartReturn Invoice', 20, 20);
      
      // Date
      doc.setFontSize(12);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);
      
      // Items
      doc.setFontSize(14);
      doc.text('Items:', 20, 50);
      
      let yPosition = 65;
      cart.forEach((item, i) => {
        const itemText = `${i + 1}. ${item.product.name} - Qty: ${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`;
        doc.setFontSize(12);
        doc.text(itemText, 25, yPosition);
        yPosition += 10;
      });
      
      // Total
      doc.setFontSize(14);
      doc.text(`Total: $${getTotalPrice().toFixed(2)}`, 20, yPosition + 10);
      
      doc.save('smartreturn-invoice.pdf');
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Failed to generate invoice:', error);
      toast.error('Failed to generate invoice');
    }
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 transition-colors duration-300">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm shadow-soft border-b border-border sticky top-0 z-40 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  SmartReturn AI
                </div>
                <div className="hidden sm:block text-sm text-muted-foreground">
                  Powered by AI Intelligence
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    onChange={e => handleSearchChange(e.target.value)}
                    className="pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 w-64"
                    aria-label="Search products"
                  />
                </div>
                
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 border border-border bg-background hover:bg-muted/50 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4 text-foreground" />
                  ) : (
                    <Moon className="w-4 h-4 text-foreground" />
                  )}
                </button>
                
                {/* Cart */}
                <CartSummary
                  itemCount={getTotalItems()}
                  cart={cart}
                  onRemoveItem={removeFromCart}
                  onUpdateQuantity={updateCartItemQuantity}
                  onClearCart={clearCart}
                  totalPrice={getTotalPrice()}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="max-w-7xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Powered Return Risk Predictor
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Reduce returns. Increase satisfaction. Smart suggestions before you buy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <StatisticCard value="78%" label="Return Accuracy" />
              <StatisticCard value="$2.8B" label="Potential Savings" />
              <StatisticCard value="92%" label="Customer Satisfaction" />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-6">
          {filteredProducts.length > 0 ? (
            <ProductCatalog 
              products={filteredProducts} 
              onAddToCart={addToCart}
              variant={variant}
            />
          ) : searchTerm ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                No products found for "{searchTerm}"
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                  }
                }}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products available at the moment.
              </p>
            </div>
          )}
          
          {cart.length > 0 && (
            <div className="text-center mt-12 space-y-6">
              <div className="bg-card border border-border p-6 rounded-xl shadow-soft max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-2 text-foreground">Order Summary</h3>
                <p className="text-muted-foreground mb-4">
                  {getTotalItems()} items • Total: ${getTotalPrice().toFixed(2)}
                </p>
                <button 
                  onClick={generateInvoice} 
                  className="w-full px-6 py-3 bg-ai-success text-white rounded-lg hover:bg-ai-success/90 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                  aria-label="Download invoice PDF"
                >
                  📄 Download Invoice
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Risk Analysis Modal */}
        {showRiskAnalysis && selectedProduct && (
          <Suspense fallback={
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-card border border-border p-8 rounded-xl shadow-large">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-center text-foreground">Loading Risk Analysis...</p>
              </div>
            </div>
          }>
            <RiskAnalyzer
              product={selectedProduct}
              allProducts={products}
              onConfirm={confirmAddToCart}
              onCancel={() => {
                setShowRiskAnalysis(false);
                setSelectedProduct(null);
              }}
            />
          </Suspense>
        )}
      </div>
    </>
  );
};

const StatisticCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center hover:bg-white/20 transition-all duration-300 border border-white/10">
    <div className="text-3xl md:text-4xl font-bold mb-2">{value}</div>
    <div className="text-sm md:text-base opacity-90">{label}</div>
  </div>
);

export default Index;

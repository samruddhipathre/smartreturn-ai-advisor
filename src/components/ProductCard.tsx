import { Star, TrendingUp, TrendingDown, ShoppingCart } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  variant?: 'A' | 'B';
}

const ProductCard = ({ product, onAddToCart, variant = 'A' }: ProductCardProps) => {
  const getRiskColor = (returnRate: number) => {
    if (returnRate < 0.1) return 'text-ai-success';
    if (returnRate < 0.2) return 'text-ai-warning';
    return 'text-ai-danger';
  };

  const getRiskLabel = (returnRate: number) => {
    if (returnRate < 0.1) return 'Low Risk';
    if (returnRate < 0.2) return 'Medium Risk';
    return 'High Risk';
  };

  const getRiskBg = (returnRate: number) => {
    if (returnRate < 0.1) return 'bg-ai-success/10 border-ai-success/20';
    if (returnRate < 0.2) return 'bg-ai-warning/10 border-ai-warning/20';
    return 'bg-ai-danger/10 border-ai-danger/20';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getRiskBg(product.returnRate)}`}>
          <div className="flex items-center gap-1">
            {product.returnRate < 0.1 ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <TrendingUp className="w-3 h-3" />
            )}
            <span className={getRiskColor(product.returnRate)}>
              {getRiskLabel(product.returnRate)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-ai-warning fill-current' : 'text-muted-foreground'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-1">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95
              ${variant === 'A' 
                ? 'bg-gradient-primary text-white shadow-soft hover:shadow-medium' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </div>
          </button>
        </div>

        {variant === 'B' && (
          <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg">
            AI Confidence: {Math.round((1 - product.returnRate) * 100)}% match for you
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
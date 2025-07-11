import { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../types/product';

interface CartSummaryProps {
  itemCount: number;
  cart: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onClearCart: () => void;
  totalPrice: number;
}

const CartSummary = ({ 
  itemCount, 
  cart, 
  onRemoveItem, 
  onUpdateQuantity, 
  onClearCart, 
  totalPrice 
}: CartSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 bg-card hover:bg-muted/50 rounded-lg border border-border transition-colors duration-200"
      >
        <ShoppingCart className="w-5 h-5 text-foreground" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-card border border-border rounded-xl shadow-large z-50">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                Shopping Cart ({itemCount} items)
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted/50 rounded"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                Your cart is empty
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {cart.map((item) => (
                  <div 
                    key={item.product.id} 
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(item.product.price)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Minus className="w-3 h-3 text-muted-foreground" />
                      </button>
                      <span className="text-sm font-medium min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Plus className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1 hover:bg-destructive/10 rounded text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onClearCart}
                  className="flex-1 px-3 py-2 text-sm border border-border hover:bg-muted/50 rounded-lg transition-colors"
                >
                  Clear Cart
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartSummary;
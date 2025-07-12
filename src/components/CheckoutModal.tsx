import { useState } from 'react';
import { X, CreditCard, Users, Mail, User } from 'lucide-react';
import { CartItem } from '../types/product';
import { useToast } from '../hooks/use-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalPrice: number;
  onClearCart: () => void;
}

const CheckoutModal = ({ isOpen, onClose, cart, totalPrice, onClearCart }: CheckoutModalProps) => {
  const [checkoutType, setCheckoutType] = useState<'solo' | 'friend'>('solo');
  const [friendEmail, setFriendEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [splitPercentage, setSplitPercentage] = useState(50); // Your percentage (0-100)
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleCheckout = async () => {
    if (!customerName || !customerEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email",
        variant: "destructive"
      });
      return;
    }

    if (checkoutType === 'friend' && !friendEmail) {
      toast({
        title: "Missing Friend Email",
        description: "Please enter your friend's email address",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (checkoutType === 'friend') {
        toast({
          title: "Checkout Successful!",
          description: `Order placed! Split payment invitation sent to ${friendEmail}`,
        });
      } else {
        toast({
          title: "Checkout Successful!",
          description: "Your order has been placed successfully!",
        });
      }

      onClearCart();
      onClose();
    } catch (error) {
      toast({
        title: "Checkout Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate split amounts based on percentage
  const yourAmount = checkoutType === 'friend' ? (totalPrice * splitPercentage) / 100 : totalPrice;
  const friendAmount = checkoutType === 'friend' ? totalPrice - yourAmount : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-xl shadow-large max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Checkout</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted/50 rounded"
              disabled={isProcessing}
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Checkout Type Selection */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Choose checkout option:</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCheckoutType('solo')}
                className={`p-4 rounded-lg border transition-colors flex flex-col items-center gap-2 ${
                  checkoutType === 'solo'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-muted/50 text-foreground'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-sm font-medium">Buy Solo</span>
                <span className="text-xs opacity-70">${totalPrice.toFixed(2)}</span>
              </button>
              
              <button
                onClick={() => setCheckoutType('friend')}
                className={`p-4 rounded-lg border transition-colors flex flex-col items-center gap-2 ${
                  checkoutType === 'friend'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-muted/50 text-foreground'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Buy with Friend</span>
                <span className="text-xs opacity-70">Split payment</span>
              </button>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Your Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your full name"
                  disabled={isProcessing}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                  disabled={isProcessing}
                />
              </div>
            </div>
          </div>

          {/* Bill Splitting Section */}
          {checkoutType === 'friend' && (
            <div className="border border-primary/20 rounded-lg p-4 bg-primary/5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Split the Bill</h3>
                  <p className="text-xs text-muted-foreground">Customize how much each person pays</p>
                </div>
              </div>
              
              {/* Split Controls */}
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-foreground mb-2">
                    Drag to adjust split
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-3">
                    <span>You pay more</span>
                    <span>Equal split</span>
                    <span>Friend pays more</span>
                  </div>
                </div>
                
                <div className="relative">
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={splitPercentage}
                    onChange={(e) => setSplitPercentage(Number(e.target.value))}
                    className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${splitPercentage}%, hsl(var(--muted)) ${splitPercentage}%, hsl(var(--muted)) 100%)`
                    }}
                    disabled={isProcessing}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>10%</span>
                    <span className="font-medium">50%</span>
                    <span>90%</span>
                  </div>
                </div>
                
                {/* Split Results */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-4 rounded-lg border border-primary/20">
                    <div className="text-center">
                      <div className="text-xs font-medium text-primary mb-1">YOU PAY</div>
                      <div className="text-lg font-bold text-primary">${yourAmount.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">{splitPercentage}% of total</div>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg border border-muted/50">
                    <div className="text-center">
                      <div className="text-xs font-medium text-foreground mb-1">FRIEND PAYS</div>
                      <div className="text-lg font-bold text-foreground">${friendAmount.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">{100 - splitPercentage}% of total</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Friend Information */}
          {checkoutType === 'friend' && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Friend's Information</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Friend's Email
                </label>
                <input
                  type="email"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter friend's email"
                  disabled={isProcessing}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  We'll send them a payment link for their share (${friendAmount.toFixed(2)})
                </p>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium text-foreground">Order Summary</h3>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-foreground">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="text-foreground">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex justify-between font-medium">
                <span className="text-foreground">
                  {checkoutType === 'friend' ? 'Your Share:' : 'Total:'}
                </span>
                <span className="text-primary">${yourAmount.toFixed(2)}</span>
              </div>
              {checkoutType === 'friend' && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Friend's Share:</span>
                  <span>${friendAmount.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full bg-gradient-primary text-white py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing...
              </div>
            ) : (
              <>
                {checkoutType === 'friend' ? (
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    Send Split Payment Request
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Complete Purchase
                  </div>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
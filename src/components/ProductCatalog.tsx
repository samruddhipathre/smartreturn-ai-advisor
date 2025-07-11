import { Product } from '../types/product';
import ProductCard from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  variant?: 'A' | 'B';
}

const ProductCatalog = ({ products, onAddToCart, variant = 'A' }: ProductCatalogProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg">
          No products available
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Featured Products
        </h2>
        <div className="text-sm text-muted-foreground">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
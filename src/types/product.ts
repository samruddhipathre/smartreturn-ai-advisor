export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  returnRate: number;
  tags: string[];
  riskFactors: {
    sizingIssues: number;
    qualityIssues: number;
    expectationMismatch: number;
    shippingDamage: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface RiskAnalysis {
  overallRisk: 'low' | 'medium' | 'high';
  riskScore: number;
  factors: {
    name: string;
    impact: number;
    description: string;
  }[];
  recommendations: string[];
  alternatives: Product[];
}
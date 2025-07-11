import { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle, TrendingUp, ArrowRight, Lightbulb } from 'lucide-react';
import { Product, RiskAnalysis } from '../types/product';

interface RiskAnalyzerProps {
  product: Product;
  allProducts: Product[];
  onConfirm: (product: Product) => void;
  onCancel: () => void;
}

const RiskAnalyzer = ({ product, allProducts, onConfirm, onCancel }: RiskAnalyzerProps) => {
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI analysis with realistic delay
    const analyzeProduct = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate realistic risk analysis
      const riskScore = product.returnRate * 100;
      const overallRisk: 'low' | 'medium' | 'high' = 
        riskScore < 10 ? 'low' : riskScore < 20 ? 'medium' : 'high';
      
      // Find similar products as alternatives
      const alternatives = allProducts
        .filter(p => p.id !== product.id && p.category === product.category)
        .sort((a, b) => a.returnRate - b.returnRate)
        .slice(0, 3);

      const mockAnalysis: RiskAnalysis = {
        overallRisk,
        riskScore,
        factors: [
          {
            name: 'Sizing Issues',
            impact: product.riskFactors.sizingIssues,
            description: 'Based on customer reviews about fit and sizing'
          },
          {
            name: 'Quality Concerns',
            impact: product.riskFactors.qualityIssues,
            description: 'Material quality and durability feedback'
          },
          {
            name: 'Expectation Mismatch',
            impact: product.riskFactors.expectationMismatch,
            description: 'Difference between product description and reality'
          },
          {
            name: 'Shipping Damage',
            impact: product.riskFactors.shippingDamage,
            description: 'Historical shipping and packaging issues'
          }
        ],
        recommendations: overallRisk === 'low' 
          ? ['This product has an excellent track record!', 'Low return rate indicates high satisfaction', 'Go ahead with confidence']
          : overallRisk === 'medium'
          ? ['Check product reviews for sizing guidance', 'Consider our size guide', '30-day return policy applies']
          : ['High return rate - please review carefully', 'Check measurements thoroughly', 'Consider alternatives below'],
        alternatives
      };

      setAnalysis(mockAnalysis);
      setLoading(false);
    };

    analyzeProduct();
  }, [product, allProducts]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-ai-success';
      case 'medium': return 'text-ai-warning';
      case 'high': return 'text-ai-danger';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-ai-success/10 border-ai-success/20';
      case 'medium': return 'bg-ai-warning/10 border-ai-warning/20';
      case 'high': return 'bg-ai-danger/10 border-ai-danger/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl border border-border shadow-large max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                AI Return Risk Analysis
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Smart insights to help you make better purchase decisions
              </p>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Analyzing return risk patterns...</p>
          </div>
        ) : analysis ? (
          <div className="p-6 space-y-6">
            {/* Product Summary */}
            <div className="flex gap-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{product.name}</h3>
                <p className="text-primary font-semibold text-lg">{formatPrice(product.price)}</p>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getRiskBg(analysis.overallRisk)}`}>
                  {analysis.overallRisk === 'low' ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  <span className={getRiskColor(analysis.overallRisk)}>
                    {analysis.overallRisk.charAt(0).toUpperCase() + analysis.overallRisk.slice(1)} Risk
                  </span>
                </div>
              </div>
            </div>

            {/* Risk Score */}
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Return Risk Score</span>
                <span className={`font-bold ${getRiskColor(analysis.overallRisk)}`}>
                  {analysis.riskScore.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    analysis.overallRisk === 'low' ? 'bg-ai-success' :
                    analysis.overallRisk === 'medium' ? 'bg-ai-warning' : 'bg-ai-danger'
                  }`}
                  style={{ width: `${Math.min(analysis.riskScore, 100)}%` }}
                />
              </div>
            </div>

            {/* Risk Factors */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Risk Breakdown</h4>
              <div className="grid grid-cols-2 gap-3">
                {analysis.factors.map((factor, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{factor.name}</span>
                      <span className="text-xs text-muted-foreground">{factor.impact}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                      <div 
                        className="h-1.5 rounded-full bg-gradient-primary transition-all duration-500"
                        style={{ width: `${factor.impact}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-ai-warning" />
                AI Recommendations
              </h4>
              <div className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternatives */}
            {analysis.alternatives.length > 0 && (
              <div>
                <h4 className="font-medium text-foreground mb-3">Better Alternatives</h4>
                <div className="space-y-2">
                  {analysis.alternatives.map((alt) => (
                    <div key={alt.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <img 
                        src={alt.image} 
                        alt={alt.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{alt.name}</h5>
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(alt.price)} • {((1 - alt.returnRate) * 100).toFixed(0)}% satisfaction
                        </p>
                      </div>
                      <button
                        onClick={() => onConfirm(alt)}
                        className="text-xs px-3 py-1 bg-ai-success/10 text-ai-success rounded-full hover:bg-ai-success/20 transition-colors"
                      >
                        Choose This
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2 border border-border hover:bg-muted/50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm(product)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  analysis.overallRisk === 'high' 
                    ? 'bg-ai-danger text-white hover:bg-ai-danger/90' 
                    : 'bg-gradient-primary text-white hover:opacity-90'
                }`}
              >
                {analysis.overallRisk === 'high' ? 'Add Anyway' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RiskAnalyzer;
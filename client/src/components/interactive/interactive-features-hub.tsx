import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Calculator, 
  FolderOpen, 
  MessageSquare, 
  Map, 
  Star, 
  TrendingUp,
  Users,
  Zap,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ConsultationBooking } from '@/components/booking/consultation-booking';
import { ServiceCalculator } from '@/components/calculator/service-calculator';
import { InteractiveShowcase } from '@/components/projects/interactive-showcase';
import { GlobalProjectMap } from '@/components/map/global-project-map';
import { TestimonialCarousel } from '@/components/testimonials/testimonial-carousel';

interface InteractiveHubProps {
  className?: string;
}

const interactiveFeatures = [
  {
    id: 'booking',
    title: 'Book Strategic Consultation',
    description: 'Schedule a personalized session to discuss your digital transformation needs',
    icon: Calendar,
    color: 'from-blue-500 to-blue-600',
    stats: '15-120 min sessions',
    cta: 'Schedule Now'
  },
  {
    id: 'calculator',
    title: 'Project Cost Calculator',
    description: 'Get instant estimates for your digital transformation project',
    icon: Calculator,
    color: 'from-green-500 to-green-600',
    stats: 'Instant estimates',
    cta: 'Calculate Now'
  },
  {
    id: 'showcase',
    title: 'Interactive Portfolio',
    description: 'Explore detailed case studies and project outcomes',
    icon: FolderOpen,
    color: 'from-purple-500 to-purple-600',
    stats: '100+ projects',
    cta: 'Explore Projects'
  },
  {
    id: 'map',
    title: 'Global Impact Map',
    description: 'Discover projects and transformations across the Middle East',
    icon: Map,
    color: 'from-orange-500 to-orange-600',
    stats: '25+ countries',
    cta: 'View Map'
  }
];

const quickStats = [
  {
    label: 'Projects Delivered',
    value: '100+',
    icon: TrendingUp,
    color: 'text-blue-600'
  },
  {
    label: 'Client Satisfaction',
    value: '99.2%',
    icon: Star,
    color: 'text-green-600'
  },
  {
    label: 'Value Delivered',
    value: '$500M+',
    icon: Zap,
    color: 'text-purple-600'
  },
  {
    label: 'Team Members Led',
    value: '1000+',
    icon: Users,
    color: 'text-orange-600'
  }
];

export function InteractiveFeaturesHub({ className = "" }: InteractiveHubProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleFeatureClick = (featureId: string) => {
    setActiveModal(featureId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-primary text-primary-foreground">
              Interactive Business Platform
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Experience Digital Transformation
              <span className="block text-primary">In Real-Time</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Move beyond static portfolios. Engage with live tools, explore interactive case studies, 
              and experience the future of executive consulting through cutting-edge digital platforms.
            </p>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {quickStats.map((stat, index) => (
            <Card key={stat.label} className="text-center border-border">
              <CardContent className="p-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Interactive Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {interactiveFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -4 }}
              className="group cursor-pointer"
              onClick={() => handleFeatureClick(feature.id)}
              data-testid={`feature-card-${feature.id}`}
            >
              <Card className="h-full border-border hover:border-primary/30 transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">
                        {feature.stats}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    {feature.cta}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <TestimonialCarousel autoPlay={true} showFilters={false} maxItems={6} />
        </motion.div>

        {/* Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join the ranks of Fortune 500 companies and government entities who have 
                experienced breakthrough results through Ahmet's strategic leadership.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => handleFeatureClick('booking')}
                  data-testid="cta-book-consultation"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Strategic Session
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => handleFeatureClick('calculator')}
                  data-testid="cta-calculate-project"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Your Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Interactive Modals */}
      <ConsultationBooking 
        isOpen={activeModal === 'booking'} 
        onClose={closeModal} 
      />
      <ServiceCalculator 
        isOpen={activeModal === 'calculator'} 
        onClose={closeModal} 
      />
      <InteractiveShowcase 
        isOpen={activeModal === 'showcase'} 
        onClose={closeModal} 
      />
      <GlobalProjectMap 
        isOpen={activeModal === 'map'} 
        onClose={closeModal} 
      />
    </section>
  );
}
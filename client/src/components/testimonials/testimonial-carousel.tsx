import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Filter, Building, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Testimonial {
  id: number;
  clientName: string;
  clientTitle: string;
  companyName: string;
  companyLogo?: string;
  testimonialText: string;
  rating: number;
  projectType?: string;
  industry?: string;
  country?: string;
  featured: boolean;
  createdAt: string;
}

interface TestimonialCarouselProps {
  className?: string;
  autoPlay?: boolean;
  showFilters?: boolean;
  maxItems?: number;
}

// Sample testimonial data - this would come from your API
const sampleTestimonials: Testimonial[] = [
  {
    id: 1,
    clientName: "Dr. Sarah Al-Rashid",
    clientTitle: "Chief Digital Officer",
    companyName: "NEOM Development Authority",
    testimonialText: "Ahmet's strategic vision and technical expertise were instrumental in delivering our Tier III data center ahead of schedule. His leadership transformed our digital infrastructure approach and set new standards for smart city development.",
    rating: 5,
    projectType: "Data Center Infrastructure",
    industry: "Smart Cities",
    country: "Saudi Arabia",
    featured: true,
    createdAt: "2024-03-15T00:00:00Z"
  },
  {
    id: 2,
    clientName: "Michael Thompson",
    clientTitle: "VP of Operations",
    companyName: "Global Manufacturing Corp",
    testimonialText: "The digital transformation Ahmet led across our facilities resulted in unprecedented efficiency gains. His Industry 4.0 implementation delivered 35% productivity improvement and $12M annual savings.",
    rating: 5,
    projectType: "Digital Transformation",
    industry: "Manufacturing",
    country: "Turkey",
    featured: true,
    createdAt: "2024-01-20T00:00:00Z"
  },
  {
    id: 3,
    clientName: "Fatima Al-Zahra",
    clientTitle: "CISO",
    companyName: "Regional Banking Group",
    testimonialText: "Ahmet's cybersecurity framework implementation was flawless. Zero security breaches since deployment, 100% regulatory compliance, and our threat response time improved by 90%. Exceptional expertise.",
    rating: 5,
    projectType: "Cybersecurity",
    industry: "Financial Services",
    country: "Kuwait",
    featured: false,
    createdAt: "2023-11-10T00:00:00Z"
  },
  {
    id: 4,
    clientName: "Ahmed Al-Mahmoud",
    clientTitle: "Director of Digital Services",
    companyName: "Ministry of Digital Government",
    testimonialText: "The unified government platform Ahmet delivered revolutionized citizen services. 95% satisfaction rate, 200+ digitized services, and 60% faster delivery. A true digital transformation leader.",
    rating: 5,
    projectType: "Government Digital Platform",
    industry: "Government",
    country: "Saudi Arabia",
    featured: true,
    createdAt: "2023-09-30T00:00:00Z"
  },
  {
    id: 5,
    clientName: "Dr. Hassan Mohamed",
    clientTitle: "CTO",
    companyName: "International Healthcare Network",
    testimonialText: "Ahmet's cloud migration strategy was masterful. Zero downtime during transition, 45% cost reduction, and 3x performance improvement. His expertise in healthcare compliance was invaluable.",
    rating: 5,
    projectType: "Cloud Migration",
    industry: "Healthcare",
    country: "Egypt",
    featured: false,
    createdAt: "2023-07-15T00:00:00Z"
  },
  {
    id: 6,
    clientName: "Jennifer Martinez",
    clientTitle: "Chief Strategy Officer",
    companyName: "TechFlow Solutions",
    testimonialText: "Working with Ahmet on our IoT deployment was transformative. His strategic approach and technical depth delivered results beyond our expectations. A visionary leader in digital innovation.",
    rating: 5,
    projectType: "IoT Deployment",
    industry: "Technology",
    country: "UAE",
    featured: false,
    createdAt: "2023-05-20T00:00:00Z"
  }
];

export function TestimonialCarousel({ 
  className = "", 
  autoPlay = true, 
  showFilters = true,
  maxItems = 6 
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>(sampleTestimonials);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || filteredTestimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [autoPlay, filteredTestimonials.length]);

  // Filter testimonials
  useEffect(() => {
    let filtered = sampleTestimonials.slice(0, maxItems);
    
    if (filterIndustry !== 'all') {
      filtered = filtered.filter(t => t.industry === filterIndustry);
    }
    if (filterCountry !== 'all') {
      filtered = filtered.filter(t => t.country === filterCountry);
    }
    
    setFilteredTestimonials(filtered);
    setCurrentIndex(0);
  }, [filterIndustry, filterCountry, maxItems]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const industries = Array.from(new Set(sampleTestimonials.map(t => t.industry)));
  const countries = Array.from(new Set(sampleTestimonials.map(t => t.country)));

  if (filteredTestimonials.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground">No testimonials found with current filters.</p>
      </div>
    );
  }

  const currentTestimonial = filteredTestimonials[currentIndex];

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Header with Filters */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">Client Testimonials</h3>
            <p className="text-muted-foreground">Hear from leaders who've experienced Ahmet's transformational impact</p>
          </div>
          
          <div className="flex gap-3 items-center">
            <Filter className="w-4 h-4 text-primary" />
            <Select value={filterIndustry} onValueChange={setFilterIndustry}>
              <SelectTrigger className="w-40" data-testid="filter-testimonial-industry">
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry!}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterCountry} onValueChange={setFilterCountry}>
              <SelectTrigger className="w-40" data-testid="filter-testimonial-country">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country} value={country!}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Main Testimonial Display */}
      <div className="relative">
        <Card className="border-border bg-gradient-to-r from-background to-primary/5">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Featured Badge */}
                {currentTestimonial.featured && (
                  <Badge className="bg-primary text-primary-foreground">
                    Featured Testimonial
                  </Badge>
                )}

                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg lg:text-xl leading-relaxed text-foreground italic">
                  "{currentTestimonial.testimonialText}"
                </blockquote>

                {/* Client Information */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-border">
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{currentTestimonial.clientName}</div>
                    <div className="text-muted-foreground">{currentTestimonial.clientTitle}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Building className="w-4 h-4 text-primary" />
                      <span className="font-medium">{currentTestimonial.companyName}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 sm:text-right">
                    {currentTestimonial.projectType && (
                      <Badge variant="secondary">
                        {currentTestimonial.projectType}
                      </Badge>
                    )}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{currentTestimonial.country}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation Arrows */}
        {filteredTestimonials.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={prevTestimonial}
              data-testid="testimonial-prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={nextTestimonial}
              data-testid="testimonial-next"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {/* Testimonial Indicators */}
      {filteredTestimonials.length > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          {filteredTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex
                  ? 'bg-primary'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              data-testid={`testimonial-indicator-${index}`}
            />
          ))}
        </div>
      )}

      {/* Statistics Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">100+</div>
          <div className="text-sm text-muted-foreground">Projects Delivered</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">99.2%</div>
          <div className="text-sm text-muted-foreground">Client Satisfaction</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">25+</div>
          <div className="text-sm text-muted-foreground">Countries Served</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">$500M+</div>
          <div className="text-sm text-muted-foreground">Value Delivered</div>
        </div>
      </div>
    </div>
  );
}
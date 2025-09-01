import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, Calendar, Users, Building, ExternalLink, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Project {
  id: number;
  title: string;
  description: string;
  clientName: string;
  industry: string;
  country: string;
  city: string;
  projectValue: string;
  duration: string;
  technologies: string[];
  results: Record<string, any>;
  beforeImage?: string;
  afterImage?: string;
  caseStudyUrl?: string;
  featured: boolean;
  completedAt: string;
}

interface InteractiveShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample project data - this would come from your API
const sampleProjects: Project[] = [
  {
    id: 1,
    title: "NEOM Tier III Data Center Implementation",
    description: "Strategic implementation of next-generation data center infrastructure for Saudi Arabia's flagship smart city project, delivering world-class connectivity and digital services.",
    clientName: "NEOM Development Authority",
    industry: "Smart Cities",
    country: "Saudi Arabia",
    city: "NEOM",
    projectValue: "$21.9M",
    duration: "18 months",
    technologies: ["Tier III Infrastructure", "Edge Computing", "IoT Integration", "5G Ready"],
    results: {
      efficiency: "99.95% uptime achieved",
      capacity: "15,000 servers supported",
      energy: "40% energy savings",
      timeline: "Delivered 2 months ahead of schedule"
    },
    featured: true,
    completedAt: "2024-03-15",
    caseStudyUrl: "#neom-case-study"
  },
  {
    id: 2,
    title: "Digital Transformation - Fortune 500 Manufacturing",
    description: "Complete digital overhaul of manufacturing operations, implementing Industry 4.0 technologies and establishing smart factory capabilities across multiple facilities.",
    clientName: "Global Manufacturing Corp",
    industry: "Manufacturing",
    country: "Turkey",
    city: "Istanbul",
    projectValue: "$8.5M",
    duration: "12 months",
    technologies: ["IoT Sensors", "AI Analytics", "Cloud Migration", "Automation"],
    results: {
      productivity: "35% increase in efficiency",
      waste: "25% reduction in waste",
      quality: "99.2% quality score",
      roi: "250% ROI in first year"
    },
    featured: true,
    completedAt: "2024-01-20",
    caseStudyUrl: "#manufacturing-case-study"
  },
  {
    id: 3,
    title: "Enterprise Cybersecurity Framework",
    description: "Comprehensive cybersecurity implementation for international banking group, establishing advanced threat detection and compliance frameworks across all operations.",
    clientName: "Regional Banking Group",
    industry: "Financial Services",
    country: "Kuwait",
    city: "Kuwait City",
    projectValue: "$4.2M",
    duration: "8 months",
    technologies: ["SIEM Implementation", "Zero Trust Architecture", "Compliance Automation", "Threat Intelligence"],
    results: {
      security: "0 security breaches",
      compliance: "100% regulatory compliance",
      incidents: "90% reduction in security incidents",
      response: "Sub-5 minute threat response"
    },
    featured: false,
    completedAt: "2023-11-10",
    caseStudyUrl: "#banking-case-study"
  },
  {
    id: 4,
    title: "Smart Government Services Platform",
    description: "Development of unified digital government platform enabling citizens to access all government services through a single, secure, and user-friendly interface.",
    clientName: "Ministry of Digital Government",
    industry: "Government",
    country: "Saudi Arabia",
    city: "Riyadh",
    projectValue: "$12.3M",
    duration: "15 months",
    technologies: ["Microservices", "API Gateway", "Blockchain", "Mobile-First Design"],
    results: {
      services: "200+ services digitized",
      satisfaction: "95% citizen satisfaction",
      efficiency: "60% faster service delivery",
      adoption: "85% digital adoption rate"
    },
    featured: true,
    completedAt: "2023-09-30",
    caseStudyUrl: "#government-case-study"
  },
  {
    id: 5,
    title: "Multi-Site Cloud Migration",
    description: "Strategic cloud migration for international healthcare network, modernizing IT infrastructure across 50+ facilities while ensuring HIPAA compliance and zero downtime.",
    clientName: "International Healthcare Network",
    industry: "Healthcare",
    country: "Egypt",
    city: "Cairo",
    projectValue: "$6.8M",
    duration: "10 months",
    technologies: ["AWS Migration", "Hybrid Cloud", "Data Encryption", "Disaster Recovery"],
    results: {
      costs: "45% reduction in IT costs",
      performance: "3x faster data processing",
      availability: "99.99% uptime maintained",
      compliance: "Full HIPAA compliance achieved"
    },
    featured: false,
    completedAt: "2023-07-15",
    caseStudyUrl: "#healthcare-case-study"
  }
];

const industries = Array.from(new Set(sampleProjects.map(p => p.industry)));
const countries = Array.from(new Set(sampleProjects.map(p => p.country)));

export function InteractiveShowcase({ isOpen, onClose }: InteractiveShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [showBeforeAfter, setShowBeforeAfter] = useState<Record<number, 'before' | 'after'>>({});

  const filteredProjects = sampleProjects.filter(project => {
    if (filterIndustry !== 'all' && project.industry !== filterIndustry) return false;
    if (filterCountry !== 'all' && project.country !== filterCountry) return false;
    return true;
  });

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-7xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-background border-border h-full flex flex-col">
          <CardHeader className="text-center border-b">
            <CardTitle className="text-2xl font-bold text-primary">
              Interactive Project Showcase
            </CardTitle>
            <CardDescription className="text-lg">
              Explore Ahmet's portfolio of transformational projects across industries and borders
            </CardDescription>
            
            {/* Filters */}
            <div className="flex gap-4 justify-center pt-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                  <SelectTrigger className="w-48" data-testid="filter-industry">
                    <SelectValue placeholder="All Industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Select value={filterCountry} onValueChange={setFilterCountry}>
                <SelectTrigger className="w-48" data-testid="filter-country">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <div className="flex-1 overflow-hidden">
            {!selectedProject ? (
              /* Project Grid */
              <div className="p-6 h-full overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layoutId={`project-${project.id}`}
                      whileHover={{ y: -4 }}
                      className="cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                      data-testid={`project-card-${project.id}`}
                    >
                      <Card className="h-full border-border hover:border-primary/30 transition-colors">
                        <CardContent className="p-6">
                          {project.featured && (
                            <Badge className="mb-3 bg-primary text-primary-foreground">
                              Featured Project
                            </Badge>
                          )}
                          
                          <h3 className="font-bold text-lg mb-2 line-clamp-2">
                            {project.title}
                          </h3>
                          
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {project.description}
                          </p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Building className="w-4 h-4 text-primary" />
                              <span>{project.industry}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>{project.city}, {project.country}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <TrendingUp className="w-4 h-4 text-primary" />
                              <span>{project.projectValue}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.technologies.slice(0, 3).map((tech, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{project.technologies.length - 3} more
                              </Badge>
                            )}
                          </div>
                          
                          <Button variant="outline" className="w-full">
                            View Details
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              /* Project Detail View */
              <div className="h-full overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedProject(null)}
                      data-testid="button-back-to-grid"
                    >
                      ← Back to Projects
                    </Button>
                    
                    {selectedProject.featured && (
                      <Badge className="bg-primary text-primary-foreground">
                        Featured Project
                      </Badge>
                    )}
                  </div>
                  
                  <motion.div
                    layoutId={`project-${selectedProject.id}`}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  >
                    {/* Project Information */}
                    <div className="space-y-6">
                      <div>
                        <h1 className="text-3xl font-bold mb-4">{selectedProject.title}</h1>
                        <p className="text-lg text-muted-foreground mb-6">
                          {selectedProject.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Building className="w-4 h-4 text-primary" />
                              <span className="font-semibold">Industry</span>
                            </div>
                            <p>{selectedProject.industry}</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="font-semibold">Location</span>
                            </div>
                            <p>{selectedProject.city}, {selectedProject.country}</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-4 h-4 text-primary" />
                              <span className="font-semibold">Value</span>
                            </div>
                            <p>{selectedProject.projectValue}</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span className="font-semibold">Duration</span>
                            </div>
                            <p>{selectedProject.duration}</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {selectedProject.caseStudyUrl && (
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Full Case Study
                        </Button>
                      )}
                    </div>
                    
                    {/* Results & Metrics */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-4">Key Results & Impact</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {Object.entries(selectedProject.results).map(([key, value], index) => (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Card className="border-primary/20">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium capitalize">
                                      {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                    <span className="text-primary font-bold">{value}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Before/After Section (if images exist) */}
                      {(selectedProject.beforeImage || selectedProject.afterImage) && (
                        <div>
                          <h3 className="text-xl font-bold mb-4">Before & After</h3>
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex gap-2 mb-4">
                                <Button
                                  variant={showBeforeAfter[selectedProject.id] !== 'after' ? 'default' : 'outline'}
                                  onClick={() => setShowBeforeAfter(prev => ({ ...prev, [selectedProject.id]: 'before' }))}
                                  data-testid="button-show-before"
                                >
                                  Before
                                </Button>
                                <Button
                                  variant={showBeforeAfter[selectedProject.id] === 'after' ? 'default' : 'outline'}
                                  onClick={() => setShowBeforeAfter(prev => ({ ...prev, [selectedProject.id]: 'after' }))}
                                  data-testid="button-show-after"
                                >
                                  After
                                </Button>
                              </div>
                              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                <p className="text-muted-foreground">
                                  {showBeforeAfter[selectedProject.id] === 'after' ? 'After' : 'Before'} Implementation View
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                      
                      <Card className="border-primary/20 bg-primary/5">
                        <CardContent className="p-6">
                          <h4 className="font-semibold mb-2">Client Testimonial</h4>
                          <p className="text-sm italic mb-3">
                            "Ahmet's expertise and strategic approach transformed our entire operation. 
                            The results exceeded our expectations and set new standards for our industry."
                          </p>
                          <p className="text-sm font-medium">— {selectedProject.clientName}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
          
          {/* Close Button */}
          <div className="border-t p-4 text-center">
            <Button variant="outline" onClick={onClose} data-testid="button-close-showcase">
              Close Showcase
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
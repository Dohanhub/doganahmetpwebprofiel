import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Calendar, Building, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProjectLocation {
  id: number;
  title: string;
  country: string;
  city: string;
  industry: string;
  projectValue: string;
  status: 'completed' | 'ongoing' | 'planned';
  lat: number;
  lng: number;
  year: number;
  description: string;
  impact: string;
}

interface GlobalProjectMapProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample project locations - this would come from your API
const projectLocations: ProjectLocation[] = [
  {
    id: 1,
    title: "NEOM Smart City Infrastructure",
    country: "Saudi Arabia",
    city: "NEOM",
    industry: "Smart Cities",
    projectValue: "$21.9M",
    status: "completed",
    lat: 28.2743,
    lng: 34.7139,
    year: 2024,
    description: "Next-generation data center and smart city infrastructure",
    impact: "15,000 servers, 99.95% uptime, 40% energy savings"
  },
  {
    id: 2,
    title: "Digital Government Platform",
    country: "Saudi Arabia",
    city: "Riyadh",
    industry: "Government",
    projectValue: "$12.3M",
    status: "completed",
    lat: 24.7136,
    lng: 46.6753,
    year: 2023,
    description: "Unified digital government services platform",
    impact: "200+ services digitized, 95% citizen satisfaction"
  },
  {
    id: 3,
    title: "Manufacturing Digital Transformation",
    country: "Turkey",
    city: "Istanbul",
    industry: "Manufacturing",
    projectValue: "$8.5M",
    status: "completed",
    lat: 41.0082,
    lng: 28.9784,
    year: 2024,
    description: "Industry 4.0 implementation across multiple facilities",
    impact: "35% efficiency increase, $12M annual savings"
  },
  {
    id: 4,
    title: "Banking Cybersecurity Framework",
    country: "Kuwait",
    city: "Kuwait City",
    industry: "Financial Services",
    projectValue: "$4.2M",
    status: "completed",
    lat: 29.3759,
    lng: 47.9774,
    year: 2023,
    description: "Comprehensive cybersecurity implementation",
    impact: "0 breaches, 100% compliance, 90% faster response"
  },
  {
    id: 5,
    title: "Healthcare Cloud Migration",
    country: "Egypt",
    city: "Cairo",
    industry: "Healthcare",
    projectValue: "$6.8M",
    status: "completed",
    lat: 30.0444,
    lng: 31.2357,
    year: 2023,
    description: "Multi-site cloud migration for healthcare network",
    impact: "45% cost reduction, 3x performance, 99.99% uptime"
  },
  {
    id: 6,
    title: "Smart Infrastructure Initiative",
    country: "UAE",
    city: "Dubai",
    industry: "Smart Cities",
    projectValue: "$15.6M",
    status: "ongoing",
    lat: 25.2048,
    lng: 55.2708,
    year: 2024,
    description: "Smart city IoT and data analytics platform",
    impact: "Real-time monitoring, 50% resource optimization"
  },
  {
    id: 7,
    title: "Energy Sector Modernization",
    country: "Qatar",
    city: "Doha",
    industry: "Energy",
    projectValue: "$18.2M",
    status: "planned",
    lat: 25.2854,
    lng: 51.5310,
    year: 2025,
    description: "Digital transformation of energy infrastructure",
    impact: "Smart grid implementation, 30% efficiency target"
  },
  {
    id: 8,
    title: "Port Digitalization Project",
    country: "Oman",
    city: "Muscat",
    industry: "Logistics",
    projectValue: "$7.4M",
    status: "ongoing",
    lat: 23.5859,
    lng: 58.4059,
    year: 2024,
    description: "Smart port management and automation",
    impact: "40% faster processing, reduced wait times"
  }
];

const industries = Array.from(new Set(projectLocations.map(p => p.industry)));
const countries = Array.from(new Set(projectLocations.map(p => p.country)));
const statuses = ['all', 'completed', 'ongoing', 'planned'];

export function GlobalProjectMap({ isOpen, onClose }: GlobalProjectMapProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectLocation | null>(null);
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredProjects = projectLocations.filter(project => {
    if (filterIndustry !== 'all' && project.industry !== filterIndustry) return false;
    if (filterCountry !== 'all' && project.country !== filterCountry) return false;
    if (filterStatus !== 'all' && project.status !== filterStatus) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'ongoing': return 'bg-blue-500';
      case 'planned': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'ongoing': return 'Ongoing';
      case 'planned': return 'Planned';
      default: return status;
    }
  };

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
              Global Project Impact Map
            </CardTitle>
            <CardDescription className="text-lg">
              Explore Ahmet's transformational projects across the Middle East and beyond
            </CardDescription>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                  <SelectTrigger className="w-48" data-testid="map-filter-industry">
                    <SelectValue placeholder="All Industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry!}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Select value={filterCountry} onValueChange={setFilterCountry}>
                <SelectTrigger className="w-48" data-testid="map-filter-country">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country!}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48" data-testid="map-filter-status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : getStatusText(status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <div className="flex-1 overflow-hidden flex">
            {/* Map Visualization (Simplified) */}
            <div className="flex-1 relative bg-gradient-to-br from-primary/5 to-background">
              {/* SVG Map Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-4xl">
                  {/* Simplified Middle East Map Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg border-2 border-border">
                    <div className="absolute top-4 left-4 text-sm text-muted-foreground">
                      Middle East & North Africa
                    </div>
                  </div>
                  
                  {/* Project Markers */}
                  {filteredProjects.map((project, index) => {
                    // Simple positioning based on relative coordinates
                    const x = 20 + (index % 4) * 22; // Spread horizontally
                    const y = 20 + Math.floor(index / 4) * 25; // Spread vertically
                    
                    return (
                      <motion.div
                        key={project.id}
                        className="absolute cursor-pointer"
                        style={{ left: `${x}%`, top: `${y}%` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedProject(project)}
                        data-testid={`map-marker-${project.id}`}
                      >
                        <div className="relative group">
                          <div className={`w-4 h-4 rounded-full ${getStatusColor(project.status)} border-2 border-white shadow-lg`} />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                              <div className="font-semibold text-sm">{project.title}</div>
                              <div className="text-xs text-muted-foreground">{project.city}, {project.country}</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-border">
                <h4 className="font-semibold mb-2 text-sm">Project Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs">Ongoing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-xs">Planned</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project Details Panel */}
            <div className="w-96 border-l border-border overflow-y-auto">
              {selectedProject ? (
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{selectedProject.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{selectedProject.city}, {selectedProject.country}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Industry</div>
                      <Badge variant="secondary">{selectedProject.industry}</Badge>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Status</div>
                      <Badge className={getStatusColor(selectedProject.status)}>
                        {getStatusText(selectedProject.status)}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Value</div>
                      <div className="font-bold text-primary">{selectedProject.projectValue}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Year</div>
                      <div className="font-semibold">{selectedProject.year}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Project Description</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Key Impact
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedProject.impact}
                    </p>
                  </div>
                  
                  <Button className="w-full">
                    View Full Case Study
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Select a Project</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any marker to explore project details and impact metrics.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Project List View */}
          <div className="border-t bg-muted/30 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProjects.slice(0, 4).map((project) => (
                <motion.div
                  key={project.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedProject?.id === project.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-background hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid={`project-list-item-${project.id}`}
                >
                  <div className="font-medium text-sm line-clamp-1">{project.title}</div>
                  <div className="text-xs text-muted-foreground">{project.country}</div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(project.status)} text-white border-0`}
                    >
                      {getStatusText(project.status)}
                    </Badge>
                    <span className="text-xs font-medium text-primary">{project.projectValue}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Close Button */}
          <div className="border-t p-4 text-center">
            <Button variant="outline" onClick={onClose} data-testid="button-close-map">
              Close Map
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Users, Clock, Zap, TrendingUp, Building, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CalculationParams {
  projectType: string;
  projectScope: string;
  teamSize: number;
  duration: number;
  complexity: string;
  requirements: Record<string, boolean>;
}

interface CalculationResult {
  estimatedBudget: string;
  estimatedTimeline: string;
  teamComposition: string[];
  keyDeliverables: string[];
  riskFactors: string[];
  recommendations: string[];
}

const projectTypes = [
  { value: 'digital-transformation', label: 'Digital Transformation', icon: '🚀' },
  { value: 'data-center', label: 'Data Center Infrastructure', icon: '🏢' },
  { value: 'cybersecurity', label: 'Cybersecurity Implementation', icon: '🔒' },
  { value: 'smart-city', label: 'Smart City Solutions', icon: '🌆' },
  { value: 'cloud-migration', label: 'Cloud Migration', icon: '☁️' },
  { value: 'iot-deployment', label: 'IoT Deployment', icon: '📡' },
  { value: 'program-management', label: 'Program Management', icon: '📊' },
  { value: 'consulting', label: 'Strategic Consulting', icon: '💡' }
];

const projectScopes = [
  { value: 'pilot', label: 'Pilot Project', multiplier: 0.3 },
  { value: 'department', label: 'Department Level', multiplier: 0.7 },
  { value: 'enterprise', label: 'Enterprise Wide', multiplier: 1.0 },
  { value: 'multi-site', label: 'Multi-Site', multiplier: 1.5 },
  { value: 'international', label: 'International', multiplier: 2.0 }
];

const complexityLevels = [
  { value: 'low', label: 'Low Complexity', multiplier: 0.8 },
  { value: 'medium', label: 'Medium Complexity', multiplier: 1.0 },
  { value: 'high', label: 'High Complexity', multiplier: 1.3 },
  { value: 'enterprise', label: 'Enterprise Complexity', multiplier: 1.6 }
];

const additionalRequirements = [
  { key: 'compliance', label: 'Regulatory Compliance', impact: 1.2 },
  { key: 'integration', label: 'Legacy System Integration', impact: 1.15 },
  { key: 'training', label: 'Staff Training Program', impact: 1.1 },
  { key: 'security', label: 'Advanced Security', impact: 1.25 },
  { key: 'analytics', label: 'Data Analytics', impact: 1.1 },
  { key: 'mobile', label: 'Mobile Solutions', impact: 1.05 },
  { key: 'ai', label: 'AI/ML Components', impact: 1.3 },
  { key: 'realtime', label: 'Real-time Processing', impact: 1.2 }
];

export function ServiceCalculator({ isOpen, onClose }: CalculatorProps) {
  const { toast } = useToast();
  
  const [params, setParams] = useState<CalculationParams>({
    projectType: '',
    projectScope: '',
    teamSize: 5,
    duration: 6,
    complexity: '',
    requirements: {}
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [email, setEmail] = useState('');

  const saveCalculationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/project-calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to save calculation');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Calculation Saved!",
        description: "Your project estimation has been saved. Ahmet will review and contact you with detailed insights.",
        variant: "default",
      });
    }
  });

  const calculateProject = () => {
    if (!params.projectType || !params.projectScope || !params.complexity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to calculate your project.",
        variant: "destructive",
      });
      return;
    }

    // Base calculations
    const baseProjectCosts = {
      'digital-transformation': 150000,
      'data-center': 200000,
      'cybersecurity': 120000,
      'smart-city': 300000,
      'cloud-migration': 80000,
      'iot-deployment': 100000,
      'program-management': 60000,
      'consulting': 40000
    };

    const baseCost = baseProjectCosts[params.projectType as keyof typeof baseProjectCosts] || 100000;
    const scopeMultiplier = projectScopes.find(s => s.value === params.projectScope)?.multiplier || 1;
    const complexityMultiplier = complexityLevels.find(c => c.value === params.complexity)?.multiplier || 1;
    
    // Apply team size and duration adjustments
    const teamMultiplier = 1 + (params.teamSize - 5) * 0.1;
    const durationMultiplier = 1 + (params.duration - 6) * 0.05;
    
    // Apply additional requirements
    let requirementsMultiplier = 1;
    Object.entries(params.requirements).forEach(([key, selected]) => {
      if (selected) {
        const req = additionalRequirements.find(r => r.key === key);
        if (req) requirementsMultiplier *= req.impact;
      }
    });

    const totalCost = baseCost * scopeMultiplier * complexityMultiplier * teamMultiplier * durationMultiplier * requirementsMultiplier;
    const totalDuration = Math.ceil(params.duration * complexityMultiplier * scopeMultiplier);

    // Generate detailed results
    const budgetRange = {
      min: Math.round(totalCost * 0.8),
      max: Math.round(totalCost * 1.2)
    };

    const teamComposition = generateTeamComposition(params.projectType, params.teamSize);
    const deliverables = generateDeliverables(params.projectType);
    const risks = generateRiskFactors(params);
    const recommendations = generateRecommendations(params);

    setResult({
      estimatedBudget: `$${budgetRange.min.toLocaleString()} - $${budgetRange.max.toLocaleString()}`,
      estimatedTimeline: `${totalDuration} months`,
      teamComposition,
      keyDeliverables: deliverables,
      riskFactors: risks,
      recommendations
    });
  };

  const generateTeamComposition = (projectType: string, teamSize: number): string[] => {
    const baseRoles = {
      'digital-transformation': ['Project Manager', 'Solution Architect', 'Business Analyst', 'Change Manager'],
      'data-center': ['Infrastructure Architect', 'Network Engineer', 'Security Specialist', 'Project Manager'],
      'cybersecurity': ['Security Architect', 'Compliance Officer', 'Security Analyst', 'Project Manager'],
      'smart-city': ['IoT Architect', 'Data Scientist', 'Urban Planner', 'Integration Specialist'],
      'cloud-migration': ['Cloud Architect', 'DevOps Engineer', 'Migration Specialist', 'Security Engineer'],
      'iot-deployment': ['IoT Engineer', 'Data Engineer', 'Network Specialist', 'Security Analyst'],
      'program-management': ['Program Manager', 'Business Analyst', 'Risk Manager', 'Communications Lead'],
      'consulting': ['Senior Consultant', 'Business Analyst', 'Strategy Lead', 'Change Manager']
    };

    const roles = baseRoles[projectType as keyof typeof baseRoles] || baseRoles['consulting'];
    return roles.slice(0, Math.min(teamSize, roles.length));
  };

  const generateDeliverables = (projectType: string): string[] => {
    const deliverables = {
      'digital-transformation': ['Digital Strategy Blueprint', 'Technology Roadmap', 'Change Management Plan', 'ROI Analysis'],
      'data-center': ['Infrastructure Design', 'Implementation Plan', 'Security Framework', 'Monitoring Setup'],
      'cybersecurity': ['Security Assessment', 'Implementation Plan', 'Policy Framework', 'Training Program'],
      'smart-city': ['IoT Architecture', 'Data Platform', 'Citizen Portal', 'Analytics Dashboard'],
      'cloud-migration': ['Migration Strategy', 'Cloud Architecture', 'Migration Plan', 'Cost Optimization'],
      'iot-deployment': ['IoT Platform', 'Device Management', 'Data Pipeline', 'Analytics Dashboard'],
      'program-management': ['Program Charter', 'Governance Framework', 'Risk Management', 'Progress Reports'],
      'consulting': ['Strategic Assessment', 'Recommendations Report', 'Implementation Roadmap', 'Success Metrics']
    };

    return deliverables[projectType as keyof typeof deliverables] || deliverables['consulting'];
  };

  const generateRiskFactors = (params: CalculationParams): string[] => {
    const risks = [];
    
    if (params.complexity === 'high' || params.complexity === 'enterprise') {
      risks.push('High technical complexity may require additional expertise');
    }
    
    if (params.projectScope === 'international' || params.projectScope === 'multi-site') {
      risks.push('Multi-location coordination challenges');
    }
    
    if (params.requirements.integration) {
      risks.push('Legacy system integration complexities');
    }
    
    if (params.requirements.compliance) {
      risks.push('Regulatory compliance requirements');
    }
    
    if (params.teamSize > 10) {
      risks.push('Large team coordination overhead');
    }
    
    return risks.length > 0 ? risks : ['Standard project risks apply'];
  };

  const generateRecommendations = (params: CalculationParams): string[] => {
    const recommendations = [];
    
    recommendations.push('Start with a detailed requirements analysis');
    
    if (params.complexity === 'high' || params.complexity === 'enterprise') {
      recommendations.push('Consider phased implementation approach');
    }
    
    if (params.projectScope === 'enterprise' || params.projectScope === 'international') {
      recommendations.push('Implement strong governance framework');
    }
    
    if (params.requirements.training) {
      recommendations.push('Allocate sufficient time for user training');
    }
    
    recommendations.push('Regular milestone reviews and risk assessments');
    
    return recommendations;
  };

  const handleSaveCalculation = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please provide your email to save the calculation.",
        variant: "destructive",
      });
      return;
    }

    if (!result) {
      toast({
        title: "No Calculation",
        description: "Please calculate your project first.",
        variant: "destructive",
      });
      return;
    }

    saveCalculationMutation.mutate({
      clientEmail: email,
      ...params,
      estimatedBudget: result.estimatedBudget
    });
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
        className="w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-background border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2 justify-center">
              <Calculator className="w-6 h-6" />
              Project Estimation Calculator
            </CardTitle>
            <CardDescription className="text-lg">
              Get instant estimates for your digital transformation project
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Project Type Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Project Type *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {projectTypes.map((type) => (
                  <motion.div
                    key={type.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={params.projectType === type.value ? "default" : "outline"}
                      className="h-auto p-4 flex flex-col items-center gap-2 w-full"
                      onClick={() => setParams(prev => ({ ...prev, projectType: type.value }))}
                      data-testid={`button-project-type-${type.value}`}
                    >
                      <span className="text-2xl">{type.icon}</span>
                      <span className="text-sm text-center">{type.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Project Scope and Complexity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Project Scope *</Label>
                <Select value={params.projectScope} onValueChange={(value) => setParams(prev => ({ ...prev, projectScope: value }))}>
                  <SelectTrigger data-testid="select-project-scope">
                    <SelectValue placeholder="Select project scope" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectScopes.map((scope) => (
                      <SelectItem key={scope.value} value={scope.value}>
                        {scope.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Complexity Level *</Label>
                <Select value={params.complexity} onValueChange={(value) => setParams(prev => ({ ...prev, complexity: value }))}>
                  <SelectTrigger data-testid="select-complexity">
                    <SelectValue placeholder="Select complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    {complexityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Team Size and Duration Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Team Size: {params.teamSize} members
                </Label>
                <Slider
                  value={[params.teamSize]}
                  onValueChange={([value]) => setParams(prev => ({ ...prev, teamSize: value }))}
                  max={20}
                  min={3}
                  step={1}
                  className="w-full"
                  data-testid="slider-team-size"
                />
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Duration: {params.duration} months
                </Label>
                <Slider
                  value={[params.duration]}
                  onValueChange={([value]) => setParams(prev => ({ ...prev, duration: value }))}
                  max={24}
                  min={3}
                  step={1}
                  className="w-full"
                  data-testid="slider-duration"
                />
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Additional Requirements</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {additionalRequirements.map((req) => (
                  <div key={req.key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={req.key}
                      checked={params.requirements[req.key] || false}
                      onChange={(e) => setParams(prev => ({
                        ...prev,
                        requirements: { ...prev.requirements, [req.key]: e.target.checked }
                      }))}
                      className="rounded border-border"
                      data-testid={`checkbox-${req.key}`}
                    />
                    <Label htmlFor={req.key} className="text-sm cursor-pointer">
                      {req.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center">
              <Button
                onClick={calculateProject}
                size="lg"
                className="bg-primary hover:bg-primary/90 px-8 py-3"
                data-testid="button-calculate"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Project Estimate
              </Button>
            </div>

            {/* Results */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 border-t pt-8"
              >
                <h3 className="text-xl font-bold text-center">Project Estimation Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Estimated Budget</h4>
                      </div>
                      <p className="text-2xl font-bold text-primary">{result.estimatedBudget}</p>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Estimated Timeline</h4>
                      </div>
                      <p className="text-2xl font-bold text-primary">{result.estimatedTimeline}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Team Composition
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.teamComposition.map((role, index) => (
                        <Badge key={index} variant="secondary">{role}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Key Deliverables
                    </h4>
                    <ul className="space-y-1">
                      {result.keyDeliverables.map((deliverable, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Risk Factors</h4>
                    <ul className="space-y-1">
                      {result.riskFactors.map((risk, index) => (
                        <li key={index} className="text-sm text-muted-foreground">⚠️ {risk}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-muted-foreground">✅ {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Save Calculation */}
                <div className="border-t pt-6">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Label htmlFor="email">Save this calculation (Email required)</Label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@company.com"
                        className="mt-1 w-full px-3 py-2 border border-border rounded-md"
                        data-testid="input-save-email"
                      />
                    </div>
                    <Button
                      onClick={handleSaveCalculation}
                      disabled={saveCalculationMutation.isPending}
                      data-testid="button-save-calculation"
                    >
                      {saveCalculationMutation.isPending ? 'Saving...' : 'Save & Get Detailed Quote'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Close Button */}
            <div className="flex justify-center pt-6">
              <Button variant="outline" onClick={onClose} data-testid="button-close-calculator">
                Close Calculator
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

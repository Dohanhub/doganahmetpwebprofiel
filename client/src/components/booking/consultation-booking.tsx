import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Building, DollarSign, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ConsultationBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookingForm {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName: string;
  serviceType: string;
  projectBudget: string;
  preferredDate: string;
  preferredTime: string;
  duration: number;
  notes: string;
}

const serviceTypes = [
  'Digital Transformation Strategy',
  'ICT Infrastructure & Data Centers',
  'Cybersecurity Governance',
  'Program Management',
  'Vision 2030 Alignment',
  'Executive Consulting',
  'Smart Cities & IoT Solutions',
  'Change Management',
  'Other'
];

const budgetRanges = [
  '$10K - $50K',
  '$50K - $100K',
  '$100K - $500K',
  '$500K - $1M',
  '$1M+',
  'To be discussed'
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
];

export function ConsultationBooking({ isOpen, onClose }: ConsultationBookingProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<BookingForm>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    companyName: '',
    serviceType: '',
    projectBudget: '',
    preferredDate: '',
    preferredTime: '',
    duration: 60,
    notes: ''
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingForm) => {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to book consultation');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Consultation Booked Successfully!",
        description: "Ahmet will contact you shortly to confirm the details. Check your email for confirmation.",
        variant: "default",
      });
      onClose();
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        companyName: '',
        serviceType: '',
        projectBudget: '',
        preferredDate: '',
        preferredTime: '',
        duration: 60,
        notes: ''
      });
      queryClient.invalidateQueries({ queryKey: ['/api/consultations'] });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your consultation. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookingMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof BookingForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

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
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-background border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              Book Your Strategic Consultation
            </CardTitle>
            <CardDescription className="text-lg">
              Schedule a personalized session with Ahmet Doğan to discuss your digital transformation needs
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="clientName" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Full Name *
                  </Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                    data-testid="input-client-name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clientEmail" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Email Address *
                  </Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                    placeholder="your.email@company.com"
                    autoComplete="email"
                    required
                    data-testid="input-client-email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Phone Number</Label>
                  <Input
                    id="clientPhone"
                    value={formData.clientPhone}
                    onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    autoComplete="tel"
                    data-testid="input-client-phone"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-primary" />
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Your organization"
                    autoComplete="organization"
                    data-testid="input-company-name"
                  />
                </div>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type *</Label>
                  <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                    <SelectTrigger data-testid="select-service-type">
                      <SelectValue placeholder="Select service area" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="projectBudget" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    Project Budget
                  </Label>
                  <Select value={formData.projectBudget} onValueChange={(value) => handleInputChange('projectBudget', value)}>
                    <SelectTrigger data-testid="select-project-budget">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((budget) => (
                        <SelectItem key={budget} value={budget}>
                          {budget}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Scheduling */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Preferred Date *
                  </Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                    min={minDate}
                    autoComplete="off"
                    required
                    data-testid="input-preferred-date"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preferredTime" className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Preferred Time *
                  </Label>
                  <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                    <SelectTrigger data-testid="select-preferred-time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={formData.duration.toString()} onValueChange={(value) => handleInputChange('duration', parseInt(value))}>
                    <SelectTrigger data-testid="select-duration">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Describe your project, challenges, or specific areas you'd like to discuss..."
                  rows={4}
                  autoComplete="off"
                  data-testid="textarea-notes"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  data-testid="button-cancel-booking"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={bookingMutation.isPending}
                  className="flex-1 bg-primary hover:bg-primary/90"
                  data-testid="button-submit-booking"
                >
                  {bookingMutation.isPending ? 'Booking...' : 'Book Consultation'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

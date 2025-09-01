import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function ContactForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      organization: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      try {
        const response = await apiRequest("POST", "/api/contact", data);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Network error" }));
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }
        
        return response.json();
      } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
          throw new Error("Network connection failed. Please check your internet connection and try again.");
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you within 24 hours.",
        });
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      } else {
        throw new Error(data.error || "Unexpected response format");
      }
    },
    onError: (error: any) => {
      console.error("Contact form submission error:", error);
      
      let errorMessage = "Please try again later.";
      let errorTitle = "Error sending message";
      
      if (error.message) {
        if (error.message.includes("Validation failed")) {
          errorTitle = "Form validation error";
          errorMessage = "Please check all fields are filled correctly.";
        } else if (error.message.includes("Network")) {
          errorTitle = "Connection error";
          errorMessage = error.message;
        } else if (error.message.includes("HTTP 429")) {
          errorTitle = "Too many requests";
          errorMessage = "Please wait a moment before trying again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-2xl p-8 text-gray-800">
      <h3 className="text-2xl font-bold text-primary-900 mb-6">Schedule a Consultation</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your first name" 
                      autoComplete="given-name"
                      {...field} 
                      data-testid="input-firstName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your last name" 
                      autoComplete="family-name"
                      {...field} 
                      data-testid="input-lastName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your.email@company.com" 
                    autoComplete="email"
                    {...field} 
                    data-testid="input-email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your organization" 
                    autoComplete="organization"
                    {...field}
                    value={field.value || ""}
                    data-testid="input-organization"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Interest</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                  <FormControl>
                    <SelectTrigger data-testid="select-service">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="digital-transformation">Digital Transformation Leadership</SelectItem>
                    <SelectItem value="cybersecurity-governance">Cybersecurity Governance</SelectItem>
                    <SelectItem value="ict-strategy">ICT Strategy & Architecture</SelectItem>
                    <SelectItem value="program-management">Program Management</SelectItem>
                    <SelectItem value="vision-2030">Vision 2030 Alignment</SelectItem>
                    <SelectItem value="executive-consulting">Executive Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell me about your digital transformation challenges and strategic goals..."
                    rows={4}
                    autoComplete="off"
                    {...field} 
                    data-testid="textarea-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-success hover:bg-success/90 text-success-foreground py-4 px-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            disabled={contactMutation.isPending}
            data-testid="button-submit-contact"
          >
            {contactMutation.isPending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

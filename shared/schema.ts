import { z } from "zod";
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  jsonb,
  boolean,
  integer,
  decimal,
} from "drizzle-orm/pg-core";

// Base tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  organization: varchar("organization", { length: 255 }),
  service: varchar("service", { length: 100 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// New interactive features tables
export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 200 }).notNull(),
  clientEmail: varchar("client_email", { length: 255 }).notNull(),
  clientPhone: varchar("client_phone", { length: 50 }),
  companyName: varchar("company_name", { length: 255 }),
  serviceType: varchar("service_type", { length: 100 }).notNull(),
  projectBudget: varchar("project_budget", { length: 50 }),
  preferredDate: timestamp("preferred_date").notNull(),
  preferredTime: varchar("preferred_time", { length: 20 }).notNull(),
  duration: integer("duration").default(60), // minutes
  status: varchar("status", { length: 20 }).default("pending"),
  notes: text("notes"),
  meetingLink: varchar("meeting_link", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 200 }).notNull(),
  clientTitle: varchar("client_title", { length: 150 }),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  companyLogo: varchar("company_logo", { length: 500 }),
  testimonialText: text("testimonial_text").notNull(),
  rating: integer("rating").default(5),
  projectType: varchar("project_type", { length: 100 }),
  industry: varchar("industry", { length: 100 }),
  country: varchar("country", { length: 100 }),
  isPublic: boolean("is_public").default(true),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  clientName: varchar("client_name", { length: 200 }),
  industry: varchar("industry", { length: 100 }),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  projectValue: varchar("project_value", { length: 50 }),
  duration: varchar("duration", { length: 50 }),
  technologies: jsonb("technologies"), // Array of tech used
  results: jsonb("results"), // Key metrics and outcomes
  beforeImage: varchar("before_image", { length: 500 }),
  afterImage: varchar("after_image", { length: 500 }),
  caseStudyUrl: varchar("case_study_url", { length: 500 }),
  isPublic: boolean("is_public").default(true),
  featured: boolean("featured").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectCalculations = pgTable("project_calculations", {
  id: serial("id").primaryKey(),
  clientEmail: varchar("client_email", { length: 255 }).notNull(),
  projectType: varchar("project_type", { length: 100 }).notNull(),
  projectScope: varchar("project_scope", { length: 50 }).notNull(),
  teamSize: integer("team_size"),
  duration: integer("duration"), // months
  complexity: varchar("complexity", { length: 20 }),
  estimatedBudget: varchar("estimated_budget", { length: 50 }),
  requirements: jsonb("requirements"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  visitorId: varchar("visitor_id", { length: 100 }),
  messages: jsonb("messages"), // Array of chat messages
  industry: varchar("industry", { length: 100 }),
  interests: jsonb("interests"), // Array of interests
  leadScore: integer("lead_score").default(0),
  isQualified: boolean("is_qualified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Zod validation schemas
export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const insertContactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  organization: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1),
});

export const insertConsultationSchema = z.object({
  clientName: z.string().min(1),
  clientEmail: z.string().email(),
  clientPhone: z.string().optional(),
  companyName: z.string().optional(),
  serviceType: z.string().min(1),
  projectBudget: z.string().optional(),
  preferredDate: z.string().transform((str) => new Date(str)),
  preferredTime: z.string().min(1),
  duration: z.number().optional(),
  notes: z.string().optional(),
});

export const insertTestimonialSchema = z.object({
  clientName: z.string().min(1),
  clientTitle: z.string().optional(),
  companyName: z.string().min(1),
  companyLogo: z.string().url().optional(),
  testimonialText: z.string().min(10),
  rating: z.number().min(1).max(5).optional(),
  projectType: z.string().optional(),
  industry: z.string().optional(),
  country: z.string().optional(),
  isPublic: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export const insertProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
  clientName: z.string().optional(),
  industry: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  projectValue: z.string().optional(),
  duration: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  results: z.record(z.any()).optional(),
  beforeImage: z.string().url().optional(),
  afterImage: z.string().url().optional(),
  caseStudyUrl: z.string().url().optional(),
  isPublic: z.boolean().optional(),
  featured: z.boolean().optional(),
  completedAt: z.string().transform((str) => new Date(str)).optional(),
});

export const insertProjectCalculationSchema = z.object({
  clientEmail: z.string().email(),
  projectType: z.string().min(1),
  projectScope: z.string().min(1),
  teamSize: z.number().optional(),
  duration: z.number().optional(),
  complexity: z.string().optional(),
  requirements: z.record(z.any()).optional(),
});

// TypeScript types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultations.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertProjectCalculation = z.infer<typeof insertProjectCalculationSchema>;
export type ProjectCalculation = typeof projectCalculations.$inferSelect;

export type ChatSession = typeof chatSessions.$inferSelect;
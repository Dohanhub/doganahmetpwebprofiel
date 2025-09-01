import {
  users,
  contacts as contactsTable,
  consultations as consultationsTable,
  testimonials as testimonialsTable,
  projects as projectsTable,
  projectCalculations as projectCalculationsTable,
  type User,
  type InsertUser,
  type Contact,
  type InsertContact,
  type Consultation,
  type InsertConsultation,
  type Testimonial,
  type InsertTestimonial,
  type Project,
  type InsertProject,
  type ProjectCalculation,
  type InsertProjectCalculation,
} from "../shared/schema.js";
import { and, desc, eq } from "drizzle-orm";
import { getDb, isDbConfigured } from "./db.js";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Consultation operations
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getConsultations(): Promise<Consultation[]>;
  updateConsultation(id: number, updates: Partial<Consultation>): Promise<Consultation | undefined>;
  
  // Testimonial operations
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getTestimonials(filters?: { industry?: string; country?: string; featured?: boolean }): Promise<Testimonial[]>;
  
  // Project operations
  createProject(project: InsertProject): Promise<Project>;
  getProjects(filters?: { industry?: string; country?: string; featured?: boolean }): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  
  // Project calculation operations
  createProjectCalculation(calculation: InsertProjectCalculation): Promise<ProjectCalculation>;
  getProjectCalculations(): Promise<ProjectCalculation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private consultations: Map<number, Consultation>;
  private testimonials: Map<number, Testimonial>;
  private projects: Map<number, Project>;
  private projectCalculations: Map<number, ProjectCalculation>;
  private idCounters: Record<string, number>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.consultations = new Map();
    this.testimonials = new Map();
    this.projects = new Map();
    this.projectCalculations = new Map();
    this.idCounters = {
      users: 1,
      contacts: 1,
      consultations: 1,
      testimonials: 1,
      projects: 1,
      projectCalculations: 1
    };
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.idCounters.users++;
    const user: User = { 
      id, 
      username: insertUser.username, 
      password: insertUser.password,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Contact operations
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.idCounters.contacts++;
    const contact: Contact = { 
      id, 
      firstName: insertContact.firstName,
      lastName: insertContact.lastName,
      email: insertContact.email,
      organization: insertContact.organization || null,
      service: insertContact.service || null,
      message: insertContact.message,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // Consultation operations
  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = this.idCounters.consultations++;
    const consultation: Consultation = {
      id,
      clientName: insertConsultation.clientName,
      clientEmail: insertConsultation.clientEmail,
      clientPhone: insertConsultation.clientPhone || null,
      companyName: insertConsultation.companyName || null,
      serviceType: insertConsultation.serviceType,
      projectBudget: insertConsultation.projectBudget || null,
      preferredDate: insertConsultation.preferredDate,
      preferredTime: insertConsultation.preferredTime,
      duration: insertConsultation.duration || 60,
      status: "pending",
      notes: insertConsultation.notes || null,
      meetingLink: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.consultations.set(id, consultation);
    return consultation;
  }

  async getConsultations(): Promise<Consultation[]> {
    return Array.from(this.consultations.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updateConsultation(id: number, updates: Partial<Consultation>): Promise<Consultation | undefined> {
    const consultation = this.consultations.get(id);
    if (!consultation) return undefined;
    
    const updated = { ...consultation, ...updates, updatedAt: new Date() };
    this.consultations.set(id, updated);
    return updated;
  }

  // Testimonial operations
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.idCounters.testimonials++;
    const testimonial: Testimonial = {
      id,
      clientName: insertTestimonial.clientName,
      clientTitle: insertTestimonial.clientTitle || null,
      companyName: insertTestimonial.companyName,
      companyLogo: insertTestimonial.companyLogo || null,
      testimonialText: insertTestimonial.testimonialText,
      rating: insertTestimonial.rating || 5,
      projectType: insertTestimonial.projectType || null,
      industry: insertTestimonial.industry || null,
      country: insertTestimonial.country || null,
      isPublic: insertTestimonial.isPublic !== false,
      featured: insertTestimonial.featured || false,
      createdAt: new Date()
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async getTestimonials(filters?: { industry?: string; country?: string; featured?: boolean }): Promise<Testimonial[]> {
    let testimonials = Array.from(this.testimonials.values()).filter(t => t.isPublic);
    
    if (filters) {
      if (filters.industry) {
        testimonials = testimonials.filter(t => t.industry === filters.industry);
      }
      if (filters.country) {
        testimonials = testimonials.filter(t => t.country === filters.country);
      }
      if (filters.featured !== undefined) {
        testimonials = testimonials.filter(t => t.featured === filters.featured);
      }
    }
    
    return testimonials.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Project operations
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.idCounters.projects++;
    const project: Project = {
      id,
      title: insertProject.title,
      description: insertProject.description,
      clientName: insertProject.clientName || null,
      industry: insertProject.industry || null,
      country: insertProject.country || null,
      city: insertProject.city || null,
      latitude: insertProject.latitude ? insertProject.latitude.toString() : null,
      longitude: insertProject.longitude ? insertProject.longitude.toString() : null,
      projectValue: insertProject.projectValue || null,
      duration: insertProject.duration || null,
      technologies: insertProject.technologies || null,
      results: insertProject.results || null,
      beforeImage: insertProject.beforeImage || null,
      afterImage: insertProject.afterImage || null,
      caseStudyUrl: insertProject.caseStudyUrl || null,
      isPublic: insertProject.isPublic !== false,
      featured: insertProject.featured || false,
      completedAt: insertProject.completedAt || null,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async getProjects(filters?: { industry?: string; country?: string; featured?: boolean }): Promise<Project[]> {
    let projects = Array.from(this.projects.values()).filter(p => p.isPublic);
    
    if (filters) {
      if (filters.industry) {
        projects = projects.filter(p => p.industry === filters.industry);
      }
      if (filters.country) {
        projects = projects.filter(p => p.country === filters.country);
      }
      if (filters.featured !== undefined) {
        projects = projects.filter(p => p.featured === filters.featured);
      }
    }
    
    return projects.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getProject(id: number): Promise<Project | undefined> {
    const project = this.projects.get(id);
    return project && project.isPublic ? project : undefined;
  }

  // Project calculation operations
  async createProjectCalculation(insertCalculation: InsertProjectCalculation): Promise<ProjectCalculation> {
    const id = this.idCounters.projectCalculations++;
    const calculation: ProjectCalculation = {
      id,
      clientEmail: insertCalculation.clientEmail,
      projectType: insertCalculation.projectType,
      projectScope: insertCalculation.projectScope,
      teamSize: insertCalculation.teamSize || null,
      duration: insertCalculation.duration || null,
      complexity: insertCalculation.complexity || null,
      estimatedBudget: null,
      requirements: insertCalculation.requirements || null,
      createdAt: new Date()
    };
    this.projectCalculations.set(id, calculation);
    return calculation;
  }

  async getProjectCalculations(): Promise<ProjectCalculation[]> {
    return Array.from(this.projectCalculations.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export class DbStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const db = getDb();
    const rows = await db.select().from(users).where(eq(users.id, id));
    return rows[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const db = getDb();
    const rows = await db.select().from(users).where(eq(users.username, username));
    return rows[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const db = getDb();
    const rows = await db
      .insert(users)
      .values({ username: insertUser.username, password: insertUser.password })
      .returning();
    return rows[0];
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const db = getDb();
    const rows = await db
      .insert(contactsTable)
      .values({
        firstName: insertContact.firstName,
        lastName: insertContact.lastName,
        email: insertContact.email,
        organization: insertContact.organization ?? null,
        service: insertContact.service ?? null,
        message: insertContact.message,
      } as any)
      .returning();
    return rows[0];
  }

  async getContacts(): Promise<Contact[]> {
    const db = getDb();
    const rows = await db.select().from(contactsTable).orderBy(desc(contactsTable.createdAt));
    return rows;
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const db = getDb();
    const rows = await db
      .insert(consultationsTable)
      .values({
        clientName: insertConsultation.clientName,
        clientEmail: insertConsultation.clientEmail,
        clientPhone: insertConsultation.clientPhone ?? null,
        companyName: insertConsultation.companyName ?? null,
        serviceType: insertConsultation.serviceType,
        projectBudget: insertConsultation.projectBudget ?? null,
        preferredDate: insertConsultation.preferredDate,
        preferredTime: insertConsultation.preferredTime,
        duration: insertConsultation.duration ?? 60,
        notes: insertConsultation.notes ?? null,
      } as any)
      .returning();
    return rows[0];
  }

  async getConsultations(): Promise<Consultation[]> {
    const db = getDb();
    const rows = await db
      .select()
      .from(consultationsTable)
      .orderBy(desc(consultationsTable.createdAt));
    return rows;
  }

  async updateConsultation(id: number, updates: Partial<Consultation>): Promise<Consultation | undefined> {
    const db = getDb();
    const rows = await db
      .update(consultationsTable)
      .set({ ...(updates as any), updatedAt: new Date() } as any)
      .where(eq(consultationsTable.id, id))
      .returning();
    return rows[0];
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const db = getDb();
    const rows = await db
      .insert(testimonialsTable)
      .values({
        clientName: insertTestimonial.clientName,
        clientTitle: insertTestimonial.clientTitle ?? null,
        companyName: insertTestimonial.companyName,
        companyLogo: insertTestimonial.companyLogo ?? null,
        testimonialText: insertTestimonial.testimonialText,
        rating: insertTestimonial.rating ?? 5,
        projectType: insertTestimonial.projectType ?? null,
        industry: insertTestimonial.industry ?? null,
        country: insertTestimonial.country ?? null,
        isPublic: insertTestimonial.isPublic !== false,
        featured: insertTestimonial.featured ?? false,
      } as any)
      .returning();
    return rows[0];
  }

  async getTestimonials(filters?: { industry?: string; country?: string; featured?: boolean }): Promise<Testimonial[]> {
    const db = getDb();
    const wheres = [eq(testimonialsTable.isPublic, true)];
    if (filters?.industry) wheres.push(eq(testimonialsTable.industry, filters.industry));
    if (filters?.country) wheres.push(eq(testimonialsTable.country, filters.country));
    if (typeof filters?.featured === 'boolean') wheres.push(eq(testimonialsTable.featured, filters.featured));
    const rows = await db
      .select()
      .from(testimonialsTable)
      .where(and(...wheres))
      .orderBy(desc(testimonialsTable.createdAt));
    return rows;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const db = getDb();
    const rows = await db
      .insert(projectsTable)
      .values({
        title: insertProject.title,
        description: insertProject.description,
        clientName: insertProject.clientName ?? null,
        industry: insertProject.industry ?? null,
        country: insertProject.country ?? null,
        city: insertProject.city ?? null,
        latitude: insertProject.latitude != null ? insertProject.latitude.toString() : null,
        longitude: insertProject.longitude != null ? insertProject.longitude.toString() : null,
        projectValue: insertProject.projectValue ?? null,
        duration: insertProject.duration ?? null,
        technologies: insertProject.technologies ?? null,
        results: insertProject.results ?? null,
        beforeImage: insertProject.beforeImage ?? null,
        afterImage: insertProject.afterImage ?? null,
        caseStudyUrl: insertProject.caseStudyUrl ?? null,
        isPublic: insertProject.isPublic !== false,
        featured: insertProject.featured ?? false,
        completedAt: insertProject.completedAt ?? null,
      } as any)
      .returning();
    return rows[0];
  }

  async getProjects(filters?: { industry?: string; country?: string; featured?: boolean }): Promise<Project[]> {
    const db = getDb();
    const wheres = [eq(projectsTable.isPublic, true)];
    if (filters?.industry) wheres.push(eq(projectsTable.industry, filters.industry));
    if (filters?.country) wheres.push(eq(projectsTable.country, filters.country));
    if (typeof filters?.featured === 'boolean') wheres.push(eq(projectsTable.featured, filters.featured));
    const rows = await db
      .select()
      .from(projectsTable)
      .where(and(...wheres))
      .orderBy(desc(projectsTable.createdAt));
    return rows;
  }

  async getProject(id: number): Promise<Project | undefined> {
    const db = getDb();
    const rows = await db
      .select()
      .from(projectsTable)
      .where(and(eq(projectsTable.id, id), eq(projectsTable.isPublic, true)));
    return rows[0];
  }

  async createProjectCalculation(insertCalculation: InsertProjectCalculation): Promise<ProjectCalculation> {
    const db = getDb();
    const rows = await db
      .insert(projectCalculationsTable)
      .values({
        clientEmail: insertCalculation.clientEmail,
        projectType: insertCalculation.projectType,
        projectScope: insertCalculation.projectScope,
        teamSize: insertCalculation.teamSize ?? null,
        duration: insertCalculation.duration ?? null,
        complexity: insertCalculation.complexity ?? null,
        estimatedBudget: null,
        requirements: insertCalculation.requirements ?? null,
      } as any)
      .returning();
    return rows[0];
  }

  async getProjectCalculations(): Promise<ProjectCalculation[]> {
    const db = getDb();
    const rows = await db
      .select()
      .from(projectCalculationsTable)
      .orderBy(desc(projectCalculationsTable.createdAt));
    return rows;
  }
}

export const storage: IStorage = (isDbConfigured() && process.env.NODE_ENV !== 'test')
  ? new DbStorage()
  : new MemStorage();

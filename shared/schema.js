import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
export const users = pgTable("users", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});
export const contacts = pgTable("contacts", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    organization: text("organization"),
    service: text("service"),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const insertUserSchema = createInsertSchema(users).pick({
    username: true,
    password: true,
});
export const insertContactSchema = createInsertSchema(contacts).pick({
    firstName: true,
    lastName: true,
    email: true,
    organization: true,
    service: true,
    message: true,
});

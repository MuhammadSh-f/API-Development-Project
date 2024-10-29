// src/types/index.d.ts

// Extending Express' Request interface to add user information from JWT authentication
declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        email: string;
        role: Role;
      };
    }
  }
}

// Define roles that can be assigned to users or organization members
export type Role = "admin" | "member" | "guest";

// Interface for the structure of an invitation in an organization
export interface Invitation {
  email: string;
  accessLevel: Role;
}

// Define the User type to match the user model structure
export interface IUser {
  name: string;
  email: string;
  password: string;
}

// Define the Organization type, including members and invitations
export interface IOrganization {
  name: string;
  description: string;
  members: IUser[];
  invitations: Invitation[];
}

// Custom error handling type for more structured error responses
export interface CustomError extends Error {
  statusCode?: number;
  data?: any;
}

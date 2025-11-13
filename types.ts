export enum RecordStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  ARCHIVED = 'Archived',
}

export enum RecordCategory {
  ZONING = 'Zoning Permit',
  BUILDING = 'Building Permit',
  DEVELOPMENT = 'Development Plan',
  ENVIRONMENTAL = 'Environmental Compliance',
  BUSINESS = 'Business License',
  LAND_USE = 'Land Use Plan',
}

export interface Record {
  id: string;
  title: string;
  category: RecordCategory;
  dateReceived: string; // ISO string
  status: RecordStatus;
  description: string;
  submittedBy: string;
  documentUrl?: string;
}

export enum UserRole {
  ADMIN = 'Admin',
  STAFF = 'Staff',
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
}
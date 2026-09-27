export interface Doctor {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  departmentName: string;
  experience: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  availableDays: string[];
  avatarUrl: string;
  education: string;
  specialties: string[];
}

export interface Department {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  specialistsCount: number;
  iconName: string;
  leadDoctor: string;
  keyServices: string[];
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  createdAt: string;
  bloodGroup?: string;
  allergies?: string[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  visitDate: string;
  doctorName: string;
  departmentName: string;
  diagnosis: string;
  visitSummary: string;
  symptoms: string[];
  vitals?: {
    bloodPressure?: string;
    heartRate?: string;
    temperature?: string;
    oxygenSaturation?: string;
    weightKg?: number;
  };
  prescriptions: {
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  labReports?: {
    testName: string;
    result: string;
    normalRange: string;
    status: 'Normal' | 'Abnormal' | 'Critical';
  }[];
  doctorAdvice: string;
  followUpDate?: string;
  attachments?: {
    name: string;
    type: string;
    size: string;
  }[];
}

export interface Appointment {
  id: string;
  userId?: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  departmentName: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  createdAt: string;
}

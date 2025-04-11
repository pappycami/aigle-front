export interface Group {
    id: number;
    name: string;
    description: string;
  }
  
  export interface Profile {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    address: string;
    birthDate: string; // ISO format
  }
  
  export interface User {
    id: number;
    email: string;
    role: string;
    profile: Profile;
    groups: Group[];
  }
  
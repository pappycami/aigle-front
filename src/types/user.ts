export interface Group {
    id?: number;
    name: string;
    description: string;
  }
  
  export interface Profile {
    id?: number;
    firstname: string;
    lastname: string;
    phone: string;
    address: string;
    birthDate: string; // ISO format
  }
  
  export interface User {
    id?: number;
    email: string;
    role: 'ADMIN' | 'USER' | 'MODERATOR' | 'CONTRIBUTOR';
    profile: Profile;
    groups: Group[];
  }

  export const defaultUser: User = {
    id: 0,
    email: "",
    role: "USER",
    profile: {
      firstname: "",
      lastname: "",
      phone: "",
      address: "",
      birthDate: "",
    },
    groups: [],
  };
  
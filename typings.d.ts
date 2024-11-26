export interface Course {
  name: string;
  image: string;
  author: string;
  topics: string[];
  disabled?: boolean;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  sections: CourseSection[];
  description: string;
};

export interface CourseSection {
  title: string;
  videoCount: number;
  index: number;
};

export interface User {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  avatar: string | null;
  name: string;
  accountLocked: boolean;
  department: string;
  company: UserCompany;
}

export interface UserCompany {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
}

export interface Admin {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  name: string;
}

export interface AdminLogin {
  message: string;
  data: AdminLoginData
};

export interface AdminLoginData {
  accessToken: string;
  admin: {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
  }
};

export interface SimpleAnalyticCardInterface {
  name: string;
  number: number;
  bg: string;
  icon: any;
}

export interface Topic {
  name: string
}


export interface SimpleAnalytic {
  label: string;
  value: number;
  icon: string;
  gradient: any;
  href: string;
  
}


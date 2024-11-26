import { Admin, AdminLoginData, Course, User } from "../../../typings";

export interface UserZustand {
  user: AdminLoginData | null;
  setUser: (user: AdminLoginData | null) => void;
};


export interface ToastErrorZustand {
  error: string | null;
  setError: (error: string | null) => void;
}

export interface ToastSuccessZustand {
  success: string | null;
  setSuccess: (success: string | null) => void;
}

export interface CoursesZustand {
  courses: Course[] | [];
  setCourses: (courses: Course[] | []) => void;
};

export interface UsersZustand {
  users: User[] | [],
  setUsers: (users: User[] | []) => void;
  modifyUserByIndex: (indexToModify: number, updatedUserData: Partial<User>) => void;
};

export interface AdminsZustand {
  admins: Admin[] | [],
  setAdmins: (admins: Admin[] | []) => void;
}
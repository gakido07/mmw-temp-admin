import { create } from "zustand";
import { AdminsZustand, CoursesZustand, ToastErrorZustand, ToastSuccessZustand, UserZustand } from "./zustand.model";
import { Admin, AdminLoginData, Course, User } from "../../../typings";
import { UsersZustand } from "./zustand.model";



export const useUser = create<UserZustand>((set)=> ({
  user: null,
  setUser: (user: AdminLoginData | null) => set({ user }),
}));


export const useErrorToast = create<ToastErrorZustand>((set)=> ({
  error: null,
  setError: (error: string | null) => set({ error })
}))


export const useSuccessToast = create<ToastSuccessZustand>((set)=> ({
  success: null,
  setSuccess: (success: string | null) => set({ success })
}))

export const useCourses = create<CoursesZustand>((set)=> ({
  courses: [],
  setCourses: (courses: Course[] | []) => set({ courses }),
}));

export const useUsers = create<UsersZustand>((set) => ({
  users: [],
  setUsers: (users: User[] | []) => set({ users }),
  modifyUserByIndex: (indexToModify: number, updatedUserData: Partial<User>) =>
    set((state) => ({
      users: state.users.map((user, index) => {
        if (index === indexToModify) {
          return {
            ...user,
            ...updatedUserData, // Apply the new data to the user
          };
        }
        return user; // Return other users unchanged
      }),
  })),
}))

export const useAdmins = create<AdminsZustand>((set)=>({
  admins: [],
  setAdmins: (admins: Admin[] | []) => set({ admins })
}));
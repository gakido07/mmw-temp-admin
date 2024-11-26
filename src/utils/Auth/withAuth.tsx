'use client'

import { useEffect } from "react";
import { useUser } from "../Zustand/zustand";
import { redirect } from "next/navigation";

export default function withAuth(Component: any){
  return function WithAuth(props: any){
    const user = useUser((state) => state.user);

    useEffect(() => {
      if (!user) {
        redirect("/login");
      }
    }, [user]);

    if(!user){
      return null;
    };

    return <Component {...props} />
  }
};
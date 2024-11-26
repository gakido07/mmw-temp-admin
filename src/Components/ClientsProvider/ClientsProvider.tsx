'use client'

import { useAdmins, useCourses, useErrorToast, useSuccessToast, useUser, useUsers } from "@/utils/Zustand/zustand";
import { useEffect } from "react";
import ErrorToast from "../Toast/ErrorToast";
import { AnimatePresence } from "framer-motion";
import Panel from "../Panel/Panel";
import { usePathname } from "next/navigation";
import UserPanel from "../Panel/UserPanel";
import SuccessToast from "../Toast/SuccessToast";

const ClientsProvider = ({children}:{children: React.ReactNode}) => {

  const pathname = usePathname();

  const error = useErrorToast(state => state.error);
  const setError = useErrorToast(state => state.setError);
  const success = useSuccessToast(state => state.success);
  const setSuccess = useSuccessToast(state => state.setSuccess);
  const user = useUser(state => state.user);
  const setCourses = useCourses(state => state.setCourses);
  const setUsers = useUsers(state => state.setUsers);
  const setAdmins = useAdmins(state => state.setAdmins);

  useEffect(() => {
    if(error){
      setTimeout(()=>{
        setError(null);
      },3000)
    }
  }, [error, setError]);


  useEffect(() => {
    if(success){
      setTimeout(()=>{
        setSuccess(null);
      },3000)
    }
  }, [success, setSuccess]);


  useEffect(() => {
    if(user){
      // GET COURSES
      fetch("/api/getCourses")
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => {
        setCourses(json.response.courses);
        console.log(json);
      })
      .catch(error =>{
        console.log(error)
      });
  
      // GET USERS
      fetch("/api/getUsers", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          accessToken: user?.accessToken
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => {
        setUsers(json.response);
        // console.log(json);
      })
      .catch(error =>{
        console.log(error)
      });

      // GET ADMINISTRATORS
      fetch("/api/getAdmins", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          accessToken: user?.accessToken
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => {
        setAdmins(json.response);
        // console.log("ADMINS", json.response);
      })
      .catch(error =>{
        console.log(error)
      });
    }

  }, [user]);

  return (
    <div className="w-[100vw] overflow-hidden flex">
      {pathname !== "/login" && user && (
        <Panel/>
      )}

      {children}

      {pathname !== "/login" && user && (
        <UserPanel/>
      )}

      <AnimatePresence mode="wait">
        {error && (
          <ErrorToast error={error} setOpen={setError}/>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {success && (
          <SuccessToast success={success} setOpen={setSuccess}/>
        )}
      </AnimatePresence>
    </div>
  )
}
 
export default ClientsProvider;
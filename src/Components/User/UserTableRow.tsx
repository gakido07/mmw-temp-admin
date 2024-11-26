/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { formattedDate, truncateString } from "@/utils/utils";
import { AdminLoginData, Course, User } from "../../../typings";
import { MouseEvent, useRef, useState } from "react";
import { useCourses, useErrorToast, useSuccessToast, useUser, useUsers } from "@/utils/Zustand/zustand";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { opacity } from "@/utils/Framer/framer";

const UserTableRow = ({rowUser, index, user, users, setUsers, modifyUser}:{rowUser: User, index: number, user: AdminLoginData | null, users: User[], setUsers: any, modifyUser: any}) => {

  const setError = useErrorToast(state => state.setError);
  const setSuccess = useSuccessToast(state => state.setSuccess);

  const nameRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLDivElement | null>(null);
  const companyRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const banRef = useRef<HTMLDivElement | null>(null);

  const [nameHovered, setNameHovered] = useState<boolean>(false);
  const [companyHovered, setCompanyHovered] = useState<boolean>(false);
  const [emailHovered, setEmailHovered] = useState<boolean>(false);
  const [copyHovered, setCopyHovered] = useState<boolean>(false);
  const [optionsHovered, setOptionsHovered] = useState<boolean>(false);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [banHovered, setBanHovered] = useState<boolean>(false);
  const [banning, setBanning] = useState<boolean>(false);

  const copyToClipboard = (text: string, copied: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setSuccess(`The <span class='font-semibold'>${copied}</span> was copied to the Clipboard!`)
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleDelete = () =>{
    if(!deleting){
      setDeleting(true);

      fetch("/api/deleteUser", {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          userId: rowUser.id,
          accessToken: user?.accessToken
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => {
        if(json.success){
          setSuccess(`You've deleted the User <span class='font-semibold'>${rowUser.name}</span> successfully!`)
          const removeUser = users.filter(el => el.id !== rowUser.id);
          setUsers(removeUser);
          setOpenDelete(false);
        }else{
          // Toast
          setError(`Something went wrong deleting the User <span class='font-semibold'>${rowUser.name}</span>.`)
        }
      })
      .catch(error =>{
        console.log(error);
      })
      .finally(()=>{
        setDeleting(false);
      })
    };
  };

  const handleBanUser = (e: MouseEvent<HTMLParagraphElement>) =>{
    e.stopPropagation();

    if(!banning){
      setBanning(true);

      fetch("/api/banUser", {
        method:"PATCH",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          userId: rowUser.id,
          accessToken: user?.accessToken
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => {
        if(json.success){
          
          if(rowUser.accountLocked){
            setSuccess(`You've unbanned the User <span class='font-semibold'>${rowUser.name}</span>`);
          }else{
            setSuccess(`You've banned the User <span class='font-semibold'>${rowUser.name}</span>`);
          }
          
          modifyUser(index, {
            accountLocked: !rowUser.accountLocked,
          });
          
        }else{
          setError(`Couldn't ban the User <span class='font-semibold'>${rowUser.name}</span>.`)
        }
      })
      .catch(error =>{
        console.log(error);

        setError(`Couldn't ban the User <span class='font-semibold'>${rowUser.name}</span>.`)
      })
      .finally(()=>{
        setBanning(false);
      })
    };
  };

  return ( 
    <div className={`w-full h-[49px] flex items-center justify-start px-6 relative group cursor-default border-b-[1px] border-[#E7E7E7] bg-white hover:bg-[#fafafa] transition-colors duration-[0.15s]`}>
      {/* Name */}
      <div  
        className="w-[18%] h-full flex items-center justify-start relative"
        // onMouseEnter={()=> setNameHovered(true)}
        // onMouseLeave={()=> setNameHovered(false)}
      >
        <p ref={nameRef} className="text-[12.5px] text-[#8e8e8e]">{truncateString(rowUser.name!, 20)}</p>

        {/* Tooltip */}
        {nameHovered && nameRef && nameRef.current && (
          <div
            className={`
              absolute left-1/2 -translate-x-1/2 w-[195px]
              flex items-start justify-center flex-col gap-y-1.5 
              p-3 rounded-xl bg-[#0D2136]
            `}
            style={{bottom: nameRef.current?.offsetHeight + 20}}
          >
            <p className="text-[10px] text-[#FFFEF3] font-medium">{rowUser.name}</p>
          </div>
        )}
      </div>


      {/* Company */}
      <div 
        className="w-[18%] h-full flex items-center justify-start relative"
        onMouseEnter={()=> setCompanyHovered(true)}
        onMouseLeave={()=> setCompanyHovered(false)}
      >
        <p ref={companyRef} className="text-[12.5px] text-[#8e8e8e]">{rowUser.company ? rowUser.company.name : "Uber"}</p>
        
        {companyHovered && companyRef && companyRef.current && (
          <div
            className={`
              absolute left-1/2 -translate-x-1/2 w-[195px]
              flex items-start justify-center flex-col gap-y-1.5 
              p-3 rounded-xl bg-[#0D2136] cursor-pointer
            `}
            style={{bottom: companyRef.current?.offsetHeight + 20}}
            onClick={()=> copyToClipboard(rowUser.company ? rowUser.company.email : "Karianne_Bechtelar76@yahoo.com", "Email")}
          >
            <p className="text-[11.5px] text-[#FFFEF3] font-semibold">Company Email</p>
            <p className="text-[10px] text-[#FFFEF3] font-medium">{rowUser.company ? rowUser.company.email : "Karianne_Bechtelar76@yahoo.com"}</p>
          </div>
        )}
      </div>

      
      {/* DEPARTMENT */}
      <div className="w-[18%] h-full flex items-center justify-start relative">
        <p className="text-[12.5px] text-[#8e8e8e]">{truncateString(rowUser.department, 18)}</p>
      </div>


       {/* Email */}
       <div 
        className="w-[18%] h-full flex items-center justify-start gap-x-2.5 relative"
        onMouseEnter={()=> setEmailHovered(true)}
        onMouseLeave={()=> setEmailHovered(false)}
      >
      
        <p ref={emailRef} className="text-[12.5px] text-[#8e8e8e]">{truncateString(rowUser.email!, 17)}</p>
        
        {/* Tooltip */}
        {emailHovered && emailRef && emailRef.current && (
          <div
            className={`
              absolute left-1/2 -translate-x-1/2 w-fit whitespace-nowrap
              flex items-start justify-center flex-col gap-y-1.5 gap-x-2.5
              p-3 rounded-xl bg-[#0D2136] cursor-pointer
            `}
            style={{bottom: emailRef.current?.offsetHeight + 20}}
            onClick={()=> copyToClipboard(rowUser.email!, "Email")}
          >
            <p className="text-[11.5px] text-[#FFFEF3] font-semibold">Personal Email</p>
            <p className="text-[10px] text-[#FFFEF3] font-medium">{rowUser.email}</p>
          </div>
        )}
      </div>


      {/* UID */}
      <div className="w-[18%] h-full flex items-center justify-start relative">
        <p className="text-[12.5px] text-[#8e8e8e]">{truncateString(rowUser.id!, 18)}</p>
      </div>

      {/* Actions */}
      <div className="absolute top-1/2 -translate-y-1/2 right-3 z-30 w-fit h-full myFlex gap-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.15s]">
        {/* User Banned */}
        {rowUser.accountLocked && (
          <div 
            ref={banRef} 
            className="w-[18.5px] h-[18.5px] rounded-full bg-red-700 myFlex relative"
            onMouseEnter={()=> setBanHovered(true)}
            onMouseLeave={()=> setBanHovered(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#fffef3"><path d="M440-400v-360h80v360h-80Zm0 200v-80h80v80h-80Z"/></svg>

            {banHovered && banRef && banRef.current && (
              <div
                className={`
                  absolute left-1/2 -translate-x-1/2 w-fit whitespace-nowrap
                  flex items-start justify-center flex-col gap-y-1.5 
                  p-1.5 rounded-[4px] bg-red-700
                `}
                style={{bottom: banRef.current?.offsetHeight + 5}}
              >
                <p className="text-[10px] text-[#FFFEF3]">This User is Banned</p>
              </div>
            )}
          </div>
        )}
        
        {/* Copy UID */}
        <div 
          ref={copyRef} 
          className="w-fit h-fit myFlex relative"
          onMouseEnter={()=> setCopyHovered(true)}
          onMouseLeave={()=> setCopyHovered(false)}
          onClick={()=> copyToClipboard(rowUser.id!, "UID")}
        >
          <div className="min-w-[40px] h-[40px] rounded-full myFlex group cursor-pointer hover:bg-[#EFEFEF] transition-colors duration-[0.15s]">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#041E4EB3" className="group-hover:fill-[#041E4E]">
              <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/>
            </svg>
          </div>

          {copyHovered && copyRef && copyRef.current && (
            <div
              className={`
                absolute left-1/2 -translate-x-1/2 w-fit whitespace-nowrap
                flex items-start justify-center flex-col gap-y-1.5 
                p-1.5 rounded-[4px] bg-[#0D2136]
              `}
              style={{top: copyRef.current?.offsetHeight + 5}}
            >
              <p className="text-[10px] text-[#FFFEF3]">Copy UID</p>
            </div>
          )}
        </div>

        {/* Options */}
        <div 
          ref={optionsRef} 
          className="w-fit h-fit myFlex relative"
          onMouseEnter={()=> setOptionsHovered(true)}
          onMouseLeave={()=> setOptionsHovered(false)}
          onClick={()=> setOpenOptions(!openOptions)}
        >
          <div className="min-w-[40px] h-[40px] -ml-2.5 rounded-full myFlex group cursor-pointer hover:bg-[#EFEFEF] transition-colors duration-[0.15s]">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#041E4EB3" className="group-hover:fill-[#041E4E]">
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
            </svg>
          </div>

          {optionsHovered && !openOptions && optionsRef && optionsRef.current && (
            <div
              className={`
                absolute left-1/2 -translate-x-1/2 w-fit whitespace-nowrap
                flex items-start justify-center flex-col gap-y-1.5 
                p-1.5 rounded-[4px] bg-[#0D2136]
              `}
              style={{top: optionsRef.current?.offsetHeight + 5}}
            >
              <p className="text-[10px] text-[#FFFEF3]">+ Options</p>
            </div>
          )}

          {openOptions && (
            <div 
              className={`
                absolute top-0 right-12 w-[110px] whitespace-nowrap
                bg-[#0D2136] ring-[0px] ring-[#e7e7e7] rounded-xl p-3.5
                flex items-start justify-start flex-col gap-y-3.5`
              }
            >
              <p onClick={handleBanUser} className="w-full text-[12.5px] text-[#FFFEF3] font-medium relative cursor-pointer">
                {rowUser.accountLocked ? "Unban User" : "Ban User"}

                {banning && (
                  <svg xmlns="http://www.w3.org/2000/svg" height="17.5px" viewBox="0 -960 960 960" width="17.5px" fill="#fafafa" className="absolute h-full top-0 right-0 animate-spin">
                    <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/>
                  </svg>
                )}
              </p>

              <p onClick={()=> setOpenDelete(true)} className="w-full text-[12.5px] text-red-500 font-medium cursor-pointer">Delete User</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete User */}
      {openDelete && (
        <div className="fixed top-0 left-0 z-[50] w-full h-screen bg-black/30 myFlex">
          <div className="w-[450px] p-5 bg-white ring-[2px] ring-[#E7E7E7] rounded-2xl flex items-center justify-start flex-col gap-y-3">
            {/* Icon */}
            <div className="w-[55px] h-[55px] rounded-full bg-[#FFF5F6] myFlex">
              <div className="w-[30px] h-[30px] rounded-full bg-[#FF4056] myFlex">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFEF3"><path d="M480-120q-33 0-56.5-23.5T400-200q0-33 23.5-56.5T480-280q33 0 56.5 23.5T560-200q0 33-23.5 56.5T480-120Zm-80-240v-480h160v480H400Z"/></svg>
              </div>
            </div>

            {/* Text */}
            <p className="text-lg text-[rgb(51,64,73)] font-bold mt-2.5">You're About to Delete.</p>
            
            {/* Text */}
            <p className="text-[12.5px] text-[#334049] mb-2.5 text-center">You're going to delete the User <span className="font-semibold">{rowUser.name}</span>. Are you sure? This action can't be undone. All values associated with <span className="font-semibold">{rowUser.name}</span> will be lost.</p>

            <button onClick={handleDelete} className="w-full h-[50px] bg-[#FF4056] ring-[0px] ring-[#e03347] myFlex rounded-lg">
              {deleting ? (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFEF3" className="animate-spin"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/></svg>
              ):(
                <p className="text-[12.5px] text-[#FFFEF3] font-semibold">Yes, Delete!</p>
              )}
            </button>

            <button onClick={()=> setOpenDelete(false)} className="w-full h-[50px] bg-[#F5F5F7] ring-[0px] ring-[#E7E7E7] myFlex rounded-lg">
              <p className="text-[12.5px] text-[#334049] font-bold">No, Keep It.</p>
            </button>
          </div>
        </div>
      )}
    </div>
   );
}
 
export default UserTableRow;
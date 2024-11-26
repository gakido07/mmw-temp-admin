'use client'

import { useAdmins, useErrorToast, useSuccessToast, useUser } from "@/utils/Zustand/zustand";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { AiOutlineLoading, AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";

const CreateAdmin = ({setOpen}:{setOpen: Dispatch<SetStateAction<boolean>>}) => {
  
  const user = useUser(state => state.user);
  const setError = useErrorToast(state => state.setError);
  const setSuccess = useSuccessToast(state => state.setSuccess);
  const admins = useAdmins(state => state.admins);
  const setAdmins = useAdmins(state => state.setAdmins);

  const [creating, setCreating] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleClose = () =>{
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const handleCreate = () =>{
    if(form.email && form.name && form.password){
      if(!creating){
        setCreating(true);
  
        fetch("/api/createAdmin", {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            data: form,
            accessToken: user?.accessToken
          })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
          if(json.success){
            setAdmins([
              ...admins,
              form
            ]);
  
            setSuccess(`You've added <span class='font-semibold'>${form.name}</span> to the Staff successfully!`)
          }else{
            setError(`Something went wrong adding <span class='font-semibold'>${form.name}</span> to the Staff.`)
          }
        })
        .catch(error =>{
          console.log(error);
        })
        .finally(()=>{
          setCreating(false);
        })
      };
    }else{
      setError(`Please complete provide more <span class='font-semibold'>Information.</span>`)
    }
  };
  
  return ( 
    <div onClick={handleClose} className="w-full h-screen fixed top-0 left-0 z-[100] overflow-hidden bg-black/30 myFlex">
      <div onClick={(e)=> e.stopPropagation()} className="w-[475px] p-7 pb-9 bg-[#1c252d] rounded-2xl flex items-start justify-start flex-col gap-y-5">
        <p className="text-[27.5px] text-[#FFFEF3] font-bold leading-none">Create Staff.</p>
        <p className="text-[12.5px] text-[#FFFEF3]">Create a new admin user with full access to the <span className="font-semibold">Admin Dashboard</span> and management tools.</p>
        
        {/* Name */}
        <div className="w-full px-[12px] py-[8px] bg-white rounded-xl flex items-start justify-start flex-col ring-[2px] ring-transparent focus-within:ring-[#DC4E27]">
          <p className="text-[12px] pb-[1.5px] text-[#52525b]">Name</p>
          
          <input 
            name="name"
            type={"text"}
            placeholder={"Enter Staff's Name"}
            className={`
              pb-[1px] text-[13.5px] text-[#71717A] w-full
              focus:outline-none focus:border-none focus:shadow-none
            `}
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="w-full px-[12px] py-[8px] bg-white rounded-xl flex items-start justify-start flex-col ring-[2px] ring-transparent focus-within:ring-[#DC4E27]">
          <p className="text-[12px] pb-[1.5px] text-[#52525b]">Email</p>
          
          <input 
            name="email"
            type={"text"}
            placeholder={"Enter Staff's Email"}
            className={`
              pb-[1px] text-[13.5px] text-[#71717A] w-full
              focus:outline-none focus:border-none focus:shadow-none
            `}
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="w-full px-[12px] py-[8px] bg-white rounded-xl flex items-start justify-start flex-col ring-[2px] ring-transparent focus-within:ring-[#DC4E27]">
          <p className="text-[12px] pb-[1.5px] text-[#52525b]">Password</p>
          
          <input 
            name={showPassword ? "text" : "password"}
            type={"text"}
            placeholder={"Enter Staff's Password"}
            className={`
              pb-[1px] text-[13.5px] text-[#71717A] w-full
              focus:outline-none focus:border-none focus:shadow-none
            `}
            value={form.password}
            onChange={handleChange}
          />

          {/* Icon */}
          <div onClick={()=> setShowPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-[12.5px] cursor-pointer">
            {showPassword ? (
              <AiTwotoneEyeInvisible className="w-[21px] h-[21px]"/>
            ):(
              <AiTwotoneEye className="w-[21px] h-[21px]"/>
            )}
          </div>
        </div>

        {/* Button */}
        <button onClick={handleCreate} className="w-full h-[50px] bg-[#DC4E27] rounded-xl myFlex">
          {creating ? (
            <AiOutlineLoading className="w-4 h-4 text-[#FFFEF3] animate-spin"/>
          ):(
            <p className="text-sm text-[#FFFEF3] font-semibold">Add Staff</p>
          )}
        </button>
      </div>
    </div>
   );
}
 
export default CreateAdmin;
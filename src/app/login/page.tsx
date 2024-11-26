'use client'

import AuthBackground from "@/Components/Auth/AuthBackground";
import { useErrorToast, useUser } from "@/utils/Zustand/zustand";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { AiTwotoneEyeInvisible, AiTwotoneEye } from "react-icons/ai";

export type Form = {
  email: string;
  password: string;
}

const Login = () => {

  const router = useRouter();

  const setUser = useUser((state) => state.setUser);
  const setError = useErrorToast(state => state.setError);


  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<Form>({
    email: "",
    password:""
  });
  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    if(form.email.length && form.password.length){
      setLoading(true);

      fetch("/api/login", {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(form)
      })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => {
        if(json.success){
          setUser(json.response.data);
          router.replace("/");
        }else{
          // Toast
          setError("You may have the wrong <span class='font-semibold'>Email<span> or <span class='font-semibold'>Password<span>.")
        };
      })
      .catch(error => {
        console.log("AUTH_ERROR", error);
      })
      .finally(()=>{
        setLoading(false);
      })
    };
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  return ( 
    <article className="w-full h-screen bg-[#2d3842] myFlex relative overflow-hidden">
      <form onSubmit={handleSubmit} className="w-[475px] h-fit bg-[#1c252d] rounded-2xl p-7 pb-9 flex items-center justify-center flex-col gap-y-5 z-10">
        
        <h1 className="text-[#FFFEF3] text-[27.5px] font-bold w-full text-left leading-none">Start Your Journey.</h1>
        <p className="text-[13px] text-[#FFFEF3] mb-1">Welcome to <span className="font-semibold">My Mental Wellbeing</span> Admin Dashboard. To proceed, please authenticate. If you do not have an account, please <a href="" className="font-semibold">contact your supervisor</a>.</p>
        
        {/* Email Input */}
        <div
          className={`w-full bg-[#FFFFFF] rounded-xl px-[10px] pl-[12.5px] py-[8px] flex items-start justify-center flex-col relative ring-[2px] ring-transparent focus-within:ring-[#DC4E27]`}
        >
          <p className="text-[12.5px] pb-[1.5px] text-[#52525b]">
            Email
          </p>

          <input 
            name="email"
            type={"text"}
            placeholder={"Enter your Email."}
            className={`
              pb-[1px] text-[13.5px] text-[#71717A] w-full
              focus:outline-none focus:border-none focus:shadow-none
            `}
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Password Input */}
        <div
          className={`w-full bg-[#FFFFFF] rounded-xl px-[10px] pl-[12.5px] py-[8px] flex items-start justify-center flex-col relative ring-[2px] ring-transparent focus-within:ring-[#DC4E27]`}
        >
          <p className="text-[12.5px] pb-[1.5px] text-[#52525b]">
            Password
          </p>

          <input 
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={"Enter your Password."}
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
        

        <button type="submit" className="w-full h-[52.5px] bg-[#DC4E27] rounded-xl myFlex">
          {loading ? (
            <AiOutlineLoading className="w-4 h-4 text-[#FFFEF3] animate-spin"/>
          ):(
            <p className="text-sm font-semibold text-[#FFFEF3]">Sign In</p>
          )}
        </button>
      </form>


      <AuthBackground/>
    </article>
   );
}
 
export default Login;
'use client'

import { useEffect, useState } from "react";
import { SimpleAnalytic } from "../../typings";
import { useCourses, useUsers } from "@/utils/Zustand/zustand";
import Link from "next/link";
import withAuth from "@/utils/Auth/withAuth";


const Home = () => {

  const courses = useCourses(state => state.courses);
  const users = useUsers(state => state.users);

  const [simple, setSimple] = useState<SimpleAnalytic[]>([
    {
      label:"Courses",
      value: 0,
      icon:`<svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="#FFFEF3"><path d="M160-160v-440h160v440H160Zm0-480v-160h160v160H160Zm240 480v-320h160v320H400Zm0-360v-160h160v160H400Zm240 360v-200h160v200H640Zm0-240v-160h160v160H640Z"/></svg>`,
      gradient: "bg-gradient-to-br from-[#ED4887] to-[#B854A4]",
      href:"/courses"
    },
    {
      label:"Users",
      value: 0,
      icon:`<svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="#FFFEF3"><path d="M624-192v-288h144v288H624Zm-216 0v-576h144v576H408Zm-216 0v-384h144v384H192Z"/></svg>`,
      gradient: "bg-gradient-to-br from-[#8760C1] to-[#5747BA]",
      href:"/users"
    },
    {
      label:"Companies",
      value: 15,
      icon:`<svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="#FFFEF3"><path d="M160-160v-126.67h146.67V-160H160Zm0-160v-146.67h146.67V-320H160Zm0-180v-300h146.67v300H160Zm246.67 340v-293.33h146.66V-160H406.67Zm0-326.67v-146.66h146.66v146.66H406.67Zm0-180V-800h146.66v133.33H406.67ZM653.33-160v-93.33H800V-160H653.33Zm0-126.67v-146.66H800v146.66H653.33Zm0-180V-800H800v333.33H653.33Z"/></svg>`,
      gradient: "bg-gradient-to-br from-[#46C5F2] to-[#6693DA]",
      href:"/companies"
    },
    {
      label:"Banned Users",
      value: 0,
      icon:`<svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="#FFFEF3"><path d="M160-160v-480h146.67v480H160Zm206.67 0v-280h146.66v280H366.67Zm286.66 0v-640H800v640H653.33Z"/></svg>`,
      gradient: "bg-gradient-to-br from-[#FFB82C] to-[#F57F59]",
      href:"/users"
    },
  ]);

  useEffect(() => {
    if (courses && users) {
      setSimple((prevSimple) => [
        {
          ...prevSimple[0], // Update the first object (Courses)
          value: courses.length, // Set the value to the number of courses
        },
        {
          ...prevSimple[1], // Update the second object (Users)
          value: users.length, // Set the value to the number of users
        },
        prevSimple[2], // Keep the third object (Companies) unchanged
        {
          ...prevSimple[3], // Update the fourth object (Banned Users)
          value: users.filter(user => user.accountLocked).length, // Count users with accountLocked = true
        },
      ]);
    }
  }, [courses, users]);

  

  return ( 
    <div className="custom-width h-screen flex items-start justify-start bg-[#f5f5f5] overflow-hidden">
      <div className="w-full h-full flex items-start justify-start flex-col p-[60px] overflow-y-auto">
        { /* Simple Analytics */ }
        <div className="w-full flex items-center justify-between gap-x-5">
          {simple.map((el, index)=>{
            return(
              <Link href={el.href} 
                key={`HOME_SIMPLE_ANALYTIC_${index}`}
                className={`w-full aspect-video rounded-2xl p-5 flex items-start justify-start flex-col cursor-pointer ${el.gradient}`}>
                  <p className="text-[9px] text-[#FAEEF3] font-semibold uppercase">{el.label}</p>
                  
                  {/* Spacer */}
                  <div className="w-full flex flex-1"></div>

                  {/* Icon & Value */}
                  <div className="w-full flex items-end justify-between">
                    <div className="w-fit myFlex" dangerouslySetInnerHTML={{__html: el.icon}}></div>

                    <p className="text-xl text-[#FFFEF3] font-bold">{el.value}</p>
                  </div>
              </Link>
            )
          })}
        </div>

        {/* Complex Analytics */}
        <div className="w-full grid grid-cols-2 gap-5 mt-10">
          <div className="col-span-1 h-[300px] bg-white rounded-2xl"></div>
          <div className="col-span-1 h-[300px] bg-white rounded-2xl"></div>
          <div className="col-span-1 h-[300px] bg-white rounded-2xl"></div>
          <div className="col-span-1 h-[300px] bg-white rounded-2xl"></div>
        </div>
      </div>
    </div>
   );
}
 
export default withAuth(Home);

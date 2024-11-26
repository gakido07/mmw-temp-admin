/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { formattedDate, truncateString } from "@/utils/utils";
import { Course } from "../../../typings";
import { useRef, useState } from "react";
import { useCourses, useErrorToast, useSuccessToast, useUser } from "@/utils/Zustand/zustand";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { opacity } from "@/utils/Framer/framer";

const CourseTableRow = ({course, index}:{course: Course, index: number}) => {

  const user = useUser(state => state.user);
  const courses = useCourses(state => state.courses);
  const setCourses = useCourses(state => state.setCourses);
  const setError = useErrorToast(state => state.setError);
  const setSuccess = useSuccessToast(state => state.setSuccess);

  const nameRef = useRef<HTMLDivElement | null>(null);
  const topicsRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const [nameHovered, setNameHovered] = useState<boolean>(false);
  const [topicsHovered, setTopicsHovered] = useState<boolean>(false);
  const [copyHovered, setCopyHovered] = useState<boolean>(false);
  const [optionsHovered, setOptionsHovered] = useState<boolean>(false);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setSuccess("The <span class='font-semibold'>UID</span> was copied to the Clipboard!")
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleDelete = () =>{
    if(!deleting){
      setDeleting(true);

      fetch("/api/deleteCourse", {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          courseId: course.id,
          accessToken: user?.accessToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5M2IzYWUzNi0yZjEyLTQwNDItOGZhOC0xYjcxZDVlYWNlMTAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjcxNDI5NDYsImV4cCI6MTcyNzE0NjU0Nn0.b5_7opk-1JDR0ZHzykZbkkVAebfU0nK4c_CamAG_m8g"
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => {
        if(json.success){
          setSuccess(`You've deleted the <span class='font-semibold'>${course.name}</span> course successfully!`)
          const removeCourse = courses.filter(el => el.id !== course.id);
          setCourses(removeCourse);
          setOpenDelete(false);
        }else{
          // Toast
          setError(`Something went wrong deleting <span class='font-semibold'>${course.name}</span>.`)
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

  return ( 
    <div className={`w-full h-[49px] flex items-center justify-start px-6 relative group cursor-default border-b-[1px] border-[#E7E7E7] bg-white hover:bg-[#fafafa] transition-colors duration-[0.15s]`}>
      {/* Name */}
      <div  
        className="w-[18%] h-full flex items-center justify-start relative"
        onMouseEnter={()=> setNameHovered(true)}
        onMouseLeave={()=> setNameHovered(false)}
      >
        <p ref={nameRef} className="text-[12.5px] text-[#8e8e8e]">{truncateString(course.name!, 20)}</p>

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
            <p className="text-[11.5px] text-[#FFFEF3] font-medium">{course.name}</p>
            <p className="text-[10px] text-[#FFFEF3]">{course.description}.</p>
          </div>
        )}
      </div>

      {/* Author */}
      <div className="w-[18%] h-full flex items-center justify-start">
        <p className="text-[12.5px] text-[#8e8e8e]">{truncateString(course.author!, 17)}</p>
      </div>

      {/* Created At */}
      <div className="w-[18%] h-full flex items-center justify-start">
        <p className="text-[12.5px] text-[#8e8e8e]">{formattedDate(course.createdAt!)}</p>
      </div>

      {/* Topics */}
      <div 
        ref={topicsRef}  
        className="w-[18%] h-full flex items-center justify-start relative"
        onMouseEnter={()=> setTopicsHovered(true)}
        onMouseLeave={()=> setTopicsHovered(false)}

      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#8e8e8e"><path d="M120-200v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"/></svg>
        
        {topicsHovered && topicsRef && topicsRef.current && (
          <div
            className={`
              absolute left-0 w-fit max-w-[200px]
              flex items-center flex-wrap gap-1.5
              p-2 rounded-[8px] bg-[#0D2136]
            `}
            style={{bottom: topicsRef.current?.offsetHeight - 10}}
          >
            {course.topics.map((topic)=>{
              return(
                <p 
                  key={`COURSE_TABLE_TOPIC_${topic}`} 
                  className="text-[10px] font-medium p-1 px-1.5 rounded-[4px] bg-[#27333E] opacity-[100%] text-[#FFFEF3] whitespace-nowrap"
                >
                  {topic}
                </p>
              )
            })}
          </div>
        )}
      </div>

      {/* UID */}
      <div className="w-[18%] h-full flex items-center justify-start relative">
        <p className="text-[12.5px] text-[#8e8e8e]">{truncateString(course.id!, 18)}</p>
      </div>

      {/* Actions */}
      <div className="absolute top-1/2 -translate-y-1/2 right-3 z-30 w-fit h-full myFlex gap-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.15s]">
        {/* Copy UID */}
        <div 
          ref={copyRef} 
          className="w-fit h-fit myFlex relative"
          onMouseEnter={()=> setCopyHovered(true)}
          onMouseLeave={()=> setCopyHovered(false)}
          onClick={()=> copyToClipboard(course.id!)}
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
                absolute top-0 right-12 w-fit whitespace-nowrap
                bg-[#0D2136] ring-[0px] ring-[#e7e7e7] rounded-xl p-3.5
                flex items-start justify-start flex-col gap-y-3.5`
              }
            >
              <Link className="text-[12.5px] text-[#FFFEF3] font-medium" href={`/courses/read/${course.id}`}>Go to Course</Link>
              <Link className="text-[12.5px] text-[#FFFEF3] font-medium" href={`/courses/update/${course.id}`}>Update Course</Link>
              <p onClick={()=> setOpenDelete(true)} className="text-[12.5px] text-red-500 font-medium cursor-pointer">Delete Course</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
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
            <p className="text-[12.5px] text-[#334049] mb-2.5 text-center">You're going to delete the <span className="font-semibold">{course.name}</span> course. Are you sure? This action can't be undone. All values associated with <span className="font-semibold">{course.name}</span> will be lost.</p>

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
 
export default CourseTableRow;
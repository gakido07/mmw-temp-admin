'use client'

import CourseTableRow from "@/Components/Course/CourseTableRow";
import { useCourses } from "@/utils/Zustand/zustand";
import { coursesTableHead } from "@/utils/utils";
import { useEffect, useState } from "react";
import { Course } from "../../../typings";
import Link from "next/link";
import withAuth from "@/utils/Auth/withAuth";


const Courses = () => {

  const courses = useCourses(state => state.courses);

  const [tableKey, setTableKey] = useState<any>(0);
  const [searched, setSearched] = useState<Course[] | [] | null>(null);
  const [inputSearch, setInputSearch] = useState<string>("");



  const handleReload = () =>{
    setTableKey(Date.now());
  };

  useEffect(() => {
    if(inputSearch){
      if(inputSearch.length > 2){
        const searchResults = courses.filter((course) =>
          course.name.toLowerCase().includes(inputSearch.toLowerCase()) // Search by course name only
        );
  
        setSearched(searchResults);
      }else{
        setSearched(null);
      };
    };
  }, [inputSearch]);

  return ( 
    <div className="custom-width h-screen flex items-start justify-start flex-col bg-[#f5f5f5] overflow-hidden p-[60px]">
      <p className="text-2xl text-[#334049] font-bold mb-2 -ml-[1px]">Courses (CRUD)</p>
      <p className="text-[12.5px] text-[#8e8e8e]">Update, Organize, and Maintain your Course Catalog with full control over content and settings.</p>
      <div className="w-full h-full bg-white rounded-xl ring-[2px] ring-[#E7E7E7] mt-5">
        {/* Search & Create */}
        <div className="w-full flex items-center justify-between gap-x-5 p-5 bg-[#fafafa] rounded-t-xl ">
          {/* Search */}
          <div className="w-full h-[45px] rounded-[9px] myFlex bg-[#f2f2f2] ring-[2px] ring-[#E7E7E7] focus-within:ring-[#DC4E27] transiton-all duration-[0.15s]">
            {/* Icon */}
            <div className="w-[45px] h-full myFlex">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#8e8e8e"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
            </div>

            {/* Input */}
            <input 
              type="text" 
              placeholder="Search by Name (UID Coming Soon)"
              className={`
                w-full h-full bg-transparent text-[12.5px] text-[#8e8e8e]
                focus:outline-none focus:shadow-none focus:border-none
              `}
              value={inputSearch}
              onChange={(e)=> setInputSearch(e.target.value)}
            />
          </div>

          {/* Create */}
          <Link href={"/courses/create"} className="min-w-[150px] h-[45px] rounded-[9px] myFlex bg-gradient-to-br from-[#162C46] via-[#27333E] to-[#071A2B]">
            <p className="text-[11px] text-[#FFFEF3] font-semibold"><span className="text-[12.5px] pr-1">+</span> CREATE COURSE</p>
          </Link>

          {/* Reload */}
          <div onClick={handleReload} className="min-w-[45px] h-[45px] rounded-full myFlex group cursor-pointer hover:bg-[#EFEFEF] transition-colors duration-[0.15s]">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#041E4EB3" className="group-hover:fill-[#041E4E]">
              <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>
            </svg>
          </div>

          {/* Options */}
          <div className="min-w-[45px] h-[45px] -ml-2.5 rounded-full myFlex group cursor-pointer hover:bg-[#EFEFEF] transition-colors duration-[0.15s]">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#041E4EB3" className="group-hover:fill-[#041E4E]">
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
            </svg>
          </div>
        </div>

        {/* Table */}
        <div className="w-full h-full">
          {/* Head */}
          <div className="w-full flex items-center justify-start px-6 py-2.5 bg-[#fafafa] border-b-[1px] border-[#E7E7E7]">
            {coursesTableHead.map((head)=>(
              <p 
                key={`COURSES_TABLE_${head.head}`}
                className="text-[9.5px] tracking-wider roboto-semibold text-[#8e8e8e] uppercase w-[18%]"
              >
                {head.head}
              </p>
            ))}
          </div>

          {/* Body */}
          <div key={tableKey} className="w-full flex items-start justify-start flex-col">
            {searched && (
              <>
                {searched.length && (
                  searched.map((course, index)=>{
                    return(
                      <CourseTableRow key={`COURSES_TABLE_COURSE_${course.name}`} course={course} index={index}/>
                    )
                  })
                )}
                {!searched.length && (
                  <div className="w-full">

                  </div>
                )}
              </>
            )}

            {!searched && (
              <>
                {courses.map((course, index)=>{
                  return(
                    <CourseTableRow key={`COURSES_TABLE_COURSE_${course.name}`} course={course} index={index}/>
                  )
                })}
              </>  
            )}
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default withAuth(Courses);
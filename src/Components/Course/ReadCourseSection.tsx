'use client'

import { AnimatePresence, motion } from "framer-motion";
import { CourseSection } from "../../../typings";
import { useState } from "react";
import { height } from "@/utils/Framer/framer";

const ReadCourseSection = ({section}:{section: CourseSection}) => {

  const [open, setOpen] = useState<boolean>(false);

  return ( 
    <div onClick={()=> setOpen(!open)} className="w-full bg-white rounded-xl flex items-start justify-start flex-col cursor-pointer">
      {/* Main */}
      <div className="w-full h-[55px] bg-white rounded-xl flex items-center">
        {/* Icon */}
        <div className="w-[55px] h-full myFlex">
          <div className="w-[24px] h-[24px] rounded-full bg-[#f5f5f5] myFlex">
            <p className="text-[12px] text-[#8e8e8e] font-semibold">{section.index + 1}</p>
          </div>
        </div>

        <div className="flex items-center justify-start flex-1">
          <p className="text-[13.5px] text-[#8e8e8e]">{section.title}.</p>
        </div>

        <div className="w-[55px] h-full myFlex">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#8e8e8e" className={`${open && "-rotate-[180deg]"}`}>
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
          </svg>
        </div>
      </div>

      {/* Conditional */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            variants={height}
            initial="initial"
            animate="enter"
            exit="exit"
            className="w-full"
          >
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
   );
}
 
export default ReadCourseSection;
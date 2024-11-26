'use client'

import { FaUser } from "react-icons/fa";
import { IoIosJournal, IoLogoIonitron, IoMdWarning } from "react-icons/io";
import { SimpleAnalyticCardInterface } from "../../../typings";
import SimpleAnalyticCard from "./SimpleAnalyticCard";


const data = [
  {
    name:"Total Courses",
    number: 100,
    icon: <IoIosJournal className="text-[#134731] w-5 h-5"/>,
    bg:"bg-[#13473110]"
  },
  {
    name:"Total Users",
    number: 100,
    icon:<FaUser className="text-[#27333E] w-5 h-5"/>,
    bg:"bg-[#27333E10]"
  },
  {
    name:"Available Stuff",
    number: 100,
    icon:<IoLogoIonitron className="text-[#DC4E27] w-5 h-5"/>,
    bg:"bg-[#DC4E2710]"
  },
  {
    name:"Users Banned",
    number: 100,
    icon:<IoMdWarning className="text-[#F7B80C] w-5 h-5"/>,
    bg:"bg-[#F7B80C10]"
  },
];

const SimpleAnalytics = () => {
  return ( 
    <div className="w-full flex items-center justify-between gap-x-5">
      {data.map((card:SimpleAnalyticCardInterface, i:number)=>(
        <SimpleAnalyticCard key={`simple_analytic_card_${i}`} card={card}/>
      ))}
    </div>
   );
}
 
export default SimpleAnalytics;

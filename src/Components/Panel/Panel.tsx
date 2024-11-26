'use client'

import { MdHome } from "react-icons/md";
import PanelLinks from "./PanelLinks";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";



const Panel = () => {

  const [openCog, setOpenCog] = useState<boolean>(false);

  const handleOpenWebsite = () =>{
    window.open("https://mmw-v2-kappa.vercel.app/", "_blank", "noreferrer");
  };

  return ( 
    <nav className="min-w-[19vw] h-screen flex items-start justify-start flex-col bg-[#071A2B]">
      {/* Logo */}
      <div className="w-full flex items-center justify-start min-h-[48px] px-[24px]">
        <img src="/images/Logo2.svg" alt="" className="w-[95px]"/>
      </div>

      {/* Live Website */}
      <div 
        className="w-full min-h-[58px] border-t-[1px] border-b-[1px] myFlex px-1 relative cursor-pointer" 
        style={{borderColor:"rgba(211, 227, 253, 0.08)"}}
      >
        <div onClick={handleOpenWebsite} className="w-full px-[20px] h-[32px] flex items-center justify-start rounded-full z-5 hover:bg-[#7CACF814] transition-colors duration-[0.15s]">
          <MdHome className="w-[20.5px] h-[20.5px] text-[#d3e3fdb3]" />

          <p className="text-[13.5px] text-[#d3e3fdb3] font-semibold px-4 leading-none">
            Live Website...
          </p>

          <div className="w-px h-[80%]" style={{backgroundColor: "rgba(211, 227, 253, 0.08)"}}></div>

        </div>

        {/* Settings - (VPS) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-[20px] min-w-[48px] min-h-[48px] myFlex group z-10">
          <div className="w-full h-full relative myFlex">
            <div onClick={()=> setOpenCog(!openCog)} className="min-w-[28px] h-[28px] rounded-full myFlex cursor-pointer group-hover:bg-[#D3E3FD14] transition-colors duration-[0.15s]">
              <IoMdSettings className="w-[20px] h-[20px] text-[#d3e3fdb3]"/>
            </div>

            {/* Pop-Up */}
            {openCog && (
              <div className={`
                absolute top-0 -right-[120px] w-[120px]
                bg-[#0D2136] ring-[0px] ring-[#e7e7e7] rounded-xl p-3.5
                flex items-start justify-start flex-col gap-y-3.5
              `}>
                <Link href="https://www.hostinger.dk/" target="_blank" className="text-[12.5px] text-[#FFFEF3] font-medium w-full">VPS</Link>
                <Link href="https://mmwai.io/api-v2-staging/swagger-doc#/" target="_blank" className="text-[12.5px] text-[#FFFEF3] font-medium w-full">Swagger</Link>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Links */}
      <p className="text-[9.5px] uppercase text-[#D3E3FDB3] py-[14px] px-[24px]">MENU</p>
      <PanelLinks/>
    </nav>
   );
}
 
export default Panel;
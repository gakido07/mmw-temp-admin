'use client'

import { useUser } from "@/utils/Zustand/zustand";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";

const UserPanel = () => {

  const offRef = useRef<HTMLDivElement | null>(null);

  const user = useUser(state => state.user);
  const setUser = useUser(state => state.setUser);

  const [offHovered, setOffHovered] = useState<boolean>(false);

  const handleSignOut = () =>{
    setUser(null);
    redirect("/login");
  };

  return ( 
    <div className="min-w-[56px] h-screen bg-[#162C46] flex items-center justify-start flex-col p-2">
      {/* User */}
      <div className="w-[32px] aspect-square rounded-full overflow-clip myFlex bg-[#02887C]">
        <p className="uppercase text-[#FFFEF3] text-[15.5px] font-bold">{user?.admin.name.slice(0, 1) || "N"}</p>
      </div>

      {/* Spacer */}
      <div className="w-full h-full"></div>

      {/* Sign Out */}
      <div 
        ref={offRef}
        onClick={handleSignOut} 
        className="w-[48px] aspect-square myFlex cursor-pointer relative"
        onMouseEnter={()=> setOffHovered(true)}
        onMouseLeave={()=> setOffHovered(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-84 31.5-156.5T197-763l56 56q-44 44-68.5 102T160-480q0 134 93 227t227 93q134 0 227-93t93-227q0-67-24.5-125T707-707l56-56q54 54 85.5 126.5T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-360v-440h80v440h-80Z"/></svg>

        {/* Tooltip */}
        {offHovered && offRef && offRef.current && (
          <div
            className={`
              absolute right-0 w-fit whitespace-nowrap
              myFlex
              px-3 py-1.5 rounded-lg bg-[#0D2136]
            `}
            style={{bottom: offRef.current.offsetHeight}}
          >
            <p className="text-[10px] text-[#FFFEF3] font-medium">Click to <span className="font-semibold">Sign Out</span></p>
          </div>
        )}
      </div>
    </div>
   );
}
 
export default UserPanel;
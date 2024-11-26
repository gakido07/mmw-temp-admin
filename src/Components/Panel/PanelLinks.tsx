'use client'

import { panelLinks } from "@/utils/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const PanelLinks = () => {

  const router = useRouter();
  const pathname = usePathname();
  const splitPath = pathname.split("/");


  return ( 
    <ul className="w-full h-full flex items-start justify-start flex-col gap-y-3 px-1">
      {panelLinks.map((link)=>(
        <p
          onClick={()=> router.push("/" + link.href)}
          key={`panel_link_${link.name}`} 
          className={`w-full flex items-center justify-start gap-x-[16px] px-[20px] h-[32px] rounded-full cursor-pointer ${splitPath[1] === link.href ? "bg-[#0842A0] .panelLinkActive" : "hover:bg-[#7CACF814]"} transition-colors duration-[0.15s]`}
        >
          <div className="myFlex w-[20px] h-[20px]" dangerouslySetInnerHTML={{__html: link.icon}}></div>
          <p className="text-[#D3E3FDB3] text-[13.5px] font-medium">{link.name}</p>
        </p>
      ))}
    </ul>
   );
}
 
export default PanelLinks;
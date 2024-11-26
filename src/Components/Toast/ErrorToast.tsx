'use client'

import { opacityY } from "@/utils/Framer/framer";
import { motion } from "framer-motion";

const ErrorToast = ({error, setOpen}:{error: string, setOpen: (error: string | null) => void}) => {
  return ( 
    <motion.div 
      custom={0.5}
      variants={opacityY}
      initial="initial"
      animate="enter"
      exit="exit"
      onClick={()=> setOpen(null)} 
      className="fixed bottom-5 right-5 w-fit px-5 py-3.5 rounded-lg bg-red-700 myFlex z-[50]">
      <p className="text-sm text-[#FFFEF3]" dangerouslySetInnerHTML={{__html: error}}></p>
    </motion.div>
   );
}
 
export default ErrorToast;
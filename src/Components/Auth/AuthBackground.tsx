'use client'

import NASA from "@/Components/NASA/NASA";

const AuthBackground = () => {
  return ( 
    <>
      {/* Logo */}
      <img src="/images/Logo2.svg" alt="" className="absolute top-5 left-8 w-[125px] z-10"/>


      {/* Shapes */}
      <div className="absolute bottom-5 -left-10 w-full z-5 pointer-events-none">
        <img src="/images/Shapes/CircleShape.svg" alt="" className="w-[180px] xs:w-[200px] xl:w-[250px] opacity-10"/>
      </div>
      <div className="absolute top-10 right-10 z-5 pointer-events-none -rotate-[45deg]">
        <img src="/images/Shapes/LampShape.svg" alt="" className="xs-[250px] xs:w-[300px] xl:w-[400px] opacity-10"/>
      </div>
      <div className="absolute top-16 left-0 z-5 pointer-events-none">
        <img src="/images/Shapes/WeirdShape.svg" alt="" className="w-[130px] xs:w-[180px] xl:w-[230px] opacity-10"/>
      </div>
      <div className="absolute bottom-20 right-1 z-5 pointer-events-none">
        <img src="/images/Shapes/WeirdShape2.svg" alt="" className="w-[130px] xs:w-[180px] xl:w-[230px] opacity-10"/>
      </div>

      {/* Particles */}
      <div className="absolute top-0 left-0 pointer-events-none z-0 w-full h-full">
        <NASA id="AUTH_PARTICLES" color={"#1c252d"} quantity={150} min={1} max={2.5} fullScreen={true}/>
      </div>
    </>
   );
}
 
export default AuthBackground;
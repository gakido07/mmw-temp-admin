'use client'

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { CourseSection } from "../../../typings";

const SectionComponent = ({section, index, sectionsCreated, setSectionsCreated}:{section: CourseSection, index: number, sectionsCreated: CourseSection[], setSectionsCreated: Dispatch<SetStateAction<CourseSection[]>>}) => {


  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;

    if(name === "videoCount"){
      // Check if the value contains only numbers
      const isNumeric = /^[0-9]*$/.test(value);
      
      if (!isNumeric) {
        return; // Exit if the value contains non-numeric characters
      }
    };

    // Create a new array to avoid mutating state directly
    const updatedSections = [...sectionsCreated];
    
    // Update the specific section field being changed
    updatedSections[index] = {
      ...updatedSections[index],
      [name]: name === "videoCount" ? Number(value) : value // Ensure videoCount is a number
    };

    setSectionsCreated(updatedSections);
  };

  const handleRemove = () =>{
    if(sectionsCreated.length === 1){
      return;
    };

    // Create a new array without the section at the current index
    const updatedSections = sectionsCreated.filter((_, i) => i !== index);

    // Update the state
    setSectionsCreated(updatedSections);

  };


  return ( 
    <div className="w-full flex items-start justify-start gap-x-4 p-4 bg-white rounded-2xl">
      <div className="w-full flex items-start justify-start flex-col gap-y-4">
        {/* Title */}
        <div className="w-full px-[12px] py-[8px] bg-[#f8f8f8] rounded-xl flex items-start justify-start flex-col ring-[2px] ring-transparent focus-within:ring-[#8e8e8e50]">
          <p className="text-[12px] pb-[1.5px] text-[#52525b]">Title</p>
          
          <input 
            name="title"
            type={"text"}
            placeholder={"..."}
            className={`
              pb-[1px] text-[13.5px] text-[#71717A] w-full bg-transparent
              focus:outline-none focus:border-none focus:shadow-none
            `}
            value={sectionsCreated[index].title}
            onChange={handleChange}
          />
        </div>

        {/* Videos */}
        <div className="w-full px-[12px] py-[8px] bg-[#f8f8f8] rounded-xl flex items-start justify-start flex-col ring-[2px] ring-transparent focus-within:ring-[#8e8e8e50]">
          <p className="text-[12px] pb-[1.5px] text-[#52525b]">Amount</p>
          
          <input 
            name="videoCount"
            type={"text"}
            placeholder={"..."}
            className={`
              pb-[1px] text-[13.5px] text-[#71717A] w-full bg-transparent
              focus:outline-none focus:border-none focus:shadow-none
            `}
            value={sectionsCreated[index].videoCount}
            onChange={handleChange}
          />
        </div>

        {/* Index */}
        <div className="w-full px-[12px] py-[8px] bg-[#f8f8f8] rounded-xl flex items-start justify-start flex-col ring-[2px] ring-transparent focus-within:ring-[#8e8e8e50]">
          <p className="text-[12px] pb-[1.5px] text-[#52525b]">Index</p>
          
          <input 
            name="title"
            type={"text"}
            placeholder={"..."}
            className={`
              pb-[1px] text-[13.5px] text-[#71717A] w-full bg-transparent
              focus:outline-none focus:border-none focus:shadow-none
            `}
            value={index}
            disabled
          />
        </div>
      </div>

      {/* Remove */}
      <button 
        onClick={handleRemove}
        className="w-[55px] h-full rounded-xl cursor-pointer bg-[#8e8e8e80] hover:bg-red-700 transition-colors duration-[0.15s]"
      >

      </button>
    </div>
   );
}
 
export default SectionComponent;
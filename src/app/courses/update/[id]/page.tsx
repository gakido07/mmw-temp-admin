'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Course, CourseSection, Topic } from "@/../typings";
import { AnimatePresence } from "framer-motion";
import { dummyTopics } from "@/utils/utils";
import SectionComponent from "@/Components/Course/Section";
import { useCourses, useErrorToast, useSuccessToast, useUser } from "@/utils/Zustand/zustand";
import { usePathname, useRouter } from "next/navigation";
import withAuth from "@/utils/Auth/withAuth";

const UpdateCourse = () => {

  const router = useRouter();
  const pathname = usePathname();
  
  const [loading, setLoading] = useState<boolean>(false);
  const setError = useErrorToast(state => state.setError);
  const setSuccess = useSuccessToast(state => state.setSuccess);
  const user = useUser(state => state.user);
  const courses = useCourses(state => state.courses);

  // Course Found
  const [courseFound, setCourseFound] = useState<Course | null>(null);

  // Steps
  const [step, setStep] = useState<number>(1);

  // Image
  const [image, setImage] = useState<string>("");

  // Form
  const [form, setForm] = useState({
    name: "",
    description: "",
    author: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  // Topics
  const topicsRef = useRef<HTMLDivElement | null>(null);

  const [showTopics, setShowTopics] = useState<boolean>(false);
  const [selectedTopics, setselectedTopics] = useState<Topic[] | []>([]);

  const handleTopic = (topic:Topic) => {
    const findTopic = selectedTopics.find(el=> el.name === topic.name);
    if(findTopic){
      const removeTopic = selectedTopics.filter(el => el.name !== topic.name);
      setselectedTopics(removeTopic);
    }else{
      setselectedTopics([
        topic,
        ...selectedTopics
      ])
    }
  };

  // Sections
  const [sectionsCreated, setSectionsCreated] = useState<CourseSection[]>([{
    title:"",
    videoCount: 0,
    index: 0
  }]);

  const addSection = () =>{
    setSectionsCreated([
      ...sectionsCreated,
      {
        title:"",
        videoCount: 0,
        index: sectionsCreated.length - 1
      }
    ])
  };

  const handlePrev = () =>{
    if(step === 2){
      setStep(1);
    }
  };

  const handleNext = () =>{
    if(step === 1){
      if(form.name && form.description && form.author && selectedTopics.length && image){
        setStep(2);
      }else{
        // Toast
        setError("Please provide more <span class='font-semibold'>Information</span> to continue.")
      };

    };
    
    if(step === 2){
      if(form.name && form.description && form.author && selectedTopics.length && image && sectionsCreated.length){
        // Create
        setLoading(true);
        
        fetch("/api/updateCourse", {
          method: "PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            data: {
              ...form,
              topics: selectedTopics.map(topic => topic.name),
              image,
              sections: sectionsCreated
            },
            courseId: courseFound?.id,
            accessToken: user?.accessToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5M2IzYWUzNi0yZjEyLTQwNDItOGZhOC0xYjcxZDVlYWNlMTAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjcxMDg2NjEsImV4cCI6MTcyNzExMjI2MX0.Ex3iVBOgW-cOZ1lwQRAeNeD_pCj0ls6ecMYoec76n_I"
          })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
          if(json.success){
            setSuccess(`You've created <span class='font-semibold'>${form.name}</span> successfully!`)
            router.replace("/courses");
          }else{
            setError(`Something went wrong.`)
          }
          console.log(json)
        })
        .catch(error => {
          console.log(error);
          setError(`Something went wrong.`)
        })
        .finally(()=>{
          setLoading(false)
        })
      }else{
        // Toast
        setError("Please provide more <span class='font-semibold'>Information</span> to continue.")
      }

    };
  };


  // Read ID
  useEffect(() => {
    if(pathname && courses){
      const getId = pathname.split("/")[3];
      if(getId){
        const findCourse = courses.filter(course => course.id === getId);
       
        if(findCourse){
          setCourseFound(findCourse[0]);
        };
      };
    }
  }, [pathname, courses]);

  // When we find the Course with the ID, we set the Initial Values.
  useEffect(() => {
    if(courseFound){
      setForm({
        name: courseFound.name,
        description: courseFound.description,
        author: courseFound.author
      });

      const getTopics = courseFound.topics.map((topic => {
        return { name: topic };
      }));

      setselectedTopics(getTopics);

      setImage(courseFound.image);

      setSectionsCreated(courseFound.sections);
    }
  }, [courseFound]);

  return ( 
    <div className="custom-width h-screen flex items-start justify-start flex-col bg-[#f5f5f5] overflow-y-auto">
      <div className="w-full p-[60px] pb-0">
        <p className="text-2xl text-[#334049] font-bold mb-2 -ml-[1px]">Courses (UPDATE)</p>
        <p className="text-[12.5px] text-[#8e8e8e]">Update, Organize, and Maintain your Course Catalog with full control over content and settings.</p>
      </div>

      {step === 1 && (
        <div className="w-full h-full flex items-start justify-start flex-col">
          <div className="w-full h-full flex items-start justify-start gap-x-[60px]"> 
            {/* Left */}
            <div className="w-1/2 h-full flex items-start justify-start flex-col gap-y-5 p-[60px] pr-0">
              {/* Title */}
              <div className="w-full px-[12px] py-[8px] bg-white rounded-xl flex items-start justify-start flex-col ring-[2px] ring-transparent focus-within:ring-[#DC4E27]">
                <p className="text-[12px] pb-[1.5px] text-[#52525b]">Title</p>
                
                <input 
                  name="name"
                  type={"text"}
                  placeholder={"..."}
                  className={`
                    pb-[1px] text-[13.5px] text-[#71717A] w-full
                    focus:outline-none focus:border-none focus:shadow-none
                  `}
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="w-full px-[12px] py-[8px] bg-white rounded-xl flex items-start justify-start flex-col ring-[2px] ring-transparent focus-within:ring-[#DC4E27]">
                <p className="text-[12px] pb-[1.5px] text-[#52525b]">Description</p>
                
                <textarea
                  name="description"
                  placeholder={"..."}
                  className={`
                    pb-[1px] text-[13.5px] text-[#71717A] w-full h-[150px] resize-none
                    focus:outline-none focus:border-none focus:shadow-none
                  `}
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {/* Author */}
              <div className="w-full px-[12px] py-[8px] bg-white rounded-xl flex items-start justify-start flex-col ring-[2px] ring-transparent focus-within:ring-[#DC4E27]">
                <p className="text-[12px] pb-[1.5px] text-[#52525b]">Author</p>
                
                <input 
                  name="author"
                  type={"text"}
                  placeholder={"..."}
                  className={`
                    pb-[1px] text-[13.5px] text-[#71717A] w-full
                    focus:outline-none focus:border-none focus:shadow-none
                  `}
                  value={form.author}
                  onChange={handleChange}
                />
              </div>

              {/* Topics */}
              <div
                onClick={()=> setShowTopics(!showTopics)}
                ref={topicsRef} 
                className="w-full min-h-[70.25px] px-[12px] py-[8px] bg-white rounded-xl flex items-start justify-start flex-col relative cursor-pointer ring-[2px] ring-transparent focus-within:ring-[#DC4E27]"
              >
                <p className="text-[12px] pb-[1.5px] text-[#52525b]">Topics</p>

                {/* Spacer */}
                <div className="w-full h-full"></div>

                {!selectedTopics.length ? (
                  <p className="pb-[1px] text-[13.5px] text-[#71717A] w-full">...</p>
                ):(
                  <div className="w-full flex items-center justify-start gap-2.5 mt-1 relative">
                    {selectedTopics.map(((topic, i) => {
                      if(i < 2){
                        return (
                          <p 
                            key={`create_course_topic_selected_${topic.name}`}
                            onClick={()=> handleTopic(topic)}
                            className="text-[12.5px] font-medium px-3 py-1.5 rounded-[4px] bg-[#f5f5f5] text-[#71717a]"
                          >
                            {topic.name}
                          </p>
                        )
                      }
                    }))}



                    {/* Arrow Icon && More than 2 - Icon */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-[12px] myFlex gap-x-5">
                      {/* + */}
                      {selectedTopics.length > 2 && (
                        <div className="ml-2.5 w-[26px] aspect-square myFlex bg-[#8e8e8e80] rounded-full">
                          {/* <p className="text-[11.5px] text-[#FFFEF3] font-semibold">+{selectedTopics.slice(0, 2).length - 1}</p> */}
                        </div>
                      )}

                      {/* Arrow */}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="#8e8e8e80"
                        className={`rotate-[90deg] ${showTopics && "-rotate-[90deg]"} transition-all duration-300`}
                      >
                        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                      </svg>
                    </div>
                  </div>
                )}


                <AnimatePresence mode="wait">
                  {showTopics && topicsRef && topicsRef.current && (
                    <div 
                      onClick={(e)=> e.stopPropagation()}
                      className="absolute left-0 w-full rounded-2xl h-[175px] bg-white flex items-start justify-start flex-col gap-y-3 overflow-y-auto p-2"
                      style={{top: topicsRef.current.offsetHeight + 7}}
                    >
                      {dummyTopics.map((topic: Topic)=>(
                        <p 
                          key={`create_course_topic_${topic.name}`}
                          className={`w-full px-3 py-3 text-[13px] rounded-lg ${selectedTopics.find(el => el.name === topic.name) ? "bg-[#8e8e8e80] font-medium text-white" : "hover:bg-[#fafafa] text-[#71717A]"}  transition-colors duration-[0.15s]`}
                          onClick={()=> handleTopic(topic)}
                        >
                          {topic.name}
                        </p>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right */}
            <div className="w-1/2 h-full flex items-start justify-start flex-col gap-y-5 p-[60px] pl-0">
              {/* Image */}
              <div className="w-full aspect-video bg-white rounded-2xl myFlex relative overflow-clip">
                {image && (
                  <img src={image} alt="" className="absolute w-full h-full inset-0 object-cover"/>
                )}
              </div>

              {/* Input */}
              <div className="w-full px-[12px] py-[8px] bg-white rounded-xl flex items-start justify-start flex-col ring-[2px] ring-transparent focus-within:ring-[#DC4E27]">
                <p className="text-[12px] pb-[1.5px] text-[#52525b]">Image</p>
                
                <input 
                  type={"text"}
                  placeholder={"Please Enter the Image URL."}
                  className={`
                    pb-[1px] text-[13.5px] text-[#71717A] w-full
                    focus:outline-none focus:border-none focus:shadow-none
                  `}
                  value={image}
                  onChange={(e)=> setImage(e.target.value)}
                />
              </div>
            </div>
          </div>

              
          {/* Next */}
          <div className="w-full p-[60px] pb-[30px] mx-auto flex gap-x-[60px]">
            <div className="w-full"></div>

            <button 
              onClick={handleNext}
              className="w-full h-[50px] rounded-xl bg-[#8e8e8e80] myFlex"
            >

            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="w-full h-full flex items-start justify-start flex-col">
          <div className="w-full flex items-start justify-start gap-x-[60px]">
            {/* Left */}
            <div className="w-1/2 h-full flex items-start justify-start flex-col gap-y-5 p-[60px] pr-0">
              {sectionsCreated.map((section, index)=>(
                <SectionComponent key={`create_course_section_${index}`} section={section} index={index} sectionsCreated={sectionsCreated} setSectionsCreated={setSectionsCreated}/>
              ))}

              {/* Add - Remove */}
              <div className="w-full myFlex">
                <button onClick={addSection} className="w-full h-[45px] rounded-xl bg-[#DC4E27]">
                  
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="w-1/2 h-full relative">
              <div className="sticky top-0 left-0 w-full h-screen p-[60px] pl-0">
                <div className="w-full h-full bg-white rounded-2xl p-5">
                  {/* Image */}
                  {/* <div className="w-full aspect-video bg-[#fafafa] rounded-2xl overflow-clip relative">
                    <img src={image} alt="" className="absolute inset-0 w-full h-full"/>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Prev & Next */}
          <div className="w-full p-[60px] pb-[30px] mx-auto flex gap-x-[60px]">
            <button 
              onClick={handlePrev}
              className="w-full h-[50px] rounded-xl bg-[#8e8e8e80] myFlex"
            >

            </button>

            <button 
              onClick={handleNext}
              className="w-full h-[50px] rounded-xl bg-[#8e8e8e80] myFlex"
            >
              {loading ? (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" className="animate-spin"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/></svg>
              ):(
                <p></p>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
   );
}
 
export default withAuth(UpdateCourse);
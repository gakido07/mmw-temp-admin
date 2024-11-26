'use client'

import { useUser, useUsers } from "@/utils/Zustand/zustand";
import { usersTableHead } from "@/utils/utils";
import { useEffect, useState } from "react";
import { User } from "../../../typings";
import UserTableRow from "@/Components/User/UserTableRow";
import withAuth from "@/utils/Auth/withAuth";


const Users = () => {

  const user = useUser(state => state.user);
  const users = useUsers(state => state.users);
  const modifyUser = useUsers(state => state.modifyUserByIndex);
  const setUsers = useUsers(state => state.setUsers);

  const [tableKey, setTableKey] = useState<any>(0);
  const [searched, setSearched] = useState<User[] | [] | null>(null);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [paginatedUsers, setPaginatedUsers] = useState<User[] | []>([]);
  const [pagination, setPagination] = useState({
    from: 0,
    to: 10,
    page: 1
  });

  const [paginatedUsersSearched, setPaginatedUsersSearched] = useState<User[] | []>([]);
  const [paginationSearched, setPaginationSearched] = useState({
    from: 0,
    to: 10,
    page: 1
  });
  
  


  const handleReload = () =>{
    setTableKey(Date.now());
  };

  const handlePagination = (direction: string) => {
    if (direction === "LEFT") {
      if(pagination.from >= 10){
        setPagination((prev) => ({
          from: prev.from - 10,
          to: prev.to - 10,
          page: prev.page - 1,
        }));
      };
    } else {
      if(pagination.to < users.length){
        setPagination((prev) => ({
          from: prev.from + 10,
          to: prev.to + 10,
          page: prev.page + 1,
        }));
      }
    }
  };

  const handlePaginationSearch = (direction: string) => {
    if(searched){
      if (direction === "LEFT") {
        if(paginationSearched.from >= 10){
          setPaginationSearched((prev) => ({
            from: prev.from - 10,
            to: prev.to - 10,
            page: prev.page - 1,
          }));
        };
      } else {
        if(paginationSearched.to < searched.length){
          setPaginationSearched((prev) => ({
            from: prev.from + 10,
            to: prev.to + 10,
            page: prev.page + 1,
          }));
        }
      }
    };
  };

  useEffect(() => {
    if(inputSearch){
      if(inputSearch.length > 0){
        // Reset Pagination Searched
        if(paginationSearched.from > 0){
          setPaginationSearched({
            from: 0,
            to: 10,
            page: 1
          });
        };

        const searchResults = users.filter((user: User) =>
          user.name.toLowerCase().includes(inputSearch.toLowerCase()) // Search by course name only
        );
  
        setSearched(searchResults);
      };
    }else{
      if(searched){
        setSearched(null);
      }
    }
  }, [inputSearch, users, paginationSearched, searched]);

  // Pagination for Users
  useEffect(() => {
    if(users){
      let array: User[] = [];

      users.map((user: User, index: number)=>{
        if(index >= pagination.from && index <= pagination.to){
          array.push(user);
        }
      });

      setPaginatedUsers(array);
    };
  }, [pagination, users]);

  // Pagination for Searched Users
  useEffect(() => {
    if(searched){
      let array: User[] = [];

      searched.map((user: User, index: number)=>{
        if(index >= paginationSearched.from && index <= paginationSearched.to){
          array.push(user);
        }
      });

      setPaginatedUsersSearched(array);
    }else{
      // Reset Pagination Searched
      if(paginationSearched.from > 0){
        setPaginationSearched({
          from: 0,
          to: 10,
          page: 1
        });
      }
    }
  }, [paginationSearched, searched]);

  return ( 
    <div className="custom-width h-screen flex items-start justify-start flex-col bg-[#f5f5f5] overflow-hidden p-[60px]">
      <p className="text-2xl text-[#334049] font-bold mb-2 -ml-[1px]">Users (CRUD)</p>
      <p className="text-[12.5px] text-[#8e8e8e]">Update, Organize, and Maintain your User Catalog with full control over content and settings.</p>
      
      <div className="w-full h-full flex items-start justify-start flex-col bg-white rounded-xl ring-[2px] ring-[#E7E7E7] overflow-hidden mt-5">
        {/* Search & Pagination */}
        <div className="w-full flex items-center justify-between gap-x-5 p-5 pb-1 bg-[#fafafa] rounded-t-xl">
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

          {/* Pagination */}
          <div className="min-w-[150px] h-[45px] rounded-[9px] myFlex gap-x-2 bg-gradient-to-br from-[#162C46] via-[#27333E] to-[#071A2B] p-2">
            {searched ? (
              <>
                <p className="text-[11px] text-[#D3E3F3] w-[65%] h-full rounded-[4px] bg-[#7CACF814] myFlex">
                  {paginatedUsersSearched.length} - {paginationSearched.page} of {Math.ceil(searched.length / 10)}
                </p>

                <div className="flex items-center justify-center gap-x-1.5 w-[35%] h-full rounded-[4px]">
                  <svg onClick={()=> handlePaginationSearch("LEFT")} xmlns="http://www.w3.org/2000/svg" height="19px" viewBox="0 -960 960 960" width="19px" fill="#D3E3F3" className={`cursor-pointer ${pagination.from === 0 && "blockPagination"}`}>
                    <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                  </svg>

                  <svg onClick={()=> handlePaginationSearch("RIGHT")} xmlns="http://www.w3.org/2000/svg" height="19px" viewBox="0 -960 960 960" width="19px" fill="#D3E3F3" className={`cursor-pointer ${pagination.to >= users?.length && "blockPagination"}`}>
                    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                  </svg>
                </div>
              </>
            ):(
              <>
                <p className="text-[11px] text-[#D3E3F3] w-[65%] h-full rounded-[4px] bg-[#7CACF814] myFlex">
                  {paginatedUsers.length} - {pagination.page} of {users ? Math.ceil(users.length / 10) : 0}
                </p>

                <div className="flex items-center justify-center gap-x-1.5 w-[35%] h-full rounded-[4px]">
                  <svg onClick={()=> handlePagination("LEFT")} xmlns="http://www.w3.org/2000/svg" height="19px" viewBox="0 -960 960 960" width="19px" fill="#D3E3F3" className={`cursor-pointer ${pagination.from === 0 && "blockPagination"}`}>
                    <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                  </svg>

                  <svg onClick={()=> handlePagination("RIGHT")} xmlns="http://www.w3.org/2000/svg" height="19px" viewBox="0 -960 960 960" width="19px" fill="#D3E3F3" className={`cursor-pointer ${pagination.to >= users?.length && "blockPagination"}`}>
                    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                  </svg>
                </div>
              </>
            )}
          </div>

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
        <div className="w-full h-full overflow-y-auto bg-[#fafafa] pt-5">
          {/* Head */}
          <div className="w-full flex items-center justify-start px-6 py-2.5 border-b-[1px] border-[#E7E7E7]">
            {usersTableHead.map((head)=>(
              <p 
                key={`COURSES_TABLE_${head.head}`}
                className="text-[9.5px] tracking-wider roboto-semibold text-[#8e8e8e] uppercase w-[18%]"
              >
                {head.head}
              </p>
            ))}
          </div>

          {/* Body */}
          <div key={tableKey} className="w-full h-full flex items-start justify-start flex-col bg-white">
            {searched && (
              <>
                {searched.length ? (
                  paginatedUsersSearched.map((rowUser, index)=>{
                    return(
                      <UserTableRow key={`USERS_TABLE_USER_${rowUser.name}`} rowUser={rowUser} index={index} users={users} setUsers={setUsers} modifyUser={modifyUser} user={user}/>
                    )
                  })
                ):(
                  !searched.length && (
                    <div className="w-full h-full bg-white flex items-start justify-center p-6">
                      <p className="text-[12.5px] text-[#8e8e8e]">No <span className="font-semibold">USERS</span> found. Please try again or check back later.</p>
                    </div>
                  )
                )}
              </>
            )}

            {!searched && (
              <>
                {paginatedUsers?.map((rowUser, index)=>(
                  <UserTableRow key={`USERS_TABLE_USER_${rowUser.name}_${index}`} rowUser={rowUser} index={index} users={users} setUsers={setUsers} modifyUser={modifyUser} user={user}/>
                ))}
              </>  
            )}
          </div>
        </div>

        {/* Pagination */}
        {/* <div className="w-full min-h-[72px] bg-[#fafafa]">

        </div> */}
      </div>
    </div>
   );
}
 
export default withAuth(Users);
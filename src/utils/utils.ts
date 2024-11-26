'use client'


export const panelLinks = [
  {
    name:"Analytics",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#D3E3FDB3"><path d="M441-82Q287-97 184-211T81-480q0-155 103-269t257-129v120q-104 14-172 93t-68 185q0 106 68 185t172 93v120Zm80 0v-120q94-12 159-78t79-160h120q-14 143-114.5 243.5T521-82Zm238-438q-14-94-79-160t-159-78v-120q143 14 243.5 114.5T879-520H759Z"/></svg>`,
    href:""
  },
  {
    name:"Courses",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#D3E3FDB3"><path d="M300-80q-58 0-99-41t-41-99v-520q0-58 41-99t99-41h500v600q-25 0-42.5 17.5T740-220q0 25 17.5 42.5T800-160v80H300Zm-60-267q14-7 29-10t31-3h20v-440h-20q-25 0-42.5 17.5T240-740v393Zm160-13h320v-440H400v440Zm-160 13v-453 453Zm60 187h373q-6-14-9.5-28.5T660-220q0-16 3-31t10-29H300q-26 0-43 17.5T240-220q0 26 17 43t43 17Z"/></svg>`,
    href:"courses"
  },
  {
    name:"Users",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D3E3FDB3"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>`,
    href:"users"
  },
  {
    name:"Staff",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D3E3FDB3"><path d="M680-280q25 0 42.5-17.5T740-340q0-25-17.5-42.5T680-400q-25 0-42.5 17.5T620-340q0 25 17.5 42.5T680-280Zm0 120q31 0 57-14.5t42-38.5q-22-13-47-20t-52-7q-27 0-52 7t-47 20q16 24 42 38.5t57 14.5ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v227q-19-8-39-14.5t-41-9.5v-147l-240-90-240 90v188q0 47 12.5 94t35 89.5Q310-290 342-254t71 60q11 32 29 61t41 52q-1 0-1.5.5t-1.5.5Zm200 0q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80ZM480-494Z"/></svg>`,
    href:"admins"
  },
];


export const dummyTopics = [
  {
    name: "Mental Health"
  },
  {
    name: "Wellbeing"
  },
  {
    name: "Stress Management"
  },
  {
    name: "Mindfulness"
  },
  {
    name: "Work-Life Balance"
  }
];


export const coursesTableHead = [
  {
    head:"Name"
  },
  {
    head:"Author"
  },
  {
    head:"Created"
  },
  {
    head:"Topics"
  },
  {
    head:"UID"
  },
];

export const usersTableHead = [
  {
    head:"Name"
  },
  {
    head:"Company"
  },
  {
    head:"Department"
  },
  {
    head:"Email"
  },
  {
    head:"UID"
  },
];

export const adminsTableHead = [
  {
    head:"Name"
  },
  {
    head:"Email"
  },
  {
    head:"Created"
  },
  {
    head:"Department"
  },
  {
    head:"UID"
  },
];


export const formattedDate = (date: string) => {

  const parsedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return parsedDate;
};


export const truncateString = (str: string, maxLength: number) => {
  let fallback = "Not Assigned";

  if(!str || !str.length || str === "null"){
    return fallback;
  }
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
};


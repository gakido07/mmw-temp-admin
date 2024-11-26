import axios from "axios";
import { NextResponse } from "next/server";

const BACK_URL = process.env.BACK_URL!;

export async function DELETE(request: Request){

  const { courseId, accessToken } = await request.json();

  const headers = {
    "Content-Type":"application/json",
    "Authorization": `Bearer ${accessToken}`
  };

  try{
    const response = await axios.delete(`${BACK_URL}courses/${courseId}`, { headers });

    return NextResponse.json({success: true, response: response.data});
  }catch(error){
    console.log(error);
    return NextResponse.json({success: false, error: error});
  }

};
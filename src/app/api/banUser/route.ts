import axios from "axios";
import { NextResponse } from "next/server";

const BACK_URL = process.env.BACK_URL!;

export async function PATCH(request: Request){

  const { userId, accessToken } = await request.json();


  const headers = {
    "Authorization":`Bearer ${accessToken}`
  };

  try{

    const response = await axios.patch(`${BACK_URL}users/${userId}/account-lock`, {}, { headers });


    return NextResponse.json({success: true, response: response.data});

  }catch(error){
    console.log(error);
    return NextResponse.json({success: false, error: error});
  }
}
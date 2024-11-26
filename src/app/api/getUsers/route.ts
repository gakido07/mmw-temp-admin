import axios from "axios";
import { NextResponse } from "next/server";

const BACK_URL = process.env.BACK_URL!;

export async function POST(request: Request){

  const { accessToken } = await request.json();

  const headers = {
    "Authorization": `Bearer ${accessToken}`
  }

  try{

    const response = await axios.get(`${BACK_URL}users`, { headers });

    return NextResponse.json({success: true, response: response.data});

  }catch(error){
    console.log(error);

    return NextResponse.json({success: false, error: error});
  }
}
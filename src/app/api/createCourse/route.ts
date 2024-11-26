import axios from "axios";
import { NextResponse } from "next/server";

const BACK_URL = process.env.BACK_URL!;

export async function POST(request: Request){

  const { accessToken, data} = await request.json();

  const body = data;
  console.log(data);
  
  const headers = {
    'Content-Type':'application/json',
    'Authorization': `Bearer ${accessToken}`
  };
  
  try{

    const response = await axios.post(`${BACK_URL}courses`, body, { headers });

    return NextResponse.json({success: true, response: response.data});

  }catch(error:any){
    console.log(error);
    return NextResponse.json({success: false, error: error}, {status: 500});
  }
};
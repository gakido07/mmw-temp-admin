import axios from "axios";
import { NextResponse } from "next/server";

const BACK_URL = process.env.BACK_URL!;

export async function GET(){

  try{
    const response = await axios(`${BACK_URL}courses`);

    return NextResponse.json({success: true, response: response.data.data});

  }catch(error){
    console.log(error);
    return NextResponse.json({success: false, error: error});
  }
};
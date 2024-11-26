import axios from 'axios';
import { NextResponse } from 'next/server';

const BACK_URL = process.env.BACK_URL!;

export async function POST(request: Request){
  const { email, password } = await request.json();

  const body = {
    email,
    password
  };

  const headers = {
    'Content-Type': 'application/json'
  };

  try{
    const response = await axios.post(`${BACK_URL}auth/admin-password-login`, body, { headers });

    return NextResponse.json({success: true, response: response.data});

  }catch(error){
    // console.log(error);
    return NextResponse.json({success: false, error: error});
  };
}
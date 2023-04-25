import axios from "axios";
import Signup  from "./Signup";
import React, { useEffect } from 'react';


export default function Home() {

  

  return(
    <div className="w-full flex justify-center items-center">
      <Signup />
    </div>
  );
}
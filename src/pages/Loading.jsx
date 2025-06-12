import React from "react";
// import { Waveform } from "ldrs/react";
// import "ldrs/react/Waveform.css";
const Loading = () => {
  return (
    // <div className="flex justify-center items-center min-h-screen bg-[#f5e8ff]">
    //   <Waveform size="35" stroke="3.5" speed="1" color="black" />
    // </div>
    <div className="flex justify-center items-center h-screen bg-[#082026]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#90CE48]"></div>
    </div>
  );
};

export default Loading;

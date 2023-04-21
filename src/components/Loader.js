import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ThreeCircles
        height="100"
        width="100"
        color="#00ff84"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}

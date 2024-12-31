import React from "react";

const FancyTailwindLoader = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="absolute w-16 h-16 border-4 border-dashed border-yellow-400 rounded-full animate-spin"></div>
      <div className="absolute w-12 h-12 border-4 border-dashed border-pink-500 rounded-full animate-spin-slow"></div>
    </div>

  );
};

export default FancyTailwindLoader;

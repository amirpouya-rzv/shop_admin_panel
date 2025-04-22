import React from "react";

const Card = ({ currentValue, title, desc, icon, lastWeekValue, lastMonthValue }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 p-2">
      <div className=" bg-teal-600 text-white rounded-lg shadow-md p-4 hover:transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-xl font-bold">{currentValue}</h4>
            <h6 className="text-lg truncate">{title}</h6>
            <small className="text-sm truncate">{desc}</small>
          </div>
          <div className="flex justify-center items-center text-3xl">
            {icon}
          </div>
        </div>
      </div>
      <div className="bg-rose-600 text-white rounded-lg shadow-md mt-2 p-3 flex flex-col hover:transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <small className="truncate">
          <b>{lastWeekValue}</b> در هفته گذشته
        </small>
        <small className="truncate">
          <b>{lastMonthValue}</b> در ماه گذشته
        </small>
      </div>
    </div>
  );
};

export default Card;

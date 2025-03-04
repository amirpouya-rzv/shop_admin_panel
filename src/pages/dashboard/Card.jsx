import React from "react";

const Card = ({ currentValue, title, desc, icon, lastWeekValue, lastMonthValue }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 p-2">
      <div className="bg-blue-500 text-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-xl font-bold">{currentValue}</h4>
            <h6 className="text-lg truncate">{title}</h6>
            <small className="text-sm truncate">{desc}</small>
          </div>
          <div className="flex justify-center items-center text-3xl">
            <i className={`${icon}`}></i>
          </div>
        </div>
      </div>
      <div className="bg-blue-500 text-white rounded-lg shadow-md mt-2 p-3 flex flex-col">
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

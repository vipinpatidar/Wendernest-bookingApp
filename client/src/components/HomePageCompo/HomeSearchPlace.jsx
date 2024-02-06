import React from "react";
//headless ui
import { Menu } from "@headlessui/react";

const lists = ["ALL PLACES", 8000, 20000, 60000, 100000, 400000, 800000];

const HomeSearchPlace = ({
  searchValue,
  setSearchValue,
  priceValue,
  setPriceValue,
}) => {
  return (
    <div className=" flex flex-col gap-6 md:flex-row items-center justify-between mb-10 px-4">
      <div className="flex items-center bg-white gap-0 rounded-full pl-4 pr-6  shadow-md border-2 border-gray-100">
        <label htmlFor="search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </label>
        <input
          className="px-3 py-[10px] border-none outline-none w-[280px]"
          type="text"
          name="search"
          id="search"
          placeholder="Search a location..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div>
        <Menu as="div" className="w-full h-full bg-white relative">
          {/* btn */}
          <Menu.Button className=" h-full flex items-center justify-between w-[180px] border-2 px-6 text-[1.05rem] text-gray-600 font-[500] rounded-full border-gray-100 shadow-md py-[10px] ">
            <span>{priceValue}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Menu.Button>
          {/* list items */}
          <Menu.Items
            as="ul"
            className="bg-white absolute w-full flex flex-col rounded-3xl z-40"
          >
            {lists.map((price, index) => (
              <Menu.Item
                onClick={() => setPriceValue(price)}
                as="li"
                key={index}
                className="h-12 hover:bg-gray-500 hover:text-white w-full flex justify-center items-center cursor-pointer rounded-3xl "
              >
                {price}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};

export default HomeSearchPlace;

import React, { useEffect, useState } from "react";
//swiper react
import { Swiper, SwiperSlide } from "swiper/react";
//swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// required modules
import { Navigation, Pagination } from "swiper/modules";
import "./HomePage.css";
import { Link } from "react-router-dom";
import HomeSearchPlace from "../components/HomePageCompo/HomeSearchPlace";
import OpenOnTop from "../components/OpenOnTop/OpenOnTop";

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [priceValue, setPriceValue] = useState("Max Price");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getHomePlaces() {
      try {
        const url = `${
          import.meta.env.VITE_SERVER_URL
        }/home/places?maxPrice=${priceValue}`;

        setIsLoading(true);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await response.json();
        // console.log(data);
        let newArr;
        if (data?.places) {
          newArr = [...data.places];
        }

        setPlaces(newArr);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getHomePlaces();
  }, [priceValue]);

  const matches = places.filter((place) => {
    return place.address.toLowerCase().includes(searchValue.toLowerCase());
  });

  // console.log(matches);

  const randomRating = (max, min) => {
    return (Math.random() * (max - min) + min).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="mt-36 min-h-[500px] ">
        <h1 className="text-center text-2xl ">Loading...</h1>;
      </div>
    );
  }

  return (
    <div className=" max-w-[1400px] mt-24 p-5 pb-24 mx-auto">
      <OpenOnTop />
      <HomeSearchPlace
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        priceValue={priceValue}
        setPriceValue={setPriceValue}
      />
      {matches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 content-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {matches?.map((place) => {
            return (
              <Link
                to={`/home/places/${place._id}`}
                className="placeCard"
                key={place._id}
              >
                <div className="detailSlider">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={true}
                    pagination={{
                      dynamicMainBullets: true,
                    }}
                    className="detailSlider_swiper"
                  >
                    {place.photos.map((img, idx) => (
                      <SwiperSlide key={idx} className="detailImg_slider">
                        <img
                          src={`${import.meta.env.VITE_SERVER_URL}${img}`}
                          alt="house all Images"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="mt-2 px-1">
                  <div className="text-black/80 font-semibold mb-1 text-[1.05rem] flex items-center justify-between">
                    <h2 className="truncate tracking-tight">{place.address}</h2>
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#444"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span> {randomRating(4.8, 3.8)}</span>
                    </div>
                  </div>
                  <h1 className="text-gray-500 truncate tracking-tight mb-1 text-[0.95rem]">
                    {place.title}
                  </h1>
                  <div className="flex items-center mb-1 text-[0.95rem] gap-2 text-gray-500">
                    <p>{place.checkIn} AM</p>-<p>{place.checkOut} PM</p>
                  </div>
                  <p className="text-black/90 font-semibold mb-1 text-[1rem]">
                    ₹{place.price}{" "}
                    <span className="text-gray-600 font-normal">night</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div>
          <h1 className="text-center text-2xl w-max mx-auto bg-red-100 px-4 py-2 mt-16">
            No Place Available! Please search for other options
          </h1>
        </div>
      )}
    </div>
  );
};

export default HomePage;

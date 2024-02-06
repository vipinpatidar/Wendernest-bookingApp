import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminPlaceView = ({ editPlaceHandler }) => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getPlaces() {
    try {
      const token = localStorage.getItem("token");
      const expiryDate = localStorage.getItem("expiryDate");
      if (!token || !expiryDate) {
        return;
      }
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/places`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });

      const data = await response.json();

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

  useEffect(() => {
    getPlaces();
  }, []);

  const deletePlaceHandler = async (placeId) => {
    try {
      const token = localStorage.getItem("token");
      const expiryDate = localStorage.getItem("expiryDate");
      if (!token || !expiryDate) {
        return;
      }

      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/places/delete/${placeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      getPlaces();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log(places);

  if (isLoading) {
    return (
      <div className="mt-24 min-h-[380px] ">
        <h1 className="text-center text-2xl ">Loading...</h1>;
      </div>
    );
  }

  return (
    <div className="mt-14 py-2">
      {places.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
          {places?.map((place) => (
            <div
              key={place._id}
              className="bg-gray-100 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl text-white md:relative md:flex md:items-center"
            >
              <Link
                to={`/admin/places/${place._id}`}
                className="flex flex-col md:flex-row items-center"
              >
                <div className="w-full">
                  <img
                    className="w-full block h-[200px] rounded-t-xl  md:rounded-tr-none md:rounded-l-xl "
                    src={`${import.meta.env.VITE_SERVER_URL}${place?.photos[0]}`}
                    alt="place image"
                  />
                </div>
                <div className="px-3 pt-3 md:pr-1 md:pb-2 md:border-r pb-1 border-b md:border-b-0">
                  <h2 className="text-[1.40rem] leading-7 mb-2 text-black font-semibold">
                    {place?.title.length > 49
                      ? `${place.title.slice(0, 49)}...`
                      : place.title}
                  </h2>
                  <p className="text-sm mb-3 text-gray-500">{place?.address}</p>
                  <p className="text-base leading-5 mb-2 text-gray-700">
                    {place?.description.length > 200
                      ? place.description.slice(0, 200)
                      : place.description}
                    ...
                    <span className="underline cursor-pointer ">Read more</span>
                  </p>
                </div>
              </Link>
              <div className="flex h-12 px-6 py-3 w-full items-center justify-between text-black md:flex-col md:h-full md:w-12">
                <button
                  onClick={() => editPlaceHandler(place._id)}
                  className="text-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => deletePlaceHandler(place._id)}
                  className="text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl ">
          Please Add A New Place In Your Accommodations
        </div>
      )}
    </div>
  );
};

export default AdminPlaceView;

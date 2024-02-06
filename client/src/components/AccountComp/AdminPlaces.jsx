import React, { useState } from "react";
import AddPlacesForm from "../FormAdminPlaces/AddPlacesForm";
import AdminPlaceView from "../ViewPlaceAdmin/AdminPlaceView";

const AdminPlaces = () => {
  const [isForm, setIsForm] = useState(false);
  const [editPlaceData, setEditPlaceData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const clickHandler = () => {
    setIsForm((prevState) => !prevState);
    setIsEditing(false);
  };

  const editPlaceHandler = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const expiryDate = localStorage.getItem("expiryDate");

      if (!token || !expiryDate) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/admin/places/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        }
      );

      const data = await response.json();
      // console.log(data);
      setEditPlaceData(data.place);
      setIsForm(true);
      setIsEditing(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mt-16 px-2 mx-auto">
      <div className="flex items-center max-w-[600px] mx-auto justify-between bg-gray-800 rounded-full py-2 px-8">
        <p className="text-white">
          {isForm ? "Remove Add Place Form" : "Add New Places"}
        </p>
        <button
          onClick={clickHandler}
          className="bg-hero p-1 rounded-full text-white"
        >
          {isForm ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          )}
        </button>
      </div>

      {isForm && (
        <div className="bg-gray-100 max-w-[700px] mx-auto p-3 md:p-6 mt-8 rounded-2xl">
          <AddPlacesForm
            setIsForm={setIsForm}
            editPlaceData={editPlaceData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      )}
      {!isForm && (
        <div className="mt-8 p-4 max-w-[900px] mx-auto rounded-2xl">
          <h1 className="text-center text-2xl md:text-3xl  uppercase tracking-wide">
            List Of Your Places
          </h1>
          <AdminPlaceView editPlaceHandler={editPlaceHandler} />
        </div>
      )}
    </div>
  );
};

export default AdminPlaces;

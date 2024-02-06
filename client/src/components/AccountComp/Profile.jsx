import React from "react";

const Profile = ({ user, logoutHandler }) => {
  return (
    <div className="mt-16">
      <h1 className="text-center text-2xl md:text-3xl  mb-12 uppercase tracking-wide">
        Your Profile
      </h1>
      <div className="bg-gray-200 p-6 pb-4 mx-auto w-min rounded">
        <div className="flex items-center gap-8 mb-3">
          <p className="text-[17px] font-[600] text-gray-700">Name: </p>
          <p className="text-[16px]">{user?.name}</p>
        </div>
        <div className="flex items-center gap-8 mb-3">
          <p className="text-[17px] font-[600] text-gray-700">Email: </p>
          <p className="text-[16px]">{user?.email}</p>
        </div>
        <div>
          <button onClick={logoutHandler} className="formBtn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

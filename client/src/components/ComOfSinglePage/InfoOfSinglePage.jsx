import React from "react";

const InfoOfSinglePage = ({ place }) => {
  //No. of Bedrooms or bathrooms or beds
  const service = Math.ceil(place?.maxGuests / 2);

  return (
    <div className="pr-6">
      <div className="pt-2 pb-6 border-b border-gray-200">
        <h2 className="text-[1.48rem] font-semibold">
          {" "}
          This place hosted by {place?.owner?.name}
        </h2>
        <div className="flex items-center flex-wrap gap-1 text-[1.06rem] text-gray-600">
          <p>{place.maxGuests} guests.</p>
          <p>
            {service} bedrooms. {service} beds. {service} bathrooms
          </p>
        </div>
      </div>
      {/* ============ */}
      <div className="py-6 flex flex-col gap-4 border-b border-gray-200">
        <div className="flex gap-8 items-center">
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
              d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
            />
          </svg>

          <div>
            <h2 className="text-[1.18rem] font-[500]">Dedicated workspace</h2>
            <p className="text-base text-gray-500">
              A room with wifi that's well suited for working
            </p>
          </div>
        </div>
        <div className="flex gap-8 items-center">
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
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>

          <div>
            <h2 className="text-[1.18rem] font-[500]">Great Location</h2>
            <p className="text-base text-gray-500">
              90% of recent guests gave the location good start rating
            </p>
          </div>
        </div>
        <div className="flex gap-8 items-center">
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>

          <div>
            <h2 className="text-[1.18rem] font-[500]">Free cancellation </h2>
            <p className="text-base text-gray-500">
              Guests can cancel booking before 7 days
            </p>
          </div>
        </div>
      </div>
      {/* ================= */}
      <div className="py-6 border-b border-gray-200">
        <div>
          <h2 className="text-[1.45rem] font-[500] mb-3">Place description</h2>
          <p className="text-gray-600">{place.description}</p>
        </div>
      </div>
      {/* ======================== */}
      <div className="py-6 border-b border-gray-200 ">
        <h2 className="text-[1.45rem] font-[500] mb-4">
          What this place offers
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {place?.perks?.map((perk) => (
            <p key={perk}>{perk}</p>
          ))}
        </div>
      </div>
      {/* =========== */}
      <div className="py-6 flex flex-col gap-4 border-b border-gray-200">
        <div className="flex gap-8 items-center">
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
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>

          <div>
            <h2 className="text-[1.18rem] font-[500]">Check In Time</h2>
            <p className="text-base text-gray-500">
              Guests can check in at {place.checkIn} AM
            </p>
          </div>
        </div>
        <div className="flex gap-8 items-center">
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
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>

          <div>
            <h2 className="text-[1.18rem] font-[500]">Check Out Time</h2>
            <p className="text-base text-gray-500">
              Guests can check out at {place.checkOut} PM
            </p>
          </div>
        </div>
        <div className="flex gap-8 items-center">
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
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>

          <div>
            <h2 className="text-[1.18rem] font-[500]">
              Maximum guests allowed
            </h2>
            <p className="text-base text-gray-500">
              Only {place?.maxGuests} guests allowed on this place
            </p>
          </div>
        </div>
      </div>
      {/* ================= */}
      <div className="py-6 border-b border-gray-200">
        <div>
          <h2 className="text-[1.45rem] font-[500] mb-3">Some extra info</h2>
          <p className="text-gray-600">{place.extraInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoOfSinglePage;

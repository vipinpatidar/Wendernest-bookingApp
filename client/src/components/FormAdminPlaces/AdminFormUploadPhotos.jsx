import React from "react";

const AdminPlacePhotos = ({
  placeData,
  inputChangeHandler,
  addedPhotos,
  error,
  setPlaceData,
  setError,
  setAddedPhotos,
}) => {
  /*==================== Add Photos with links ============================ */

  const addPhotosByLink = async () => {
    try {
      const token = localStorage.getItem("token");
      const expiryDate = localStorage.getItem("expiryDate");
      if (!token || !expiryDate) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/upload-by-link`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "content-type": "application/json",
          },
          body: JSON.stringify({ url: placeData.photoLink }),
        }
      );

      const { filePath } = await response.json();

      setAddedPhotos((prevState) => [...prevState, filePath]);

      setPlaceData((prevState) => ({ ...prevState, photoLink: "" }));
      setError(null);
    } catch (error) {
      console.log(error);
    }
  };

  /*==================== Upload photo with file ============================ */

  const uploadPhotoHandler = async (e) => {
    try {
      const { files } = e.target;
      const token = localStorage.getItem("token");
      const expiryDate = localStorage.getItem("expiryDate");
      if (!token || !expiryDate) {
        return;
      }
      const formData = new FormData();

      // console.log(files[0]);

      for (let i = 0; i < files.length; i++) {
        formData.append("uploadImg", files[i]);
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/upload-by-file`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        }
      );

      const data = await response.json();
      // console.log(data);

      if (data.error) {
        setError(data.error);
        return;
      } else {
        setAddedPhotos((prevState) => [...prevState, ...data?.filePath]);
        setError(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // console.log(addedPhotos);

  const removePhoto = (imgLink) => {
    const newPhotos = [...addedPhotos].filter((photo) => photo !== imgLink);
    setAddedPhotos(newPhotos);
  };

  const selectAsMainPhoto = (imgLink) => {
    const filtered = [...addedPhotos].filter((photo) => photo !== imgLink);
    const newPhotosArr = [imgLink, ...filtered];
    setAddedPhotos(newPhotosArr);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 pl-1">
        <input
          type="text"
          name="photoLink"
          id="imageUrl"
          placeholder="Add Place Image URL..."
          className="formInput"
          value={placeData?.photoLink}
          onChange={inputChangeHandler}
        />
        <button
          onClick={addPhotosByLink}
          type="button"
          className="px-4 py-2 cursor-pointer bg-gray-800 text-[14px] text-white"
        >
          ADD
        </button>
      </div>
      <div className="flex items-center gap-8 pl-4 mt-1">
        <p className="text-sm text-gray-700">
          Upload From Device (Only .jpg, .png, .jpeg allowed)
        </p>
        <label
          htmlFor="uploadImg"
          className="bg-gray-800 cursor-pointer flex text-[14px] items-center gap-2 px-3 py-2 text-white"
        >
          {" "}
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
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          UPLOAD
        </label>
        <input
          type="file"
          onChange={uploadPhotoHandler}
          hidden
          name="uploadImg"
          id="uploadImg"
          multiple
        />
      </div>
      {error && (
        <p className="bg-red-500 my-3 mx-auto px-3 py-1 text-white w-max">
          {error.message}
        </p>
      )}
      <div className="grid grid-cols-3 gap-2 pl-4 md:grid-cols-4 lg:grid-cols-5 mt-3">
        {addedPhotos?.length > 0 &&
          addedPhotos?.map((imgUrl) => {
            {
              /* console.log(imgUrl); */
            }
            return (
              <div key={imgUrl} className="relative ">
                <img
                  className="aspect-square object-cover rounded-2xl "
                  src={`${import.meta.env.VITE_SERVER_URL}${imgUrl}`}
                  alt="upload image"
                />
                <div className="absolute bottom-0 right-0 w-full  rounded-b-2xl pr-4 pb-2 bg-gradient-to-b from-transparent to-black/70 h-20">
                  <button
                    onClick={() => removePhoto(imgUrl)}
                    type="button"
                    className="text-white absolute bottom-3 right-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
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

                  <button
                    onClick={() => selectAsMainPhoto(imgUrl)}
                    type="button"
                    className="text-white absolute bottom-3 left-3"
                  >
                    {addedPhotos[0] === imgUrl ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="hotpink"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
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
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminPlacePhotos;

import React, { useEffect, useState } from "react";
import PlacePerks from "./PlacePerks";
import AdminPlacePhotos from "./AdminFormUploadPhotos";

const AddPlacesForm = ({
  setIsForm,
  isEditing,
  setIsEditing,
  editPlaceData,
}) => {
  const [placeData, setPlaceData] = useState({
    title: "",
    address: "",
    description: "",
    extraInfo: "",
    photoLink: "",
    checkIn: "00:00",
    checkOut: "00:00",
    maxGuests: 1,
    price: "",
  });

  const [error, setError] = useState(null);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);

  /*==================== Check if we are editing ============================ */

  useEffect(() => {
    if (isEditing) {
      // console.log(editPlaceData);
      setPlaceData({
        title: editPlaceData.title,
        address: editPlaceData.address,
        description: editPlaceData.description,
        extraInfo: editPlaceData.extraInfo,
        checkIn: editPlaceData.checkIn,
        checkOut: editPlaceData.checkOut,
        maxGuests: editPlaceData.maxGuests,
        photoLink: "",
        price: editPlaceData.price,
      });
      setAddedPhotos(editPlaceData.photos);
      setPerks(editPlaceData.perks);
    }
  }, [isEditing]);

  /*==================== Input change Handler ============================ */

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setPlaceData((prevState) => ({ ...prevState, [name]: value }));
  };
  /*==================== Checkbox handler Fun ============================ */
  const checkboxChangeHandler = (e) => {
    const { value } = e.target;
    const newPerks = [...perks];

    if (newPerks.includes(value)) {
      newPerks.splice(newPerks.indexOf(value), 1);
    } else {
      newPerks.push(value);
    }

    setPerks(newPerks);
  };

  /*==================== Submit Handler ============================ */

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const expiryDate = localStorage.getItem("expiryDate");
      if (!token || !expiryDate) {
        return;
      }

      if (addedPhotos.length > 0) {
        // console.log("place");
        const data = {
          title: placeData.title,
          address: placeData.address,
          description: placeData.description,
          extraInfo: placeData.extraInfo,
          checkIn: placeData.checkIn,
          checkOut: placeData.checkOut,
          maxGuests: +placeData.maxGuests,
          price: +placeData.price,
          perks: perks,
          photos: addedPhotos,
        };

        let method;
        let url;

        if (isEditing) {
          method = "PUT";
          url = `${import.meta.env.VITE_SERVER_URL}/places/edit/${
            editPlaceData._id
          }`;
        } else {
          method = "POST";
          url = `${import.meta.env.VITE_SERVER_URL}/places`;
        }

        const response = await fetch(url, {
          method: method,
          headers: {
            Authorization: "Bearer " + token,
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const resData = await response.json();

        if (resData.error) {
          return alert(resData.error.message);
        }

        setPlaceData({
          title: "",
          address: "",
          description: "",
          extraInfo: "",
          photoLink: "",
          checkIn: "00:00",
          checkOut: "00:00",
          maxGuests: 1,
          price: "",
        });
        setPerks([]);

        setIsForm(false);
        setIsEditing(false);
        setError(null);
      } else {
        setError({ message: "Please add or Upload Photo before Submit form" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="">
      <label className="pl-3 block text-base" htmlFor="title">
        PLACE TITLE
      </label>
      <input
        type="Title"
        name="title"
        id="title"
        placeholder="Place title..."
        className="formInput"
        value={placeData.title}
        required
        onChange={inputChangeHandler}
      />
      {/* =============================================== */}

      <label className="pl-3 mt-2 block text-base uppercase" htmlFor="title">
        PLACE Address
      </label>
      <input
        type="address"
        name="address"
        id="address"
        placeholder="Place Address..."
        className="formInput"
        value={placeData.address}
        required
        onChange={inputChangeHandler}
      />
      {/* =============================================== */}

      <label className="pl-3 mt-2 block text-base uppercase" htmlFor="imageUrl">
        Place photos
      </label>
      <AdminPlacePhotos
        inputChangeHandler={inputChangeHandler}
        addedPhotos={addedPhotos}
        setAddedPhotos={setAddedPhotos}
        placeData={placeData}
        setPlaceData={setPlaceData}
        error={error}
        setError={setError}
      />
      {/* =============================================== */}

      <label className="pl-3 mt-4 block text-base uppercase" htmlFor="title">
        PLACE Description
      </label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="4"
        className="formInput"
        value={placeData.description}
        onChange={inputChangeHandler}
        required
      ></textarea>
      {/* =============================================== */}

      <label className="pl-3 mt-2 block text-base uppercase" htmlFor="title">
        PLACE Perks
      </label>
      <PlacePerks onChange={checkboxChangeHandler} perksArr={perks} />
      {/* =============================================== */}
      <div className="grid grid-cols-1 mt-4 md:grid-cols-2 md:gap-1 items-center md:gap-x-4">
        <label className="mt-4 block text-base uppercase" htmlFor="price">
          <p className="pl-3">PRICE PER NIGHT</p>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Place Price Per Night..."
            className="formInput"
            value={placeData.price}
            required
            onChange={inputChangeHandler}
          />
        </label>
        {/* =============================================== */}

        <label className="mt-3 block text-base uppercase" htmlFor="checkIn">
          <p className="pl-3">PLACE check-In time </p>
          <input
            type="time"
            name="checkIn"
            id="checkIn"
            placeholder="Place CheckIn Time..."
            className="formInput"
            value={placeData.checkIn}
            required
            onChange={inputChangeHandler}
          />
        </label>
        {/* =============================================== */}
        {/* =============================================== */}

        <label className="mt-2 block text-base uppercase" htmlFor="checkOut">
          <p className="pl-3">PLACE check-Out time</p>
          <input
            type="time"
            name="checkOut"
            id="checkOut"
            placeholder="Place CheckOut Time..."
            className="formInput"
            value={placeData.checkOut}
            required
            onChange={inputChangeHandler}
          />
        </label>
        {/* =============================================== */}
        {/* =============================================== */}

        <label className=" mt-2 block text-base uppercase" htmlFor="title">
          <p className="pl-3">Maximum Number of Guests</p>
          <input
            type="number"
            name="maxGuests"
            id="maxGuests"
            placeholder="Maximum Number of Guests..."
            min={"1"}
            className="formInput"
            value={placeData.maxGuests}
            required
            onChange={inputChangeHandler}
          />
        </label>
      </div>
      {/* =============================================== */}

      {/* =============================================== */}
      <label className="pl-3 mt-4 block text-base uppercase" htmlFor="title">
        EXTRA INFO
      </label>
      <textarea
        name="extraInfo"
        id="extraInfo"
        cols="30"
        rows="4"
        className="formInput"
        value={placeData.extraInfo}
        required
        onChange={inputChangeHandler}
      ></textarea>
      {/* =============================================== */}

      <button className="formBtn" type="submit">
        {isEditing ? "EDIT PLACE" : "ADD PLACE"}
      </button>
    </form>
  );
};

export default AddPlacesForm;

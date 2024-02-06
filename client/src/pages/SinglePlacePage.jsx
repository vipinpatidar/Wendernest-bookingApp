import { useState } from "react";
import HeaderOfSinglePage from "../components/ComOfSinglePage/HeaderOfSinglePage";
import ImagesGrid from "../components/ComOfSinglePage/ImagesGrid";
import ModelOfImages from "../components/ComOfSinglePage/ModelOfImages";
import InfoOfSinglePage from "../components/ComOfSinglePage/InfoOfSinglePage";
import BookingCard from "../components/ComOfSinglePage/BookingCard";
import OpenOnTop from "../components/OpenOnTop/OpenOnTop";

const SinglePlacePage = ({ place, isAuthenticated, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openCloseModel = () => {
    setIsOpen((preState) => !preState);
  };

  const randomRating = (max, min) => {
    return (Math.random() * (max - min) + min).toFixed(1);
  };

  const rating = randomRating(4.8, 3.8);

  // console.log(place, isAuthenticated);

  if (isLoading) {
    <h className="text-3xl mt-24 text-center">Loading...</h>;
  }

  if (isOpen) {
    return (
      <ModelOfImages
        openCloseModel={openCloseModel}
        title={place.title}
        photos={place?.photos}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 px-2 relative pb-6">
      {/* {isOpen && (
        <ModelOfImages
          openCloseModel={openCloseModel}
          title={place.title}
          photos={place?.photos}
        />
      )} */}
      <OpenOnTop />
      <HeaderOfSinglePage
        title={place.title}
        address={place.address}
        rating={rating}
      />
      <ImagesGrid photos={place?.photos} openCloseModel={openCloseModel} />
      <div className="grid grid-cols-1 md:grid-cols-[2.6fr_1.4fr]">
        <InfoOfSinglePage place={place} />
        {/* =============== */}
        <BookingCard place={place} rating={rating} />
      </div>
    </div>
  );
};

export default SinglePlacePage;

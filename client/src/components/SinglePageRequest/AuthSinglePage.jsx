import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SinglePlacePage from "../../pages/SinglePlacePage";

const AuthSinglePage = () => {
  const [place, setPlace] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { placeId } = useParams();

  useEffect(() => {
    async function getSinglePlace() {
      try {
        const token = localStorage.getItem("token");
        const expiryDate = localStorage.getItem("expiryDate");
        if (!token || !expiryDate) {
          return;
        }

        setIsLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/admin/places/${placeId}`,
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
        setIsLoading(false);
        setPlace(data.place);
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.log(error);
      }
    }

    getSinglePlace();
  }, [placeId]);

  // console.log(place);
  //   console.log(isAuthenticated);

  return (
    <div className="max-w-[1260px] mx-auto mt-24 px-4">
      <SinglePlacePage
        place={place}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AuthSinglePage;

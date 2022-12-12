import React, { useEffect, useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import apiGet from "../misc/config";
import { useShows } from "../misc/custom-hook";

const Starred = () => {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map((showId) => apiGet(`shows/${showId}`));
      Promise.all(promises)
        .then((apiData) => apiData.map((show) => ({ show })))
        .then((result) => {
          setShows(result);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>Shows are still Loading</div>}
      {error && <div>Error has occures {error}</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;

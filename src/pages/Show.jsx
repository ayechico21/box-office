import React, { useReducer, useEffect } from "react";
import { useParams } from "react-router";
import Cast from "../components/show/Cast";
import Details from "../components/show/Details";
import Seasons from "../components/show/Seasons";
import ShowMainData from "../components/show/showMainData";
import apiGet from "../misc/config";
import { InfoBlock, ShowPageWrapper } from "./Show.styled";

const intialState = {
  show: null,
  isLoading: true,
  error: null,
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { isLoading: false, error: null, show: action.show };
    }
    case "FETCH_FAILED": {
      return { ...prevState, isLoading: false, error: action.error };
    }

    default:
      return prevState;
  }
};

const Show = () => {
  const { id } = useParams();

  /* const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); */

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    intialState
  );

  useEffect(() => {
    let isMounted = true;

    apiGet(`shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((res) => {
        if (isMounted) {
          dispatch({ type: "FETCH_SUCCESS", show: res });
        }
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({ type: "FETCH_FAILED", error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  console.log(show);

  if (isLoading) {
    return <InfoBlock>Data is Loading</InfoBlock>;
  }
  if (error) {
    return <InfoBlock>Error occured</InfoBlock>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>
      <InfoBlock>
        <h2>Season</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};
export default Show;

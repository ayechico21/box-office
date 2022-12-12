import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import apiGet from "../misc/config";

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    apiGet(`shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((res) => {
        if (isMounted) {
          setShow(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  console.log(show);

  if (isLoading) {
    return <div>Data is Loading</div>;
  }
  if (error) {
    return <div>Error occured</div>;
  }

  return <div>this is show page</div>;
};
export default Show;

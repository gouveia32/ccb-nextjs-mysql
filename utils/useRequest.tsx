import axios, { Method } from "axios";
import { useEffect, useState } from "react";

const useRequest = ({
  method,
  url,
  body,
}: {
  method: Method;
  url: string;
  body?: object;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method,
      url,
      data: body,
    })
      .then((res) => {
        setIsLoading(false);
        setData(res.data);
      })
      .catch((err) => setError(error));
  }, []);

  return { isLoading, data, error };
};

export default useRequest;

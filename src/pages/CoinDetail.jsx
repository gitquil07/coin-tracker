import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchCoinInfo } from "../service/api";

const CoinDetail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { id: coin } = params;

  useEffect(() => {
    let ignore = false;
    const getCoinInfo = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const data = await fetchCoinInfo(coin?.toLowerCase());
        if (!ignore) setData(data);
      } catch (error) {
        if (!ignore) setError(error);
        console.error(error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    getCoinInfo();

    return () => {
      ignore = true;
    };
  }, [coin]);

  if (loading) {
    return <p className="text-start">Loading...</p>;
  }

  if (error) {
    return <p className="text-start">{error?.message}</p>;
  }

  return (
    <div className="flex-col text-start">
      <h1>{data?.name}</h1>
      <p>{data?.description?.en}</p>
      <ul>
        {data?.categories?.map((category) => (
          <li key={category}>
            <b>{category}</b>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinDetail;

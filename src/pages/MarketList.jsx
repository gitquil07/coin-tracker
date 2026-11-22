import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { fetchMarkets } from "../service/api";
import {
  marketListOnLoad,
  marketListOnError,
  marketListOnSuccess,
} from "../redux/marketSlice";

const getColumnNames = () => [
  "Name",
  "Symbol",
  "Low 24h",
  "High 24h",
  "Market cap",
  "Current price",
];

const TableHead = () => {
  const tableHeadData = getColumnNames().map((name) => (
    <th key={name}>{name}</th>
  ));
  return (
    <thead>
      <tr>{tableHeadData}</tr>
    </thead>
  );
};

const TableBody = ({ data }) => {
  const tableBodyData = data?.map(
    ({ current_price, market_cap, high_24h, low_24h, symbol, name }) => (
      <tr key={name} className="border relative">
        <td className="py-2">
          <Link
            className="after:absolute after:inset-0 after:content"
            to={`/coin/${name}`}
          >
            {name}
          </Link>
        </td>
        <td className="py-2">{symbol}</td>
        <td className="py-2">{low_24h}</td>
        <td className="py-2">{high_24h}</td>
        <td className="py-2">{market_cap}</td>
        <td className="py-2">{current_price}</td>
      </tr>
    ),
  );
  return <tbody>{tableBodyData}</tbody>;
};

const MarketList = () => {
  const { data, loading, error } = useSelector((state) => state.marketList);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMarkets = async () => {
      dispatch(marketListOnLoad());
      try {
        const data = await fetchMarkets();
        dispatch(marketListOnSuccess(data));
      } catch (error) {
        dispatch(marketListOnError(error));
        console.error(error);
      }
    };
    getMarkets();
  }, []);

  return (
    <>
      <h1>Market list page</h1>
      <div>
        {loading && "Loading..."}
        {error && `Error: ${error}`}
        {data && (
          <table className="border w-full mt-10">
            <TableHead />
            <TableBody data={data} />
          </table>
        )}
      </div>
    </>
  );
};

export default MarketList;

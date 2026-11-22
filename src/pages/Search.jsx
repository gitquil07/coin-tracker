import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router";
import SearchField from "../components/search-field/SearchField";
import { search } from "../service/api";
import {
  searchOnLoad,
  searchOnError,
  searchOnSuccess,
  searchCleared,
} from "../redux/searchSlice";

const getColumnNames = () => ["Name", "Symbol", "Api Symbol", "Market cap"];

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
    ({ market_cap_rank, api_symbol, symbol, name }) => (
      <tr key={name} className="border relative">
        <td className="py-2">
          <Link className="after:absolute after:inset-0" to={`/coin/${name}`}>
            {name}
          </Link>
        </td>
        <td className="py-2">{symbol}</td>
        <td className="py-2">{api_symbol}</td>
        <td className="py-2">{market_cap_rank}</td>
      </tr>
    ),
  );
  return <tbody>{tableBodyData}</tbody>;
};
const debounce = (fn, delay) => {
  let timerId;
  return [
    (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    () => {
      console.log(timerId);
      clearTimeout(timerId);
    },
  ];
};

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("term"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state?.searchResult);
  const { coins } = data || [];
  const skipErrorDisplay = error?.name === "AbortError";

  const [runSearch, clear] = useMemo(
    () =>
      debounce(async (term, options = {}) => {
        dispatch(searchOnLoad());
        try {
          const data = await search(term, options);
          dispatch(searchOnSuccess(data));
        } catch (error) {
          dispatch(searchOnError(error));
          console.error(error);
        }
      }, 1000),
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    if (term) {
      setSearchParams({ term }, { replace: true });
      runSearch(term, { signal: controller.signal });
    } else {
      setSearchParams({}, { replace: true });
      dispatch(searchCleared());
    }

    return () => {
      clear();
      controller.abort();
    };
  }, [term, navigate]);

  return (
    <>
      <h1>Search</h1>
      <SearchField defaultValue={term} onChange={setTerm} />
      <div>
        {loading && "Loading..."}
        {error && !skipErrorDisplay && `Error: ${error}`}
        {data && (
          <table className="border w-full mt-10">
            <TableHead />
            <TableBody data={coins} />
          </table>
        )}
      </div>
    </>
  );
};

export default Search;

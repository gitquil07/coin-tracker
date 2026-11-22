import { useState } from "react";

const SearchField = (props) => {
  const { onChange, defaultValue } = props;
  const [searchTerm, setSearchTerm] = useState(defaultValue ?? "");

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearchTerm(value);
    onChange(value);
  };

  return (
    <form>
      <input
        value={searchTerm}
        className="border py-2 px-4"
        type="text"
        placeholder="search"
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchField;

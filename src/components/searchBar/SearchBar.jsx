import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        {/* <input type="text" name="city" placeholder="Suburb" onChange={handleChange} /> */}
        {/* <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handleChange}
        /> */}
        <div className="item">
        <TextField
          label="Suburb"
          type="text"
          name="city"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={handleChange}
        />
        </div>
        <div className="item">
        <TextField
          label="Min Price"
          type="number"
          name="minPrice"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={handleChange}
        />
        </div>
        <div className="item">
        <TextField
          label="Max Price"
          type="number"
          name="maxPrice"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={handleChange}
        />
        </div>
        {/* <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
        /> */}
        <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
          <button>
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;

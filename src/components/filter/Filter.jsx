import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";
import { FormControl, TextField } from "@mui/material";
import { inputStyle } from "../../lib/muiStyle";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 1000000,
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value === "any" ? "" : e.target.value,
    })
  }

  const handleFilter = () => {
    setSearchParams(query);
  }

  return (
    <div className="filter">
      <h1>
        {searchParams.get("city") ?
          <>Search results for <b>{searchParams.get("city")}</b></> :
          <>All properties</>
        }
      </h1>

      <div className="top">

        <div className="item">
          <TextField
            label="Location"
            type="city"
            name="city"
            onChange={handleChange}
            placeholder="City Location"
            defaultValue={query.city}
            size="small"
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <FormControl fullWidth size="small">
            <InputLabel id="select-label-type">Type</InputLabel>
            <Select
              labelId="select-label-type"
              defaultValue={query.type}
              label="Type"
              name="type"
              onChange={handleChange}

              style={{ width: 130 }}
            >
              <MenuItem value={"any"}>Any</MenuItem>
              <MenuItem value={"buy"}>Buy</MenuItem>
              <MenuItem value={"rent"}>Rent</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="item" onChange={handleChange} defaultValue={query.property}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-label-property">Property</InputLabel>
            <Select
              labelId="select-label-property"
              defaultValue={query.type}
              label="Property"
              name="property"
              onChange={handleChange}
              size="small"
              style={{ width: 130 }}
            >
              <MenuItem value={"any"}>Any</MenuItem>
              <MenuItem value={"apartment"}>Apartment</MenuItem>
              <MenuItem value={"house"}>House</MenuItem>
              <MenuItem value={"condo"}>Condo</MenuItem>
              <MenuItem value={"land"}>Land</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="item">
          <TextField
            label="minPrice"
            type="number"
            name="minPrice"
            placeholder="any"
            defaultValue={query.minPrice}
            onChange={handleChange}
            size="small"
            style={{ width: 130 }}
          />
        </div>
        <div className="item">
          <TextField
            label="maxPrice"
            type="number"
            name="maxPrice"
            placeholder="any"
            defaultValue={query.maxPrice}
            onChange={handleChange}
            style={{ width: 130 }}
            size="small"
          />
        </div>
        <div className="item">
          <TextField
            label="Bedroom"
            type="number"
            name="bedroom"
            placeholder="any"
            defaultValue={query.bedroom}
            onChange={handleChange}
            size="small"
            style={{ width: 130 }}
          />
        </div>

        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>


    </div>
  );
}

export default Filter;

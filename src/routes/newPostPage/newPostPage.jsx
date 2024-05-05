import { useState } from "react";
import "./newPostPage.scss";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill"
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

function NewPostPage() {

  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/" + res.data.id)
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Property</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <TextField
                label="Title"
                type="text"
                name="title"
                size="small"
                style={{ width: "100%" }}
                required
              />
            </div>
            <div className="item">
              <TextField
                label="Price"
                type="number"
                name="price"
                size="small"
                style={{ width: "100%" }}
                required
              />
            </div>
            <div className="item">
              <TextField
                label="Address"
                type="text"
                name="address"
                size="small"
                style={{ width: "100%" }}
                required
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <FormControl fullWidth size="small">
                <InputLabel id="select-label-city">Suburb</InputLabel>
                <Select
                  labelId="select-label-city"
                  label="Suburb"
                  name="city"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <MenuItem value={"cbd"}>Melbourne CBD</MenuItem>
                  <MenuItem value={"carlton"}>Carlton</MenuItem>
                  <MenuItem value={"boxhill"}>Boxhill</MenuItem>
                  <MenuItem value={"doncaster"}>Doncaster</MenuItem>
                  <MenuItem value={"southbank"}>Southbank</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="item">
              <TextField
                label="Bedroom Number"
                type="number"
                name="bedroom"
                size="small"
                style={{ width: "100%" }}
                defaultValue={1}
              />
            </div>
            <div className="item">
              <TextField
                label="Bathroom Number"
                type="number"
                name="bathroom"
                size="small"
                style={{ width: "100%" }}
                defaultValue={1}
              />
            </div>
            <div className="item">
              <TextField
                label="Latitude"
                type="number"
                name="latitude"
                size="small"
                style={{ width: "100%" }}
              />
            </div>
            <div className="item">
              <TextField
                label="Longitude"
                type="number"
                name="longitude"
                size="small"
                style={{ width: "100%" }}
              />
            </div>
            <div className="item">
              <FormControl fullWidth size="small">
                <InputLabel id="select-label-type">Type</InputLabel>
                <Select
                  labelId="select-label-type"
                  label="Type"
                  name="type"
                  size="small"
                  style={{ width: "100%" }}
                  defaultValue={"buy"}
                >
                  <MenuItem value={"buy"}>Buy</MenuItem>
                  <MenuItem value={"rent"}>Rent</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="item">
              <FormControl fullWidth size="small">
                <InputLabel id="select-label-property">Property</InputLabel>
                <Select
                  labelId="select-label-property"
                  label="Property"
                  name="property"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <MenuItem value={"apartment"}>Apartment</MenuItem>
                  <MenuItem value={"house"}>House</MenuItem>
                  <MenuItem value={"condo"}>Condo</MenuItem>
                  <MenuItem value={"land"}>Land</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="item">
              <FormControl fullWidth size="small">
                <InputLabel id="select-label-utilities">Utilities Policy</InputLabel>
                <Select
                  labelId="select-label-utilities"
                  label="Utilities Policy"
                  name="utilities"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <MenuItem value={"owner"}>Owner is responsible</MenuItem>
                  <MenuItem value={"tenant"}>Tenant is responsible</MenuItem>
                  <MenuItem value={"shared"}>Shared</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="item">
                <FormControl fullWidth size="small">
                <InputLabel id="select-label-pet">Pet Policy</InputLabel>
                <Select
                  labelId="select-label-pet"
                  label="Pet Policy"
                  name="pet"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <MenuItem value={"allowed"}>Allowed</MenuItem>
                  <MenuItem value={"not-allowed"}>Not Allowed</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="item">
                <TextField
                label="Income Policy"
                type="text"
                name="income"
                size="small"
                style={{ width: "100%" }}
              />
            
            </div>
            <div className="item">
              <TextField
                label="Total Size (sqm)"
                type="number"
                name="size"
                size="small"
                style={{ width: "100%" }}
                min={0}
              />

            </div>
            <div className="item">
              <TextField
                label="School"
                type="number"
                name="school"
                size="small"
                style={{ width: "100%" }}
              />
            </div>
            <div className="item">
              <TextField
                label="Bus"
                type="number"
                name="bus"
                size="small"
                style={{ width: "100%" }}
              />
            </div>
            <div className="item">
                <TextField
                label="Restaurant"
                type="number"
                name="restaurant"
                size="small"
                style={{ width: "100%" }}
              />
            </div>
            <div className="item"> <button className="sendButton">Add</button></div>

          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((img, index) => (
          <img src={img} key={index} alt="" />
        ))}
        <UploadWidget uwConfig={{
          cloudName: "ditcibnyi",
          uploadPreset: "estate",
          multiple: true,
          folder: "posts",
        }}
          setState={setImages} />
      </div>
    </div>
  );
}

export default NewPostPage;

import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/uploadWidget";
import { TextField } from "@mui/material";

function ProfileUpdatePage() {

  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    try {
      const res = await apiRequest.put(`/user/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      })
      updateUser(res.data);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  }


  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <TextField
              label="Username"
              type="text"
              name="username"
              InputLabelProps={{ required: false }}
              defaultValue={currentUser.username}
              required
            />

          </div>
          <div className="item">
            <TextField
              label="Email"
              type="text"
              name="email"
              InputLabelProps={{ required: false }}
              defaultValue={currentUser.email}
              required
            />
          </div>
          <div className="item">
            <TextField
              label="Password"
              type="password"
              name="password"
              InputLabelProps={{ required: false }}
            />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
        <UploadWidget uwConfig={{
          cloudName: "ditcibnyi",
          uploadPreset: "estate",
          multiple: false,
          maxImageFileSize: 2000000,
          folder: "avatars",
        }}
          setState={setAvatar} />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;

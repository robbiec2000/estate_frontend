import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {

  const navigate = useNavigate();
  const data = useLoaderData();
  const { currentUser, updateUser } = useContext(AuthContext);
  console.log("aaaaa");


  const logout = async () => {
    try {
      const res = await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "/noavatar.jpg"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>

            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>

            <button onClick={logout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Property</button>
            </Link>
          </div>

          <Suspense fallback={<p>Loading</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
              {
                (postResponse) => <List posts={postResponse.data.userPosts} />
              }
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
              {
                (postResponse) => <List posts={postResponse.data.savedPosts} />
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<p>Loading</p>}>
            <Await resolve={data.chatResponse} errorElement={<p>Error loading chats!</p>}>
              {
                (chatResponse) => <Chat chats={chatResponse.data} />
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

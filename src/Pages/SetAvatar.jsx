import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarroute } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState();

  const toastifyOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
  
    console.log(selectedAvatar,"selectedAvatar")
      if(selectedAvatar==undefined){

          toast.error("please select an avatar",toastifyOptions)
      }

  };

  useEffect(() => {
    async function fetchAvatar() {
      const data = [];

      for (let i = 0; i < 5; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        console.log(image, "image");
        if (image.status === 200) {
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
      }
      setAvatars(data);
      setIsLoading(false);
    }

    fetchAvatar();
  }, []);
  console.log(avatars, "data");
  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an avater as your profile picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                className={`avater ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avater"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </div>
        <button className="sumbit-btn" onClick={setProfilePicture}>set as profile picture</button>
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  background-color: #131324;
  align-items: center;

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius:5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
    }
    img {
      height: 6rem;
    }

     .selected {
    border: 0.4rem solid #430eff;
    border-radius: 5rem;
  }
  }
 
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;

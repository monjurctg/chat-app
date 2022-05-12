import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarroute } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { useMemo } from "react";
let  loader = "https://jimphicdesigns.com/downloads/imgs-mockup/colorful-circles-swing-loader.gif"

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  var user = JSON.parse(localStorage.getItem('chat-app-user'))


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

  console.log(user,"data data")
  const setProfilePicture = async () => {
    
    if (selectedAvatar == undefined) {
      toast.error("please select an avatar", toastifyOptions);
    }
    else{
    
      const user = await JSON.parse(localStorage.getItem('chat-app-user'))
    
     
      const {data}= await axios.post(`${setAvatarroute}/${user._id}`,{image:avatars[selectedAvatar]})

    
      if(data.isSet){
        user.isAvatarImage = true;
        user.avatarImage = data.image
        localStorage.setItem("chat-app-user",JSON.stringify(user))
        navigate('/')
      }
    }
  };

  useEffect(() => {
    async function fetchAvatar() {
      const data = [];

      for (let i = 0; i < 5; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );

        if (image.status === 200) {
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
      }
      setAvatars(data);
      setIsLoading(false);
    }

    fetchAvatar();

    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
      
    }

  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <div className="loader">
          <img src={loader}  alt="" />

          </div>
       
        </Container>
      ) : (
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
          <button className="sumbit-btn" onClick={setProfilePicture}>
            set as profile picture
          </button>
        </Container>
      )}

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
      border-radius: 5rem;
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
  .loader{
     img{
       width: 150px;
       border-radius: 50%;
     }

    }
`;

export default SetAvatar;

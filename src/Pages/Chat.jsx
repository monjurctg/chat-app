import axios from "axios";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import ChatContainer from "../Componets/ChatContainer";
import Contacts from "../Componets/Contacts";
import Wellcome from "../Componets/Wellcome";

import { allUserRoute } from "../utils/ApiRoutes";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, []);
  async function allUser() {
    if (currentUser) {
      if (currentUser.isAvatarImage) {
        const res = await axios.get(`${allUserRoute}/${currentUser._id}`);
        // console.log(res.data.users,"current user")

        setContacts(res.data?.users);
      } else {
        let confirm = window.confirm(
          "Are You Want Set your  profile picture ?"
        );
        if (confirm) navigate("/setAvatar");
      }
    }
  }
  useEffect(() => {
    allUser();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  // console.log(currentChat,"currentChat")
  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {!currentChat ? (
            <Wellcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentUser={currentUser} />
          )}
        </div>
      </Container>
    </>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  background-color: #131324;
  align-items: center;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media srreen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;

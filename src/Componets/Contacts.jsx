import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
let logo =
  "https://cdn.dribbble.com/users/573008/screenshots/15453335/media/461c9464866c55c4b0ef892ff8558b0e.png?compress=1&resize=400x300";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState(null);
  const [currentSelected, setCurrentSelected] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt="" />
            <h3>snapy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <>
                  <div
                    key={index}
                    onClick={() => changeCurrentChat(index, contact)}
                    className={`contact  ${
                      index === currentSelected ? "selected" : ""
                    }`}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt=""
              />
            </div>
            <div className="username">
              <h3>{currentUserName}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  background-color: #080424;
  overflow: hidden;

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    gap: 0.8rem;
    padding-top: 200px;
    padding-bottom: 20px;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      border-radius: 10px;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      padding: 0.4rem;
      display: flex;

      gap: 1rem;
      align-items: center;
      transition: 0.4ms ease-in-out;
    }
    .avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        max-inline-size: 100%;
      }
    }
    h3 {
      color: white;
    }
  }
`;

export default Contacts;

import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getMessageRoute, sendMessageRoute } from "../utils/ApiRoutes";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Messages from "./Messages";
const ChatContainer = ({ currentChat, currentUser,socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage,setArraivalMessage]= useState(null)
  const scrollRef =  useRef()

  const getMessages = async () => {
    const res = await axios.post(getMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
    });
    setMessages(res.data);
  };

  useEffect(() => {
    getMessages();
  }, [currentChat]);

  const handleSendMessage = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit('send-msg',{
      to:currentChat._id,
      from:currentUser._id,
      msg:msg
    });
    const msgs = [...messages];
    msgs.push({fromSelf:true,message:msg});
    setMessages(msgs)

  };
  console.log(messages, "messages");

useEffect(()=>{
  if(socket.current){
    socket.current.on('msg-recive',(msg)=>{
      console.log("msg-receive",msg)
      setArraivalMessage({fromSlf:false,message:msg})
  
    })
  }

},[])

useEffect(()=>{
  arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])

},[arrivalMessage])

useEffect(()=>{
  scrollRef.current?.scrollIntoView({behaviour:"smooth"})

}, [messages])

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
              alt=""
            />
          </div>

          <div className="username">
            <h3>{currentChat?.username}</h3>
           
          </div>
        
        </div>
        <div style={{display:"flex",justifyContent:"center",alignContent:"center",gap:'4px',color:"white",alignSelf:"center"}}>
        <Link to='/video' style={{marginLeft:'30px',cursor:"pointer",backgroundColor:"#9a86f3",padding:'10px',borderRadius:'10px'}}><i class="fa-solid fa-phone" style={{fontSize:"20px",color:"white"}}></i></Link>
            <button style={{marginLeft:'30px',cursor:"pointer",backgroundColor:"#9a86f3",padding:'10px',borderRadius:'10px'}}><i class="fa-solid fa-video" style={{fontSize:"20px",color:"white"}}></i></button>
          </div>
       
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              <div
                className={`message ${msg.fromSelf ? "sended" : "recieved"}`}
              >
                <div className="content">
                  <p>{msg?.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <Messages /> */}
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  /* flex-direction: column; */
  gap: 0.1rem;
  overflow: hidden;
  @media screen and(min-width: 720) and(max-width: 1024) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        margin-top: 10px;
        font-size: 1.1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
export default ChatContainer;

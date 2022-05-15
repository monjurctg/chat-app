import React from 'react';
import styled from 'styled-components';
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
import  Picker from 'emoji-picker-react'
import { useState } from 'react';

const ChatInput = ({handleSendMessage}) => {
    const [showEmojiPicker,setShowEmojiPicker]= useState(false)
    const [msg,setMsg]= useState("")

    const handleEmojiPickerShow = ()=>{
        setShowEmojiPicker(!showEmojiPicker)

    }
    const handleEmojiClick  = (event,emoji)=>{
        let message = msg;
        message += emoji.emoji
        setMsg(message)
     
      
    }
    console.log(msg,"msg")
    const sendChat = (e)=>{
        e.preventDefault()
        if(msg.length>0){
            handleSendMessage(msg)


            setMsg("")
            if(showEmojiPicker){
                handleEmojiPickerShow()

            }
            
        }


    }
    

    return (
        
          <Input>
      <div className="button-container">
          <div className="emoji">
              <BsEmojiSmileFill  onClick={handleEmojiPickerShow}/>
              {
                  showEmojiPicker && <Picker  onEmojiClick={handleEmojiClick}/>
              }
          </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
          <input type="text" placeholder='type your message here' value={msg} onChange={(e)=>setMsg(e.target.value)} />
          <button type='submit' ><IoMdSend/></button>
      </form>
        </Input>
        
      
    );
};
const Input = styled.div`

display: grid;
grid-template-columns: 5%  95%;
align-items: center;
background-color: #080420;
padding: 0 2rem;
padding-bottom: 0.3rem;

.button-container{
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji{
        position: relative;
        svg{
            color: #ffff00c8;
            font-size: 1.5rem;
            cursor: pointer;
        }
        .emoji-picker-react{
            position: absolute;
            top: -350px;
            background-color: #080420;
            box-shadow: 0 5px 10x #9a86f3;
            border: #9186f3;
            .emoji-scroll-wrapper::-webkit-scrollbar{
                background-color: #080420;
                width: 5px;
                &-thumb{
                    background-color: #9186f3;
                }
            }
            .emoji-categories {
                button{
                    filter: contrast(0);
                }
            }
            .emoji-search{
                background-color: transparent;
                border-color: #9186f3;
            }
            .emoji-group::before{
                background-color: #080420;
            }
        }
    }
}
.input-container{
    width: 100%;

    border-radius: 2rem;
    display: flex;
    justify-content: center;
    gap: 2rem;
    background-color: #ffffff34;
    input{
        width: 90%;
        height: 60%;
        background-color:transparent;
        color: white;
        padding: 1rem;
        border: none;
        font-size: 1.2rem;
        &::selection{
            background-color: #9186f3;
        }
        &:focus{
            outline: none;
        }
    }
    button{
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #9186f3;
        border: none;

        svg{
            font-size: 2rem;
            color: white;
            cursor: pointer;

        }
    
       


    }
}
    

`

export default ChatInput;
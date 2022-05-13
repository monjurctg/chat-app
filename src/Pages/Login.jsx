import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { LoginRoute, } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
let logo = 'https://cdn.dribbble.com/users/573008/screenshots/15453335/media/461c9464866c55c4b0ef892ff8558b0e.png?compress=1&resize=400x300'
const Login = () => {
    const neviagate = useNavigate()

    const [values,setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const toastifyOptions = {
        position: 'bottom-right',
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }
    const handlechange = (e)=>{
       
        setValues({
            ...values,[e.target.name]:e.target.value
        })
    }

    const handleValidation = ()=>{
        const {password,username,} = values
        if(!password && !username){
       
            toast.error("password nad username cant not be empty",toastifyOptions);
            return false
        }
        return true
      
    }

    
    const handleSubmit = async (e)=>{
        const {password,username} = values
        e.preventDefault()
       if(handleValidation()) {

           const res= await axios.post(LoginRoute,{
               username,password
           })
   
           if(res.status ==200){
               localStorage.setItem("chat-app-user",JSON.stringify(res.data?.user))
            //    console.log(res.data?.user?.isAvatarImage,"res.data?.user?.isAvatarImage")
            if(!res.data?.user?.isAvatarImage){

                neviagate("/setAvatar")

            }
            else{
                neviagate("/")
            }
          
               
            
           }
        //    toast.error(data.message,toastifyOptions)
        

           
       }
    }

    return (
        <>
            <FromContainer>
                <form  onSubmit={(e)=>handleSubmit(e)}>
                    <div className="brand">
                        <img src={logo} alt="" />
                        <h1>snappy</h1>

                    </div>
                    <input type="text" name="username" id="" placeholder='Username'  onChange={handlechange} />

            

                    <input type="password" name="password" id="" placeholder='Password'  onChange={handlechange} />

              
                    <button type='submit'>Login</button>
                    <span>   have not an Account <Link to="/register">Register</Link></span>
                </form>
            </FromContainer>
            <ToastContainer/>
        </>
    );
};

const FromContainer = styled.div`
height:100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
background-color: #131324;
align-items: center;
.brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img{
        height: 5rem;
        width: 5rem;
        border-radius: 50%;
    }
    h1{
        color: white;
        text-transform: uppercase;
    }
   

}
form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            font-size: 1rem;
            width: 100%;
            &:focus{
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button{
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem ;
            border: none;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover{
                background-color: #4e0eff;
            
            }
        }
        span{
            color: white;
            text-transform: uppercase;
            font-size: 0.8rem;
            a{
                color: #4e0eff;
                text-transform: none;
                font-weight: bold;
            }
        }
    }
`;

export default Login;
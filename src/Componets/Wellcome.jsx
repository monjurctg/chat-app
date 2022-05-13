import React from 'react';
import styled from 'styled-components';

let logo = 'https://media1.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif'
const Wellcome = ({currentUser}) => {
    return (
        <Container>
            <img src={logo} alt="" className='logo' />
            <h1>Wellcome  <span>{currentUser?.username}</span></h1>
            <h3>Please select a chat to start messaging..</h3>
        </Container>
    );
};

const Container = styled.div`
img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
}
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 1rem;
h1{
    color: white;
    span{
        color: #4e00ff;
    }

}
h3{
    color: white;
}

    

`

export default Wellcome;
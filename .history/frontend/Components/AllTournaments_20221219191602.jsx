import React from 'react';
import styled from "styled-components";
import fence from "../assets/fencing.png";

const AllTournaments = () => {
  return (
      <Container>
      <Heading>
        <img src={fence} alt='' />
        <h3>All  Tournaments</h3>
      </Heading>
    </Container>
  )
}


const Container = styled.div`
 width: 100%;
 background-color: #35356b;
`;

const Heading = styled.div`
margin-top: 3rem;
display: flex;
flex-direction: row;
img{
width: 7rem;
height: 5rem;
}

h3{
color: #df78e3;
font-size: 23px;
}
`;

const Item = styled.p`
`;

export default AllTournaments;
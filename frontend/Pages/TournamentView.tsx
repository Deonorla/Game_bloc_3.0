import React from 'react';
import styled from "styled-components";
import check from "../assets/check.png";

const TournamentView = () => {
  return (
      <Container>
          <GameImg>
              <Img style={{ backgroundImage: `url(https://w0.peakpx.com/wallpaper/631/321/HD-wallpaper-call-of-duty-mobile-2019.jpg)` }} />
              <AvatarContainer>
                  <AvatarWrapper>
                      <Avatar src="https://w0.peakpx.com/wallpaper/631/321/HD-wallpaper-call-of-duty-mobile-2019.jpg" alt=""/>
                      <Details>
                       <h4>Call of Duty War-zone</h4>
                       <UserName>
                           <img src={check} alt="" />
                           <h3> Deonatricks </h3>
                        </UserName>
                      </Details>
                  </AvatarWrapper>
                  <SideDetails></SideDetails>
              </AvatarContainer>
          </GameImg>

    </Container>
  )
}

const Container = styled.div`
margin-top: 4.5rem;
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  @media (min-width: 1200px) {
    width: 60vw;

  }
`;

const GameImg = styled.div`
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  height: 25rem;
   background-color: #35356b;
`;

const Img = styled.div`
 width: 100%;
 height: 17rem;
 background-size: 100% 100%;
 border-top-right-radius: 12px;
 border-top-left-radius: 12px;
 background-repeat: no-repeat;
 background-position: center center;
`;

const AvatarContainer = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;


`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  h4{
    color: white;
    font-size: 1.4rem;
    margin: 1rem 0 0 1rem;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.img`
 border-radius: 8px;
 width: 10rem;
 height: 10rem;
 margin: -4rem  0 0 1rem;
`;

const UserName = styled.div`
 margin: 1rem 0 0 1rem;
 display: flex;
 h3{
  color: white;
  font-size: 1rem;
  margin: 0 0 0 4px ;
 }
 img{
     width: 20px;
     height: 20px;
 }
`;


const SideDetails = styled.div`
`;

export default TournamentView;
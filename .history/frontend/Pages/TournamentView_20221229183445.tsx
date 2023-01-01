import React from 'react';
import styled from "styled-components";

const TournamentView = () => {
  return (
      <Container>
          <GameImg>
              <Img style={{ backgroundImage: `url(https://w0.peakpx.com/wallpaper/631/321/HD-wallpaper-call-of-duty-mobile-2019.jpg)` }} />
          </GameImg>
          
    </Container>
  )
}

const Container = styled.div`
margin-top: 4.5rem;
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  @media (min-width: 1200px) {
    width: 60vw;
  }
`;

const GameImg = styled.div`
 
`;

const Img = styled.div`
 width: 100%;
 height: 20rem;
 background-size: 100% 170%;
 border-radius: 12px;
 background-repeat: no-repeat;
 background-position: center center;
`;

export default TournamentView;
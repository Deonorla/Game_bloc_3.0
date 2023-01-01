import React from 'react';
import styled from "styled-components";

const TournamentView = () => {
  return (
      <Container>
          <GameImg>
              <Img style={{ backgroundImage: `url(https://w0.peakpx.com/wallpaper/376/39/HD-wallpaper-ghost-lejendario-call-of-duty-mobile.jpg)` }} />
          </GameImg>
          
    </Container>
  )
}

const Container = styled.div`
margin-top: 4rem;
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

`;

export default TournamentView;
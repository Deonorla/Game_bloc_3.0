import React from "react";
import styled from "styled-components"
import Chat from "./Chat";
import ActiveTournament from "./ActiveTournament";
const Chathome = ({gamebloc}) => {
    return(
        <div>
        <Chahome>
          <Chat/>
          <ActiveTournament isSignedIn={isSignedIn} gamebloc={gamebloc}/>
        </Chahome >

        </div>
    )
}

export default Chathome;

const Chahome = styled.div`
display: none;
@media (min-width: 1200px){
  display: flex;
  flex-direction: column;
  position: sticky;
  position: -webkit-sticky;
  left: 0;
  /* top: 2.5rem; */
  height: 100vh;
}
`;
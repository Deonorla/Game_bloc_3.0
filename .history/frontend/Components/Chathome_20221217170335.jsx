import React from "react";
import styled from "styled-components"
import Chat from "./Chat";
import ActiveTournament from "./ActiveTournament";
const Chathome = ({isSignedIn}) => {
    return(
        <div>
        <Chahome>
          <Chat/>
          <ActiveTournament isSignedIn={isSignedIn}/>
        </Chahome >

        </div>
    )
}

export default Chathome;

const Chahome = styled.div`
display: none;
@media (min-width: 1430px){
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  /* top: 2.5rem; */
  height: 100vh;
}
`;
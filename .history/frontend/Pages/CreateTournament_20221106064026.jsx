import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../Context/UserContext";

const CreateTournament = () => {
  const { id } = useParams();
  const tournamentImg = useContext(UserContext);

  return (
    <Container>
      <div>
        {tournamentImg
          .filter((list) => list.id == id)
          .map((list) => (
            <Details key={list.id}>
              <Img style={{ backgroundImage: `url(${list.background})` }}>
                <Title>{list.title}</Title>
                <Description>{list.description}</Description>
              </Img>
            </Details>
          ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 4rem;
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  background-color: #35356b;
  @media (min-width: 1200px) {
    width: 60vw;
  }
`;

const Img = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 0 0.5rem;
  /* background-repeat: no-repeat; */
  background-size: 100% 100%;
  width: 99%;
  height: 20rem;
  border-radius: 12px;
`;

const Title = styled.h1`
  color: #df78e3;
  font-size: larger;
`;
const Details = styled.div``;

const Description = styled.p`
  font-size: 14px;
  color: white;
`;

export default CreateTournament;

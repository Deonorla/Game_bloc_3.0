import React from "react";
import styled from "styled-components";
import TournamentData from "../Features/TournamentData";
import { AiOutlineEye } from "react-icons/ai";

const Tournament = () => {
  return (
    <Container>
      <Heading>Choose a Tournament</Heading>
      <TournamentCard>
        {TournamentData.map(() => {
          return (
            <Imgslide key={index}>
              <Img style={{ backgroundImage: `url(${data.background})` }}>
                <Seen>
                  <Eye />
                  <p>{data.view}</p>
                </Seen>
                <h4>{data.title}</h4>
              </Img>
            </Imgslide>
          );
        })}
      </TournamentCard>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 4rem;
  width: 60vw;
  flex-grow: 1;
  flex-shrink: 1;
  background-color: #35356b;
`;

const Heading = styled.h2`
  color: #df78e3;
  font-size: 22px;
  margin-left: 1rem;
  font-weight: 500;
`;

const TournamentCard = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  padding: 1rem;
  @media (min-width: 686px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Imgslide = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-right: 1rem;
`;

const Img = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 0 0.5rem;
  background-size: 180px 140px;
  border-radius: 12px;
  width: 180px;
  height: 140px;
  h4 {
    color: #fff;
    font-size: 1.2rem;
    margin-left: 8px;
  }
`;

const Seen = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(255, 255, 255, 0.34);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 9999px;
  padding: 0.1rem 0.5rem;
  width: fit-content;
  margin-top: 1rem;

  p {
    color: #fff;
    font-size: 1rem;
    margin: 0 0 0 8px;
  }
`;

const Eye = styled(AiOutlineEye)`
  color: #fff;
  font-size: 21px;
`;

export default Tournament;

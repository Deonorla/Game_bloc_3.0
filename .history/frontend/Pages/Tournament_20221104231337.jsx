import React from "react";
import styled from "styled-components";

const Tournament = () => {
  return (
    <Container>
      <Heading>Choose a Tournament</Heading>
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

export default Tournament;

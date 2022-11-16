import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ulid } from "ulid";
import styled from "styled-components";
import { UserContext } from "../Context/UserContext";
import near_logo from "../assets/near-logo.png";
import user from "../assets/user.png";

const CreateTournament = ({ gamebloc, userID }) => {
  const { id } = useParams();
  const [tournamentID, setTournamentID] = useState("");
  const [prize, setPrize] = useState(0);
  const [noOfUsers, setNoOfUsers] = useState(0);
  const tournamentImg = useContext(UserContext);

  useEffect(() => {
    cconsole.log(userID);
  }, []);

  function generateId() {
    const id = ulid();
    setTournamentID(JSON.parse(id));
  }
  function getPrize(event) {
    setPrize(event.target.value);
  }
  const getNoOfUsers = (event) => {
    setNoOfUsers(event.target.value);
  };

  const setTournament = async () => {
    try {
      await gamebloc.new_tournament(userID, tournamentID, noOfUsers, prize);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(setTournament());

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
                <Tags>
                  <Tag1>{list.genre}</Tag1>
                  <Tag2>{list.adventure}</Tag2>
                  <Tag3>{list.action}</Tag3>
                </Tags>
              </Img>
            </Details>
          ))}

        <TournamentContainer>
          <h2>Tournament Details</h2>
          <InputContainer>
            <InputLabel>
              <h3>Tournament Prize</h3>
              <Form>
                <Logo src={near_logo} alt="" />
                <Input
                  type="number"
                  placeholder="Input amount in Near"
                  min="0"
                  onChange={getPrize}
                  value={prize}
                />
              </Form>
            </InputLabel>
            <InputLabel>
              <h3>Number of Participants</h3>
              <Form>
                <Logo src={user} alt="" />
                <Input
                  type="number"
                  placeholder="Input number of users"
                  min="0"
                  onChange={getNoOfUsers}
                  value={noOfUsers}
                />
              </Form>
            </InputLabel>
          </InputContainer>
          <Submit
            onClick={() => {
              generateId, setTournament;
            }}
          >
            Create Tournament
          </Submit>
        </TournamentContainer>
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
  opacity: 0.7;
  justify-content: space-between;
  padding: 0 0 0 0.5rem;
  /* background-repeat: no-repeat; */
  background-size: 100% 100%;
  width: 99%;
  height: 20rem;
  border-radius: 12px;
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
`;
const Details = styled.div``;

const Description = styled.p`
  font-size: 14px;
  color: white;
  width: 25rem;
  height: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tag1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  background: #991ba5;
  border-radius: 9999px;
  padding: 0.1rem 0.5rem;
  width: fit-content;
  margin: 1rem;
  cursor: pointer;
  p {
    color: #fff;
    font-size: 1rem;
    margin: 0 0 0 8px;
  }
`;

const Tag2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  background: #057faf;
  border-radius: 9999px;
  padding: 0.1rem 0.5rem;
  width: fit-content;
  margin: 1rem;
  cursor: pointer;
  p {
    color: #fff;
    font-size: 1rem;
    margin: 0 0 0 8px;
  }
`;

const Tag3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  background: #05af93;
  border-radius: 9999px;
  padding: 0.1rem 0.5rem;
  width: fit-content;
  margin: 1rem;
  cursor: pointer;
  p {
    color: #fff;
    font-size: 1rem;
    margin: 0 0 0 8px;
  }
`;

const TournamentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #41417c;
  border-top-left-radius: 1.4rem;
  border-top-right-radius: 1.4rem;
  margin: 1rem 0.5rem;
  padding: 0 0 1rem 0;
  height: 100%;
  h2 {
    text-align: center;
    color: #ffffff;
    padding: 1rem 0;
  }
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const InputLabel = styled.div`
  h3 {
    color: white;
    margin-left: 1rem;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 25px;
  height: 25px;
`;

const Form = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: #393963;
  border: none;
  padding-left: 50px;
  border-radius: 8px;
  ::placeholder {
    color: gray;
  }
`;

const Submit = styled.button`
  background: #4646e2;
  font-size: 16px;
  border-radius: 10px;
  color: whitesmoke;
  cursor: pointer;
  border: none;
  width: fit-content;
  padding: 0.5rem 1rem;
  margin: 1rem;
  align-self: end;

  &:hover {
    background: #4b4bf3;
  }
`;

export default CreateTournament;

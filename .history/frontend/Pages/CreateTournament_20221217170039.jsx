import React, { useContext, useEffect, useState, CSSProperties } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ulid } from "ulid";
import styled from "styled-components";
import { UserContext } from "../Context/UserContext";
import near_logo from "../assets/near-logo.png";
import user from "../assets/user.png";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const CreateTournament = ({ gamebloc }) => {
  const { id } = useParams();
  const [tournamentID, setTournamentID] = useState("");
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [prize, setPrize] = useState("");
  const [noOfUsers, setNoOfUsers] = useState("");
  const { TournamentData }  = useContext(UserContext);
  const [userID, setUserID] = useState("");
  const account = localStorage.getItem("near_app_wallet_auth_key");
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };
  
  const popUp = () => {
    MySwal.fire({
       position: 'center',
       icon: "success",
       title: "You have successfully created a tournament",
      showConfirmButton: "true",
      background: '#41417c',
      color:'#fff'
    }).then((result) => {
      if (result.isConfirmed) {
          navigate("/")
        }
    })
  }

  const errorPopUp = () => {
    MySwal.fire({
      position: 'center',
      icon: "error",
      title: 'An error occured please try creating again',
      showConfirmButton:"true"
    })
  }

  useEffect(() => {
    accountJSON = JSON.parse(account);
    const accountID = accountJSON.accountId;
    setUserID(accountID); 
  }, []);

  function generateId() {
  const date = new Date();
  let day = date.getDate();
    const id = ulid(day);
    setTournamentID(id);
  }
  function getPrize(event) {
    event.preventDefault()
    setPrize(event.target.value);
  }
  const getNoOfUsers = (event) => {
    event.preventDefault()
    setNoOfUsers(event.target.value);
  };

  const setTournament = async () => {
    setLoading(true)
    try {
      await gamebloc.new_tournament(userID, tournamentID, noOfUsers, prize);
      console.log("Success");
      setLoading(false);
      popUp();
      gamebloc.getAllTournaments().then(e =>console.log(e));

    } catch (error) {
      console.log(error);
      console.log("Failed");
      setLoading(false)
      errorPopUp();
    }
  };
  console.log(TournamentData)
  return (
    <Container>
      <div>
        {TournamentData
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
              generateId(); setTournament();
              setLoading(!loading)
            }}
          >
          { loading ?
          <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> : "Create Tournament"}
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
  color: white; 
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
  color: white; 
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
  color: white; 
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

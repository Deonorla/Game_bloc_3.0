import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { HiCollection } from "react-icons/hi";
import {RiGamepadFill} from "react-icons/ri";
import {TiHome} from "react-icons/ti";
import user from "../assets/u.png";
import virtual from "../assets/virtual.jpg";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Components/Popup/LoginModal";


const Dashboard = ({ userName, isSignedIn, wallet }) => {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const handleSignIn = ()=> {
    {isSignedIn ? navigate("/tournament") : setOpenModal(true)}
  }

  return (
    <Wrapper>
      <Nav>
        <AvatarContainer>
          <img src={virtual} alt="avatar" />

          <ColorContainer>
            <Red>
              <img src={user} alt="" />
            </Red>
            <Yellow>
              <h4>{userName}</h4>
            </Yellow>

            <Green>
              {/* <div>
                <h4>Subscribers</h4>
                <p>200K</p>
              </div> */}
            </Green>

          
              <button
              onClick={handleSignIn}
              >Start a Tournament</button>
            
          </ColorContainer>
        </AvatarContainer>

        <Enclosed>
          <MenuBox>
            <Link style={{textDecoration: 'none'}} to="/">
            <div>
              <h4>Home</h4>
              <Homeicon />
            </div>
            </Link>
            <div>
              <h4>Tournaments</h4>
              <Library />
            </div>
            <div>
              <h4> Games</h4>
              <Games />
            </div>
          </MenuBox>
        </Enclosed>
        
      <Portal>
        <h4>Gaming Portal</h4>
      </Portal>
      </Nav>
     
        {openModal && 
            <LoginModal
             modal={setOpenModal}
             wallet={wallet}
            />
         }
    </Wrapper>
  );
};

const Portal = styled.div`
margin: 1rem 0;
  h4{
    color: #df78e3;
    font-size: 16px;
  }
`;

const Wrapper = styled.div``;

const Nav = styled.div`
  display: none;
  @media (min-width: 686px) {
    position: fixed;
    display: flex;
    height: 100vh;
    flex-direction: column;
    top: 3.5rem;
    margin-left: 1rem;
  }
`;

const AvatarContainer = styled(motion.div)`
  display: none;
  @media (min-width: 686px) {
    display: flex;
    flex-direction: column;
    margin: 1rem 0.5rem;
    background: #35356b;
    border-radius: 12px;
    position: relative;
    width: 20vw;
    height: 30vh;

    img {
      border-top-right-radius: 12px;
      border-top-left-radius: 12px;
      cursor: pointer;
      width: 100%;
      height: 100px;
    }
  }
  @media screen and (min-width: 1000px) {
    width: 12rem;
  }
`;

const ColorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  button {
    border: none;
    margin-top: 1rem;
    border-radius: 9999px;
    padding: 0.3rem 1rem;
    background-color: #3f3f6e;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 29%) 5px 26px 36px 10px,
      rgb(0 0 0 / 53%) 10px 16px 10px -10px;

    &:hover {
      transform: scale(1.05);
      translate: 5s ease in;
    }
  }
`;


const Red = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  margin: 0 auto;
  top: 4rem;
  img {
    width: 3rem;
    height: 3rem;
    padding: 0;
    margin: 0 0.5rem;
  }
`;

const Yellow = styled(motion.div)`
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  h4 {
    color: #fff;
    font-size: 14px;
    margin: 0.5rem 0 0 0;
  }
  p {
    color: #fff;
    font-size: 12px;
    margin-top: 8px;
    text-align: center;
  }
`;

const Green = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0.5rem;

    h4 {
      margin: 0;
      color: #6365bf;
      font-size: 12px;
    }

    p {
      font-size: 12px;
      color: #6365bf;
      margin: 0;
    }
  }
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #35356b;
  padding: 0.7rem 1.2rem;
  border-radius: 12px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &:hover {
      transform: scale(1.05);
    }
  }

  h4 {
    color: #fff;
    font-size: 12px;
    margin: 0.4rem 0.3rem 1.2rem 0;
    padding-top: 0.4rem;
    cursor: pointer;
  }
`;

const Enclosed = styled.div`
  height: 19rem;
  width: 22vw;
  border-radius: 12px;
  @media screen and (min-width: 1000px) {
    width: 13rem;
  }
`;

const Library = styled(HiCollection)`
  font-size: 21px;
  color:white;
`;
const Games = styled(RiGamepadFill)`
  font-size: 21px;
  color:white;
`;
const Homeicon = styled(TiHome)`
  font-size: 21px;
  color:white;
`;


export default Dashboard;
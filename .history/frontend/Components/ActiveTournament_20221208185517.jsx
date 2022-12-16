import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import icon from "../assets/duty_icon.png"
import dollar from "../assets/dollar.png"
import money from "../assets/money.png"
import mode from "../assets/mode.png"


const ActiveTournament = ({ gamebloc, isSignedIn }) => {
   const [activeTournaments, setActiveTournaments] = useState([]);
   const [loading, setLoading] = useState(true);
   const [pageNumber, setPageNumber] = useState(false);
   const tournamentPerPage = 1;
   const tournamentViewed = pageNumber * tournamentPerPage;

   // const currentTournament = 
   if (isSignedIn) {
      useEffect(() => {
         try {
            gamebloc.getAllTournaments().then((data) => {
               if (data) {
                  setActiveTournaments(data.tournament);
                  setLoading(false);
               }
            })
               
         } catch(error) {
            console.log(error)
        }
      }, [])
      
      // console.log(activeTournaments);
   
}

   if (loading === true) {
      return (
         <div>Loading</div>
      )
   } else if (loading === false) {
      
      return(
         <CardLayout >
            {console.log(activeTournaments)}
            {activeTournaments.map((data, index) => {
                <Card key={index} >
                   
                    <Img>
                   
                       <img src="https://assets1.ignimgs.com/2019/10/07/call-of-duty-modern-warfare1570477435828.jpg" alt="img" />
                    </Img>
                    <Description>
                          <Title>
                             <img src={icon} alt=""/>
                             <p>Call of Duty Battle Royale</p>
                          </Title>
                          <Bar></Bar>
                       {/* <Summary>
                             <p>{}</p>
                       </Summary> */}
   
                    </Description>
                       
   
                    <Interactions>
                  
                       <Container>
                          <div>
                             <h4>Prize Pool</h4>
                              <p><img src={dollar} alt="" /> $ 250</p>
                          </div>
   
                          <div>
                              <h4>Game Mode</h4>
                              <p><img src={mode} alt="" /> 1 vs 1</p>
                          </div>
   
                          <div>
                              <h4>Entry Fee</h4>
                              <p><img src={money} alt="" /> $ 5</p>
                          </div>
                       </Container>
   
                       <Status>
                          <h4>0/50</h4>
                          <button> Join</button>
                       </Status>
                    </Interactions>
   
                 </Card> 
            })
             }      
      </CardLayout>
      )
   }

}

const CardContainer = styled.div`
   margin: 1rem;
   overflow: hidden;
   border-radius: 12px;

   @media (min-width: 686px) and  (max-width: 999px){
      margin: 0 1rem 0 0;
     }

   @media (min-width: 1000px){
    margin-left: 7px;
    
   }
`;

const Status = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 width: 90%;
 align-items: center;
 padding: 1rem ;

 h4{
    color: white;
    @media (max-width: 400px){
     font-size: 13px;
    }
 }

 button{
   background-color: #41417c;
   border-radius: 8px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 1rem 2rem;
   color: white;
   font-size: 16px;
   border: none;
   width: fit-content;
  
   cursor: pointer;

   &:hover{
      scale: 1.03;
      background-color: #6365bf;
   }

 }
`;

const CardLayout = styled(motion.div)`
   display: flex;
   gap: 1rem;
   z-index: -1;
`;

const Card = styled.div`
 display: flex;
 flex-direction: column;
 min-width: 13rem;
 background-color: #35356b;
 border-radius: 12px;
 padding: 1.2rem .7rem 10px .5rem;

 @media (max-width: 500px){
   padding: 1.2rem .7rem 1rem .5rem;
 }

`;

const Img = styled.div`
img{
    position: relative;
    width: 100%;
    height: 150px;
    border-radius: 12px;
    cursor: pointer;
    @media  (min-width: 686px){
      height: 120px;
    }
}
`;

const Description = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 margin-top: 1rem;
 p{
   margin: 0;
 }
`;

const Bar = styled.div`
    margin: 10px 0 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    width: 90%;
    height: 1px;
 `;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img{
   width: 35px;
   height: 35px;
   border-radius: 8px;
  }

  p{
   margin: 0 0 0 5px; 
   color: #fff;
  }
`;

const Summary =  styled.div`
  color: #6365bf;
  p{
     margin: 5px 0 5px 0;
  }
`;

const Interactions = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  width: 100%; 
  @media (max-width: 500px){
     justify-content: center;
    }
`;

const Trend = styled.p`
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #df78e3;
   border-radius: 9999px;
   padding: 3px 16px 5px 16px;
   color:#fff;

   @media (max-width: 500px){
     position: absolute;
     bottom: 16rem;
     left: 5px;
     background: rgba(255, 255, 255, 0.34);
     box-shadow: 0 4px 30px rgba(0,0,0,0.1);
     backdrop-filter: blur(5px);
   }
    
`;

const Container =styled.div`
   display: flex;
   flex-direction: row;
   
div{
    position: relative;
     display: flex;
     flex-direction: column;
     color: white;
     margin: 5px 16px;
     h4{
        font-size: 13px;
        white-space: nowrap;
     }
     p{
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      img{
        width: 20px;
        height: 20px;
        margin-right: 6px;
      }
     }
   }

   
   @media (min-width: 500px){
    div{
      margin: 0 10px;
    }
   }


`;



export default ActiveTournament;
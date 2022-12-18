import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import icon from "../assets/duty_icon.png"
import dollar from "../assets/dollar.png"
import money from "../assets/money.png"
import mode from "../assets/mode.png"
import ReactPaginate from "react-paginate";
import "../Features/Pagination.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const ActiveTournament = ({ gamebloc, isSignedIn }) => {
   const [activeTournaments, setActiveTournaments] = useState([]);
   const [loading, setLoading] = useState(true);
   const [pageNumber, setPageNumber] = useState(false);
   const tournamentPerPage = 1;
   const tournamentViewed = pageNumber * tournamentPerPage;
   const currentTournament = activeTournaments.slice(tournamentViewed, tournamentViewed + tournamentPerPage);
   const pageCount = Math.ceil(activeTournaments.length / tournamentPerPage);


   const changePage = ({ selected }) => {
		setPageNumber(selected);
   };
   
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
            {currentTournament.map((data, index) => (
             <Imgslide key={index}>
                           
                   <Img style={{backgroundImage:`url(https://assets1.ignimgs.com/2019/10/07/call-of-duty-modern-warfare1570477435828.jpg)`}}>
                      <Seen>
                        <img 
                        src="https://assets1.ignimgs.com/2019/10/07/call-of-duty-modern-warfare1570477435828.jpg"
                        alt=""
                        /> 

                        <div>
                         <h4>Call of Duty</h4>
                         <h4>Deon</h4>
                        </div>
                      </Seen>
                               
                                 
                   </Img>
   
            </Imgslide>
            ))
            }      
            
              <ReactPaginate
                  previousLabel={<MdKeyboardArrowLeft />}
                  nextLabel={<MdKeyboardArrowRight />}
                  pageCount={pageCount}
                  pageClassName="page-item-none"
                  breakClassName="page-item-none"
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={""}
                  nextLinkClassName={""}
                  disabledClassName={""}
                  activeClassName={"activeBttn"}
                />
      </CardLayout>
      )
   }

}


const CardLayout = styled(motion.div)`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   gap: 1rem;
`;

const Imgslide = styled.div`
 display: flex;
 flex-direction: row;
 gap: 1rem;
 margin: 0rem 1rem;
`;

const Img = styled.div`
display: flex;
position: relative;
flex-direction: column;
background-size: 100% 60%;
border-radius: 12px;
width: 14rem;
height: 20rem;

`;

const Seen = styled.div`
display: flex;
position: absolute;
bottom: 0;
flex-direction: row;
background: rgba(255, 255, 255, 0.34);
box-shadow: 0 4px 30px rgba(0,0,0,0.1);
backdrop-filter: blur(5px);
/* border-radius: 9999px; */
border-bottom-left-radius: 12px;
border-bottom-right-radius: 12px;
width: 100%;
height: 50%;
margin-top: 60%;

img{
width: 30px;
height: 30px;
border-radius: 8px;
 margin: 10px 0 0 8px;
 
}

div{
display: flex;
flex-direction: column;
margin-left: 8px;
padding: 10px;

   h4{
      color: #fff;
     font-size: 14px;
     margin: 0;
   }
}


`;

// const Card = styled.div`
//  display: flex;
//  flex-direction: column;
//  min-width: 13rem;
//  background-color: #35356b;
//  border-radius: 12px;


//  @media (max-width: 500px){
//    padding: 1.2rem .7rem 1rem .5rem;
//  }

// `;

// const Img = styled.div`
// img{
//     position: relative;
//     width: 100%;
//     height: 150px;
//     border-top-left-radius: 12px;
//     border-top-right-radius: 12px;
//     cursor: pointer;
//     @media  (min-width: 686px){
//       height: 12.5rem;
//     }
// }
// `;

// const Description = styled.div`
//  display: flex;
//  flex-direction: column;
//  justify-content: center;
//  align-items: center;
//  margin-top: 1rem;
//  p{
//    margin: 0;
//  }
// `;

// const Bar = styled.div`
//     margin: 10px 0 10px 0;
//     border-bottom: 1px solid rgba(255, 255, 255, 0.15);
//     width: 90%;
//     height: 1px;
//  `;

// const Title = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;

//   img{
//    width: 35px;
//    height: 35px;
//    border-radius: 8px;
//   }

//   p{
//    margin: 0 0 0 5px; 
//    color: #fff;
//   }
// `;

// const Summary =  styled.div`
//   color: #6365bf;
//   p{
//      margin: 5px 0 5px 0;
//   }
// `;

// const Interactions = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 8px;
//   width: 100%; 
//   @media (max-width: 500px){
//      justify-content: center;
//     }
// `;

// const Trend = styled.p`
//    display: flex;
//    align-items: center;
//    justify-content: center;
//    background-color: #df78e3;
//    border-radius: 9999px;
//    padding: 3px 16px 5px 16px;
//    color:#fff;

//    @media (max-width: 500px){
//      position: absolute;
//      bottom: 16rem;
//      left: 5px;
//      background: rgba(255, 255, 255, 0.34);
//      box-shadow: 0 4px 30px rgba(0,0,0,0.1);
//      backdrop-filter: blur(5px);
//    }
    
// `;

// const Container =styled.div`
//    display: flex;
//    flex-direction: row;
   
// div{
//     position: relative;
//      display: flex;
//      flex-direction: column;
//      color: white;
//      margin: 5px 16px;
//      h4{
//         font-size: 13px;
//         white-space: nowrap;
//      }
//      p{
//         font-size: 12px;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//       img{
//         width: 20px;
//         height: 20px;
//         margin-right: 6px;
//       }
//      }
//    }

   
//    @media (min-width: 500px){
//     div{
//       margin: 0 10px;
//     }
//    }


// `;



export default ActiveTournament;

//   <Card key={index}>
                   
//                     <Img>
                   
//                        <img src="https://assets1.ignimgs.com/2019/10/07/call-of-duty-modern-warfare1570477435828.jpg" alt="img" />
//                     </Img>
                  
//                     <Description>
//                           <Title>
//                              <img src={icon} alt=""/>
//                              <p>Call of Duty Battle Royale</p>
//                           </Title>
//                           <Bar></Bar>
                    
   
//                     </Description>
                       
   
//                     <Interactions>
                  
//                        <Container>
//                           <div>
//                              <h4>Prize Pool</h4>
//                            <p><img src={dollar} alt="" /> {`$ ${data.total_prize}`}</p>
//                           </div>
   
//                           <div>
//                               <h4>Game Mode</h4>
//                               <p><img src={mode} alt="" /> 1 vs 1</p>
//                           </div>
   
//                           <div>
//                               <h4>Entry Fee</h4>
//                               <p><img src={money} alt="" /> $ 5</p>
//                           </div>
//                        </Container>
   
//                        <Status>
//                           <h4>0/50</h4>
//                           <button> Join</button>
//                        </Status>
//                     </Interactions>
   
//                  </Card> 
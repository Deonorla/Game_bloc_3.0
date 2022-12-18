import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import icon from "../assets/duty_icon.png"
import dollar from "../assets/dollar.png"
import money from "../assets/money.png"
import mode from "../assets/mode.png"
import check from "../assets/check.png";
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
                        <Avatar 
                        src="https://assets1.ignimgs.com/2019/10/07/call-of-duty-modern-warfare1570477435828.jpg"
                        alt=""
                        /> 

                        <Details>
                           <h4>Call of Duty</h4>
                           <Profile>
                              <h3>Deon</h3>
                              <Check src={check}  alt=""/>
                           </Profile>
                        </Details>
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



const CardLayout = styled.div`
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
`;

const Details = styled.div`
display: flex;
flex-direction: column;
margin-left: 8px;
padding: 10px;
   h4{
      color: #fff;
     font-size: 14px;
     margin: 0;
   }
`;

const Profile = styled.div`
display: flex;
flex-direction: row;
 h3{
      color: #fff;
     font-size: 14px;
     margin: 0;
   }
`;

const Avatar = styled.img`
width: 40px;
height: 40px;
border-radius: 8px;
 margin: 10px 0 0 8px;
`;

const Check = styled.img`
 margin: 0;
 width: 20px;
 height: 20px;
`;

export default ActiveTournament;


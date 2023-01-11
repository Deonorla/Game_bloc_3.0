import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Loader from './Loader/Loader';

interface props {
    gamebloc: any
}

const TournamentList = ({gamebloc}: props) => {
    const [allTournaments, setAllTournaments] = useState([] as any[]);
    const [loading, setLoading] = useState(true);
    
     useEffect(() => {
     try {
            gamebloc.getAllTournaments().then((data: any) => {
               if (data) {
                  setAllTournaments(data.tournament);
                  console.log(data.tournament)
                  setLoading(false);
               }
            })
               
         } catch(error) {
            console.log(error)
        }
    },[])
  

    if (loading) {
        <div>
        
    </div>
    } else {
        return (
            <CardContainer>
                 <Heading>
                    <h4> Active Tournaments </h4> 
                 </Heading>
                
          </CardContainer>
      
        )
}
}

const CardContainer = styled.div`
   margin: 1rem;
   overflow: hidden;
   border-radius: 12px;

   @media (min-width: 686px) and  (max-width: 999px){
      margin: 0 1rem 0 1rem;
     }

   @media (min-width: 1000px){
    margin-left: 7px;
    
   }
`;

const Heading = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 margin: 7px 0 .7rem 1rem;

 h4{
    color: #df78e3;
    @media (max-width: 400px){
     font-size: 13px;
    }
 }

 span{
    color: #6365bf;
    margin-left: .8rem;
    @media (max-width: 400px){
     font-size: 13px;
    }
 }
`;

export default TournamentList;
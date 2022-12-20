import React, { useState } from "react";
import styled from "styled-components";
import Imagedata from "./Imagedata";
import Accordionitem from "./Accordionitem";

interface Props{
  Images: any
}

const Accordion = ({Images}: Props) =>{
    const [activeIndex, setActiveIndex] = useState(Imagedata);
     return(
          <Container>
              { activeIndex.map((item: JSX.IntrinsicAttributes, index: React.Key | null | undefined) => {
                return(
                  <Accordionitem key={index} {...item}/>
                )
              })

              }
          </Container>
       )
  
       
}

const Container = styled.div`
  width: 100%;
  display: grid;
  margin-top: 2rem;
  gap: .5rem;
  grid-template-columns: repeat(1, 1fr) ;
  @media (min-width: 1000px){
 grid-template-columns: repeat(2, 1fr);
 }

`;


export default Accordion;
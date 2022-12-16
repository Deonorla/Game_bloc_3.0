import React from 'react';
import styled from "styled-components";
import Hubdata from '../Features/Hubdata';

const Try = () => {
  return (
      <Container>
           <div>
          good booy
      
              {Hubdata.map((item, index) => {
              { console.log(item)}
               <Wrapper key={index}>{ item.title }</Wrapper>
            })

            }
    </div>
    </Container>
  )
}


const Container = styled.div`
 display: flex;
 justify-content: center; 
 align-items: center; 
`;

const Wrapper = styled.p`
`;

export default Try
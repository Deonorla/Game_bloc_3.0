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
               <p key={index}>{ item.title }</p>
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

export default Try
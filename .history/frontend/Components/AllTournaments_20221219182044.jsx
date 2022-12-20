import React from 'react';
import styled from "styled-components";
import Hubdata from '../Features/Hubdata';

const AllTournaments = () => {
  return (
      <Container>
           <div>
          good booy
      
              {Hubdata.map((item) => (
             
                  <Wrapper >
                      <Item>
                          {item.title}
                   </Item>
               </Wrapper>
              ))

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

const Wrapper = styled.div``;

const Item = styled.p`
`;

export default AllTournaments;
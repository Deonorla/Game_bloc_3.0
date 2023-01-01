import React,{ useEffect, useState } from 'react';
import styled from "styled-components";
import fence from "../assets/fencing.png";
import Loader from './Loader/Loader';
import check from "../assets/check.png";

interface Props{
  gamebloc: any,
  isSignedIn: any
}

const AllTournaments = ({ gamebloc, isSignedIn }: Props) => {
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
    return (
         <Layout>
           <Loader />
        </Layout>
    )
  }
  else {
    
    return (
        <Container>
        <Heading>
          {/* <img src={fence} alt='' /> */}
          <h3>All  Tournaments</h3>
        </Heading>

        <GridLayout>
           
          {allTournaments.map((data, index) => (
            <Imgslide key={index}>
              <ImgWrapper>
                
                    <Img style={{backgroundImage:`url(https://w0.peakpx.com/wallpaper/376/39/HD-wallpaper-ghost-lejendario-call-of-duty-mobile.jpg)`}}/>                 
                      
                          <Wrapper>
                            <Avatar 
                            src="https://w0.peakpx.com/wallpaper/376/39/HD-wallpaper-ghost-lejendario-call-of-duty-mobile.jpg"
                            alt=""
                            /> 

                            <Details>
                                <h4>Call of Duty</h4>
                                <Profile>
                                  <h3>{ data.owner_id.substring(0, data.owner_id.length - 8) }</h3>
                                  <Check src={check}  alt=""/>
                                </Profile>
                            </Details>
                            
                          </Wrapper>

                          <Status>
                            <h4>0/50</h4>
                            <button> Join</button>
                          </Status>
                          
                        
              </ImgWrapper>
    
              </Imgslide>
          ))}
        </GridLayout>
         
  
      </Container>
    )
    
  }

}


const Layout = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 width: 100%;
margin-top: 10rem;
`;

const Container = styled.div`
 margin-top: 5rem;
 width: 100%;
 background-color: #35356b;
 height: 100vh;
 border-top-right-radius: 10px;
 border-top-left-radius: 10px;
`;

const Heading = styled.div`
display: flex;
flex-direction: row;
img{
width: 7rem;
height: 5rem;
}

h3{
margin-left: 10px;
color: #df78e3;
font-size: 2rem;
}
`;

const GridLayout = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 1rem;
`;

const ImgWrapper = styled.div`
 position: relative;
 display: flex;
 flex-direction: column;
`;

const Imgslide = styled.div`
 position: relative;
 display: flex;
 flex-direction: row;
 gap: 1rem;
 margin: 0rem 1rem;
`;

const Img = styled.div`
display: flex;
position: absolute;
flex-direction: column;
background-size: 100% 100%;
border-radius: 12px;
width: 14rem;
height: 20rem;
opacity: 0.7;
`;

const Seen = styled.div`
display: flex;
position: absolute;
bottom: 0;
flex-direction: column;
/* background: rgba(255, 255, 255, 0.34);
box-shadow: 0 4px 30px rgba(0,0,0,0.1);
backdrop-filter: blur(5px); */
/* border-radius: 9999px; */
border-bottom-left-radius: 12px;
border-bottom-right-radius: 12px;
width: 100%;
height: 50%;
margin-top: 60%;
`;

const Wrapper = styled.div`
z-index: 1; 
display: flex;
flex-direction: row;
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
 margin-left: 4px;
 width: 20px;
 height: 20px;
 `;

const Status = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 width: 100%;
 margin-top: 100%;
 align-items: center;
 padding: 1rem ;
 z-index: 1; 
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
   padding: .5rem 1rem;
   color: white;
   font-size: 1rem;
   border: none;
   width: fit-content;
  
   cursor: pointer;
   &:hover{
      scale: 1.03;
      background-color: #6365bf;
   }
 }
`;

export default AllTournaments;
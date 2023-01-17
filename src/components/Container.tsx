import styled from "styled-components"
import Body from "./Body"
import Nav from "./Nav"

const ContainerBody = styled.section`
    width: 50%;
    margin: auto;
    /* border: 1px solid purple; */
    /* box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3); */

`


function Container() {
  return (
    <ContainerBody>
        <Nav/>
        <Body/>
      
       
    </ContainerBody>
  )
}

export default Container
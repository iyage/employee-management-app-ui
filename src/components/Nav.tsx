import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
const Container = styled.div`
  width: 100%;
  padding: 10px;
  background-color: purple;
      color: white;
      font-weight: 300;
      letter-spacing: 1px;

`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

`
const NavLeft= styled.div`
  
`
const NavRight= styled.div`
display: flex;
justify-content: end;
`

const SpanLink = styled.span`
  margin: 0 10px;
  border: solid 1px white;
  padding: 5px 20px;
  font-size: 12px;
  border-radius: 7px;
  color: white;
  /* transition: all 1.5s; */
  cursor: pointer;
 &:hover{
  transform: scale(0.96);
 }
 
`

function Nav() {
  return (
    <Container>
      <Wrapper>
        <NavLeft>
 Employee Managenment
        </NavLeft>
        <NavRight>
          <NavLink to={"/add-employee"} className="nav-link" >
             <SpanLink>Add New</SpanLink>
          </NavLink>
      <NavLink to={"/"} className="nav-link">
      <SpanLink>View All</SpanLink>
</NavLink>
        </NavRight>
      </Wrapper>
     
      </Container>
  )
}

export default Nav
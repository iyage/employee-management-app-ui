import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
const Container = styled.div`
    margin-top: 30px;
    padding: 10px;
`
function Body() {
  return (
    <Container>

        <Outlet/>
    </Container>
  )
}

export default Body
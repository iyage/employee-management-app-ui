import React from 'react'
import { HashLoader } from 'react-spinners'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    height: 80vh;
`
function LoadingContainer() {
  return (
    <Container>
        <HashLoader color='purple' size={100}/>
    </Container>
  )
}

export default LoadingContainer
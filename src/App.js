import React from "react"
import Container from 'react-bootstrap/Container'
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./themes/GlobalStyle";
import {connect} from "react-redux";
import './App.css';
import Header from "./components/header/Header";
import Orders from "./components/orders/Orders";
import SellingChart from "./components/selling_chart/SellingChart";

const App = (props) => {

  return(
    <ThemeProvider theme={props.themeVariables}>
      <>
      <GlobalStyles/>
      <Header />
      <Container className="main-container">
        <Orders/>
        <SellingChart />
      </Container>
      </>
    </ThemeProvider>
  )
}

const mapStateToProps = (state) => {
  return{
      theme: state.currentTheme,
      themeVariables: state.currentThemeVariables
  }
}

export default connect(mapStateToProps) (App)
import React, { useEffect } from "react"
import Container from 'react-bootstrap/Container'
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./themes/GlobalStyle";
import {connect} from "react-redux";
import './App.css';
import Header from "./components/header/Header";
import Orders from "./components/orders/Orders";
import SellingChart from "./components/selling_chart/SellingChart";
import { useNavigate } from "react-router-dom";

const App = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.userLogged){
      navigate("/");
    }
  });

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
      themeVariables: state.currentThemeVariables,
      userLogged: state.userLoggedIn
  }
}

export default connect(mapStateToProps) (App)
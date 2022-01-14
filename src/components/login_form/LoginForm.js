import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import "../../i18n/i18n";
import './LoginForm.css';
import { useNavigate } from "react-router-dom";
import {connect} from "react-redux";
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../themes/GlobalStyle';
import Header from '../header/Header';
import Container from 'react-bootstrap/esm/Container';


const LoginForm = (props) => {
    const navigate = useNavigate();
    
    const {t, i18n} = useTranslation();

    useEffect(() => {
        if(props.userLogged){
            navigate("/dashboard");
        }
    });

    const handleLoginClick = () => {
        props.logInUser();
    }

    return (
        <ThemeProvider theme={props.themeVariables}>
        <>
        <GlobalStyles/>
        <Header />
        <Container className="main-container">
            <form className="login-form">
                <h3 align="Center">{t("loginButton")}</h3>
                <div className="form-group">
                    <label>{t("login")}</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>{t("password")}</label>
                    <input type="password" className="form-control"/>
                </div>
                <div className="submit-button">
                    <button type="submit" className="btn btn-primary btn-block" onClick={handleLoginClick}>{t("loginButton")}</button>
                </div>
            </form>
        </Container>
        </>
      </ThemeProvider>
    );
}

const mapStateToProps = (state) => {
    return{
        theme: state.currentTheme,
        themeVariables: state.currentThemeVariables,
        userLogged: state.userLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logInUser: () => { dispatch({type: 'USER_LOGIN'})},
    }
}  

export default connect(mapStateToProps, mapDispatchToProps) (LoginForm)
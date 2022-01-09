import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import { useTranslation } from 'react-i18next'
import "../../i18n/i18n";
import {connect} from "react-redux";
import "./Header.css"
import sun from '../../images/sun.png'
import moon from '../../images/moon.png'

const Header = (props) => {

    const {t, i18n} = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    const handleThemeChange = () =>{
        var theme = props.theme === 'light' ? 'dark' : 'light'
        props.switchTheme(theme)
    }

    return(
        <Navbar 
            bg = {props.themeVariables.navbarBg}
            variant = {props.themeVariables.navbarBg}
            expand = "lg"
            sticky='top'
        >
            <Navbar.Brand className="brand">{t("dashboardTitle")}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />            
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end hello">
                <Nav className="me-auto">
                    <Nav.Link href='#orders'>{t("orders")}</Nav.Link>
                    <Nav.Link href='#selling_chart'>{t("chart")}</Nav.Link>
                    <Nav.Link>{t("quality")}</Nav.Link>
                    <Nav.Link>{t("rank")}</Nav.Link>
                    <Nav.Link>{t("opinions")}</Nav.Link>
                </Nav>
                <NavDropdown 
                    title={t("lang")} 
                    id="basic-nav-dropdown"
                    menuVariant = {props.themeVariables.navbarBg}
                >
                    <NavDropdown.Item onClick={() => changeLanguage('pl')}>
                        Polski
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => changeLanguage('en')}>
                        English
                    </NavDropdown.Item>
                </NavDropdown>
                <img 
                    src = {props.theme === 'light' ? moon : sun} 
                    className='toggle-theme'
                    onClick={handleThemeChange}
                />
                <Navbar.Text>
                    {t("hello")} <a>Robert</a>!
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return{
        theme: state.currentTheme,
        themeVariables: state.currentThemeVariables,
        ordersRef: state.ordersRef
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        switchTheme: (theme) => { dispatch({type: 'SWITCH_THEME', theme: theme})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Header)
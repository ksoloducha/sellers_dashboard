import React, {useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import "../../i18n/i18n";
import {connect} from "react-redux";
import Stack from 'react-bootstrap/Stack';
import Navbar from 'react-bootstrap/Navbar';
import './Orders.css'
import paid from '../../images/paid.png'
import sent_light from '../../images/sent_light.png'
import sent_dark from '../../images/sent_dark.png'
import returned_light from '../../images/returned_light.png'
import returned_dark from '../../images/returned_dark.png'
import useWindowDimensions from '../../WindowDimensions';

const Order = (props) => {

    const {t, i18n} = useTranslation();
    const { width, height } = useWindowDimensions();

    function defineIcons(){
        if(width >= 768){
            return(
                <Stack direction='horizontal' gap={5}>
                    <Stack direction='horizontal' gap={3}>                        
                        <img src={paid} className='order-status-icon'/>
                        <h6 className='hide-when-small-screen'>{t("isPaid")}:</h6>
                        <h6>{props.paid ? t("yes") : t("no")}</h6>                        
                    </Stack>
                    <Stack direction='horizontal' gap={3}>   
                        <img src={props.theme === 'light' ? sent_light : sent_dark} className='order-status-icon'/>
                        <h6 className='hide-when-small-screen'>{t("isSent")}:</h6>
                        <h6>{props.sent ? t("yes") : t("no")}</h6>
                    </Stack>
                    <Stack direction='horizontal' gap={3}>   
                        <img src={props.theme === 'light' ? returned_light : returned_dark} className='order-status-icon'/>
                        <h6 className='hide-when-small-screen'>{t("isReturned")}:</h6>
                        <h6>{props.returned ? t("yes") : t("no")}</h6>
                    </Stack>
                </Stack>
            )
        } else{
            return(
                <Stack direction='horizontal' gap={5}>
                    {props.paid ? <img src={paid} className='order-status-icon'/> : ""}
                    {props.sent ? <img src={props.theme === 'light' ? sent_light : sent_dark} className='order-status-icon'/> : ""}
                    {props.returned ? <img src={props.theme === 'light' ? returned_light : returned_dark} className='order-status-icon'/> : ""}
                </Stack>
            )
        }
    }

    const icons = defineIcons()

    return(
        <div className="order">
            <Stack direction='horizontal' gap={5}>
                <h4>{props.id}</h4>
                <Stack direction='horizontal' gap={5}>
                        <Stack direction='vertical' className='hide-when-extra-small-screen' gap={3}>
                            <h6>{t("price")}:</h6>
                            <h6>{t("date")}:</h6>
                        </Stack>
                        <Stack direction='vertical' gap={3}>
                            <a>{props.price}</a>
                            <a>{props.date}</a>
                        </Stack>
                        {icons}                    
                </Stack>
            </Stack>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        theme: state.currentTheme,
        filterPaid: state.filterPaid,
        filterSent: state.filterSent,
        filterReturned: state.filterReturned
    }
}

export default connect(mapStateToProps) (Order)
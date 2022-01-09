import React from 'react'
import { useTranslation } from 'react-i18next'
import "../../i18n/i18n";
import {connect} from "react-redux";
import Stack from 'react-bootstrap/Stack';
import './Orders.css'
import paid from '../../images/paid.png'
import sent_light from '../../images/sent_light.png'
import sent_dark from '../../images/sent_dark.png'
import returned_light from '../../images/returned_light.png'
import returned_dark from '../../images/returned_dark.png'

const Order = (props) => {

    const {t, i18n} = useTranslation();

    return(
        <div className="order">
            <Stack direction='horizontal' gap={5}>
                <h4>{props.orderId}</h4>
                <Stack direction='horizontal' gap={5}>
                    <Stack direction='vertical' gap={3}>
                        <h6>{t("price")}:</h6>
                        <h6>{t("address")}:</h6>
                        <h6>{t("date")}:</h6>
                    </Stack>
                    <Stack direction='vertical' gap={3}>
                        <a>{props.price}</a>
                        <a>{props.address}</a>
                        <a>{props.date}</a>
                    </Stack>
                        
                    <Stack direction='horizontal' gap={5}>
                        <Stack direction='horizontal' gap={3}>                        
                            <img src={paid} className='order-status-icon'/>
                            <h6>{t("isPaid")}: {props.paid ? t("yes") : t("no")}</h6>                        
                        </Stack>
                        <Stack direction='horizontal' gap={3}>   
                            <img src={props.theme === 'light' ? sent_light : sent_dark} className='order-status-icon'/>
                            <h6>{t("isSent")}: {props.sent ? t("yes") : t("no")}</h6>
                        </Stack>
                        <Stack direction='horizontal' gap={3}>   
                            <img src={props.theme === 'light' ? returned_light : returned_dark} className='order-status-icon'/>
                            <h6>{t("isReturned")}: {props.returned ? t("yes") : t("no")}</h6>
                        </Stack>
                    </Stack>
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
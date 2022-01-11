import React from 'react'
import {connect} from "react-redux";
import { useTranslation } from 'react-i18next'
import "../../i18n/i18n";
import Order from './Order.js'
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import Stack from 'react-bootstrap/Stack';
import Pagination from './Pagination';
import './Orders.css'

const Orders = (props) => {

    const {t, i18n} = useTranslation();

    const handleSwitchPaidFilter = () => {
        props.switchFilterPaid(!props.filterPaid)
    }

    const handleSwitchSentFilter = () => {
        props.switchFilterSent(!props.filterSent)
    }

    const handleSwitchPReturnedFilter = () => {
        props.switchFilterReturned(!props.filterReturned)
    }

    const handleResetFilters = () => {
        props.resetFilters()
    }

    return (
        <div>
            <h2 id='orders'>{t("orders")}</h2>
            <Stack direction="horizontal" gap={4}>
                <h5 className='margin-row'>{t("filters")}:</h5>
                <Button 
                    variant={props.theme === 'light'? "outline-primary" : "outline-info"}
                    active = {props.filterPaid}
                    onClick={handleSwitchPaidFilter}
                >   
                    {t("notPaid")}
                </Button>
                <Button 
                    variant={props.theme === 'light'? "outline-primary" : "outline-info"}
                    active = {props.filterSent}
                    onClick={handleSwitchSentFilter}
                >   
                    {t("notSent")}
                </Button>
                <Button 
                    variant={props.theme === 'light'? "outline-primary" : "outline-info"}
                    active = {props.filterReturned}
                    onClick={handleSwitchPReturnedFilter}
                >   
                    {t("returned")}
                </Button>
                <Button 
                    variant="outline-danger"
                    onClick={handleResetFilters}
                >
                    {t("reset")}
                </Button>
            </Stack>            
            <Container
                className='styled-container'
            >
               {props.ordersList
                .filter((o) => o.id > (props.activePage - 1) * 5  && o.id <= (props.activePage) * 5)
                .map((o) => {
                    return (
                        <Order 
                            key={o.id}
                            id={o.id}
                            price={o.price}
                            date={o.date}
                            paid={o.paid}
                            sent={o.sent}
                            returned={o.returned}
                        >
                        </Order>
                    ) 
               })}
            </Container>
            <Pagination/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        ordersList: state.orders,
        theme: state.currentTheme,
        filterPaid: state.filterPaid,
        filterSent: state.filterSent,
        filterReturned: state.filterReturned,
        activePage: state.activePage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        switchFilterPaid: (filterPaid) => { dispatch({type: 'SWITCH_PAID', filterPaid: filterPaid})},
        switchFilterSent: (filterSent) => { dispatch({type: 'SWITCH_SENT', filterSent: filterSent})},
        switchFilterReturned: (filterReturned) => { dispatch({type: 'SWITCH_RETURNED', filterReturned: filterReturned})},
        resetFilters: () => { dispatch({type: 'RESET_FILTERS'})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Orders)
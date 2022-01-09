import { lightTheme, darkTheme } from "../themes/Themes"
import {Orders} from '../data/listOfOrders'

const initState = {
    currentLanguage: "en",
    currentTheme: "light",
    currentThemeVariables: lightTheme,
    themes: {
        'light': lightTheme,
        'dark': darkTheme
    },
    originalOrders: Orders.ordersList,
    orders: Orders.ordersList,
    filterPaid: false,
    fiterSent: false,
    filterReturned: false,
    activePage: 1
}

const rootReducer= (state=initState, action) => {
    switch(action.type){
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.language
            }
        case 'SWITCH_THEME':
            return {
                ...state,
                currentTheme: action.theme,
                currentThemeVariables: state.themes[action.theme]
            }
        case 'SWITCH_PAID':
            return{
                ...state,
                filterPaid: action.filterPaid,
                orders: updateOrders(action.filterPaid, state.filterSent, state.filterReturned, state.originalOrders),
                activePage: 1
            }
        case 'SWITCH_SENT':
            return{
                ...state,
                filterSent: action.filterSent,
                orders: updateOrders(state.filterPaid, action.filterSent, state.filterReturned, state.originalOrders),
                activePage: 1
            }
        case 'SWITCH_RETURNED':
            return{
                ...state,
                filterReturned: action.filterReturned,
                orders: updateOrders(state.filterPaid, state.filterSent, action.filterReturned, state.originalOrders),
                activePage: 1
            }
        case 'RESET_FILTERS':
            return{
                ...state,
                filterPaid: false,
                filterSent: false,
                filterReturned: false,
                orders: state.originalOrders,
                activePage: 1
            }
        case 'SET_ORDERS_REF':
            return{
                ...state,
                ordersRef: action.ref
            }
        case 'SELECT_ACTIVE_PAGE':
            return{
                ...state,
                activePage: action.activePage
            }
        default:
            return{
                ...state
            }
    }
}

const updateOrders = (filterPaid, filterSent, filterReturned, originalOrders) => {
    if(!filterPaid && !filterSent && !filterReturned){
        let id = 0
        return originalOrders.filter((o) => {
            o.orderId = id++;
            return o;
        })
    } else{
        let id = 0
        return originalOrders.filter((o) => {
            let create = false;
            let filtered = false;
            if(filterPaid){
                create = !o.paid;
                filtered = true;
            }
            if(filterSent){
                create = create === false && filtered === true ? false : !o.sent;
                filtered = true;
            }
            if(filterReturned){
                create = create === false && filtered === true ? false : o.returned;
            }
            if(create){
                o.orderId = id++;
                return o;
            }
        })
    }    
}

export default rootReducer
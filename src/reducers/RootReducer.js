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
    currentUser: "Robert",
    originalOrders: Orders("Robert"),
    orders: Orders("Robert"),
    filterPaid: false,
    fiterSent: false,
    filterReturned: false,
    activePage: 1,
    chartDataMeasure: "earnings",
    chartTimePeriod: "currentWeek",
    chartType: "bar",
    extraDataSeries: false
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
                orders: updateOrders(state.filterPaid, action.filterSent, state.filterReturned, state.originalOrders,),
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
                orders: updateOrders(false, false, false, state.originalOrders),
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
        case 'SWITCH_CHART_DATA_MEASURE':
            return{
                ...state,
                chartDataMeasure: action.dataMeasure
            }
        case 'CHENGE_CHART_TIME_PERIOD':
            return{
                ...state,
                chartTimePeriod: action.timePeriod
            }
        case 'SWITCH_CHART_TYPE':
            return{
                ...state,
                chartType: action.chartType
            }
        case 'SWITCH_EXTRA_DATA_SERIES_VISIBILITY':
            return{
                ...state,
                extraDataSeries: action.extraDataSeries
            }
        case 'SWITCH_USER':
            return{
                ...state,
                currentUser: action.user,
                originalOrders: Orders(action.user),
                orders: updateOrders(state.filterPaid, state.filterSent, action.filterReturned, state.originalOrders),
                filterPaid: false,
                filterSent: false,
                filterReturned: false,
                activePage: 1
            }
        default:
            return{
                ...state
            }
    }
}

const updateOrders = (filterPaid, filterSent, filterReturned, originalOrders) => {
    if(!filterPaid && !filterSent && !filterReturned){
        let id = 1
        return originalOrders.filter((o) => {
            o.id = id++;
            return o;
        })
    } else{
        let id = 1
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
                o.id = id++;
                return o;
            }
        })
    }    
}

export default rootReducer
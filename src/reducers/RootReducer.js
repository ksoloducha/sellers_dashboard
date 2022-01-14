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
    extraDataSeries: true,
    chartData: initChartData(Orders("Robert")),
    userLoggedIn: false
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
                orders: updateOrders(false, false, false, Orders(action.user)),
                filterPaid: false,
                filterSent: false,
                filterReturned: false,
                activePage: 1,
                chartData: initChartData(Orders(action.user))
            }
        case 'USER_LOGIN':
            return{
                ...state,
                userLoggedIn: true
            }
        default:
            return{
                ...state
            }
    }
}

function getDates(){
    let now = new Date()
    let d = new Date()
    let day = now.getDay()
    let diff = now.getDate() - day + (day === 0 ? -6 : 1)
    let first = new Date(d.setDate(diff))
    first.setDate(first.getDate() - 21)

    let dates = []
    while(first <= now){
        dates.push({
            "time": first.toISOString().split('T')[0],
            "amount": 0
        })
        first.setDate(first.getDate() + 1)
    }
    return dates
}

function getHours(){
    let today = new Date()
    let yesterday = new Date()    
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setHours(1, 0, 0, 0)
    let hours = []
    
    for(let i = 0; i < 48; i++){
        hours.push({            
            "time": yesterday.toISOString().split('.')[0],
            "amount": 0
        })
        yesterday.setHours(yesterday.getHours() + 1)
    }

    return hours
}

function initChartData(orders){

    let data = {
        data_byDays: {
            earnings: [],
            numberOfSoldItems: []
        },
        data_byHours: {
            earnings: [],
            numberOfSoldItems: []
        }
    }

    data.data_byDays.earnings = getDates()
    data.data_byDays.numberOfSoldItems = getDates()
    data.data_byHours.earnings = getHours()
    data.data_byHours.numberOfSoldItems = getHours()

    let today = new Date()
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    orders.map((order) => {
        let date = new Date(order.date)
        let day = date.toISOString().split('T')[0]
        let hour = order.time.split(":")[0]
        let n = Number(order.numberOfItems)
        let moneyEarned = n * order.price

        data.data_byDays.earnings.find((dict) => {
            if(dict["time"] === day){
                dict["amount"] = Number(dict["amount"]) + moneyEarned;
                return;
            }
        })
        data.data_byDays.numberOfSoldItems.find((dict) => {
            if(dict["time"] === day){
                dict["amount"]  = Number(dict["amount"]) +  n;
                return;
            }
        })
        if(date.getDate() === yesterday.getDate() || date.getDate() === today.getDate()){
            data.data_byHours.earnings.find((dict) => {
                let dateInTable = new Date(dict["time"])
                if(dateInTable.getHours() == hour && dateInTable.toISOString().split('T')[0] === date.toISOString().split('T')[0]){
                    dict["amount"]  = Number(dict["amount"]) +  moneyEarned;
                    return;
                }
            })
            data.data_byHours.numberOfSoldItems.find((dict) => {
                let dateInTable = new Date(dict["time"])
                if(dateInTable.getHours() == hour && dateInTable.toISOString().split('T')[0] === date.toISOString().split('T')[0]){
                    dict["amount"]  = Number(dict["amount"]) +  n;
                    return;
                }
            })
        }
    })

    return data
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
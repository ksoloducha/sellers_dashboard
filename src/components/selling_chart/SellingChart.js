import React from 'react'
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import {connect} from "react-redux";
import { useTranslation } from 'react-i18next'
import "../../i18n/i18n";
import './SellingChart.css'
import useWindowDimensions from '../../WindowDimensions';
import SettingsButtons from './SettingsButtons';

const SellingChart = (props) => {

    const {t, i18n} = useTranslation();
    const { width, height } = useWindowDimensions();

    let data = props.chartTimePeriod === 'today' ? props.chartData.data_byHours : props.chartData.data_byDays
    if(data === props.chartData.data_byHours){
        data = props.chartDataMeasure === 'earnings' ? props.chartData.data_byHours.earnings : props.chartData.data_byHours.numberOfSoldItems
        if(!props.extraDataSeries){
            let today = new Date()
            let filtered = []
            data.forEach((d) => {
                let date = new Date(d["time"])
                if(date.toISOString().split('T')[0] === today.toISOString().split('T')[0]){
                    filtered.push(d)
                }
            })
            data = filtered
        }    
    } else {
        data = props.chartDataMeasure === 'earnings' ? props.chartData.data_byDays.earnings : props.chartData.data_byDays.numberOfSoldItems

        let last = new Date()
        let d = new Date()
        let day = last.getDay()
        let diff = last.getDate() - day + (day === 0 ? -6 : 1)
        let first = new Date(d.setDate(diff))

        if(props.chartTimePeriod === 'previousWeek'){
            last.setDate(first.getDate() - 1)
        }
        last.setHours(23, 59, 59, 59)
        
        diff = props.chartTimePeriod === 'currentWeek' ? 0 : 7        
        diff += props.extraDataSeries === true ? 7 : 0
        first.setDate(first.getDate() - diff)
        first.setHours(0, 0, 0, 0)

        let filtered = []
        data.forEach((d) => {
            let date = new Date(d["time"])
            if(date >= first && date <= last){
                filtered.push(d)
            }
        })
        data = filtered
    } 

    const CustomTooltip = ({ active, payload, label }) => {
        
        const time_label = props.chartTimePeriod === 'today' ? 'Time' : 'Date'
        const measure_label = props.chartDataMeasure === 'earnings' ? 'Earnings' : 'Sold items'
        const measure_prefix = props.chartDataMeasure === 'earnings' ? '$' : ''
        let measure_value
        let time_value
        if(payload[0]){
            measure_value = props.chartDataMeasure === 'earnings' ? payload[0].value.toFixed(2) : payload[0].value
            measure_value = Number(measure_value)
        }
        if(label){
            time_value = props.chartTimePeriod === 'today' ? label.split('T')[1] : label
        }
    
        if (active && payload && payload.length) {
            return (
            <div className="custom-tooltip">
                <p className="label">{`${time_label} : ${time_value}`}</p>
                <p className="label">{`${measure_label} : ${measure_prefix}${measure_value}`}</p>
            </div>
            );
        }
        
        return null;
    }

    const renderChart = 
        props.chartType === 'linear'
        ? (
            <div className='margin-row center' >
                <LineChart width={width * 0.7} height={400} data={data}
                >
                    <XAxis dataKey="time" stroke={props.theme === 'light' ? 'black' : 'white'}/>
                    <YAxis stroke={props.theme === 'light' ? 'black' : 'white'} />
                    <Tooltip content={<CustomTooltip />}/>
                    <Line type="monotone" dataKey="amount" stroke= {props.theme === 'light' ? "#1254B7" : '#6BE2F5'} />
                </LineChart>
            </div>
        )
        : (
            <div className='margin-row center' >
                <BarChart width={width * 0.7} height={400} data={data} >
                    <XAxis dataKey="time" stroke={props.theme === 'light' ? 'black' : 'white'} />
                    <YAxis stroke={props.theme === 'light' ? 'black' : 'white'} />
                    <Tooltip content={<CustomTooltip />}/>
                    <Bar dataKey="amount" fill={props.theme === 'light' ? "#E6679B" : '#F57BAD'} />
                </BarChart>
            </div>
        )
    
    return(
        <div>
            <h2 id='selling_chart' className='margin-row'>{t("chart")}</h2> 
            <SettingsButtons/>            
            {renderChart}
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        theme: state.currentTheme,
        chartDataMeasure: state.chartDataMeasure,
        chartTimePeriod: state.chartTimePeriod,
        chartType: state.chartType,
        extraDataSeries: state.extraDataSeries,
        chartData: state.chartData
    }
}

export default connect(mapStateToProps) (SellingChart)
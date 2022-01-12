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

    const CustomTooltip = ({ active, payload, label }) => {

        const time = props.chartTimePeriod === 'today' ? 'Time' : 'Date'
        const measure = props.chartDataMeasure === 'earnings' ? 'Earnings' : 'Sold items'
        const measure_prefix = props.chartDataMeasure === 'earnings' ? '$' : ''
        const n = props.chartDataMeasure === 'earnings' ? 2 : 0
    
        if (active && payload && payload.length) {
            return (
            <div className="custom-tooltip">
                <p className="label">{`${time} : ${label}`}</p>
                <p className="label">{`${measure} : ${measure_prefix}${payload[0].value.toFixed(n)}`}</p>
            </div>
            );
        }
        
        return null;
    }

    const renderChart = 
        props.chartType === 'linear'
        ? (
            <div className='margin-row center' >
                <LineChart width={width * 0.7} height={400} data={props.chartData.data_byDays.earnings}
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
                <BarChart width={width * 0.7} height={400} data={props.chartData.data_byDays.earnings} >
                    <XAxis dataKey="time" stroke={props.theme === 'light' ? 'black' : 'white'} />
                    <YAxis stroke={props.theme === 'light' ? 'black' : 'white'} />
                    <Tooltip content={<CustomTooltip />}/>
                    <Bar dataKey="amount" fill={props.theme === 'light' ? "#1254B7" : '#6BE2F5'} />
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
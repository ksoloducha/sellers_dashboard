import React from 'react'
import {connect} from "react-redux";
import { useTranslation } from 'react-i18next'
import "../../i18n/i18n";
import './SellingChart.css'
import useWindowDimensions from '../../WindowDimensions';
import SettingsButtons from './SettingsButtons';

const SellingChart = (props) => {

    const {t, i18n} = useTranslation();
    const { width, height } = useWindowDimensions();
    
    return(
        <div>
            <h2 id='selling_chart' className='margin-row'>{t("chart")}</h2> 
                <SettingsButtons/>            
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        theme: state.currentTheme,
        chartDataMeasure: state.chartDataMeasure,
        chartTimePeriod: state.chartTimePeriod,
        chartType: state.chartType,
        extraDataSeries: state.extraDataSeries
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        switchChartDataMeasure: (dataMeasure) => { dispatch({type: 'SWITCH_CHART_DATA_MEASURE', dataMeasure: dataMeasure})},
        switchChartTimePeriod: (timePeriod) => { dispatch({type: 'CHENGE_CHART_TIME_PERIOD', timePeriod: timePeriod})},
        switchChartType: (chartType) => { dispatch({type: 'SWITCH_CHART_TYPE', chartType: chartType})},
        switchExtraDataSeriess: (extraDataSeries) => { dispatch({type: 'SWITCH_EXTRA_DATA_SERIES_VISIBILITY', extraDataSeries: extraDataSeries})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SellingChart)
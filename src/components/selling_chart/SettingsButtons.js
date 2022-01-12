import React from 'react'
import {connect} from "react-redux";
import { useTranslation } from 'react-i18next'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import "../../i18n/i18n";
import './SellingChart.css'
import useWindowDimensions from '../../WindowDimensions';
import ChartSetting from './ChartSetting'

const SettingsButtons = (props) => {

    const {t, i18n} = useTranslation();
    const { width, height } = useWindowDimensions();

    const buttonsaNamesAndKeys = {
        dataMeasureButtons: [
            {
                key: 'earnings',
                value: t("earnings")
            },
            {
                key: 'numberOfSoldProducts',
                value: t("numberOfSoldProducts")
            }
        ],
        chartTypeButtons: [
            {
                key: 'linear',
                value: t("linear")
            },
            {
                key: 'bar',
                value: t("bar")
            }
        ],
        timePeriodButton: 
        [
            {
                key: 'today',
                value: t("today")
            },
            {
                key: 'currentWeek',
                value: t("currentWeek")
            },
            {
                key: 'previousWeek', 
                value: t("previousWeek")
            }
        ],
        showPreviousPeriodButtons: 
        [
            {
                key: true,
                value: t("Yes")
            },
            {
                key: false,
                value: t("No")
            }
        ]
    }

    const handleSwitchDataMeasure = (newDataMeasure) => {
        props.switchChartDataMeasure(newDataMeasure)
    }

    const handleSwitchChartType = (newChartType) => {
        props.switchChartType(newChartType)
    }

    const handleSwitchShowingPreviousPeriod = (newShowPreviousPeriod) => {
        props.switchExtraDataSeriess(newShowPreviousPeriod)
    }

    const handleSwitchTimePeriod = (newTimePeriod) => {
        props.switchChartTimePeriod(newTimePeriod)
    }

    const dataMeasureSettings = <ChartSetting 
                                    name={t("dataMeasure")}
                                    buttonsNamesAndKeys={buttonsaNamesAndKeys.dataMeasureButtons}
                                    propToSet={props.chartDataMeasure}
                                    handleSwitch={handleSwitchDataMeasure}
                                />

    const chartTypeSettings = <ChartSetting 
                                    name={t("chartType")}
                                    buttonsNamesAndKeys={buttonsaNamesAndKeys.chartTypeButtons}
                                    propToSet={props.chartType}
                                    handleSwitch={handleSwitchChartType}
                                />

    const showingPreviousPeriodSettings = <ChartSetting 
                                            name={t("isPreviousPeriodShown")}
                                            buttonsNamesAndKeys={buttonsaNamesAndKeys.showPreviousPeriodButtons}
                                            propToSet={props.extraDataSeries}
                                            handleSwitch={handleSwitchShowingPreviousPeriod}
                                        />
    const timePeriodSettings = <ChartSetting 
                                    name={t("timePeriod")}
                                    buttonsNamesAndKeys={buttonsaNamesAndKeys.timePeriodButton}
                                    propToSet={props.chartTimePeriod}
                                    handleSwitch={handleSwitchTimePeriod}
                                />

    function defineSettingsButtons(){
        if(width < 571){
            return(
                <div>
                    {dataMeasureSettings}
                    {chartTypeSettings}
                    {timePeriodSettings}
                    {showingPreviousPeriodSettings}
                </div>                
            )
        }
        else if(width < 993){
            return(
                <div>
                    <Row>
                        <Col>{dataMeasureSettings}</Col>                        
                        <Col>{chartTypeSettings}</Col>
                    </Row>
                    <Row>
                        <Col>{timePeriodSettings}</Col> 
                        <Col>{showingPreviousPeriodSettings}</Col> 
                    </Row>
                </div>                
            )
        } else{
            return(
                <div>
                    <Row lg={3}>
                        {dataMeasureSettings}
                        {chartTypeSettings}
                        {showingPreviousPeriodSettings}
                    </Row>
                    <Row lg={3}>
                        {timePeriodSettings}
                    </Row>            
                </div>
            )
        }
    }

    const settingsButtons = defineSettingsButtons()
    
    return(
        settingsButtons
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

export default connect(mapStateToProps, mapDispatchToProps) (SettingsButtons)
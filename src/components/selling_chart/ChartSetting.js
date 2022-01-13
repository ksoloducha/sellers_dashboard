import React from 'react'
import {connect} from "react-redux";
import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Row from 'react-bootstrap/Row'
import './SellingChart.css'

const ChartSetting = (props) => {
    return(
        <div>
            <Row className='margin-top' lg={3}>   
                <h5 className='box'>{props.name}:</h5>
            </Row>
            <Row>
                <ButtonGroup size='sm'>
                    {props.buttonsNamesAndKeys.map((button) => (
                        <Button
                            key={button.key}
                            variant={props.theme === 'light'? "outline-primary" : "outline-info"}
                            active={props.propToSet === button.key ? true : false}
                            onClick={() => props.handleSwitch(button.key)}
                            className='box'
                        >
                            {button.value}
                        </Button>
                    ))}
                </ButtonGroup>
            </Row>
        </div>
        
    )
}

const mapStateToProps = (state) => {
    return{
        theme: state.currentTheme
    }
}

export default connect(mapStateToProps) (ChartSetting)
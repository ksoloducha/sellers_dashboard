import React from 'react'
import {connect} from "react-redux";
import Button from 'react-bootstrap/esm/Button';
import './Orders.css'

const Pagination = (props) => {    

    let pages = []
    const numberOfPages = Math.ceil(props.ordersList.length / 5)
    for (let number = 1; number <= numberOfPages; number++) {
        pages.push(
            <Button 
                key={number}
                variant={props.theme === 'light'? "outline-dark" : "outline-light"}
                onClick={() => props.selectActivePage(number)}
                active={props.activePage === number}
            >
                {number}
            </Button>
        );
      }

      return(
        <div className='pagination' >
            <Button 
                variant={props.theme === 'light'? "outline-dark" : "outline-light"}
                onClick={() => props.selectActivePage(1)}
            >
                {'<<'}
            </Button>
            <Button 
                variant={props.theme === 'light'? "outline-dark" : "outline-light"}
                onClick={() => props.activePage === 1 ? '' : props.selectActivePage(props.activePage - 1)}
            >
                {'<'}
            </Button>
            {pages}
            <Button 
                variant={props.theme === 'light'? "outline-dark" : "outline-light"}
                onClick={() => props.activePage === numberOfPages ? '' : props.selectActivePage(props.activePage + 1)}
            >
                {'>'}
            </Button>
            <Button 
                variant={props.theme === 'light'? "outline-dark" : "outline-light"}
                onClick={() => props.selectActivePage(numberOfPages)}
            >
                {'>>'}
            </Button>
        </div>  
      )
}

const mapStateToProps = (state) => {
    return{
        ordersList: state.orders,
        theme: state.currentTheme,
        activePage: state.activePage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectActivePage: (activePage) => { dispatch({type: 'SELECT_ACTIVE_PAGE', activePage: activePage})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Pagination)
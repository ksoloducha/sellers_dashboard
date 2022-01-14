import React from 'react'
import {connect} from "react-redux";
import Button from 'react-bootstrap/esm/Button';
import './Orders.css'

const Pagination = (props) => {    

    let pages = []
    const numberOfPages = Math.ceil(props.ordersList.length / 5)
    if(numberOfPages <= 5){
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
    } 
    else {
        if(props.activePage <= 2){
            for (let number = 1; number <= 3; number++) {
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
            pages.push(
                <Button 
                    key={'...'}
                    variant={props.theme === 'light'? "outline-dark" : "outline-light"}
                    active={false}
                >
                    ...
                </Button>
            );
            pages.push(
                <Button 
                        key={numberOfPages}
                        variant={props.theme === 'light'? "outline-dark" : "outline-light"}
                        onClick={() => props.selectActivePage(numberOfPages)}
                        active={props.activePage === numberOfPages}
                    >
                        {numberOfPages}
                </Button>
            );
        }
        else if(props.activePage >= numberOfPages - 1){
            pages.push(
                <Button 
                        key={1}
                        variant={props.theme === 'light'? "outline-dark" : "outline-light"}
                        onClick={() => props.selectActivePage(1)}
                        active={props.activePage === 1}
                    >
                        1
                </Button>
            );
            pages.push(
                <Button 
                    key={'...'}
                    variant={props.theme === 'light'? "outline-dark" : "outline-light"}
                    active={false}
                >
                    ...
                </Button>
            );            
            for (let number = numberOfPages - 2; number <= numberOfPages; number++) {
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
        }
        else{
            pages.push(
                <Button 
                        key={1}
                        variant={props.theme === 'light'? "outline-dark" : "outline-light"}
                        onClick={() => props.selectActivePage(1)}
                        active={props.activePage === 1}
                    >
                        1
                </Button>
            );
            pages.push(
                <Button 
                    key={'...1'}
                    variant={props.theme === 'light'? "outline-dark" : "outline-light"}
                    active={false}
                >
                    ...
                </Button>
            ); 
            for (let number = props.activePage - 1; number <= props.activePage + 1; number++) {
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
            pages.push(
                <Button 
                    key={'...2'}
                    variant={props.theme === 'light'? "outline-dark" : "outline-light"}
                    active={false}
                >
                    ...
                </Button>
            ); 
            pages.push(
                <Button 
                        key={numberOfPages}
                        variant={props.theme === 'light'? "outline-dark" : "outline-light"}
                        onClick={() => props.selectActivePage(numberOfPages)}
                        active={props.activePage === numberOfPages}
                    >
                        {numberOfPages}
                </Button>
            );
        }
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
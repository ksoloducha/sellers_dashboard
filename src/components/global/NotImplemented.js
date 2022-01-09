import React from 'react'
import Modal from 'react-bootstrap/Modal'

const NotImplemented = (props) => {

    const [show, setShow] = useState(props.show)

    const handleClose = () => setShow(false);

    return(
        <Modal 
            show={show} 
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
        </Modal>
    )
}

export default NotImplemented
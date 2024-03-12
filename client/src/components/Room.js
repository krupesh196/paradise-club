import React, { useState } from "react";
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Room({ room, fromdate, todate }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <div className="row bs">

            <div className="col-md-4 kp">
                <img src={room.imageurls[0]} className="smallimg" />
            </div>

            <div className="col-md-7 ml-9 pk">

                <b>
                    <h1>{room.name}</h1>
                    <hr />
                    <h5><b>Max Count : </b> {room.maxcount}</h5>
                    <h5><b>Bed : </b> {room.bad}</h5>
                    <h5><b>Type : </b> {room.type}</h5>
                    <hr />
                </b>

                <div style={{ float: "right" }}>
                    <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                        <button className="btn btn-primary m-3">Book Now</button>
                    </Link>


                    <button className="btn btn-primary" onClick={handleShow}>View Details</button>
                </div>

            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Carousel prevIcon='' nextIcon='' prevLabel='' nextLabel=''>

                        {room.imageurls.map(url => {
                            return <Carousel.Item>

                                <img
                                    className="d-block w-100 bigimg"
                                    src={url}
                                />

                            </Carousel.Item>
                        })}

                    </Carousel>

                    <p className="mt-3" style={{ fontSize: 17, fontStyle: "Montserrat" }}>{room.description}</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>

    );
}

export default Room;

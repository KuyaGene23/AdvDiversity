import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import GoogleMap from '../resources/GoogleMaps';
import venueIcon from '../../assets/images/event-form-icons/location.png';
import debug from 'sabio-debug';
const _logger = debug.extend('events');
const _loggerEventCard = _logger.extend('eventCard');

const EventCardDisplay = (props) => {
    const eventData = props.eventData;
    const [modalShow, setModalShow] = useState(false);
    _loggerEventCard(eventData);

    const convertDate = (eventDate) => {
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        var today = new Date(eventDate);
        return today.toLocaleDateString('en-US', options);
    };

    const MoreInfoClicked = (props) => {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Additional Information</Modal.Title>
                </Modal.Header>
                <div className="container">
                    <GoogleMap
                        coordinates={{
                            lat: eventData.venue.location.latitude,
                            lng: eventData.venue.location.longitude,
                        }}></GoogleMap>
                </div>
                <Modal.Body>
                    <div className="container">
                        <strong>Venue Name: </strong> {eventData.venue.venueName}
                        <br />
                        <strong>Venue Description: </strong> {eventData.venue.venueDescription}
                        <br />
                        <strong>Website: </strong>{' '}
                        <a href={eventData.venue.venueUrl} target="_blank" rel="noreferrer">
                            {eventData.venue.venueUrl}
                        </a>
                        <br />
                        Address: {eventData.venue.location.lineOne} {eventData.venue.location.lineTwo}{' '}
                        {eventData.venue.location.city}, {eventData.venue.location.state} {eventData.venue.location.zip}
                        <br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <Col>
            <Card className="text-center d-block h-100 border-primary " style={{ width: '18rem' }}>
                <div>
                    <img
                        src={eventData.imageUrl}
                        style={{ objectFit: 'cover' }}
                        className="   mx-auto card-img-top "
                        alt="Banner for event"
                    />
                </div>
                <Card.Body>
                    <h2 className="mb-0 text-center mt-2">{eventData.eventName}</h2>
                    <p className="text-muted font-14">{eventData.shortDescription}</p>

                    <div className="text-start mt-3">
                        <p className=" mb-2 font-13">
                            <strong>Event Date:</strong>
                            <span className="ms-2">
                                {convertDate(eventData.dateStart)} - {convertDate(eventData.dateEnd)}
                            </span>
                        </p>

                        <p className=" mb-2 font-13">
                            <strong>Summary:</strong>
                            <span className="ms-2">{eventData.summary}</span>
                        </p>

                        <p className=" mb-2 font-13">
                            <strong>Venue:</strong>
                            <span className="ms-2 ">{eventData.venue.venueName}</span>
                        </p>
                    </div>
                </Card.Body>
                <div>
                    <button className="btn" onClick={() => setModalShow(true)}>
                        <img
                            src={venueIcon}
                            alt="A GPS map pointer is depicted"
                            style={{ height: '25px', width: '25px' }}></img>
                    </button>
                    <MoreInfoClicked show={modalShow} onHide={() => setModalShow(false)} />
                </div>
            </Card>
        </Col>
    );
};
export default EventCardDisplay;
EventCardDisplay.propTypes = {
    eventData: PropTypes.shape({
        eventName: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        dateStart: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
        dateEnd: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
        venue: PropTypes.shape({
            venueName: PropTypes.string.isRequired,
            venueDescription: PropTypes.string.isRequired,
            venueUrl: PropTypes.string.isRequired,
            location: PropTypes.shape({
                lineOne: PropTypes.string.isRequired,
                lineTwo: PropTypes.string.isRequired,
                city: PropTypes.string.isRequired,
                state: PropTypes.string.isRequired,
                zip: PropTypes.string.isRequired,
                latitude: PropTypes.number.isRequired,
                longitude: PropTypes.number.isRequired,
            }),
        }),
    }),
    onResourceClicked: PropTypes.func,
    onHide: PropTypes.func,
};

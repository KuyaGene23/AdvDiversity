import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import debug from 'sabio-debug';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import toastr from 'toastr';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import * as eventService from '../../services/eventService';
import Events from './Events';

const api = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const _logger = debug.extend('Event');

function EventPage() {
    const [eventData, setEventData] = useState({
        id: 1,
        eventTypeId: '',
        eventType: '',
        eventName: '',
        shortDescription: '',
        summary: '',
        venueName: '',
        venueUrl: '',
        lineOne: '',
        lineTwo: '',
        city: '',
        state: '',
        zipCode: 93277,
        latitude: 32.837292,
        longitude: -97.082687,
        imageUrl: '',
        externalSiteUrl: '',
        isFree: true,
        dateStart: '',
        dateEnd: '',
    });

    const { state } = useLocation();
    _logger('state', { state });

    useEffect(() => {
        _logger('event change firing for potato');

        if (state && state?.type === 'EVENT_VIEW') {
            _logger('event change firing', state.payload);
            setEventData(() => {
                let evt = state.payload;

                const dateTime = evt.dateStart;
                const dateEvent = format(new Date(dateTime), 'Pp');

                let viewEventData = {
                    eventName: evt.eventName,
                    shortDescription: evt.shortDescription,
                    summary: evt.summary,
                    venueName: evt.venue?.venueName,
                    lineOne: evt.venue?.location?.lineOne,
                    city: evt.venue?.location?.city,
                    state: evt.venue?.location?.state,
                    zipCode: evt.venue?.location?.zip,
                    latitude: evt.venue?.location?.latitude,
                    longitude: evt.venue?.location?.longitude,
                    imageUrl: evt.imageUrl,
                    externalSiteUrl: evt.externalSiteUrl,
                    venueId: evt.venueId,
                    isFree: evt.isFree,
                    dateStart: dateEvent,
                    dateEnd: evt.dateEnd,
                };
                return viewEventData;
            });
        } else {
            eventService.getById(id).then(onGetByIdSuccess).catch(onGetByIdError);
        }
    }, []);
    const onGetByIdSuccess = (data) => {
        eventData(data);
    };
    const onGetByIdError = (err) => {
        toastr.error('There are no events that match your query', err);
    };

    return (
        <Row className="Main-Artilce justify-content-center">
            {' '}
            <Col xxl={16} lg={12}>
                <Card className="d-block wide">
                    <Card.Body>
                        <div>
                            <h1 className="text-align:center">{eventData.eventName}</h1>
                        </div>
                        <Card.Img variant="top" src={eventData.imageUrl} />

                        <h5 className="text-align:center">{eventData.venueName}</h5>

                        <h5 className="text-bold mb-2 align: center">{eventData.dateStart}</h5>

                        <h5 className="text-bold mb-2 align: center">{eventData.shortDescription}</h5>

                        <p className="text-muted mb-2">{eventData.summary}</p>
                        <h5 className="text-bold mb-2 text-center">{eventData.eventName}</h5>
                        <p className="text-bold mb-2 text-center">at</p>
                        <h5 className="text-bold mb-2 text-center">{eventData.venueName}</h5>
                        <p className="text-bold mb-2 text-center">
                            {eventData.lineOne}, {eventData.city}, {eventData.state} {eventData.zipCode}
                        </p>
                        <Col>
                            <div className="mb-4 text-end">
                                <h6>Visit Event Page</h6>
                                <Link to="#">
                                    <small>{eventData.externalSiteUrl}</small>
                                </Link>
                            </div>
                        </Col>
                        <div className="container">
                            <LoadScript googleMapsApiKey={api} libraries={['places']}>
                                <GoogleMap
                                    zoom={15}
                                    center={{ lat: eventData.latitude, lng: eventData.longitude }}
                                    mapContainerStyle={{ width: '100%', height: '500px' }}>
                                    <Marker position={{ lat: eventData.latitude, lng: eventData.longitude }}></Marker>
                                </GoogleMap>
                            </LoadScript>
                            <div
                                className="container justify-content-center"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Link
                                    to="/events"
                                    element={Events}
                                    className="btn btn-primary"
                                    style={{ margin: `5px` }}>
                                    Return to Events Page
                                </Link>
                            </div>
                        </div>
                        <Row>
                            <Col>
                                <ul className="social-list list-inline mt-3 text-start">
                                    <h5>Share with friends</h5>

                                    <li className="list-inline-item">
                                        <Link to="#" className="social-list-item border-primary text-primary">
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to="#" className="social-list-item border-danger text-danger">
                                            <FontAwesomeIcon icon={faGoogle} />
                                        </Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to="#" className="social-list-item border-info text-info">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to="#" className="social-list-item border-secondary text-secondary">
                                            <FontAwesomeIcon icon={faGithub} />
                                        </Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default EventPage;

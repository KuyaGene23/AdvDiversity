import React from 'react';
import { Card } from 'react-bootstrap';
import debug from 'sabio-debug';
import * as wizardPropTypes from './eventWizardPropTypes';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import './events.css';

const EventCard = (props) => {
    const _logger = debug.extend('EventCard');
    const navigate = useNavigate();

    const eventData = props.aEvent;
    _logger(eventData);

    const dateTimeStart = eventData.dateStart;
    // const dateTimeEnd = eventData.dateEnd;
    const dateEvent = format(new Date(dateTimeStart), 'Pp');
    // const dateEvent2 = format(new Date(dateTimeEnd), 'Pp');
    const handleClick = () => {
        const state = { type: 'EVENT_VIEW', payload: eventData };
        navigate(`/events/${eventData.id}`, { state });
    };
    return (
        <Card className="text-center" onClick={handleClick}>
            <Card.Body className="event-card">
                <img src={eventData?.imageUrl} className="rounded img-fluid mx-auto card-img-top " alt="" />
                <div className="card-img-overlay  text-end">
                    {' '}
                    {eventData.isFree && <div className="badge bg-success">Free Event!</div>}
                </div>
                <div className="card-img-overlay  text-start">
                    {' '}
                    {eventData.eventTypes && <div className="badge bg-warning">{eventData.eventTypes.name}</div>}
                </div>
                <h3 className="text-truncate">{eventData?.eventName}</h3>
                <h4 className=" text-truncate">{eventData.shortDescription}</h4>

                <div className=" mt-3">
                    <span className=" font-13">
                        <h5>{dateEvent}</h5>
                    </span>
                    <p className=" font-13">
                        <span className="ms-2 ">
                            {eventData?.venue.venueName}, {eventData?.venue.location.city}
                        </span>
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
};
export default EventCard;
EventCard.propTypes = wizardPropTypes.eventWizardPropTypes;

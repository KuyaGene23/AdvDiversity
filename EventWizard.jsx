import React, { useState } from 'react';
import Loki from 'react-loki';
import './event-loki.css';
import { useNavigate } from 'react-router-dom';
import EventIcon from './EventIcon';
import VenueIcon from './VenueIcon';
import EventBaseForm from './EventBaseForm';
import EventVenueForm from './EventVenueForm';
import LocationForm from '../locations/LocationForm';
import EventConfirmation from './EventConfirmation';

import * as eventService from '../../services/eventService';

import toastr from 'toastr';
import 'toastr/build/toastr.css';

import debug from 'sabio-debug';
const _logger = debug.extend('events');

function EventWizard() {
    const [eventData, setEventData] = useState({
        eventName: '',
        summary: '',
        shortDescription: '',
        imageUrl: '',
        isFree: '',
        dateStart: '',
        dateEnd: '',
        eventTypeId: 0,
        eventStatusId: 1,
        externalSiteUrl: 'Not Applicable',
        venueBase: {
            venueName: '',
            venueDescription: '',
            venueUrl: '',
            location: {
                locationTypeId: 2,
                lineOne: '1Test Street',
                lineTwo: 'Sutie Test',
                city: 'Test St.',
                stateId: 40,
                zip: '90004',
                latitude: 90,
                longitude: -90,
            },
        },
    });

    const onChange = (values) => {
        _logger(values, 'On change function fired');
        setEventData((prevState) => {
            const ed = { ...prevState, ...values };
            return ed;
        });
    };
    const onFinish = () => {
        _logger('onFinish function fired', eventData);
        eventService.add(eventData).then(eventAddSuccess).catch(eventAddError);
    };

    const navigate = useNavigate();

    const eventAddSuccess = (response) => {
        toastr['success']('Event Created.');
        _logger('Event Created Success', response);
        navigate('/dashboard/events-display');
    };

    const eventAddError = (response) => {
        toastr['error']('There was a problem, please try again.');
        _logger('Event Created Error', response);
    };

    const locationSubmit = (location) => {
        _logger(eventData);
        _logger('this happens after', location);
        setEventData((prevState) => {
            const ed = { ...prevState };
            ed.venueBase = { ...prevState.venueBase };
            ed.venueBase.location = { ...location };
            return ed;
        });
        _logger(eventData);
    };

    const wizardSteps = [
        {
            label: 'Step 1 - Event Details',
            icon: <EventIcon />,
            component: <EventBaseForm eventData={eventData} onChange={onChange} />,
        },
        {
            label: 'Step 2 - VenueDetails',
            icon: <EventIcon />,
            component: <EventVenueForm eventData={eventData} onChange={onChange} />,
        },
        {
            label: 'Step 3 - Location Details',
            icon: <VenueIcon />,
            component: <LocationForm eventData={eventData} onLocationSubmit={locationSubmit} />,
        },
        {
            label: 'Step 4 - Confirm Event',
            icon: <EventIcon />,
            component: <EventConfirmation eventData={eventData} onChange={onChange} />,
        },
    ];

    return (
        <div className="eventWizard">
            <Loki steps={wizardSteps} onNext={onChange} onBack={onChange} onFinish={onFinish} noActions />
        </div>
    );
}

export default EventWizard;

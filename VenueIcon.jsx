import React from 'react';
import venueIcon from '../../assets/images/event-form-icons/location.png';

const VenueIcon = () => {
    return (
        <img
            src={venueIcon}
            alt="A GPS map pointer is depicted"
            className="mt-2"
            style={{ height: '25px', width: '25px' }}
        />
    );
};

export default VenueIcon;

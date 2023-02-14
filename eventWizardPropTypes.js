import PropTypes from 'prop-types';

const eventWizardPropTypes = {
    eventData: PropTypes.shape({
        eventName: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        externalSiteUrl: PropTypes.string.isRequired,
        isFree: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
        dateStart: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
        dateEnd: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
        eventTypeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        eventStatusId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        venueBase: PropTypes.shape({
            venueName: PropTypes.string.isRequired,
            venueDescription: PropTypes.string.isRequired,
            venueUrl: PropTypes.string.isRequired,
        }),
    }),

    touched: PropTypes.shape({
        eventName: PropTypes.bool,
        summary: PropTypes.bool,
        shortDescription: PropTypes.bool,
        imageUrl: PropTypes.bool,
        isFree: PropTypes.bool,
        dateStart: PropTypes.bool,
        dateEnd: PropTypes.bool,
        eventTypeId: PropTypes.bool,
        venueBase: PropTypes.shape({
            venueName: PropTypes.bool,
            venueDescription: PropTypes.bool,
            venueUrl: PropTypes.bool,
        }),
    }),

    errors: PropTypes.shape({
        eventName: PropTypes.string,
        summary: PropTypes.string,
        shortDescription: PropTypes.string,
        imageUrl: PropTypes.string,
        isFree: PropTypes.string,
        dateStart: PropTypes.string,
        dateEnd: PropTypes.string,
        venueBase: PropTypes.shape({
            venueName: PropTypes.string,
            venueDesciption: PropTypes.string,
            venueUrl: PropTypes.string,
        }),
    }),

    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    handleSubmit: PropTypes.func,
    onChange: PropTypes.func,
    nextLabel: PropTypes.string,
    backLabel: PropTypes.string,
    onBack: PropTypes.func,
    onNext: PropTypes.func,
    isSubmitting: PropTypes.bool,
    cantBack: PropTypes.bool,
};

export { eventWizardPropTypes };

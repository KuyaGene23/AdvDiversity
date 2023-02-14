import React, { useEffect } from 'react';
import { withFormik } from 'formik';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { eventVenueSchema } from '../../schema/eventFormSchema';
import * as wizardPropTypes from './eventWizardPropTypes';

const EventVenueForm = (props) => {
    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        backLabel,
        nextLabel,
        onNext,
        cantBack,
    } = props;

    useEffect(() => {
        props.onChange(values);
    }, [values]);

    const onNextClicked = () => {
        onNext(values);
    };
    const checkCurrentErrors = () => {
        return false;
    };

    return (
        <Form onSubmit={handleSubmit} className="p-1">
            <Card className="p-4 mb-4">
                <Card.Header>
                    <h2 className="text-center">Venue Creation</h2>
                </Card.Header>
                <div className="text-center ">
                    <h4 className="text-dark-50 text-center mt-2 fw-bold">Please fill in event information below:</h4>
                    <p className="text-muted mb-4"></p>
                </div>
                <div className="form-group">
                    <label htmlFor="venueName">Venue Name</label>
                    <div className="form-group my-3">
                        <Form.Control
                            name="venueBase.venueName"
                            id="venueName"
                            value={values.venueBase?.venueName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            placeholder="Enter the name of your venue"
                            className="form-control"
                        />
                        {errors.venueBase?.venueName && touched.venueBase?.venueName && (
                            <div id="feedback" style={{ color: 'red' }}>
                                {errors.venueBase?.venueName}
                            </div>
                        )}
                    </div>
                </div>

                <label htmlFor="venueDescription">Venue Description </label>
                <div className="form-group my-3">
                    <Form.Control
                        name="venueBase.venueDescription"
                        id="venueDescription"
                        value={values.venueBase.venueDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        placeholder="Enter a description of your venue"
                        className="form-control"
                    />
                    {errors.venueBase?.venueDescription && touched.venueBase?.venueDescription && (
                        <div id="feedback" style={{ color: 'red' }}>
                            {errors.venueBase?.venueDescription}
                        </div>
                    )}
                </div>
                <label htmlFor="venueUrl">Venue Link</label>
                <div className="form-group my-3">
                    <Form.Control
                        name="venueBase.venueUrl"
                        id="venueUrl"
                        value={values.venueBase.venueUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        placeholder="Enter a link to your venue"
                        className="form-control"
                    />
                    {errors.venueBase?.venueUrl && touched.venueBase?.venueUrl && (
                        <div id="feedback" style={{ color: 'red' }}>
                            {errors.venueBase?.venueUrl}
                        </div>
                    )}
                </div>

                <div className="button-group pt-3">
                    <Row className="mt-3 text-center">
                        <Col>
                            <button type="button" className="btn btn-secondary" disabled={isSubmitting || cantBack}>
                                {backLabel}
                            </button>
                        </Col>
                        <Col>
                            <button
                                type="submit"
                                className="btn btn-primary ml-2"
                                disabled={checkCurrentErrors()}
                                onClick={onNextClicked}>
                                {nextLabel}
                            </button>
                        </Col>
                    </Row>
                </div>
            </Card>
        </Form>
    );
};

EventVenueForm.propTypes = wizardPropTypes.eventWizardPropTypes;

export default withFormik({
    mapPropsToValues: (props) => ({
        venueBase: props.eventData.venueBase,
    }),

    validationSchema: eventVenueSchema,

    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(EventVenueForm);

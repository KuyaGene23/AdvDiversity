import React, { useEffect } from 'react';
import EventCard from './EventCard';
import { Row, Col, Card } from 'react-bootstrap';
import * as wizardPropTypes from './eventWizardPropTypes';
import debug from 'sabio-debug';

const _logger = debug.extend('events');
const _loggerConfirmation = _logger.extend('eventConfirmation');
const EventConfirmation = (props) => {
    const { values, eventData, isSubmitting, backLabel, nextLabel, onNext, cantBack } = props;
    useEffect(() => {
        _loggerConfirmation(eventData);
    });
    const onNextClicked = () => {
        onNext(values);
    };
    return (
        <React.Fragment>
            <Card>
                <EventCard eventData={eventData} />
                <div className="button-group pt-3">
                    <Row className="mt-3 text-center">
                        <Col>
                            <button type="button" className="btn btn-secondary" disabled={isSubmitting || cantBack}>
                                {backLabel}
                            </button>
                        </Col>

                        <Col>
                            <button type="submit" className="btn btn-primary ml-2" onClick={onNextClicked}>
                                {nextLabel}
                            </button>
                        </Col>
                    </Row>
                </div>
            </Card>
        </React.Fragment>
    );
};
EventConfirmation.propTypes = wizardPropTypes.eventWizardPropTypes;
export default EventConfirmation;

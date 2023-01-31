import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { mentorCardPropTypes } from './MentorPropTypes';
import './mentorcard.css';
import informationIcon from '../../assets/images/surveys/information.svg';
import { useAnalyticsEventTracker } from '../googleanalytics/myGa';

const MentorCard = (props) => {
    const navigate = useNavigate();
    const [mentor] = useState(props.mentor);
    const mentorProfileViewTracker = useAnalyticsEventTracker('Mentor Card');
    const onDetailClick = (e) => {
        const pageNum = e.currentTarget.dataset.page;
        const stateForTransport = { type: 'Mentor_Public_View', payload: props.mentor };
        mentorProfileViewTracker('Mentor Details', mentor.id);
        navigate(`./public/${pageNum}`, { state: stateForTransport });
    };
    return (
        <Card className="mentor-card text-center">
            <Card.Header className={`mentor-card-header card-color-${props.cardNum}`}></Card.Header>
            <Card.Body>
                <img src={mentor.imageUrl} alt="mentor profile" className="rounded-circle img-thumbnail mentor-image" />
                <h4>
                    {mentor.firstName} {mentor.lastName}
                </h4>
                <div>
                    {mentor.description.substring(0, 70)}
                    {mentor.description.length >= 70 ? '...' : ''}
                </div>
            </Card.Body>
            <Card.Footer
                className={`align-items-center mentor-card-footer justify-content-center d-flex card-color-${props.cardNum}`}>
                <img src={informationIcon} alt="" width="20" onClick={onDetailClick} data-page={mentor.userId} />
            </Card.Footer>
        </Card>
    );
};
MentorCard.propTypes = mentorCardPropTypes;
export default React.memo(MentorCard);


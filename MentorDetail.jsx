import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import profileService from '../../services/mentorProfileService';
import { Card, Row, Col, Container } from 'react-bootstrap';
import './mentordetail.css';
import MentorContactDetail from './MentorContactModal';
import * as toastr from 'toastr';
import 'toastr/build/toastr.css';
import debug from 'sabio-debug';

const _logger = debug.extend('MentorDetail');

const MentorDetail = () => {
    const mentorId = useParams();
    const { state } = useLocation();
    const [mentor, setMentor] = useState({
        firstName: '',
        lastName: '',
        imageUrl: '',
        description: '',
        focusAreas: [],
        ages: [],
        grades: [],
        mentoringTypes: [],
        genderTypes: [],
        specialties: [],
    });
    const [options, setOptions] = useState({
        focusAreas: [],
        ages: [],
        grades: [],
        mentoringTypes: [],
        genderTypes: [],
        specialties: [],
    });
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if (state?.type === 'Mentor_Public_View' && state.payload) {
            setMentor((prevState) => {
                let newMentor = { ...prevState };
                newMentor = state.payload;
                return newMentor;
            });
        } else {
            profileService.getMentorProfileById(mentorId).then(onGetMentorSuccess).catch(onGetMentorError);
        }
        setOptions((prevState) => {
            const newOptions = { ...prevState };
            newOptions.focusAreas = mentor.focusAreas.map(mapOptionToPill);
            newOptions.ages = mentor.ages.map(mapOptionToPill);
            newOptions.grades = mentor.grades.map(mapOptionToPill);
            newOptions.mentoringTypes = mentor.mentoringTypes.map(mapOptionToPill);
            newOptions.genderTypes = mentor.genderTypes.map(mapOptionToPill);
            newOptions.specialties = mentor.specialties.map(mapOptionToPill);
            return newOptions;
        });
    }, [mentor]);

    const mapOptionToPill = (eachOption) => {
        return (
            <span key={eachOption.id} className={`mentor-pill option-color-${eachOption.id % 4}`}>
                {eachOption.name}
            </span>
        );
    };

    const onGetMentorSuccess = (response) => {
        setMentor((prevState) => {
            let newMentor = { ...prevState };
            newMentor = response.item;
            return newMentor;
        });
    };
    const onGetMentorError = (response) => {
        _logger(response);
        toastr['error'](`Error retrieving mentor`, 'Error');
    };
    const onContactClick = () => {
        setModalShow(true);
    };
    return (
        <Container>
            <Card className="mentor-detail-card">
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h1>Mentor Information</h1>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={onContactClick}>
                            Contact Mentor
                        </button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Row className="text-center">
                        <Col sm={4}>
                            <img
                                src={mentor.imageUrl}
                                className="mentor-detail-image rounded-circle avatar-lg img-thumbnail"
                                alt=""
                            />
                            <h2>
                                {mentor.firstName} {mentor.lastName}
                            </h2>
                            <hr />
                            <h5>{mentor.description}</h5>
                        </Col>
                        <Col sm={8}>
                            <Row className="options-list text-start">
                                <Col sm={3}>
                                    <label>Focus Areas</label>
                                </Col>
                                <Col sm={9} className="text-center">
                                    {options.focusAreas}
                                </Col>
                            </Row>
                            <hr />
                            <Row className="options-list text-start">
                                <Col sm={3}>
                                    <label>Age Groups</label>
                                </Col>
                                <Col sm={9} className="text-center">
                                    {options.ages}
                                </Col>
                            </Row>
                            <hr />
                            <Row className="options-list text-start">
                                <Col sm={3}>
                                    <label>Grade Groups</label>
                                </Col>
                                <Col sm={9} className="text-center">
                                    {options.grades}
                                </Col>
                            </Row>
                            <hr />
                            <Row className="options-list text-start">
                                <Col sm={3}>
                                    <label>Mentoring Types</label>
                                </Col>
                                <Col sm={9} className="text-center">
                                    {options.mentoringTypes}
                                </Col>
                            </Row>
                            <hr />
                            <Row className="options-list text-start">
                                <Col sm={3}>
                                    <label>Gender Types</label>
                                </Col>
                                <Col sm={9} className="text-center">
                                    {options.genderTypes}
                                </Col>
                            </Row>
                            <hr />
                            <Row className="options-list text-start">
                                <Col sm={3}>
                                    <label>Specialties</label>
                                </Col>
                                <Col sm={9} className="text-center">
                                    {options.specialties}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
                <MentorContactDetail mentor={mentor} show={modalShow} onHide={() => setModalShow(false)} />
            </Card>
        </Container>
    );
};

export default MentorDetail;

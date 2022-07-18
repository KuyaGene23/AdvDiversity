import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import edit from '../../assets/images/newsletters/edit-icon-images-1.jpg';
import icon from '../../assets/images/newsletters/icon-delete-16.jpg';
import information from '../../assets/images/newsletters/information-i-icon-27.jpg';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
import Swal from 'sweetalert2';

function NewsletterCard(props) {
    const [modalShow, setModalShow] = useState(false);

    const _logger = debug.extend('NewsletterCard');

    const aNewsletter = props.newsletter;

    _logger(aNewsletter);

    const navigate = useNavigate();

    const onEditButtonClicked = () => {
        const newsletterObj = aNewsletter;
        navigateToNewsletterForm(newsletterObj);
    };

    const navigateToNewsletterForm = (receivedNewsletterObj) => {
        const newsletterObjToSend = { type: 'EDIT_VIEW', payload: receivedNewsletterObj };
        navigate(`/newsletters/${receivedNewsletterObj.id}`, {
            state: newsletterObjToSend,
        });
    };

    const onDeleteButtonClicked = async () => {
        Swal.fire({
            title: 'Are you sure about this?',
            text: 'There is no turning back!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete Newsletter',
        }).then((result) => {
            if (result.isConfirmed) {
                props.onNewsletterClicked(props.newsletter);
                Swal.fire('Successfully Deleted', '', 'success');
            } else {
                return;
            }
        });
    };

    const optionsWithClonOnOverlayclick = {
        closeOnOverlayClick: true,
    };

    const convertDate = (newsletterDate) => {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        var theDate = new Date(newsletterDate);
        return theDate.toLocaleDateString('en-US', options);
    };

    const MoreInfoClicked = (props) => {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Additional Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <b>Name:</b> {aNewsletter.name}
                        <br />
                        <b>Publish Date:</b> {convertDate(aNewsletter.dateToPublish)}
                        <br />
                        <b>Expire Date:</b> {convertDate(aNewsletter.dateToExpire)}
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
        <div className="col-md-3">
            <div className="card h-100">
                <div className="card-body" style={{ color: `black` }}>
                    <h4 className="card-title text-center">{aNewsletter.name}</h4>
                    <img className="card-img-top p-3" src={aNewsletter.coverPhoto} alt=""></img>
                    <div className="container">
                        <div className="text-center">
                            <button className="btn btn-lg" onClick={onEditButtonClicked}>
                                <img src={edit} alt="edit" width="18" />
                            </button>
                            &nbsp;
                            <button
                                className="btn btn-lg"
                                onClick={() => onDeleteButtonClicked(optionsWithClonOnOverlayclick)}>
                                <img src={icon} alt="delete trash" width="18"></img>
                            </button>
                            &nbsp;
                            <button className="btn btn-lg" onClick={() => setModalShow(true)}>
                                <img src={information} alt="more info icon" width="18"></img>
                            </button>
                            <MoreInfoClicked show={modalShow} onHide={() => setModalShow(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

NewsletterCard.propTypes = {
    newsletter: PropTypes.shape({
        name: PropTypes.string.isRequired,
        coverPhoto: PropTypes.string.isRequired,
        dateToPublish: PropTypes.string.isRequired,
        dateToExpire: PropTypes.string.isRequired,
    }),
    onNewsletterClicked: PropTypes.func,
    onHide: PropTypes.func,
};

export default React.memo(NewsletterCard);

import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Newsletters from './Newsletters';
import newsletterFormSchema from '../../schema/newsletterFormSchema';
import debug from 'sabio-debug';
import FileUploader from '../files/FileUploader';
import * as newsletterService from '../../services/newsletterService';
import PropTypes from 'prop-types';
import toastr from 'toastr';

import Swal from 'sweetalert2';
import 'toastr/build/toastr.min.css';

const _logger = debug.extend('NewsletterForm');
function NewsletterForm() {
    const [newsletterData, setNewsletterData] = useState({
        formData: {
            id: '',
            templateId: '',
            name: '',
            coverPhoto: '',
            dateToPublish: '',
            dateToExpire: '',
            createdBy: '',
        },
    });

    const { state } = useLocation();
    const { id } = useParams();
    const [newsletterId, setNewsletterId] = useState({ id: '' });

    useEffect(() => {
        _logger('UseEffect Firing');

        setNewsletterId(id);
        if (state) {
            setNewsletterData((prevState) => {
                let nd = { ...prevState };

                nd.formData.id = id;
                nd.formData.templateId = state.payload.templateId;
                nd.formData.name = state.payload.name;
                nd.formData.coverPhoto = state.payload.coverPhoto;
                nd.formData.dateToPublish = state.payload.dateToPublish;
                nd.formData.dateToExpire = state.payload.dateToExpire;
                nd.formData.createdBy = state.payload.createdBy;

                return nd;
            });
        }
    }, []);

    const submitForm = (values) => {
        _logger('Submitting Form');
        _logger('submit form values', values);
        _logger(newsletterId, 'Id being passed');
        if (newsletterId === undefined) {
            _logger('id not detected, adding new newsletter');
            newsletterService.addNewsletters(values).then(onAddNewsletterSuccess).catch(onAddNewsletterError);
        } else {
            _logger('id detected, updating newsletter');
            newsletterService
                .updateNewsletters(newsletterData.formData.id, values)
                .then(onUpdateNewsletterSuccess)
                .catch(onUpdateNewsletterError);
        }
    };

    const onAddNewsletterSuccess = (response) => {
        _logger(response, 'Resouce Add Success');
        Swal.fire('Your Newsletter has been added.', '', 'success');
        let returnedResponse = response.data.item;
        setNewsletterData((prevState) => {
            const form = { ...prevState };
            form.formData.id = returnedResponse;
            return form;
        });
    };

    const onAddNewsletterError = (error) => {
        _logger(error, 'Resource Add Error');
        toastr.error('Please check your form again', 'Failed To Add Newsletter');
    };

    const onUpdateNewsletterSuccess = (response) => {
        _logger(response, 'Update Newsletter Success');
        Swal.fire('Your Newsletter has been updated.', '', 'success');
    };

    const onUpdateNewsletterError = (error) => {
        _logger(error, 'Update Newsletter Error');
        toastr.error('You were unsuccessful on updating a Newsletter', 'Failed To Update Newsletter');
    };

    const onHandleUploadSuccess = (response, setFieldValue) => {
        _logger('onHandleUploadSuccess url', response[0].url);
        setFieldValue('coverPhoto', response[0].url);
    };

    return (
        <Row className="m-3">
            <Col>
                <div className="container-fluid">
                    <div className="card p-3">
                        <Formik
                            enableReinitialize={true}
                            initialValues={newsletterData.formData}
                            onSubmit={submitForm}
                            validationSchema={newsletterFormSchema}>
                            {(props) => {
                                const { values, handleChange, setFieldValue } = props;
                                return (
                                    <Form>
                                        <div>
                                            <h3
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <b>Newsletter Form</b>
                                            </h3>
                                            <Link
                                                to="/newsletters"
                                                element={<Newsletters></Newsletters>}
                                                className="btn btn-primary"
                                                style={{ margin: `3px` }}>
                                                <b>Back to Newsletter</b>
                                            </Link>
                                        </div>
                                        <div className="form-group hidden">
                                            <label htmlFor="templateId">Template Id</label>
                                            <Field
                                                type="text"
                                                name="templateId"
                                                className="form-control"
                                                value={values.templateId}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <Field
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={values.name}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <label htmlFor="coverPhoto">Cover Photo</label>
                                            <FileUploader
                                                onHandleUploadSuccess={(response) =>
                                                    onHandleUploadSuccess(response, setFieldValue)
                                                }
                                                isMultilple={true}
                                            />
                                            <ErrorMessage name="coverPhoto" component="div" className="text-danger" />
                                        </div>
                                        <br />
                                        <div className="row justify-content-around">
                                            <div className="form-group col-4">
                                                <label htmlFor="dateToPublish">Date to Publish</label>
                                                <Field
                                                    type="date"
                                                    name="dateToPublish"
                                                    className="form-control"
                                                    value={values.dateToPublish}
                                                    onChange={handleChange}
                                                />
                                                <ErrorMessage
                                                    name="dateToPublish"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <br />
                                            <div className="form-group col-4">
                                                <label htmlFor="dateToExpire">Date to Expire</label>
                                                <Field
                                                    type="date"
                                                    name="dateToExpire"
                                                    className="form-control"
                                                    value={values.dateToExpire}
                                                    onChange={handleChange}
                                                />
                                                <ErrorMessage
                                                    name="dateToExpire"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>
                                        <div className="btn text-center col-md-12">
                                            <Button
                                                className="btn-primary"
                                                variant="contained"
                                                color="primary"
                                                type="submit">
                                                Submit Newsletter
                                            </Button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

NewsletterForm.propTypes = {
    values: PropTypes.shape({
        templateId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        coverPhoto: PropTypes.string.isRequired,
        dateToPublish: PropTypes.string.isRequired,
        dateToExpire: PropTypes.string.isRequired,
    }),
    handleChange: PropTypes.func,
    func: PropTypes.func,
    setFieldValue: PropTypes.func,
};

export default NewsletterForm;

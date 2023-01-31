import React, { useState } from 'react';
import { Modal, Card } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './mentorcontact.css';

const MentorContactModal = (props) => {
    const [formData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });

    return (
        <Modal centered {...props}>
            <Modal.Body>
                <Card className="mentor-contact-card">
                    <h1>Contact Mentor</h1>
                    <Formik enableReinitialize={true} initialValues={formData}>
                        <Form>
                            <label>First Name</label>
                            <Field type="text" name="firstName" className="form-control" placeholder="First name" />
                            <ErrorMessage name="firstName" component="div" className="has-error" />
                            <label>Last Name</label>
                            <Field type="text" name="lastName" className="form-control" placeholder="First name" />
                            <ErrorMessage name="lastName" component="div" className="has-error" />
                            <label>Email</label>
                            <Field type="email" name="email" className="form-control" placeholder="First name" />
                            <ErrorMessage name="email" component="div" className="has-error" />
                            <label>Message</label>
                            <Field
                                component="textarea"
                                type="text"
                                name="message"
                                className="form-control contact-textarea"
                                placeholder="First name"
                            />
                            <ErrorMessage name="message" component="div" className="has-error" />
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </Form>
                    </Formik>
                </Card>
            </Modal.Body>
        </Modal>
    );
};

export default MentorContactModal;

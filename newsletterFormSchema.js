import * as Yup from 'yup';


const newsletterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Minimum of 2 characters').max(200, 'Maximum of 200 characters').required('Required'),
    coverPhoto: Yup.string().min(2, 'Minimum of 2 characters').max(300, 'Maximum of 300 characters').required('Required'),
    dateToPublish: Yup.string()
        .min(2, 'Minimum of 2 characters')
        .max(50, 'Maximum of 50 characters')
        .required('Required'),
    dateToExpire: Yup.string().min(2, 'Minimum of 2 characters').max(50, 'Maximum of 50 characters').required('Required'),
});

export default newsletterSchema;
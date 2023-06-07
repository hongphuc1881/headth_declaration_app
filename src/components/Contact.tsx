import { Col, Form as FormBootstrap } from 'react-bootstrap';
import MyTextField from './MyTextField';
import MySelectField from './MySelectField';
import MyDateField from './MyDateField';

interface IProps {
    getProvince: string[];
    getDistrict: string[];
}

function Contact(props: IProps) {
    const { getProvince, getDistrict } = props;

    return (
        <>
            <Col lg={12}>
                <p className="h5">Contact:</p>
            </Col>
            <Col lg={6}>
                <MySelectField name="province" dataOption={getProvince} label="Province" isRequired />
            </Col>
            <Col lg={6}>
                <MySelectField name="district" dataOption={getDistrict} label="District" isRequired />
            </Col>
            <Col lg={6}>
                <MyTextField name="address" placeholder="Address..." label="Address" isRequired />
            </Col>
            <Col lg={3}>
                <MyTextField name="email" placeholder="Email..." label="Email" isRequired />
            </Col>
            <Col lg={3}>
                <MyTextField name="mobile" placeholder="Mobile..." label="Mobile" isRequired />
            </Col>
        </>
    );
}

export default Contact;

import { Col, Form as FormBootstrap } from 'react-bootstrap';
import MyTextField from './MyTextField';
import MySelectField from './MySelectField';
import MyDateField from './MyDateField';

interface IProps {
    listCountry: string[];
}

function Personal(props: IProps) {
    const { listCountry } = props;
    return (
        <>
            <Col lg={12}>
                <p className="h5">Personal information:</p>
            </Col>
            <Col lg={12}>
                <MyTextField label="Full name" name="fullName" placeholder="Full name..." isRequired />
            </Col>
            <Col lg={6}>
                <MySelectField
                    label="Object"
                    name="object"
                    dataOption={['Expert', 'VietNamese', 'International Student', 'Other']}
                    isRequired
                />
            </Col>
            <Col lg={3}>
                <MyDateField label="Date of birth" name="dateOfBirth" isRequired />
            </Col>
            <Col lg={3}>
                <MySelectField label="Gender" name="gender" dataOption={['Male', 'Female', 'Other']} isRequired />
            </Col>
            <Col lg={6}>
                <MySelectField label="Nationality" name="nationality" dataOption={listCountry} isRequired />
            </Col>
            <Col lg={6}>
                <MyTextField
                    label="Nation ID or Passport ID"
                    name="nationalID"
                    placeholder="Nation ID or Passport ID..."
                    isRequired
                />
            </Col>
        </>
    );
}

export default Personal;

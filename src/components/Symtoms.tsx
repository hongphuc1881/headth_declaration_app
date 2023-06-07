import { Col, Form as FormBootstrap } from 'react-bootstrap';
import { Field } from 'formik';

function Symptoms() {
    const data = ['Fiber', 'Fever', 'Sore throat', 'Difficulty of breathing'];
    return (
        <>
            <Col lg={12}>
                <p className="h5">Symptoms:</p>
            </Col>
            <Col lg={3}>
                <p>Do you have any following symptoms?:</p>
            </Col>
            <Col className="d-flex gap-4">
                {data &&
                    data.map((item) => (
                        <label key={item}>
                            <Field type="checkbox" name="symptoms" value={item} />
                            <span> {item}</span>
                        </label>
                    ))}
            </Col>
        </>
    );
}

export default Symptoms;

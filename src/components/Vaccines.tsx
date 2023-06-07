import { Col, Form as FormBootstrap } from 'react-bootstrap';
import { Field } from 'formik';

function Vaccines() {
    const data = ['None', 'Astra Zenecca', 'Pfizer', 'Moderna', 'Sinopharm'];
    return (
        <>
            <Col lg={12}>
                <p className="h5">Vaccines:</p>
            </Col>
            <Col lg={3}>
                <p>Which one would you like to vaccinate ?:</p>
            </Col>
            <Col className="d-flex gap-4">
                {data &&
                    data.map((item, index) => {
                        if (index === 0) {
                            return (
                                <label key={item}>
                                    <Field type="radio" name="vaccines" value={item} checked />
                                    <span> {item}</span>
                                </label>
                            );
                        }
                        return (
                            <label key={item}>
                                <Field type="radio" name="vaccines" value={item} />
                                <span> {item}</span>
                            </label>
                        );
                    })}
            </Col>
        </>
    );
}

export default Vaccines;

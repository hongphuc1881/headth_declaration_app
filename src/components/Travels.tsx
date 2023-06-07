import { Row, Col, Form as FormBootstrap, Button } from 'react-bootstrap';
import { FieldArray, useFormikContext } from 'formik';
import { ITravels } from '../Type';
import MyDateField from './MyDateField';
import MySelectField from './MySelectField';

interface IProps {
    lengthOfArrayTravels: number;
    arrayTravels: ITravels[];
    listCountry: string[];
}
function Travels(props: IProps) {
    const { lengthOfArrayTravels, arrayTravels, listCountry } = props;
    const { values } = useFormikContext();

    return (
        <>
            <Col lg={12}>
                <p className="h5">Travel:</p>
            </Col>
            <Col lg={12}>
                <FieldArray name="travels">
                    {({ remove, push }) => (
                        <div className="mb-4 ">
                            {(lengthOfArrayTravels > 0 &&
                                arrayTravels.map((travel, index) => (
                                    <Row key={index} className="mb-3">
                                        <Col lg={12}>
                                            <p className="text-primary fw-bold">Travel {index + 1}</p>
                                        </Col>
                                        <Col lg={6}>
                                            <MyDateField
                                                isRequired={false}
                                                label="Departure Date"
                                                name={`travels[${index}].departureDate`}
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <MyDateField
                                                isRequired={false}
                                                label="Immigration Date"
                                                name={`travels[${index}].immigrationDate`}
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <MySelectField
                                                label="Departure"
                                                name={`travels[${index}].departure`}
                                                dataOption={listCountry}
                                                isRequired
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <MySelectField
                                                label="Destination"
                                                name={`travels[${index}].destination`}
                                                dataOption={listCountry}
                                                isRequired
                                            />
                                        </Col>
                                        <Col>
                                            <Button
                                                variant="danger"
                                                type="button"
                                                onClick={() => {
                                                    if (
                                                        Object.values(values.travels[index]).every(
                                                            (item) => item === '',
                                                        )
                                                    ) {
                                                        remove(index);
                                                    } else {
                                                        const confirmDelete = confirm('Do you want to remove?');
                                                        confirmDelete && remove(index);
                                                    }
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Col>
                                    </Row>
                                ))) || <span className="h6 pe-3">Do you travel in the last 14 days ?</span>}

                            <Button
                                variant="warning"
                                className="btn "
                                type="button"
                                onClick={() =>
                                    push({ departureDate: '', immigrationDate: '', departure: '', destination: '' })
                                }
                            >
                                Add more
                            </Button>
                        </div>
                    )}
                </FieldArray>
            </Col>
        </>
    );
}

export default Travels;

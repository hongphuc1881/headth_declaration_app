import { Container, Row, Col, Form as FormBootstrap, Button } from 'react-bootstrap';
import { useField, Formik, Form as FormikForm, Field, ErrorMessage, FieldArray } from 'formik';
interface IProps {
    label: string;
    isRequired: boolean;
    name: string;
    dataOption: string[];
}

function MySelectField({ label, ...props }: IProps) {
    const { isRequired, name, dataOption } = props;

    const [field, meta] = useField(props);
    return (
        <>
            {/*{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}*/}
            <FormBootstrap.Group controlId={name} className="mb-4">
                <FormBootstrap.Label>
                    {label}
                    {isRequired && <span className="text-danger">*</span>}
                </FormBootstrap.Label>

                <Field
                    component="select"
                    name={name}
                    as={FormBootstrap.Select}
                    className="form-select"
                    style={meta.touched && meta.error ? { borderColor: 'red' } : {}}
                >
                    <option value="">-----Choose</option>
                    {dataOption &&
                        dataOption.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                </Field>

                <p className="text-danger">
                    <ErrorMessage name={name} />
                </p>
            </FormBootstrap.Group>
        </>
    );
}
export default MySelectField;

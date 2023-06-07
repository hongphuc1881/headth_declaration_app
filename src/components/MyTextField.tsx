import { Container, Row, Col, Form as FormBootstrap, Button } from 'react-bootstrap';
import { useField, Formik, Form as FormikForm, Field, ErrorMessage, FieldArray } from 'formik';
interface IProps {
    label: string;
    name: string;
    isRequired: boolean;
    placeholder: string;
}

function MyTextField({ label, ...props }: IProps) {
    const [field, meta] = useField(props);
    const { isRequired, placeholder, name } = props;
    return (
        <>
            {/*{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}*/}
            <FormBootstrap.Group controlId={name} className="mb-4">
                <FormBootstrap.Label>
                    {label}
                    {isRequired && <span className="text-danger">*</span>}
                </FormBootstrap.Label>
                <Field
                    type="text"
                    name={name}
                    as={FormBootstrap.Control}
                    placeholder={placeholder}
                    style={meta.touched && meta.error ? { borderColor: 'red' } : {}}
                />
                {meta.touched && meta.error ? <p className="text-danger">{meta.error}</p> : null}
            </FormBootstrap.Group>
        </>
    );
}
export default MyTextField;

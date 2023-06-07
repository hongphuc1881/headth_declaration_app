import { Form as FormBootstrap } from 'react-bootstrap';
import { Field, ErrorMessage, useField } from 'formik';
interface IProps {
    label: string;
    name: string;
    isRequired: boolean;
}

function MyDateField({ label, ...props }: IProps) {
    const { isRequired, name } = props;
    const [field, meta] = useField(name);

    return (
        <>
            {/*{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}*/}
            <FormBootstrap.Group controlId={name} className="mb-4">
                <FormBootstrap.Label>
                    {label}
                    {isRequired && <span className="text-danger">*</span>}
                </FormBootstrap.Label>
                <Field
                    type="date"
                    name={name}
                    as={FormBootstrap.Control}
                    style={meta.touched && meta.error ? { borderColor: 'red' } : {}}
                />
                <p className="text-danger">
                    <ErrorMessage name={name} />
                </p>
            </FormBootstrap.Group>
        </>
    );
}
export default MyDateField;

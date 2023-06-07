import { Container, Row, Col, Form as FormBootstrap, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import countries from '../../../data/countries.json';
import provinces from '../../../data/vietnam-province-district.json';
import * as Yup from 'yup';

import { IForm } from '../../Type';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addForm, updateFormData } from '../../redux/reducer';

import { generate } from 'shortid';
import Personal from '../../components/Personal';
import Contact from '../../components/Contact';
import Symptoms from '../../components/Symtoms';
import Vaccines from '../../components/Vaccines';
import Travels from '../../components/Travels';
import { RootState } from '../../redux/store';
interface IProvince {
    [key: string]: {
        name: string;
        cities: {
            [key: string]: string;
        };
    };
}

function Form() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //start editing form
    const { id } = useParams();
    const listForm = useSelector((state: RootState) => state.listForm.listForm);
    const formDataEditing = listForm.find((item) => item.id === id);

    //end editing form

    const initialValues = formDataEditing
        ? formDataEditing
        : {
              id: '',
              fullName: '',
              object: '',
              dateOfBirth: '',
              gender: '',
              nationality: '',
              nationalID: '',
              travels: [],
              province: '',
              district: '',
              address: '',
              email: '',
              mobile: '',
              symptoms: [],
              vaccines: '',
          };
    // eslint-disable-next-line no-useless-escape
    const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

    const getProvince = (provinces: IProvince) => {
        const province: string[] = [];
        for (const key in provinces) {
            province.push(provinces[key].name);
        }
        return province;
    };

    const listCountry = countries.map((country) => country.name);

    const getDistrict = (provinces: IProvince, keyOfProvinces: string) => {
        const key = Object.keys(provinces).find((key) => provinces[key].name === keyOfProvinces);

        let district: string[] = [];
        if (key) {
            district = Object.values(provinces[key].cities);
        } else {
            district = [];
        }

        return district;
    };

    return (
        <>
            <Container>
                <Row>
                    <Col className="text-center my-4">
                        <h2 className="text-success">MEDICAL DECLARATION FORM FOR FOREIGN ENTRY</h2>
                    </Col>
                </Row>
                <Row>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object().shape({
                            fullName: Yup.string().required(`Full name is required`),
                            object: Yup.string().required('Object is required'),
                            dateOfBirth: Yup.string().required('Date of birth is required'),
                            gender: Yup.string().required('Gender is required'),
                            nationality: Yup.string().required('Nationality is required'),
                            nationalID: Yup.string().required('National ID is required'),
                            travels: Yup.array().of(
                                Yup.object().shape({
                                    departureDate: Yup.string().required('Departure date is required'),
                                    immigrationDate: Yup.string().required('Immigration date is required'),
                                    departure: Yup.string().required('Departure is required'),
                                    destination: Yup.string().required('Destination is required'),
                                }),
                            ),
                            province: Yup.string().required('Province is required'),
                            district: Yup.string().required('District is required'),
                            address: Yup.string().required('Address is required'),
                            email: Yup.string().email('Email is invalid').required('Email is required'),
                            mobile: Yup.string()
                                .matches(phoneRegExp, 'Mobile is invalid')
                                .required('Mobile is required'),
                        })}
                        onSubmit={(values) => {
                            // update form data
                            if (id) {
                                dispatch(updateFormData(values));
                                navigate('/table');
                            } else {
                                const formDataWithId = { ...values, id: generate() };
                                dispatch(addForm(formDataWithId));
                                navigate('/table');
                            }
                        }}
                    >
                        {(props) => (
                            <FormikForm>
                                <Row>
                                    <Personal listCountry={listCountry} />
                                    <Travels
                                        listCountry={listCountry}
                                        lengthOfArrayTravels={props.values.travels.length}
                                        arrayTravels={props.values.travels}
                                    />
                                    <Contact
                                        getProvince={getProvince(provinces)}
                                        getDistrict={getDistrict(provinces, props.values.province)}
                                    />
                                    <Symptoms />
                                    <Vaccines />
                                    <div className="d-flex gap-3 my-3 ">
                                        <Button variant="success" className="btn btn-lg" type="submit">
                                            Success
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="btn btn-lg"
                                            onClick={() => {
                                                //dirty có giá trị mặc định là false
                                                //nhưng chỉ cần người dùng thay đổi dữ liệu trong input thì dirty sẽ có giá trị bằng true
                                                if (props.dirty) {
                                                    const confirmed: boolean = confirm('Do you want to cancel?');
                                                    confirmed && navigate('/table');
                                                } else {
                                                    navigate('/table');
                                                }
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            className="btn btn-lg"
                                            onClick={() => {
                                                //dirty có giá trị mặc định là false
                                                //nhưng chỉ cần người dùng thay đổi dữ liệu trong input thì dirty sẽ có giá trị bằng true
                                                if (props.dirty) {
                                                    const confirmed: boolean = confirm('Do you want to reset?');
                                                    confirmed && props.resetForm();
                                                }
                                            }}
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                </Row>
                            </FormikForm>
                        )}
                    </Formik>
                </Row>
            </Container>
        </>
    );
}

export default Form;

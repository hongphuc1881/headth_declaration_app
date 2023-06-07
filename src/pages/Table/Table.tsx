import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TableBootstrap from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { deleteFormData } from '../../redux/reducer';
import { useState } from 'react';
import { IForm } from '../../Type';

function Table() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getListForm = useSelector((state: RootState) => state.listForm.listForm);

    const [searchText, setSearchText] = useState('');
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        setCurrentPage(1);
    };

    const filterList = getListForm.filter(
        (item) =>
            item.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
            item.dateOfBirth.toLowerCase().includes(searchText.toLowerCase()) ||
            item.id.toLowerCase().includes(searchText.toLowerCase()) ||
            item.gender.toLowerCase().includes(searchText.toLowerCase()) ||
            item.object.toLowerCase().includes(searchText.toLowerCase()),
    );

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(2);
    const total = filterList.length;
    const pages = [];
    for (let i = 1; i <= Math.ceil(total / itemPerPage); i++) {
        pages.push(i);
    }
    const lastItem = currentPage * itemPerPage;
    const firstItem = lastItem - itemPerPage;
    const currentListForm = filterList.slice(firstItem, lastItem);

    return (
        <Container>
            <Row>
                <Col className="text-center pt-5 mb-4">
                    <h1>Vietnam Health Declaration for foreign entry</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <Form>
                        <Form.Control
                            value={searchText}
                            type="text"
                            placeholder="Search..."
                            onChange={handleFilterChange}
                        />
                    </Form>
                </Col>
                <Col className="text-end">
                    <Button onClick={() => navigate('/declaration')} variant="success">
                        New form
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <TableBootstrap bordered hover>
                        <thead className="table-success">
                            <tr>
                                <th>#</th>
                                <th>Form ID</th>
                                <th>Full Name</th>
                                <th>Object</th>
                                <th>Date Of Birth</th>
                                <th>Gender</th>
                                <th>Contact Province</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentListForm.length > 0 ? (
                                currentListForm.map((formItem, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                                className="text-primary"
                                                onClick={() => {
                                                    navigate(`/edit/${formItem.id}`);
                                                }}
                                            />
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                                className="text-danger px-3"
                                                onClick={() => {
                                                    const confirmDelete = confirm(
                                                        `Do you want to delete form with ID: ${formItem.id}`,
                                                    );
                                                    if (confirmDelete) {
                                                        dispatch(deleteFormData(formItem.id));
                                                    }
                                                }}
                                            />
                                            {formItem.id}
                                        </td>
                                        <td>{formItem.fullName}</td>
                                        <td>{formItem.object}</td>
                                        <td>{formItem.dateOfBirth}</td>
                                        <td>{formItem.gender}</td>
                                        <td>{formItem.province}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7}>
                                        <div className="text-center fs-5">No Declarations</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </TableBootstrap>
                </Col>
            </Row>
            <div className="d-flex mt-4 justify-content-center  align-items-center gap-3">
                <Pagination className="m-0">
                    <Pagination.Prev onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
                        {'Previous'}
                    </Pagination.Prev>
                    {pages.map((page, index) => {
                        console.log(index, pages.length - 1);

                        if (index === pages.length - 1) {
                            return (
                                <Pagination.Item
                                    onClick={() => setCurrentPage(page)}
                                    key={page}
                                    active={index + 1 === currentPage}
                                >
                                    {page}
                                </Pagination.Item>
                            );
                        } else if (index > currentPage + 1) {
                            return <Pagination.Ellipsis />;
                        } else {
                            return (
                                <Pagination.Item
                                    onClick={() => setCurrentPage(page)}
                                    key={page}
                                    active={index + 1 === currentPage}
                                >
                                    {page}
                                </Pagination.Item>
                            );
                        }
                    })}
                    <Pagination.Next onClick={() => currentPage < pages.length && setCurrentPage(currentPage + 1)}>
                        {'Next'}
                    </Pagination.Next>
                </Pagination>
                <div className="d-flex align-items-center justify-content-end gap-2">
                    <Form.Select
                        value={itemPerPage}
                        onChange={(e) => {
                            setItemPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                    </Form.Select>
                    <span> Items/Page</span>
                </div>
            </div>
        </Container>
    );
}

export default Table;

import axios from 'axios';
import React from 'react';
import { Badge, Button, ListGroup } from 'react-bootstrap';

const TodosList = ({ toDos, getToDos, showSuccessNotf, showFailNotf, setIsLoading, selectToDo }) => {

    const deleteToDo = id => {
        setIsLoading(true);
        axios.delete(`https://users-backend-dev-eaxb.3.us-1.fl0.io/users/${id}`)
            .then(() => {
                getToDos();
                showSuccessNotf("To do removed successfully");
            })
            .catch(() => showFailNotf())
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <ListGroup as="ol" numbered>
                {
                    toDos.map(toDo => (
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            key={toDo.id}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{toDo.first_name}</div>
                                <ul>
                                    <li>Last_name: <b>{toDo.last_name}</b></li>
                                    <li>Email: <b>{toDo.email}</b></li>
                                    <li>Password: <b>{toDo.password}</b></li>
                                    <li>Birthday: <b>{toDo.birthday}</b></li>
                                </ul>
                                <div className="mt-2">

                                    <Button 
                                        variant='danger'
                                        size='sm'
                                        className="me-1"
                                        onClick={() => deleteToDo(toDo.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button 
                                        variant='warning'
                                        size='sm'
                                        onClick={() => selectToDo(toDo)}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </div>
                            <Badge bg="primary" pill>
                                {toDo.isCompleted ? 'completed' : 'not Completed'}
                            </Badge>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
    );
};

export default TodosList;
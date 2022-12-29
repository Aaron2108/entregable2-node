import axios from 'axios';
import React from 'react';
import { Badge, Button, ListGroup } from 'react-bootstrap';

const TodosList = ({ toDos, getToDos, showSuccessNotf, showFailNotf, setIsLoading, selectToDo }) => {

    const deleteToDo = id => {
        setIsLoading(true);
        axios.delete(`https://todos-crud.fly.dev/api/v1/todos/${id}`)
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
                                <div className="fw-bold">{toDo.title}</div>
                                {toDo.description}
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
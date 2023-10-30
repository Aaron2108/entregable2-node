import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const initialToDo = { first_name: "", last_name: "", email: "", password: "", birthday:"" ,isCompleted: false }

const TodosForm = ({ getToDos, showSuccessNotf, showFailNotf, setIsLoading, toDoSelected, deselectToDo }) => {

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if(toDoSelected) reset(toDoSelected);
        else reset(initialToDo)
    }, [toDoSelected])

    const submit = (data) => {
        setIsLoading(true);
        if(toDoSelected){
            axios.put(`https://users-backend-dev-eaxb.3.us-1.fl0.io/users/${toDoSelected.id}`, data)
                .then(() => {
                    getToDos();
                    showSuccessNotf("To do updated successfully");
                    deselectToDo();
                })
                .catch(() => showFailNotf())
                .finally(() => setIsLoading(false))
        } else {
            axios.post('https://users-backend-dev-eaxb.3.us-1.fl0.io/users', data)
                .then(() => {
                    getToDos()
                    showSuccessNotf("To do created successfully")
                    reset(initialToDo)
                })
                .catch(() => showFailNotf())
                .finally(() => setIsLoading(false))
        }
    }

    return (
        <Form style={{maxWidth: 400}} onSubmit={handleSubmit(submit)}>
            <h3>Create users</h3>
            <Form.Group className="mb-3" controlId="todoForm.first_name">
                <Form.Label>first_name</Form.Label>
                <Form.Control type="text" {...register("first_name")} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="todoForm.last_name">
                <Form.Label>last_name</Form.Label>
                <Form.Control type="text" {...register("last_name")} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="todoForm.email">
                <Form.Label>email</Form.Label>
                <Form.Control type="text" {...register("email")} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="todoForm.password">
                <Form.Label>password</Form.Label>
                <Form.Control type="text" {...register("password")} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="todoForm.birthday">
                <Form.Label>birthday</Form.Label>
                <Form.Control type="text" {...register("birthday")} />
            </Form.Group>

            <Form.Check
                type='checkbox'
                label="Is completed"
                {...register("isCompleted")}
            />
            <Button type="submit" className="mt-3">
                Submit
            </Button>
            { toDoSelected && (
                <Button onClick={deselectToDo} variant="secondary" className="mt-3">
                    Clear
                </Button>
            )}
        </Form>
    );
};

export default TodosForm;
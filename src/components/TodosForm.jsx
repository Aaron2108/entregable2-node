import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const initialToDo = { title: "", description: "", isCompleted: false }

const TodosForm = ({ getToDos, showSuccessNotf, showFailNotf, setIsLoading, toDoSelected, deselectToDo }) => {

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if(toDoSelected) reset(toDoSelected);
        else reset(initialToDo)
    }, [toDoSelected])

    const submit = (data) => {
        setIsLoading(true);
        if(toDoSelected){
            axios.put(`https://todos-crud.fly.dev/api/v1/todos/${toDoSelected.id}`, data)
                .then(() => {
                    getToDos();
                    showSuccessNotf("To do updated successfully");
                    deselectToDo();
                })
                .catch(() => showFailNotf())
                .finally(() => setIsLoading(false))
        } else {
            axios.post('https://todos-crud.fly.dev/api/v1/todos', data)
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
            <h3>Create To do's</h3>
            <Form.Group className="mb-3" controlId="todoForm.Title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" {...register("title")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="toDoForm.description">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    {...register("description")} 
                />
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
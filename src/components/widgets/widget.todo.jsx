import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./css/todo.css"
import {InputGroup, ListGroup, SplitButton, Dropdown} from "react-bootstrap";


export default function WidgetTodo(identifier) {
    const [tasks, setTasks] = useState('')

    useEffect(() => {
        if (tasks !== '') localStorage.setItem("todolist" + identifier.identifier, JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const tasksRaw = localStorage.getItem("todolist" + identifier.identifier);
        setTasks(tasksRaw != null ? JSON.parse(tasksRaw) : []);
    }, []);

    useEffect(() => {
        window.addEventListener("storage", storage => {
            setTasks(storage.newValue === null ? [] : JSON.parse(storage.newValue));
        })
    }, [])

    const addTask = (e) => {
        e.preventDefault();
        // Reading form data and injecting id, setting complete status
        const
            formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries());
            formDataObj.id = tasks.length;
            formDataObj.complete = false;
        setTasks([...tasks, {text: formDataObj.userInput, complete: formDataObj.complete, id: formDataObj.id}]);
    }

    const setComplete = (index) => {
        // console.log(index);
        tasks[index].complete = !tasks[index].complete;
        setTasks([...tasks]);
    }

    const clearComplete = () => {
        let newTasks = [];
        tasks.map((task) => {
            if (!task.complete) {
                newTasks.push(task);
            }
        })
        setTasks([...newTasks])
    }

    return (
        <div>
            <Form onSubmit={addTask}>
            <InputGroup size="lg" className="todo-input" >
                <Form.Control type="text" name="userInput"/>
                <SplitButton
                    variant="secondary"
                    title="Add Task"
                    type="submit"
                    alignRight
                >
                    <Dropdown.Item onClick={() => setTasks([])}>Clear All</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={clearComplete}>Clear Completed</Dropdown.Item>
                </SplitButton>
            </InputGroup>
            </Form>

            <ListGroup>
                {tasks !== '' ? tasks.map((task, index) => (
                    <ListGroup.Item key={index} >
                    <Form.Check
                        type="switch"
                        id={task.id} label={task.text}
                        checked={task.complete}
                        onChange={() => setComplete(index)}
                        className="todo-items"
                    />
                    </ListGroup.Item>
                )) : null}
            </ListGroup>
        </div>
    )
}
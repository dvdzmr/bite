import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


//todo: strikethrough on complete
//todo: fix UI
//todo: add all CSS to this file

export default function WidgetTodo(identifier) {
    const [tasks, setTasks] = useState(undefined)

    useEffect(() => {
        if (tasks !== undefined) localStorage.setItem("todolist" + identifier.identifier, JSON.stringify(tasks));
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
                <Form.Control type="text" name="userInput"/>
                <Button type="submit">
                    Submit
                </Button>
                <Button onClick={clearComplete}>
                    Clear completed
                </Button>
                <Button onClick={() => setTasks([])}>
                    Clear all
                </Button>
            </Form>
            <Form>
                {tasks !== undefined ? tasks.map((task, index) => (
                    <Form.Check
                        key={index} type="switch"
                        id={task.id} label={task.text}
                        checked={task.complete}
                        style={{textDecoration: task.complete ? "line-through" : "none"}}
                        onChange={() => setComplete(index)}
                    />
                )) : null}
            </Form>
        </div>
    )
}
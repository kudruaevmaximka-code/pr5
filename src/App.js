import { useState } from 'react';
import './App.css';

const STATUSES = [
    { value: 'todo', label: 'To Do' },
    { value: 'progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
];

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');

    const today = new Date().toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const addTask = () => {
        if (!title.trim() || !deadline) {
            alert('Название и дедлайн');
            return;
        }
        const newTask = {
            id: Date.now(),
            title: title.trim(),
            deadline,
            status: 'todo',
        };
        setTasks([...tasks, newTask]);
        setTitle('');
        setDeadline('');
    };

    const changeStatus = (id, newStatus) => {
        setTasks(
            tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
        );
    };

    const removeTask = (id) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    return (
        <div className="app">
            <h1>Менеджер задач</h1>
            <p className="today">Сегодня: {today}</p>

            <div className="form">
                <input
                    type="text"
                    placeholder="Название задачи"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <button onClick={addTask}>Добавить</button>
            </div>

            <div className="list">
                <h2>Задачи</h2>
                {tasks.length === 0 ? (
                    <p className="empty">Задач пока нет</p>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="task">
                            <div className="task-info">
                                <span className="task-title">{task.title}</span>
                                <span className="task-deadline">до {task.deadline}</span>
                            </div>
                            <select
                                value={task.status}
                                onChange={(e) => changeStatus(task.id, e.target.value)}
                            >
                                {STATUSES.map((s) => (
                                    <option key={s.value} value={s.value}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                            <button className="remove" onClick={() => removeTask(task.id)}>
                                ✕
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
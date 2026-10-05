import { useState } from 'react';
import './App.css';

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
        </div>
    );
}

export default App;
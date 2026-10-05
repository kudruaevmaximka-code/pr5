import { useState, useEffect } from 'react';
import './App.css';

const STATUSES = [
    { value: 'todo', label: 'To Do' },
    { value: 'progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
];

function App() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const today = new Date().toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const todayISO = new Date().toISOString().split('T')[0];

    const isOverdue = (task) => {
        return task.deadline < todayISO && task.status !== 'done';
    };

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

    const visibleTasks =
        filter === 'all' ? tasks : tasks.filter((t) => t.status === filter);

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

            <div className="filter">
                <span>Фильтр:</span>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">Все</option>
                    {STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                            {s.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="list">
                <h2>Задачи</h2>
                {visibleTasks.length === 0 ? (
                    <p className="empty">Задач пока нет</p>
                ) : (
                    visibleTasks.map((task) => (
                        <div
                            key={task.id}
                            className={`task ${isOverdue(task) ? 'overdue' : ''}`}
                        >
                            <div className="task-info">
                                <span className="task-title">
                                    {task.title}
                                    {isOverdue(task) && (
                                        <span className="overdue-mark">Просрочено</span>
                                    )}
                                </span>
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
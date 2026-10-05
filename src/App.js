import { useState } from 'react';
import './App.css';

function App() {
    const today = new Date().toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="app">
            <h1> Менеджер задач</h1>
            <p className="today">Сегодня: {today}</p>
        </div>
    );
}

export default App;
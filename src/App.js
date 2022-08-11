import React from "react";
import "./App.css"
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Home from './container/Home';
import About from './container/About';
import Todo from './container/Todolist/todo'


function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/Home">Home</Link> | {' '}
                <Link to="/about">About</Link> | {' '}
                <Link to="/Todolist">Todo</Link>
            </nav>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/Todolist" element={<Todo />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
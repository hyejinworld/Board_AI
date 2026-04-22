import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
import BoardForm from './pages/BoardForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BoardList />} />
          <Route path="/detail/:id" element={<BoardDetail />} />
          <Route path="/write" element={<BoardForm />} />
          <Route path="/edit/:id" element={<BoardForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

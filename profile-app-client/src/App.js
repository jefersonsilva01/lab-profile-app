import './App.css';
import { Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

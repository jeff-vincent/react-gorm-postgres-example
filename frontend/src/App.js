import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarDetails from './components/CarDetails';
import PersonForm from './components/PersonForm';
import PersonDetails from './components/PersonDetails';
import CarForm from './components/CarForm';

const App = () => {
  const goAPIHost = process.env.GO_API_HOST
  const goAPIPort = process.env.GO_API_PORT
  
  return (
    <Router>
      <div>
        <h1>Car Management System</h1>
        <Routes>
          <Route exact path="car" element={<CarForm/>} />
          <Route exact path="/car/:id" element={<CarDetails/>} />
          <Route exact path="/person" element={<PersonForm/>} />
          <Route exact path="/person/:id" element={<PersonDetails/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

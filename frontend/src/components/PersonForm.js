import React, { useState } from 'react';
import './styles.css';

const PersonForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);

    console.log('http://127.0.0.1/api/person')

    fetch(`http://127.0.0.1/api/person`, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2 className="title">Create Person</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Name:</label>
          <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PersonForm;

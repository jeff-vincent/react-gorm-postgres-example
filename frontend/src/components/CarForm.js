import React, { useState } from 'react';

const CarForm = () => {
  const [make, setMake] = useState('');
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [ownerId, setOwnerId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('make', make);
      formData.append('color', color);
      formData.append('year', year);
      formData.append('owner_id', ownerId);

      const response = await fetch('http://localhost:8080/car', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Create Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Make:</label>
          <input className="input" type="text" value={make} onChange={(e) => setMake(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="label">Color:</label>
          <input className="input" type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="label">Year:</label>
          <input className="input" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="label">Owner ID:</label>
          <input className="input" type="text" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} />
        </div>
        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CarForm;

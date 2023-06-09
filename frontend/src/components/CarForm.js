import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CarForm = () => {
  const [make, setMake] = useState('');
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [image, setImage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setOwnerId(id);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('make', make);
      formData.append('color', color);
      formData.append('year', year);
      formData.append('owner_id', ownerId);
      formData.append('image', image);
  
      const response = await fetch(`http://127.0.0.1/api/car`, {
        method: 'POST',

        body: formData,
      });
  
      if (response.ok) {
        window.location.reload();
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(file);
    console.log(image);
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
        {!id && (
        <div className="form-group">
          <label className="label">Owner ID:</label>
          <input className="input" type="text" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} />
        </div>
      )}
        <div className="form-group">
          <label className="label">Image:</label>
          <input className="input" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CarForm;

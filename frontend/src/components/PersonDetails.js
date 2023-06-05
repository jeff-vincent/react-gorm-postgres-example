import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

const PersonDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1/api/person/${id}`);
        const data = await response.json();
        setPerson(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!person) {
    return <div>Loading...</div>;
  }

  return (
    <div className="person-details">
      <h2>Person Details</h2>
      <p className="person-name">Name: {person.name}</p>
      <p className="person-id">ID: {person.id}</p>
      <div>
      <p>Cars:</p>
      <ul>
        {person.cars.map((car, index) => (
          <li key={index}>
            <a href={`http://127.0.0.1/car/${car.ID}`}>{car.Make}</a>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default PersonDetails;

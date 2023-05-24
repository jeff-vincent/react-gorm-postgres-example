import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles.css';

const PersonDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/person/${id}`);
        setPerson(response.data);
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
    </div>
  );
};

export default PersonDetails;

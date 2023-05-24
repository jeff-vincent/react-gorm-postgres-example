import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/car/${id}`);
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="car-details">
      <h2 className="car-details__title">Car Details</h2>
      <p className="car-details__info">Make: {car.make}</p>
      <p className="car-details__info">Color: {car.color}</p>
      <p className="car-details__info">Year: {car.year}</p>
      <p className='car-details__info'>Owner: {car.owner.Name}</p>
    </div>
  );
};

export default CarDetails;

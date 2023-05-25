import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/car/${id}`);
        const data = await response.json();
        console.log(data);
        setCar(data);

        // Convert base64 image data to URL
        if (data.image) {
          const base64Image = data.image; // Replace with the property that contains your base64 encoded image data
          const imageUrl = `data:image/jpeg;base64, ${base64Image}`;
          setImageURL(imageUrl);
        }
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
      {imageURL && <img src={imageURL} alt="Car" />}
      <h2 className="car-details__title">Car Details</h2>
      <p className="car-details__info">Make: {car.make}</p>
      <p className="car-details__info">Color: {car.color}</p>
      <p className="car-details__info">Year: {car.year}</p>
      <p className="car-details__info">Owner: {car.person.Name}</p>
      
    </div>
  );
};

export default CarDetails;

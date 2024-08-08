import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import { useParams } from "react-router-dom";
import axios from "axios";

const Property = () => {
  const { propertyId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        console.log("Fetching car with ID:", propertyId);
        const response = await axios.get(
          `http://localhost:5000/api/car/${propertyId}`
        );
        console.log("Response:", response);
        if (!response.data) {
          throw new Error("Car not found");
        }
        setCar(response.data);
      } catch (err) {
        console.error("Error fetching car data:", err);
        setError("Error: Car not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [propertyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const {
    title,
    description,
    price,
    brand,
    model,
    features,
    image,
    userEmail,
    listType,
    category,
    kilometers,
    color,
    country,
    city,
    area,
    engineCapacity,
  } = car;

  const fullAddress = `${area}, ${city}, ${country}`;

  return (
    <div className="max-padd-container rounded-2xl p-3 bg-white pt-32">
      <div className="pb-2 relative">
        <img src={image} alt={title} className="rounded-xl" />
      </div>
      <div className="flex justify-between items-center">
        <span className="bold-16 text-gray-500">{listType}</span>
      </div>
      <h4 className="medium-18 line-clamp-1">{title}</h4>
      <p className="pt-2 mb-4 line-clamp-2">{description}</p>
      <div className="flex justify-between items-center">
        <div className="bold-20">${price}</div>
      </div>
      <div className="pt-4">
        <div className="flex gap-10">
          <h3>Brand: {brand}</h3>
          <h3>Model: {model}</h3>
        </div>

        <p>Features: {features.join(", ")}</p>
        <p>Email: {userEmail}</p>
        <p>Category: {category}</p>
        <p>Kilometers: {kilometers}</p>
        <p>Color: {color}</p>
        <p>Country: {country}</p>
        <p>City: {city}</p>
        <p>Area: {area}</p>
        <p>Engine Capacity: {engineCapacity}</p>
      </div>
      <div className="flex-1">
        <Map address={fullAddress} />
      </div>
    </div>
  );
};

export default Property;

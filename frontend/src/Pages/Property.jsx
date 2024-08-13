import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Map from "../components/Map";
import "leaflet/dist/leaflet.css";

const Property = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/product/${id}`
        );
        setCar(response.data);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError("product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!car) return <div className="text-center p-4">No car found</div>;

  // Destructure necessary fields from car
  const {
    title,
    description,
    price,
    image,
    listType,
    country,
    city,
    area,
    brand,
  } = car;

  // Construct full address
  const fullAddress = `${area || ""}, ${city || ""}, ${country || ""}`;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md pt-32">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-1/2">
          <img
            src={image}
            alt={title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">{title}</h1>
          <p className="text-gray-700 mb-4">{description}</p>
          <p className="text-xl font-bold mb-4">${price}</p>
          <p className="text-xl mb-4">{country}</p>
          <p className="text-xl mb-4">{brand}</p>
          <p className="text-xl mb-4">{listType}</p>
        </div>
      </div>
      <div className="mt-8 h-64">
        <Map address={fullAddress} />
      </div>
    </div>
  );
};
export default Property;

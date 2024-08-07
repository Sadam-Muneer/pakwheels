import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getCar } from "../constants/data";
import { PuffLoader } from "react-spinners";
import {
  MdOutlineSpeed,
  MdOutlineBuild,
  MdOutlineLocationOn,
} from "react-icons/md";
import { FaCar, FaGasPump } from "react-icons/fa";

const Property = () => {
  const { state } = useLocation();
  const { carId } = state || {};
  const { data, isLoading, error } = useQuery(
    ["car", carId],
    () => getCar(carId),
    {
      retry: 1, // Retry once on failure
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader color="#4A90E2" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h4 className="text-red-500">
          Error loading car details. Please try again later.
        </h4>
      </div>
    );
  }

  const {
    title,
    image,
    description,
    price,
    mileage,
    year,
    features,
    location, // Assuming location is part of the data
  } = data;

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row">
        <img src={image} alt={title} className="w-full md:w-1/2 rounded-lg" />
        <div className="md:w-1/2 md:pl-10">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-xl font-bold">${price}</span>
          </div>
          <p className="mb-4">{description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <FaCar className="text-gray-500 mr-2" />
              <span>{year}</span>
            </div>
            <div className="flex items-center">
              <FaGasPump className="text-gray-500 mr-2" />
              <span>{mileage} km</span>
            </div>
            <div className="flex items-center">
              <MdOutlineBuild className="text-gray-500 mr-2" />
              <span>{features.join(", ")}</span>
            </div>
            <div className="flex items-center">
              <MdOutlineLocationOn className="text-gray-500 mr-2" />
              <span>
                {location
                  ? `${location.country}, ${location.city}, ${location.area}`
                  : "Location info not available"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;

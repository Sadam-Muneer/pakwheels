// Item.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Item = ({ car }) => {
  const navigate = useNavigate();

  if (!car) {
    return <div>Loading...</div>;
  }

  const { title, description, price, brand, model, image, listType } = car;

  return (
    <div className="rounded-2xl p-3 bg-white">
      <div className="pb-2 relative">
        <img src={image} alt={title} className="rounded-xl" />
      </div>
      <div className="flex justify-between items-center">
        <h4 className="medium-18 line-clamp-1">{title}</h4>
        <span className="bold-16 text-gray-500">{listType}</span>
      </div>

      <p className="pt-2 mb-4 line-clamp-2">{description}</p>
      <div className="flex justify-between items-center">
        <div className="bold-20">${price}</div>
        <button
          onClick={() => navigate(`/listing/${car.id}`)}
          className="btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

Item.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
  }).isRequired,
};

export default Item;

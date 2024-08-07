import React, { useState, useEffect } from "react";
import { CARS } from "../constants/data"; // Ensure path is correct

const categories = ["All", "Sell", "Buy", "Rent"];
const brands = ["Toyota", "Honda", "Ford", "BMW", "Audi"]; // Add more brands as needed
const models = ["2022", "2023", "2022"]; // Add more models as needed
const colors = ["Red", "Blue", "Green", "Black", "White"]; // Add more colors as needed
const countries = ["Pakistan"]; // Add more countries as needed
const cities = ["Karachi", "Lahore", "Islamabad"]; // Add more cities as needed
const areas = [
  "Clifton",
  "Gulberg",
  "DHA",
  "F-10",
  "Model Town",
  "Bahria Town",
];

const Listing = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filter, setFilter] = useState({
    category: "All",
    brand: "",
    model: "",
    year: "",
    color: "",
    minPrice: 0,
    maxPrice: 1000000, // Set a high initial max price
    minKilometers: 0,
    maxKilometers: 1000000, // Set a high initial max kilometers
    listType: "",
    country: "",
    city: "",
    area: "",
  });

  useEffect(() => {
    if (CARS && CARS.length) {
      console.log("CARS data:", CARS); // Log CARS data
      setCars(CARS);
      applyFilters(CARS);
    } else {
      console.error("No cars data available.");
    }
  }, []);

  useEffect(() => {
    applyFilters(cars);
  }, [filter, cars]);

  const applyFilters = (carList) => {
    const {
      category,
      brand,
      model,
      year,
      color,
      minPrice,
      maxPrice,
      minKilometers,
      maxKilometers,
      listType,
      country,
      city,
      area,
    } = filter;

    const filtered = carList.filter((car) => {
      return (
        (category === "All" ||
          car.listType.toLowerCase().includes(category.toLowerCase())) &&
        (brand === "" ||
          car.brand.toLowerCase().includes(brand.toLowerCase())) &&
        (model === "" ||
          car.model.toLowerCase().includes(model.toLowerCase())) &&
        (year === "" || car.year === parseInt(year)) &&
        (color === "" ||
          car.color.toLowerCase().includes(color.toLowerCase())) &&
        car.price >= minPrice &&
        car.price <= maxPrice &&
        car.kilometers >= minKilometers &&
        car.kilometers <= maxKilometers &&
        (listType === "" ||
          car.listType.toLowerCase() === listType.toLowerCase()) &&
        (country === "" ||
          car.country.toLowerCase().includes(country.toLowerCase())) &&
        (city === "" || car.city.toLowerCase().includes(city.toLowerCase())) &&
        (area === "" || car.area.toLowerCase().includes(area.toLowerCase()))
      );
    });

    setFilteredCars(filtered);
  };

  // Filter handler
  const handleFilterClick = (type) => {
    if (type === "all") {
      setFilter({
        category: "All",
        brand: "",
        model: "",
        year: "",
        color: "",
        minPrice: 0,
        maxPrice: 1000000,
        minKilometers: 0,
        maxKilometers: 1000000,
        listType: "",
        country: "",
        city: "",
        area: "",
      });
    } else {
      setFilter({
        ...filter,
        listType: type,
      });
    }
  };

  // Handle slider change
  const handlePriceSliderChange = (value) => {
    setFilter({
      ...filter,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const handleKilometersSliderChange = (value) => {
    setFilter({
      ...filter,
      minKilometers: value[0],
      maxKilometers: value[1],
    });
  };

  // Determine max price for slider
  const maxPrice = Math.max(...cars.map((car) => car.price), 1000000);
  const maxKilometers = Math.max(...cars.map((car) => car.kilometers), 1000000);

  return (
    <section className="max-padd-container py-16 xl:py-28 rounded-3xl">
      <h2 className="h2 text-center mb-8 py">Car Listings</h2>
      <div className="filter-container mb-4 mx-2 px-2">
        {/* Buttons, Category, and Brand in one row */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <select
              value={filter.category}
              onChange={(e) =>
                setFilter({ ...filter, category: e.target.value })
              }
              className="filter-select"
            >
              <option value="All">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={filter.brand}
              onChange={(e) => setFilter({ ...filter, brand: e.target.value })}
              className="filter-select"
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand} value={brand.toLowerCase()}>
                  {brand}
                </option>
              ))}
            </select>

            <select
              value={filter.model}
              onChange={(e) => setFilter({ ...filter, model: e.target.value })}
              className="filter-select"
            >
              <option value="">Select Model</option>
              {models.map((model) => (
                <option key={model} value={model.toLowerCase()}>
                  {model}
                </option>
              ))}
            </select>

            <select
              value={filter.color}
              onChange={(e) => setFilter({ ...filter, color: e.target.value })}
              className="filter-select"
            >
              <option value="">Select Color</option>
              {colors.map((color) => (
                <option key={color} value={color.toLowerCase()}>
                  {color}
                </option>
              ))}
            </select>

            <select
              value={filter.country}
              onChange={(e) =>
                setFilter({ ...filter, country: e.target.value })
              }
              className="filter-select"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country.toLowerCase()}>
                  {country}
                </option>
              ))}
            </select>

            <select
              value={filter.city}
              onChange={(e) => setFilter({ ...filter, city: e.target.value })}
              className="filter-select"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city.toLowerCase()}>
                  {city}
                </option>
              ))}
            </select>

            <select
              value={filter.area}
              onChange={(e) => setFilter({ ...filter, area: e.target.value })}
              className="filter-select"
            >
              <option value="">Select Area</option>
              {areas.map((area) => (
                <option key={area} value={area.toLowerCase()}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredCars.length > 0 ? (
          <div className="car-list flex flex-wrap justify-center gap-6 mt-10">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="car-item flex flex-col border rounded-lg p-4 bg-white shadow-md w-full sm:w-80 md:w-96"
              >
                <h3 className="text-xl font-bold">{car.title}</h3>
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-auto mt-2"
                />
                <div className="flex">
                  <div className="mt-4 flex-1">
                    <h4 className="text-lg font-semibold">Category</h4>
                    <p>{car.listType}</p>
                  </div>
                  <div className="mt-4 flex-1">
                    <h4 className="text-lg font-semibold">Brand</h4>
                    <p>{car.brand}</p>
                  </div>
                  <div className="mt-4 flex-1">
                    <h4 className="text-lg font-semibold">Model</h4>
                    <p>{car.model}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Km</h4>
                    <p>{car.kilometers} km</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mt-2 flex-1">
                    <h4 className="text-lg font-semibold">Price</h4>
                    <p>PKR {car.price}</p>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-lg font-semibold">Color</h4>
                    <p>{car.color}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mt-2">
                    <h4 className="text-lg font-semibold">Features</h4>
                    <p>{car.features.join(", ")}</p>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-lg font-semibold">Location</h4>
                    <p>
                      {car.country}, {car.city}, {car.area}
                    </p>
                  </div>
                </div>

                <div className="mt-2">
                  <h4 className="text-lg font-semibold">Description</h4>
                  <p>{car.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg mt-8">
            No listings available based on your search
          </p>
        )}
      </div>
    </section>
  );
};

export default Listing;

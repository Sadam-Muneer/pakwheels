import React, { useState, useEffect } from "react";
import axios from "axios";
import { Range } from "react-range";
import Item from "../components/Item";

const categories = ["All", "Sell", "Buy", "Rent"];
const brands = ["Toyota", "Honda", "Ford", "BMW", "Audi"];
const models = ["2022", "2023", "2024"];
const colors = ["Red", "Blue", "Green", "Black", "White"];
const countries = ["Pakistan"];
const cities = ["Karachi", "Lahore", "Islamabad"];
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
    maxPrice: 1000000,
    minKilometers: 0,
    maxKilometers: 1000000,
    listType: "",
    country: "",
    city: "",
    area: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/car/cars")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCars(response.data);
          applyFilters(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
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
        (minPrice === 0 || car.price >= minPrice) &&
        (maxPrice === 1000000 || car.price <= maxPrice) &&
        (minKilometers === 0 || car.kilometers >= minKilometers) &&
        (maxKilometers === 1000000 || car.kilometers <= maxKilometers) &&
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

  const handlePriceSliderChange = (values) => {
    setFilter({
      ...filter,
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const handleKilometersSliderChange = (values) => {
    setFilter({
      ...filter,
      minKilometers: values[0],
      maxKilometers: values[1],
    });
  };

  const maxPrice = Math.max(...cars.map((car) => car.price), 1000000);
  const maxKilometers = Math.max(...cars.map((car) => car.kilometers), 1000000);

  return (
    <section className="max-padd-container py-16 xl:py-28 rounded-3xl">
      <h2 className="h2 text-center mb-8 py">Car Listings</h2>
      <div className="filter-container mb-4 mx-2 px-2">
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
          <div className="filter-controls mt-10 w-52">
            <label className="block mb-2">Price Range</label>
            <Range
              step={1000}
              min={0}
              max={maxPrice}
              values={[filter.minPrice, filter.maxPrice]}
              onChange={(values) => handlePriceSliderChange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    backgroundColor: "#ddd",
                    borderRadius: "4px",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props, index }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "24px",
                    width: "24px",
                    backgroundColor: "#007bff",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              )}
            />
            <div>
              ${filter.minPrice} - ${filter.maxPrice}
            </div>

            <label className="block mb-2 mt-4">Kilometers Range</label>
            <Range
              step={1000}
              min={0}
              max={maxKilometers}
              values={[filter.minKilometers, filter.maxKilometers]}
              onChange={(values) => handleKilometersSliderChange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    backgroundColor: "#ddd",
                    borderRadius: "4px",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props, index }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "24px",
                    width: "24px",
                    backgroundColor: "#007bff",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              )}
            />
            <div>
              {filter.minKilometers} - {filter.maxKilometers} km
            </div>
          </div>
        </div>
      </div>

      <div className="listing-container">
        {filteredCars.length > 0 ? (
          <div className="car-list flex flex-wrap justify-center gap-6 mt-10">
            {filteredCars.map((car) => (
              <Item key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <p className="text-center mt-10">
            No cars found matching the filters.
          </p>
        )}
      </div>
    </section>
  );
};

export default Listing;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Range } from "react-range";
import Item from "../components/Item";

// Define categories, brands, models, etc., if applicable for filtering
const categories = ["All", "Sell", "Buy", "Rent"];
const brands = ["Toyota", "Honda", "Ford", "BMW", "Audi"];
const models = ["2022", "2023", "2024"];
const listTypes = ["For Sale", "Wanted"];

const Listing = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filter, setFilter] = useState({
    category: "All",
    brand: "",
    model: "",
    minPrice: 0,
    maxPrice: 1000000,
    listType: "",
    country: "",
    city: "",
    area: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/product/allproducts") // Adjust API endpoint if needed
      .then((response) => {
        if (Array.isArray(response.data)) {
          setItems(response.data);
          applyFilters(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  useEffect(() => {
    applyFilters(items);
  }, [filter, items]);

  const applyFilters = (itemList) => {
    const {
      category,
      brand,
      model,
      minPrice,
      maxPrice,
      listType,
      country,
      city,
      area,
    } = filter;

    const filtered = itemList.filter((item) => {
      return (
        (category === "All" ||
          item.category.toLowerCase().includes(category.toLowerCase())) &&
        (brand === "" ||
          item.brand.toLowerCase().includes(brand.toLowerCase())) &&
        (model === "" ||
          item.model.toLowerCase().includes(model.toLowerCase())) &&
        (minPrice === 0 || item.price >= minPrice) &&
        (maxPrice === 1000000 || item.price <= maxPrice) &&
        (listType === "" ||
          item.listType.toLowerCase() === listType.toLowerCase()) &&
        (country === "" ||
          item.country.toLowerCase().includes(country.toLowerCase())) &&
        (city === "" || item.city.toLowerCase().includes(city.toLowerCase())) &&
        (area === "" || item.area.toLowerCase().includes(area.toLowerCase()))
      );
    });

    setFilteredItems(filtered);
  };

  const handleFilterClick = (type) => {
    if (type === "all") {
      setFilter({
        category: "All",
        brand: "",
        model: "",
        minPrice: 0,
        maxPrice: 1000000,
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

  const maxPrice = Math.max(...items.map((item) => item.price), 1000000);

  return (
    <section className="max-padd-container py-16 xl:py-28 rounded-3xl">
      <h2 className="h2 text-center mb-8 py">Product Listings</h2>
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
              value={filter.listType}
              onChange={(e) =>
                setFilter({ ...filter, listType: e.target.value })
              }
              className="filter-select"
            >
              <option value="">Select List Type</option>
              {listTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
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
              {/* Add country options */}
            </select>
            <select
              value={filter.city}
              onChange={(e) => setFilter({ ...filter, city: e.target.value })}
              className="filter-select"
            >
              <option value="">Select City</option>
              {/* Add city options */}
            </select>
            <select
              value={filter.area}
              onChange={(e) => setFilter({ ...filter, area: e.target.value })}
              className="filter-select"
            >
              <option value="">Select Area</option>
              {/* Add area options */}
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
          </div>
        </div>
      </div>
      <div className="listing-container">
        {filteredItems.length > 0 ? (
          <div className="item-list flex flex-wrap justify-center gap-6 mt-10">
            {filteredItems.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center mt-10">
            No items found matching the filters.
          </p>
        )}
      </div>
    </section>
  );
};

export default Listing;

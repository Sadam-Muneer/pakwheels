// Properties.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VscSettings } from "react-icons/vsc";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Item from "./Item";
import axios from "axios";

const Properties = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/product/allproducts"
        );
        setCars(response.data);
      } catch (err) {
        console.error("Error fetching item data:", err);
        setError("Error fetching item data");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="max-padd-container">
      <div className="max-padd-container bg-primary py-16 xl:py-28 rounded-3xl">
        <span className="medium-18">Find Your Perfect Car!</span>
        <h2 className="h2">Explore Our Car Listings</h2>
        <div className="flexBetween mt-8 mb-6">
          <h5>
            <span className="font-bold">
              Showing 1-{cars.length < 6 ? cars.length : 6}:
            </span>
            Out of {cars.length} Cars
          </h5>
          <Link
            to={"/"}
            className="bg-white text-3xl rounded-md h-10 w-10 p-2 border"
          >
            <VscSettings />
          </Link>
        </div>
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1124: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1300: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay]}
          className="h-[488px] md:h-[533px] xl:h-[422px] mt-5"
        >
          {cars.slice(0, 6).map((item) => (
            <SwiperSlide key={item.id}>
              <Item item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default Properties;

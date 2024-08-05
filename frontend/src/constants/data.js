// src/data.js

import img1 from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";
import img4 from "../assets/image4.jpg";
import img5 from "../assets/image5.jpg";
import image1 from "../assets/image1.jpg";
import blog1 from "../assets/image2.jpg";
import blog2 from "../assets/image4.jpg";
import blog3 from "../assets/image3.jpg";
import blog4 from "../assets/image5.jpg";
import blogtwo from "../assets/image8.jpg";
import blogthree from "../assets/image5.jpg";
import blogfour from "../assets/image3.jpg";

// Add unique ID and additional fields to each car
export const CARS = [
  {
    id: "1",
    title: "Toyota Camry",
    image: img1,
    category: "Sedan",
    brand: "Toyota",
    model: "2022",
    year: 2022,
    price: "25000",
    kilometers: 15000,
    color: "White",
    description:
      "A reliable car with great features and excellent fuel efficiency.",
    features: ["Air Conditioning", "Navigation System", "Leather Seats"],
    listType: "SELL",
    country: "Pakistan",
    city: "Karachi",
    area: "Clifton",
  },
  {
    id: "2",
    title: "Honda Civic",
    image: img2,
    category: "Sedan",
    brand: "Honda",
    model: "2023",
    year: 2021,
    price: "22000",
    kilometers: 25000,
    color: "White",
    description:
      "Sporty sedan with advanced safety features and a comfortable interior.",
    features: ["Bluetooth", "Backup Camera", "Sunroof"],
    listType: "RENT",
    country: "Pakistan",
    city: "Lahore",
    area: "Gulberg",
  },
  {
    id: "3",
    title: "Ford Mustang",
    image: img3,
    category: "Coupe",
    brand: "Ford",
    model: "2024",
    year: 2020,
    price: "35000",
    kilometers: 10000,
    color: "Black",
    description: "Iconic muscle car with powerful engine and stylish design.",
    features: ["V8 Engine", "Navigation System", "Premium Audio"],
    listType: "SELL",
    country: "Pakistan",
    city: "Islamabad",
    area: "F-10",
  },
  {
    id: "4",
    title: "Chevrolet Tahoe",
    image: img4,
    category: "SUV",
    brand: "Chevrolet",
    // engine capacity ? how many CC
    model: "2022",
    year: 2023,
    price: "60000",
    kilometers: 5000,
    color: "Red",
    description: "Spacious SUV with modern technology and ample cargo space.",
    features: ["Leather Seats", "All-Wheel Drive", "Rear Entertainment System"],
    listType: "SELL",
    country: "Pakistan",
    city: "Karachi",
    area: "Defense",
  },
  {
    id: "5",
    title: "Tesla Model 3",
    image: img5,
    category: "Electric",
    brand: "Tesla",
    model: "2024",
    year: 2024,
    price: "45000",
    kilometers: 2000,
    color: "Red",
    description:
      "Electric vehicle with cutting-edge technology and impressive range.",
    features: ["Autopilot", "Fast Charging", "Navigation System"],
    listType: "RENT",
    country: "Pakistan",
    city: "Lahore",
    area: "DHA",
  },
  {
    id: "6",
    title: "Nissan Altima",
    image: image1,
    category: "Sedan",
    brand: "Nissan",
    model: "2024",
    year: 2019,
    price: "20000",
    kilometers: 30000,
    color: "White",
    description: "Comfortable sedan with a smooth ride and great fuel economy.",
    features: ["Backup Camera", "Bluetooth", "Cruise Control"],
    listType: "SELL",
    country: "Pakistan",
    city: "Karachi",
    area: "Gulshan-e-Iqbal",
  },
  {
    id: "7",
    title: "BMW X5",
    image: blog2,
    category: "SUV",
    brand: "BMW",
    model: "2024",
    year: 2022,
    price: "70000",
    kilometers: 8000,
    color: "White",
    description:
      "Luxury SUV with advanced features and a refined driving experience.",
    features: ["Leather Seats", "Navigation System", "Adaptive Cruise Control"],
    listType: "BUY",
    country: "Pakistan",
    city: "Islamabad",
    area: "F-6",
  },
  {
    id: "8",
    title: "Audi A4",
    image: blog3,
    category: "Sedan",
    brand: "Audi",
    model: "2021",
    year: 2021,
    price: "32000",
    kilometers: 12000,
    color: "Black",
    description:
      "Elegant sedan with a sophisticated design and high performance.",
    features: ["Sunroof", "Navigation System", "Heated Seats"],
    listType: "RENT",
    country: "Pakistan",
    city: "Lahore",
    area: "Model Town",
  },
  {
    id: "9",
    title: "Porsche 911",
    image: blog4,
    category: "Sports",
    brand: "Porsche",
    model: "2020",
    year: 2023,
    price: "100000",
    kilometers: 500,
    color: "Red",
    description:
      "High-performance sports car with a stunning design and superior handling.",
    features: ["Turbocharged Engine", "Navigation System", "Premium Audio"],
    listType: "RENT",
    country: "Pakistan",
    city: "Karachi",
    area: "Bahria Town",
  },
];

export const getCar = (id) => {
  return CARS.find((car) => car.id === id);
};

export const BLOGS = [
  {
    image: blog1,
    title: "The Future of Electric Cars",
    category: "Electric Vehicles",
  },
  {
    image: blogtwo,
    title: "Top 10 SUVs for 2024",
    category: "SUVs",
  },
  {
    image: blogthree,
    title: "Why Choose a Luxury Sedan?",
    category: "Luxury Cars",
  },
  {
    image: blogfour,
    title: "The Best Sports Cars of the Year",
    category: "Sports Cars",
  },
];

export const FOOTER_LINK = [
  {
    title: "Learn More",
    links: [
      "About Us",
      "Latest Listings",
      "Special Offers",
      "Popular Cars",
      "FAQ",
      "Privacy Policy",
    ],
  },
  {
    title: "Our Community",
    links: ["Terms and Conditions", "Special Offers", "Customer Reviews"],
  },
];

export const FOOTER_CONTACT_INFO = {
  title: "Contact Info",
  links: [
    { label: "Email", value: "info@pakwheels.com" },
    { label: "Phone", value: "+923045678910" },
    {
      label: "Address",
      value: "Office 12, PakWheels Plaza, Karachi",
    },
  ],
};

export const SOCIALS = {
  title: "Socials",
  links: [
    { id: 1, url: "https://www.facebook.com" },
    { id: 2, url: "https://www.instagram.com" },
    { id: 3, url: "https://www.twitter.com" },
    { id: 4, url: "https://www.linkedin.com" },
    { id: 5, url: "https://www.youtube.com" },
  ],
};

import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const getAllCars = async () => {
  try {
    const response = await api.get("/product/allproducts", {
      timeout: 10000,
    });
    if (response.status >= 400) {
      throw new Error(response.data.message || "Something went wrong");
    }
    return response.data;
  } catch (error) {
    toast.error(
      `Error fetching cars: ${error.response?.data?.error || error.message}`
    );
    throw error;
  }
};

export const getCar = async (id) => {
  try {
    const response = await api.get(`http://localhost:4000/api/product/${id}`, {
      timeout: 10000,
    });
    if (response.status >= 400) {
      throw new Error(response.data.message || "Something went wrong");
    }
    return response.data;
  } catch (error) {
    toast.error(
      `Error fetching car: ${error.response?.data?.error || error.message}`
    );
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.post("/user/register", { email }, config);
    console.log("User created:", response.data.user);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Something went wrong, please try again";
    console.error("Error creating user:", message);
    toast.error(message);
    throw error;
  }
};

export const createCar = async (carDetails, token) => {
  try {
    const response = await api.post(
      "http://localhost:4000/api/product/",
      carDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Product created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    toast.error(
      `Error creating car: ${error.response?.data?.error || error.message}`
    );
    throw error;
  }
};

export default api;

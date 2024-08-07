import React from "react";
import {
  Box,
  Button,
  Group,
  MultiSelect,
  Slider,
  TextInput,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import api from "../utils/Api";

const Facilities = ({
  prevStep,
  carDetails,
  setCarDetails,
  setOpened,
  setActiveStep,
  token,
}) => {
  const form = useForm({
    initialValues: {
      features: carDetails.features || [],
      kilometers: carDetails.kilometers || 0,
      color: carDetails.color || "",
      listType: carDetails.listType || "",
    },
    validate: {
      features: (value) => (value.length > 0 ? null : "Features are required"),
      kilometers: (value) =>
        value > 0 ? null : "Kilometers must be a positive number",
      color: (value) => (value ? null : "Color is required"),
      listType: (value) => (value ? null : "List Type is required"),
    },
  });

  const handleSubmit = async (values) => {
    try {
      const requestData = {
        ...carDetails,
        ...values,
        features: values.features || [],
      };

      if (!requestData.engineCapacity) {
        throw new Error("Engine Capacity is required");
      }

      console.log("Request data:", requestData);

      const response = await api.post(
        "http://localhost:5000/api/car/car",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Car details added successfully!");
        setOpened(false);
        setActiveStep(0);
        setCarDetails({
          title: "",
          description: "",
          price: "",
          brand: "",
          model: "",
          features: [],
          image: null,
          userEmail: "",
          listType: "",
          category: "",
          kilometers: 0,
          color: "",
          country: "",
          city: "",
          area: "",
          engineCapacity: "",
        });
      } else {
        toast.error("Error adding car details!");
      }
    } catch (error) {
      console.error("Error adding car details:", error);

      let errorMessage =
        "Error adding car details. Please check the console for more information.";

      if (error.response) {
        if (error.response.status === 400) {
          errorMessage =
            error.response.data?.error ||
            "Invalid request. Please check your input.";
        } else if (error.response.status === 409) {
          errorMessage =
            error.response.data?.error || "Car with this title already exists.";
        } else {
          errorMessage =
            error.response.data?.error || "An unexpected error occurred.";
        }
      }

      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Box className="w-full flex justify-center flex-wrap">
        <MultiSelect
          withAsterisk
          data={[
            "Air Conditioning",
            "Bluetooth Connectivity",
            "Navigation System",
          ]}
          placeholder="Select Features"
          {...form.getInputProps("features")}
        />
        <Slider
          min={0}
          max={1000000}
          step={1000}
          label={(value) => `${value} km`}
          {...form.getInputProps("kilometers")}
        />
        <TextInput
          label="Color"
          placeholder="Color"
          {...form.getInputProps("color")}
        />
        <Select
          withAsterisk
          label="List Type"
          placeholder="Pick one"
          data={[
            { value: "SELL", label: "SELL" },
            { value: "BUY", label: "BUY" },
            { value: "RENT", label: "RENT" },
          ]}
          {...form.getInputProps("listType")}
        />
      </Box>
      <Group justify="center" mt="xl">
        <Button onClick={prevStep} type="button">
          Go Back
        </Button>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

Facilities.propTypes = {
  prevStep: PropTypes.func.isRequired,
  carDetails: PropTypes.shape({
    features: PropTypes.arrayOf(PropTypes.string),
    kilometers: PropTypes.number,
    color: PropTypes.string,
    listType: PropTypes.string,
  }).isRequired,
  setCarDetails: PropTypes.func.isRequired,
  setOpened: PropTypes.func.isRequired,
  setActiveStep: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default Facilities;

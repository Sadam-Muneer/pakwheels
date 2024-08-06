import { useForm } from "@mantine/form";
import { useState } from "react";
import { Box, Button, Group, TextInput, Select } from "@mantine/core";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

// Add more logging for debugging
const BasicDetails = ({ prevStep, nextStep, carDetails, setCarDetails }) => {
  const form = useForm({
    initialValues: {
      title: carDetails?.title || "",
      description: carDetails?.description || "",
      price: carDetails?.price || "",
      brand: carDetails?.brand || "",
      model: carDetails?.model || "",
      year: carDetails?.year || "",
      listType: carDetails?.listType || "",
      category: carDetails?.category || "",
    },
  });

  const handleSubmit = (values) => {
    console.log("BasicDetails form values:", values);
    setCarDetails((prev) => ({
      ...prev,
      ...values,
    }));
    nextStep();
  };

  const { getInputProps, onSubmit } = form;

  return (
    <form
      onSubmit={onSubmit((values) => {
        handleSubmit(values);
      })}
    >
      <Box w={"100%"} className="flex justify-center flex-wrap">
        <TextInput
          withAsterisk
          className="mr-4"
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
        <TextInput
          withAsterisk
          className="mr-4"
          label="Description"
          placeholder="Description"
          {...getInputProps("description")}
        />
        <TextInput
          withAsterisk
          className="mr-4"
          label="Price"
          placeholder="Price"
          {...getInputProps("price")}
        />
        <TextInput
          withAsterisk
          className="mr-4"
          label="Brand"
          placeholder="Brand"
          {...getInputProps("brand")}
        />
        <TextInput
          withAsterisk
          className="mr-4"
          label="Model"
          placeholder="Model"
          {...getInputProps("model")}
        />
        <TextInput
          withAsterisk
          className="mr-4"
          label="Year"
          placeholder="Year"
          {...getInputProps("year")}
        />
        <Select
          withAsterisk
          label="Category"
          placeholder="Pick one"
          data={[
            { value: "Sedan", label: "Sedan" },
            { value: "SUV", label: "SUV" },
            { value: "Hatchback", label: "Hatchback" },
          ]}
          {...getInputProps("category")}
        />
        <Select
          withAsterisk
          label="List Type"
          placeholder="Pick one"
          data={[
            { value: "Sale", label: "Sale" },
            { value: "Rent", label: "Rent" },
          ]}
          {...getInputProps("listType")}
        />
      </Box>
      <Group justify="center" mt="xl">
        <Button onClick={prevStep} type="button">
          Go Back
        </Button>
        <Button type="submit">Next step</Button>
      </Group>
    </form>
  );
};

BasicDetails.propTypes = {
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  carDetails: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    brand: PropTypes.string,
    model: PropTypes.string,
    year: PropTypes.string,
    listType: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  setCarDetails: PropTypes.func.isRequired,
};

export default BasicDetails;

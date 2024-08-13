import PropTypes from "prop-types";
import { Box, Button, Group, TextInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BasicDetails = ({
  prevStep,
  carDetails,
  setCarDetails,
  setOpened,
  token,
}) => {
  const navigate = useNavigate();

  // Define the category and listType options
  const categoryOptions = [
    { value: "CAR", label: "Car" },
    { value: "MOBILE", label: "Mobile" },
    { value: "LAPTOP", label: "Laptop" },
    { value: "OTHER", label: "Other" },
  ];

  const listTypeOptions = [
    { value: "SELL", label: "For Sale" },
    { value: "BUY", label: "For Buy" },
  ];

  const modelOptions = Array.from({ length: 2025 - 1900 }, (_, i) => 1900 + i);

  const form = useForm({
    initialValues: {
      title: carDetails.title || "",
      description: carDetails.description || "",
      price: carDetails.price || 0,
      brand: carDetails.brand || "",
      model: carDetails.model || "",
      listType: carDetails.listType || "",
      category: carDetails.category || "",
      additionalInfo: carDetails.additionalInfo || "",
    },
    validate: {
      title: (value) => (value ? null : "Title is required"),
      description: (value) => (value ? null : "Description is required"),
      price: (value) =>
        value > 0 ? null : "Price is required and must be a positive number",
      brand: (value) => (value ? null : "Brand is required"),
      model: (value) => (value ? null : "Model is required"),
      listType: (value) => (value ? null : "List Type is required"),
      category: (value) => (value ? null : "Category is required"),
      additionalInfo: (value) =>
        value.trim().length > 0 ? null : "Additional Info is required",
    },
  });

  const handleSubmit = async (values) => {
    try {
      console.log("Submitting values:", values);
      const response = await fetch("http://localhost:4000/api/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/listing/${data._id}`);
        setOpened(false);
      } else {
        const errorText = await response.text();
        toast.error(`Error: ${errorText || "Unknown error occurred"}`);
      }
    } catch (error) {
      toast.error(
        `An error occurred while submitting the form: ${error.message}`
      );
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box w="100%" className="flex justify-center flex-wrap">
          <TextInput
            withAsterisk
            className="mr-4"
            label="Title"
            placeholder="Title"
            {...form.getInputProps("title")}
          />
          <TextInput
            withAsterisk
            className="mr-4"
            label="Description"
            placeholder="Description"
            {...form.getInputProps("description")}
          />
          <TextInput
            withAsterisk
            className="mr-4"
            label="Price"
            placeholder="Price"
            type="number"
            {...form.getInputProps("price")}
          />
          <TextInput
            withAsterisk
            className="mr-4"
            label="Brand"
            placeholder="Brand"
            {...form.getInputProps("brand")}
          />
          <Select
            withAsterisk
            className="mr-4"
            label="Model"
            placeholder="Select model"
            data={modelOptions.map((year) => ({
              value: year.toString(),
              label: year.toString(),
            }))}
            {...form.getInputProps("model")}
          />
          <Select
            withAsterisk
            className="mr-4"
            label="List Type"
            placeholder="Select list type"
            data={listTypeOptions}
            {...form.getInputProps("listType")}
          />
          <Select
            withAsterisk
            className="mr-4"
            label="Category"
            placeholder="Select category"
            data={categoryOptions}
            {...form.getInputProps("category")}
          />
          <TextInput
            withAsterisk
            className="mr-4"
            label="Additional Info"
            placeholder="Additional Info"
            {...form.getInputProps("additionalInfo")}
          />
        </Box>
        <Group position="right" mt="md">
          <Button type="button" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      <ToastContainer />
    </>
  );
};

BasicDetails.propTypes = {
  prevStep: PropTypes.func.isRequired,
  carDetails: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    brand: PropTypes.string,
    model: PropTypes.string,
    listType: PropTypes.string,
    category: PropTypes.string,
    additionalInfo: PropTypes.string,
  }).isRequired,
  setCarDetails: PropTypes.func.isRequired,
  setOpened: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default BasicDetails;

import PropTypes from "prop-types";
import { Box, Button, Group, TextInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

const BasicDetails = ({ prevStep, nextStep, carDetails, setCarDetails }) => {
  const modelOptions = Array.from({ length: 2025 - 1900 }, (_, i) => 1900 + i);

  const categoryOptions = [
    { value: "Sedan", label: "Sedan" },
    { value: "Hatchback", label: "Hatchback" },
    { value: "Electric Vehicle", label: "Electric Vehicle" },
    { value: "Van", label: "Van" },
  ];

  const form = useForm({
    initialValues: {
      title: carDetails.title || "",
      description: carDetails.description || "",
      price: carDetails.price || "",
      brand: carDetails.brand || "",
      model: carDetails.model || "",
      listType: carDetails.listType || "",
      category: carDetails.category || "",
      kilometers: carDetails.kilometers || "",
      engineCapacity: carDetails.engineCapacity || "",
    },
  });

  const handleSubmit = (values) => {
    setCarDetails((prev) => ({
      ...prev,
      ...values,
    }));
    nextStep();
  };

  return (
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
          placeholder="Select a model"
          data={modelOptions.map((year) => ({
            value: year.toString(),
            label: year.toString(),
          }))}
          {...form.getInputProps("model")}
        />
        <TextInput
          label="Engine Capacity"
          placeholder="Engine Capacity"
          {...form.getInputProps("engineCapacity")}
        />
        <TextInput
          label="Kilometers"
          placeholder="Kilometers"
          {...form.getInputProps("kilometers")}
        />
        <Select
          label="Category"
          placeholder="Select a category"
          data={categoryOptions}
          {...form.getInputProps("category")}
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
    listType: PropTypes.string,
    category: PropTypes.string,
    kilometers: PropTypes.string,
    engineCapacity: PropTypes.string,
  }).isRequired,
  setCarDetails: PropTypes.func.isRequired,
};

export default BasicDetails;

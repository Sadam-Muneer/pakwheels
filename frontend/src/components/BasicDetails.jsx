import { useForm } from "@mantine/form";
import { Box, Button, Group, TextInput, Select } from "@mantine/core";
import PropTypes from "prop-types";

const BasicDetails = ({ prevStep, nextStep, carDetails, setCarDetails }) => {
  const form = useForm({
    initialValues: {
      title: carDetails.title || "",
      description: carDetails.description || "",
      price: carDetails.price || "",
      brand: carDetails.brand || "",
      model: carDetails.model || "",
      listType: carDetails.listType || "",
      category: carDetails.category || "",
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
        <TextInput
          withAsterisk
          className="mr-4"
          label="Model"
          placeholder="Model"
          {...form.getInputProps("model")}
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
  }).isRequired,
  setCarDetails: PropTypes.func.isRequired,
};

export default BasicDetails;

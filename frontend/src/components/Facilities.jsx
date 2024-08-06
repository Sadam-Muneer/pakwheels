import {
  Box,
  Button,
  Group,
  MultiSelect,
  Slider,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import PropTypes from "prop-types";

const Facilities = ({
  prevStep,
  carDetails,
  setCarDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      features: carDetails?.features || [],
      kilometers: carDetails?.kilometers || 0,
      color: carDetails?.color || "",
    },
  });

  const handleSubmit = (values) => {
    setCarDetails((prev) => ({
      ...prev,
      ...values,
    }));
    setOpened(false);
    setActiveStep(0);
  };

  const { getInputProps, setFieldValue, onSubmit, values } = form;

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Box w={"100%"} className="flex justify-center flex-wrap">
        <MultiSelect
          className="mr-4"
          label="Features"
          placeholder="Pick all that apply"
          data={[
            { value: "Air Conditioning", label: "Air Conditioning" },
            { value: "Bluetooth", label: "Bluetooth" },
            { value: "Backup Camera", label: "Backup Camera" },
          ]}
          value={values.features}
          onChange={(value) => setFieldValue("features", value)}
        />
        <Slider
          className="mr-4"
          label="Kilometers Driven"
          value={values.kilometers}
          onChange={(value) => setFieldValue("kilometers", value)}
          min={0}
          max={500000}
          step={1000}
        />
        <TextInput
          className="mr-4"
          label="Color"
          placeholder="Color"
          {...getInputProps("color")}
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
  }).isRequired,
  setCarDetails: PropTypes.func.isRequired,
  setOpened: PropTypes.func.isRequired,
  setActiveStep: PropTypes.func.isRequired,
};

export default Facilities;

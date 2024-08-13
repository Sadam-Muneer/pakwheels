import { useForm } from "@mantine/form";
import { validateString } from "../utils/Common";
import { Button, Group, Select, TextInput } from "@mantine/core";
import Map from "../components/Map";
import useCountries from "../hooks/UseCountries";
import PropTypes from "prop-types";

const AddLocation = ({ carDetails, setCarDetails, nextStep }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: carDetails.country || "",
      city: carDetails.city || "",
      area: carDetails.area || "",
    },
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      area: (value) => validateString(value),
    },
  });

  const { country, city, area } = form.values;

  const handleSubmit = () => {
    const { errors } = form.validate();
    if (Object.keys(errors).length === 0) {
      setCarDetails((prev) => ({ ...prev, country, city, area }));
      nextStep();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-2">
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country")}
          />
          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            {...form.getInputProps("city")}
          />
          <TextInput
            w={"100%"}
            withAsterisk
            label="Area"
            {...form.getInputProps("area")}
          />
        </div>
        <div className="md:flex-1 p-2 md:mt-0 mt-4">
          <Map address={area} city={city} country={country} centered />
        </div>
      </div>
      <Group justify="center" mt="xl">
        <Button type="submit">Next step</Button>
      </Group>
    </form>
  );
};

AddLocation.propTypes = {
  carDetails: PropTypes.shape({
    country: PropTypes.string,
    city: PropTypes.string,
    area: PropTypes.string,
  }).isRequired,
  setCarDetails: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default AddLocation;

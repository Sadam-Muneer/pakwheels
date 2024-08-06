import PropTypes from "prop-types";
import { Container, Modal, Stepper } from "@mantine/core";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AddLocation from "./AddLocation";
import UploadImage from "./UploadImage";
import Facilities from "./Facilities";
import BasicDetails from "./BasicDetails";

const AddPropertyModel = ({ opened, setOpened }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { user, isAuthenticated } = useAuth0();

  const [carDetails, setCarDetails] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    model: "",
    year: "",
    features: "",
    image: null,
    userEmail: "",
    listType: "",
    category: "",
    kilometers: "",
    color: "",
    country: "",
    city: "",
    area: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setCarDetails((prevDetails) => ({
        ...prevDetails,
        userEmail: user.email || "",
      }));
    }
  }, [isAuthenticated, user]);

  const nextStep = () => {
    console.log("Current Step:", activeStep);
    console.log("Car Details:", carDetails);
    setActiveStep((current) => current + 1);
  };

  const prevStep = () => setActiveStep((current) => current - 1);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"34rem"} w={"100%"}>
        <Stepper
          active={activeStep}
          onStepClick={setActiveStep}
          allowNextStepsSelect={false}
        >
          <Stepper.Step
            label="Location"
            description="Address"
            onClick={nextStep}
          >
            <AddLocation
              carDetails={carDetails}
              setCarDetails={setCarDetails}
              nextStep={nextStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Upload Image" description="Verify Image">
            <UploadImage
              carDetails={carDetails}
              setCarDetails={setCarDetails}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Basics" description="Details">
            <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              carDetails={carDetails}
              setCarDetails={setCarDetails}
            />
          </Stepper.Step>

          <Stepper.Step label="Facilities" description="Get full access">
            <Facilities
              prevStep={prevStep}
              carDetails={carDetails}
              setCarDetails={setCarDetails}
              setOpened={setOpened}
              setActiveStep={setActiveStep}
            />
          </Stepper.Step>
          <Stepper.Completed></Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};

AddPropertyModel.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
};

export default AddPropertyModel;

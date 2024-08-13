import PropTypes from "prop-types";
import { Container, Modal, Stepper } from "@mantine/core";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AddLocation from "./AddLocation";
import UploadImage from "./UploadImage";

import BasicDetails from "./BasicDetails";

const AddPropertyModel = ({ opened, setOpened }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");

  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: 0,
    brand: "",
    model: "",
    features: {},
    image: "",
    listType: "",
    category: "",
    additionalInfo: {},
    userId: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        userId: user.sub || "",
      }));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        setToken(token);
      }
    };
    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  const nextStep = () => setActiveStep((current) => current + 1);
  const prevStep = () => setActiveStep((current) => current - 1);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size="90rem"
    >
      <Container h="34rem" w="100%">
        <Stepper
          active={activeStep}
          onStepClick={setActiveStep}
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Location" description="Address">
            <AddLocation
              carDetails={productDetails}
              setCarDetails={setProductDetails}
              nextStep={nextStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Upload Image" description="Verify Image">
            <UploadImage
              carDetails={productDetails}
              setCarDetails={setProductDetails}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Basics" description="Details">
            <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              carDetails={productDetails}
              setCarDetails={setProductDetails}
            />
          </Stepper.Step>

          <Stepper.Completed>
            {/* Add any completion content here if needed */}
          </Stepper.Completed>
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

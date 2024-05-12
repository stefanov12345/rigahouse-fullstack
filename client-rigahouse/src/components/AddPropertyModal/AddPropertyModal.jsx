import { Container, Modal, Stepper } from "@mantine/core";
import React, { useEffect, useState } from "react";
import AddLocation from "../Addlocation/AddLocation.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImages.jsx";
import Facilities from "../Facilities/Facilities.jsx";
import BasicDetails from "../BasicDetails/BasicDetails.jsx";

const AddPropertyModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();

  const [propertyDetails, setPropertyDetails] = useState({
    userEmail: "",
    title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
  });

  useEffect(() => {
    setPropertyDetails((prev) => ({ ...prev, userEmail: user?.email }));
  }, []);

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current < 0 ? current - 1 : current));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          <Stepper.Step label='location' description='Address'>
            <AddLocation
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
            <div></div>
          </Stepper.Step>
          <Stepper.Step label='Images' description='Upload '>
            <UploadImage
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
            <div></div>
          </Stepper.Step>
          <Stepper.Step label='Basics' description='Details'>
            <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
            <div></div>
          </Stepper.Step>

          <Stepper.Step>
            <Facilities
              prevStep={prevStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              setOpened={setOpened}
              setActiveStep={setActive}
            />
          </Stepper.Step>
          <div></div>
          <Stepper.Completed>
          Completado, haz clic en el botón de retroceso para volver al paso anterior.
            <div></div>
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};
export default AddPropertyModal;

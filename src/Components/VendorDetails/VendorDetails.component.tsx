import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  DisplayVendorsHolder,
  EditButton,
  EditButtonHolder,
  EditText,
  EditVendorDetailsButtonNameContainer,
  IconEdit,
  VendorDetailsList,
  InformationOfVendor,
  HorizontalLine,
  TextHolders,
  VendorDetailsContainer,
  DetailsHolder,
  DetailsHeaderText,
  PopupInputsContainer,
  InputOfPopupHolder,
  PopupName,
} from "./style/VendorDetails.style";

//redux
import {
  Vendor,
  fetchVendorsById,
  vendorForm,
} from "redux/Containers/VendorForm/VendorFormSlice";
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";

const VendorDetails: FC<{}> = () => {
  const [vendorsId, setVendorsId] = useState<Vendor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [paymentTerms, setPaymentTerms] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  console.log(email);
  const dispatch: AppDispatch = useDispatch();

  const { id } = useParams();
  const vendorId = id ? parseInt(id) : 0;

  //get userId from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  //get vendor by id
  useEffect(() => {
    if (vendorId) {
      dispatch(fetchVendorsById({ vendorId }))
        .then((result: any) => {
          if (fetchVendorsById.fulfilled.match(result)) {
            console.log(result.payload);
            setVendorsId(result.payload);
          } else {
            console.error("Apartment details not found.");
          }
        })
        .catch((error: any) => {
          console.error("Error fetching apartment details:", error);
        });
    }
  }, [dispatch, vendorId]);

  //edit button click
  const handleEdit = (vendor: any) => {
    console.log(vendor);
    setIsModalOpen(true);
    setSelectedItem(vendor);
  };

  const vendorCredentials = {
    id: vendorId,
    companyName: companyName,
    email: email,
    phoneNumber: phoneNumber,
    contactPersonName: contactName,
    notes: notes,
    paymentTerms: paymentTerms,
    bankName: bankName,
    modifiedBy: {
      id: userId,
    },
  };
  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      await dispatch(vendorForm({ vendorCredentials }));
      const updatedVendorsId = vendorsId.map((vendor: any) => {
        if (vendor.id === selectedItem[0]?.id) {
          // Assuming the vendor ID is present in the selectedItem
          return { ...selectedItem[0] };
        }
        return vendor;
      });

      setVendorsId(updatedVendorsId);
      localStorage.setItem("vendorsData", JSON.stringify(updatedVendorsId));
      setCompanyName("");
      setEmail("");
      setContactName("");
      setNotes("");
      setPaymentTerms("");
      setPhoneNumber("");
      setBankName("");
      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error("Register failed!", error);
    }
  };

  const handleInput = (field: string, value: any) => {
    if (selectedItem && selectedItem.length > 0) {
      const updatedItem = { ...selectedItem[0], [field]: value };
      setSelectedItem([updatedItem]);
    }
  };
  const handleInputChange = (event: any) => {
    // Updating state with the new input value
    setEmail(event.target.value);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {vendorsId && (
        <VendorDetailsList>
          <EditButtonHolder>
            <EditButton>
              <EditVendorDetailsButtonNameContainer
                onClick={() => handleEdit(vendorsId)}
              >
                <IconEdit />
                <EditText>Edit </EditText>
              </EditVendorDetailsButtonNameContainer>
            </EditButton>
          </EditButtonHolder>
          <DisplayVendorsHolder>
            <VendorDetailsContainer>
              <DetailsHolder>
                <TextHolders>
                  <DetailsHeaderText>Company Name</DetailsHeaderText>
                  <HorizontalLine />
                  <DetailsHeaderText>Email</DetailsHeaderText>
                  <HorizontalLine />
                  <DetailsHeaderText>Phone Number</DetailsHeaderText>
                  <HorizontalLine />
                  <DetailsHeaderText>Contact Name</DetailsHeaderText>
                  <HorizontalLine />
                  <DetailsHeaderText>Notes</DetailsHeaderText>
                  <HorizontalLine />
                  <DetailsHeaderText>Payment Terms</DetailsHeaderText>
                  <HorizontalLine />
                  <DetailsHeaderText>Bank Name</DetailsHeaderText>
                </TextHolders>

                {vendorsId.map((vendor: any, index: any) => (
                  <TextHolders key={index}>
                    <InformationOfVendor>
                      {vendor.companyName}
                    </InformationOfVendor>
                    <HorizontalLine />
                    <InformationOfVendor>{vendor.email}</InformationOfVendor>
                    <HorizontalLine />
                    <InformationOfVendor>
                      {vendor.phoneNumber}
                    </InformationOfVendor>
                    <HorizontalLine />
                    <InformationOfVendor>
                      {vendor.contactPersonName}
                    </InformationOfVendor>
                    <HorizontalLine />
                    <InformationOfVendor>{vendor.notes}</InformationOfVendor>
                    <HorizontalLine />
                    <InformationOfVendor>
                      {vendor.paymentTerms}
                    </InformationOfVendor>
                    <HorizontalLine />
                    <InformationOfVendor>{vendor.bankName}</InformationOfVendor>
                  </TextHolders>
                ))}
              </DetailsHolder>
            </VendorDetailsContainer>
          </DisplayVendorsHolder>
        </VendorDetailsList>
      )}
      {selectedItem && selectedItem.length > 0 && (
        <Popup
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          headerContent={<PopupName>Edit Vendor</PopupName>}
          bodyContent={
            <>
              {selectedItem && (
                <>
                  <PopupInputsContainer>
                    <InputOfPopupHolder>
                      <GenericInput
                        input_label="Company Name"
                        type="text"
                        value={selectedItem[0]?.companyName || ""}
                        onChange={(e: any) => setCompanyName(e.target.value)}
                      />
                    </InputOfPopupHolder>
                    <InputOfPopupHolder>
                      <GenericInput
                        input_label="Email"
                        value={selectedItem[0]?.email || ""}
                        onChange={handleInputChange}
                      />
                    </InputOfPopupHolder>
                  </PopupInputsContainer>
                  <PopupInputsContainer>
                    <InputOfPopupHolder>
                      <GenericInput
                        input_label="Phone Number"
                        value={selectedItem[0]?.phoneNumber || ""}
                        onChange={(e: any) =>
                          handleInput("phoneNumber", e.target.value)
                        }
                      />
                    </InputOfPopupHolder>
                    <InputOfPopupHolder>
                      <GenericInput
                        input_label="Contact Name"
                        value={selectedItem[0]?.contactPersonName || ""}
                        onChange={(e: any) =>
                          handleInput("contactPersonName", e.target.value)
                        }
                      />
                    </InputOfPopupHolder>
                  </PopupInputsContainer>
                  <PopupInputsContainer>
                    <InputOfPopupHolder>
                      <GenericInput
                        input_label="Notes"
                        type="text"
                        value={selectedItem[0]?.notes || ""}
                        onChange={(e: any) =>
                          handleInput("notes", e.target.value)
                        }
                      />
                    </InputOfPopupHolder>
                    <InputOfPopupHolder>
                      <GenericInput
                        input_label="Payment Terms"
                        type="text"
                        value={selectedItem[0]?.paymentTerms || ""}
                        onChange={(e: any) =>
                          handleInput("paymentTerms", e.target.value)
                        }
                      />
                    </InputOfPopupHolder>
                  </PopupInputsContainer>
                </>
              )}
              <PopupInputsContainer>
                <InputOfPopupHolder>
                  <GenericInput
                    input_label="Bank Name"
                    value={selectedItem[0]?.bankName || ""}
                    onChange={(e: any) =>
                      handleInput("bankName", e.target.value)
                    }
                  />
                </InputOfPopupHolder>
              </PopupInputsContainer>
            </>
          }
          footerContent={<GenericButton onClick={handleSave} name="Save" />}
        />
      )}
    </div>
  );
};

export default VendorDetails;

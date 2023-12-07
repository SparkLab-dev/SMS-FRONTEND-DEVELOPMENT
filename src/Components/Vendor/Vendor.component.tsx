import { FC, useState } from "react";

//style
import { VendorInput, VendorInputsHolder } from "./style/Vendor.style";
import { FormName, StyledForm } from "App/style/App.style";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { vendorForm } from "redux/Containers/VendorForm/VendorFormSlice";

const Vendor: FC<{}> = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [paymentTerms, setPaymentTerms] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");

  //email validation
  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  //get userId from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  const dispatch: AppDispatch = useDispatch();

  const vendorCredentials = {
    companyName: companyName,
    email: email,
    phoneNumber: phoneNumber,
    contactPersonName: name,
    notes: notes,
    paymentTerms: paymentTerms,
    bankName: bankName,
    createdBy: {
      id: userId,
    },
    modifiedBy: {
      id: userId,
    },
  };
  const handleVendorClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (email === null || name === "" || phoneNumber === "") {
      console.log("Missing required information!");
    } else if (!validateEmail(email)) {
      console.log("Invalid email format!");
    } else {
      try {
        await dispatch(vendorForm({ vendorCredentials }));
        setCompanyName("");
        setEmail("");
        setName("");
        setNotes("");
        setPaymentTerms("");
        setPhoneNumber("");
        setBankName("");
      } catch (error) {
        console.error("Register failed!", error);
      }
    }
  };
  return (
    <>
      <StyledForm>
        <FormName>Vendor</FormName>
        <VendorInputsHolder>
          <VendorInput>
            <GenericInput
              input_label="Company Name"
              placeholder="Company Name"
              type="text"
              value={companyName || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompanyName(e.target.value)
              }
            />
          </VendorInput>
          <VendorInput>
            <GenericInput
              input_label="Email"
              placeholder="Email"
              type="email"
              required={true}
              value={email || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </VendorInput>
        </VendorInputsHolder>
        <VendorInputsHolder>
          <VendorInput>
            <GenericInput
              input_label="Phone number"
              placeholder="Phone number"
              type="cel"
              required={true}
              value={phoneNumber || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhoneNumber(e.target.value)
              }
            />
          </VendorInput>
          <VendorInput>
            <GenericInput
              input_label="Name"
              placeholder="Name"
              type="text"
              required={true}
              value={name || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </VendorInput>
        </VendorInputsHolder>
        <VendorInputsHolder>
          <VendorInput>
            <GenericInput
              input_label="Notes"
              placeholder="Notes"
              type="text"
              value={notes || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNotes(e.target.value)
              }
            />
          </VendorInput>
          <VendorInput>
            <GenericInput
              input_label="Payment Terms"
              placeholder="Payment Terms"
              type="text"
              value={paymentTerms || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPaymentTerms(e.target.value)
              }
            />
          </VendorInput>
        </VendorInputsHolder>
        <VendorInputsHolder>
          <VendorInput>
            <GenericInput
              input_label="Bank name"
              placeholder="Bank name"
              type="text"
              value={bankName || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBankName(e.target.value)
              }
            />
          </VendorInput>
        </VendorInputsHolder>
        <GenericButton name="Submit" onClick={handleVendorClick} />
      </StyledForm>
    </>
  );
};

export default Vendor;
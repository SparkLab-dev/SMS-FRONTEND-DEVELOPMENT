import { FC, useState } from "react";

//style
import { VendorInput, VendorInputsHolder } from "./style/Vendor.style";
import { FormName, StyledForm } from "App/style/App.style";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";

const Vendor: FC<{}> = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [paymentTerms, setPaymentTerms] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
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
              required={true}
              value={companyName || ""}
              onChange={(e: any) => setCompanyName(e)}
            />
          </VendorInput>
          <VendorInput>
            <GenericInput
              input_label="Email"
              placeholder="Email"
              type="email"
              required={true}
              value={email || ""}
              onChange={(e: any) => setEmail(e)}
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
              onChange={(e: any) => setPhoneNumber(e)}
            />
          </VendorInput>
          <VendorInput>
            <GenericInput
              input_label="Name"
              placeholder="Name"
              type="text"
              required={true}
              value={name || ""}
              onChange={(e: any) => setName(e)}
            />
          </VendorInput>
        </VendorInputsHolder>
        <VendorInputsHolder>
          <VendorInput>
            <GenericInput
              input_label="Notes"
              placeholder="Notes"
              type="text"
              required={true}
              value={notes || ""}
              onChange={(e: any) => setNotes(e)}
            />
          </VendorInput>
          <VendorInput>
            <GenericInput
              input_label="Payment Terms"
              placeholder="Payment Terms"
              type="text"
              required={true}
              value={paymentTerms || ""}
              onChange={(e: any) => setPaymentTerms(e)}
            />
          </VendorInput>
        </VendorInputsHolder>
        <VendorInputsHolder>
          <VendorInput>
            <GenericInput
              input_label="Bank name"
              placeholder="Bank name"
              type="text"
              required={true}
              value={bankName || ""}
              onChange={(e: any) => setBankName(e)}
            />
          </VendorInput>
        </VendorInputsHolder>
        <GenericButton name="Submit" />
      </StyledForm>
    </>
  );
};

export default Vendor;

import { FormName } from "App/style/App.style";
import { FC, useState } from "react";
import {
  GenericLeadSourceInputHold,
  InputsLeadSourceContainer,
  LeadSourceBillingAddressFormHolder,
  LeadSourceShipingAddressFormHolder,
} from "./style/LeadSource.style";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import { setProductForm } from "redux/Containers/ProductForm/ProductFormSlice";

const LeadSource: FC<{}> = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [leadSource, setLeadSource] = useState<string>("");
  const [annualRevenue, setAnnualRevenue] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [leadStatus, setLeadStatus] = useState<string>("");
  const [numberOfEmployees, setNumberOfEmployees] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [productName, setProductName] = useState<string>("");

  return (
    <div style={{ display: "flex", width: "100%", height: "80vh" }}>
      {/* <div style={{ display: "flex", flexDirection: "column", width: "100%" }}> */}
      <div style={{ flex: "1" }}>
        <LeadSourceShipingAddressFormHolder>
          <FormName>Shipping Address</FormName>
          <InputsLeadSourceContainer>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="FirstName"
                input_label="FirstName"
                required={true}
                type="text"
                value={firstName || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstName(e.target.value)
                }
              />{" "}
            </GenericLeadSourceInputHold>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="LastName"
                input_label="LastName"
                required={true}
                type="text"
                value={lastName || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLastName(e.target.value)
                }
              />
            </GenericLeadSourceInputHold>
          </InputsLeadSourceContainer>
          <InputsLeadSourceContainer>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="Company"
                input_label="Company"
                required={true}
                type="text"
                value={company || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCompany(e.target.value)
                }
              />{" "}
            </GenericLeadSourceInputHold>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="Lead Source Name"
                input_label="Lead Source Name"
                required={true}
                type="text"
                value={leadSource || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLeadSource(e.target.value)
                }
              />
            </GenericLeadSourceInputHold>
          </InputsLeadSourceContainer>
          <InputsLeadSourceContainer>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="Annual revenue"
                input_label="Annual revenue"
                required={true}
                type="text"
                value={annualRevenue || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAnnualRevenue(e.target.value)
                }
              />{" "}
            </GenericLeadSourceInputHold>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="Phone"
                input_label="Phone"
                required={true}
                type="text"
                value={phone || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPhone(e.target.value)
                }
              />{" "}
            </GenericLeadSourceInputHold>
          </InputsLeadSourceContainer>
          <InputsLeadSourceContainer>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="Email"
                input_label="Email"
                required={true}
                type="email"
                value={email || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />{" "}
            </GenericLeadSourceInputHold>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="Website"
                input_label="Website"
                required={true}
                type="text"
                value={website || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setWebsite(e.target.value)
                }
              />{" "}
            </GenericLeadSourceInputHold>
          </InputsLeadSourceContainer>
        </LeadSourceShipingAddressFormHolder>
      </div>
      <div style={{ flex: "1" }}>
        <LeadSourceBillingAddressFormHolder>
          <FormName> B2B Account</FormName>
          <InputsLeadSourceContainer>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="Description"
                input_label="Description"
                required={true}
                type="text"
                value={description || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
              />
            </GenericLeadSourceInputHold>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="Lead Status"
                input_label="Lead Status"
                required={true}
                type="text"
                value={leadStatus || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLeadStatus(e.target.value)
                }
              />
            </GenericLeadSourceInputHold>
          </InputsLeadSourceContainer>
          <InputsLeadSourceContainer>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="Number of employees"
                input_label="Number of employees"
                required={true}
                type="number"
                value={numberOfEmployees || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNumberOfEmployees(e.target.value)
                }
              />
            </GenericLeadSourceInputHold>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="Address"
                input_label="Address"
                required={true}
                type="text"
                value={address || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
              />
            </GenericLeadSourceInputHold>
          </InputsLeadSourceContainer>
          <InputsLeadSourceContainer>
            {/* <GenericLeadSourceInputHold>
            <AccountLabel>Account</AccountLabel>
            <StyledSelect
              value={selectedPriority}
              onChange={handlePriorityChange}
            >
              <option defaultValue="none">Select an Option</option>
              {accountPriorityOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </StyledSelect>
          </GenericLeadSourceInputHold> */}
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="Product Interest"
                input_label="Product Interest"
                required={true}
                type="number"
                value={productName || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProductName(e.target.value)
                }
              />
            </GenericLeadSourceInputHold>
          </InputsLeadSourceContainer>
          <InputsLeadSourceContainer>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="Created By"
                input_label="Created By"
                required={true}
                type="text"
                //   value={website || ""}
                //   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                //     setWebsite(e.target.value)
                //   }
              />
            </GenericLeadSourceInputHold>
            <GenericLeadSourceInputHold>
              <GenericInput
                placeholder="Modified by"
                input_label="Modified by"
                required={true}
                type="number"
                //   value={employeesNumber || ""}
                //   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                //     setEmployeesNumber(e.target.value)
                //   }
              />
            </GenericLeadSourceInputHold>
          </InputsLeadSourceContainer>

          <GenericButton
            name="Create lead source"
            //   onClick={handleAccountB2BFormClick}
          />
        </LeadSourceBillingAddressFormHolder>
      </div>
    </div>
  );
};

export default LeadSource;

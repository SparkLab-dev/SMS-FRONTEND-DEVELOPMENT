import { FC, useState } from "react";

import { FormName } from "App/style/App.style";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ContactsFormContentHoder,
  GenericContactInputHold,
  InputsOfContactFormContainer,
} from "./style/Contacts.style";

const Contacts: FC<{}> = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fax, setFax] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [leadSourceName, setLeadSourceName] = useState<string>("");

  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  //get userRole from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  //post request
  //   const handleAccountB2BFormClick = async (
  //     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  //   ) => {
  //     e.preventDefault();
  //     try {
  //       const accountCredentials = {
  //         accountName: accountName,
  //         email: email,
  //         accountNumber: accountNumber,
  //         industry: industry,
  //         accountPriority: selectedPriority,
  //         phone: phone,
  //         website: website,
  //         employeesNumber: 5,
  //         description: description,
  //         billingAddress: {
  //           street: street,
  //           city: city,
  //           state: state,
  //           postalCode: postalCode,
  //           country: country,
  //         },
  //         shippingAddress: {
  //           street: shippingAddressStreet,
  //           city: shippingCityAddress,
  //           state: shippingStateAddress,
  //           postalCode: shippingPostalCode,
  //           country: shippingCountry,
  //         },
  //         createdBy: {
  //           id: userId,
  //         },
  //         modifiedBy: {
  //           id: userId,
  //         },
  //         accountType: "B2B",
  //       };
  //       const response = await dispatch(addAccount({ accountCredentials }));

  //       if (addAccount.fulfilled.match(response)) {
  //         navigate("/accountB2BTable");
  //         console.log("Account B2B added!");
  //       }
  //     } catch (error) {
  //       console.log("Error in handleAccountClick:", error);
  //     }
  //   };

  return (
    <div>
      {/* <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ flex: "1" }}>
          <ContactsFormContentHoder>
            <FormName>Address </FormName>
            <InputsOfContactFormContainer>
              <GenericContactInputHold>
                <GenericInput
                  placeholder="Street"
                  input_label="Street"
                  required={true}
                  type="text"
                  value={street || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStreet(e.target.value)
                  }
                />{" "}
              </GenericContactInputHold>
              <GenericContactInputHold>
                <GenericInput
                  placeholder="City"
                  input_label="City"
                  required={true}
                  type="text"
                  value={city || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCity(e.target.value)
                  }
                />
              </GenericContactInputHold>
            </InputsOfContactFormContainer>
            <InputsOfContactFormContainer>
              <GenericContactInputHold>
                <GenericInput
                  placeholder="State"
                  input_label="State"
                  required={true}
                  type="text"
                  value={state || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setState(e.target.value)
                  }
                />{" "}
              </GenericContactInputHold>
              <GenericContactInputHold>
                <GenericInput
                  placeholder="Postal Code"
                  input_label="Postal Code"
                  required={true}
                  type="text"
                  value={postalCode || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPostalCode(e.target.value)
                  }
                />
              </GenericContactInputHold>
            </InputsOfContactFormContainer>
            <InputsOfContactFormContainer>
              <GenericContactInputHold>
                <GenericInput
                  placeholder="Country"
                  input_label="Country"
                  required={true}
                  type="text"
                  value={country || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCountry(e.target.value)
                  }
                />{" "}
              </GenericContactInputHold>
            </InputsOfContactFormContainer>
          </ContactsFormContentHoder>
        </div>
      </div> */}

      <ContactsFormContentHoder>
        <FormName>Contacts</FormName>
        <InputsOfContactFormContainer>
          <GenericContactInputHold>
            <GenericInput
              placeholder="FirstName"
              input_label="FirstName"
              required={true}
              type="text"
              value={firstName || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
            />
          </GenericContactInputHold>
          <GenericContactInputHold>
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
          </GenericContactInputHold>
        </InputsOfContactFormContainer>
        <InputsOfContactFormContainer>
          <GenericContactInputHold>
            <GenericInput
              placeholder="Phone"
              input_label="Phone"
              required={true}
              type="number"
              value={phone || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
            />
          </GenericContactInputHold>
          <GenericContactInputHold>
            <GenericInput
              placeholder="Fax"
              input_label="Fax"
              required={true}
              type="text"
              value={fax || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFax(e.target.value)
              }
            />
          </GenericContactInputHold>
        </InputsOfContactFormContainer>
        <InputsOfContactFormContainer>
          <GenericContactInputHold>
            <GenericInput
              placeholder="Email"
              input_label="Email"
              required={true}
              type="text"
              value={email || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </GenericContactInputHold>
        </InputsOfContactFormContainer>
        <InputsOfContactFormContainer>
          <GenericContactInputHold>
            <GenericInput
              placeholder="Birthdate"
              input_label="Birthdate"
              required={true}
              type="text"
              value={birthDate || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBirthDate(e.target.value)
              }
            />
          </GenericContactInputHold>
          <GenericContactInputHold>
            <GenericInput
              placeholder="Lead Source Name"
              input_label="Lead Source Name"
              required={true}
              type="numtextber"
              value={leadSourceName || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLeadSourceName(e.target.value)
              }
            />
          </GenericContactInputHold>
        </InputsOfContactFormContainer>
   
        
          <InputsOfContactFormContainer>
            <GenericContactInputHold>
              <GenericInput
                placeholder="Street"
                input_label="Street"
                required={true}
                type="text"
                value={street || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStreet(e.target.value)
                }
              />{" "}
            </GenericContactInputHold>
            <GenericContactInputHold>
              <GenericInput
                placeholder="City"
                input_label="City"
                required={true}
                type="text"
                value={city || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCity(e.target.value)
                }
              />
            </GenericContactInputHold>
          </InputsOfContactFormContainer>
          <InputsOfContactFormContainer>
            <GenericContactInputHold>
              <GenericInput
                placeholder="State"
                input_label="State"
                required={true}
                type="text"
                value={state || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setState(e.target.value)
                }
              />{" "}
            </GenericContactInputHold>
            <GenericContactInputHold>
              <GenericInput
                placeholder="Postal Code"
                input_label="Postal Code"
                required={true}
                type="text"
                value={postalCode || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPostalCode(e.target.value)
                }
              />
            </GenericContactInputHold>
          </InputsOfContactFormContainer>
          <InputsOfContactFormContainer>
            <GenericContactInputHold>
              <GenericInput
                placeholder="Country"
                input_label="Country"
                required={true}
                type="text"
                value={country || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCountry(e.target.value)
                }
              />{" "}
            </GenericContactInputHold>
          </InputsOfContactFormContainer>
        </ContactsFormContentHoder>

        <GenericButton
          name="Create contact"
          //   onClick={handleAccountB2BFormClick}
        />
      
    </div>
  );
};
export default Contacts;

import {
  ButtonsHolder,
  EditButtonContainer,
  EditProductTableName,
} from "Components/ProductDetails/style/ProductDetails.style";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ContactProps,
  addContact,
  deleteContact,
  fetchContactById,
  getLeadSource,
} from "redux/Pages/Contact/ContactSlice";
import { AppDispatch, RootState } from "redux/store";
import styled from "styled-components";
//mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import Popup from "Components/Popup/Popup.component";
import {
  InputsOfProductTable,
  ProductInputHold,
} from "Components/ProductsTable/style/ProductsTable.style";
import GenericInput from "Components/GenericInput/GenericInput.component";
import { LabelDescriptionContainer, StyledSelect } from "App/style/App.style";
import GenericButton from "Components/GenericButton/GenericButton.component";
import {
  AccountTypeProps,
  getAccountByType,
} from "redux/Pages/AccountType/AccountTypeSlice";
const FlexTableContainer = styled.div`
  display: flex;
  border: 1px solid #000;
  height: 80vh;
`;

const TableHeader = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TableBody = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const TableCell = styled.div`
  border: 1px solid #000;
  padding: 5px 10px;
  height: 39px;
  width: 250px;
`;

const ContactDetails: FC<{}> = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<ContactProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [accountB2B, setAccountB2B] = useState<AccountTypeProps[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [selectedLeadSource, setSelectedLeadSource] = useState<any>("");
  const [leadsource, setLeadSource] = useState<ContactProps[]>([]);
  console.log(selectedContact);

  const dispatch: AppDispatch = useDispatch();

  //get userRole from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  const { id } = useParams();
  const contactId = id ? parseInt(id) : 0;

  //get contacts by id
  useEffect(() => {
    const fetchContact = () => {
      if (contactId) {
        console.log(contactId);
        dispatch(fetchContactById(contactId))
          .then((result: any) => {
            if (fetchContactById.fulfilled.match(result)) {
              const fetchedContact = result.payload[0];
              setContacts(result.payload);
              setSelectedAccount(fetchedContact.account.id);
              setSelectedLeadSource(fetchedContact.leadSource.id);
              console.log(
                "fetchedContact.leadSource.id",
                fetchedContact.leadSource.id
              ); // Ensure this is the correct property for the Lead Source ID
            }
          })
          .catch((error: any) => {
            console.error("Error fetching  contact details:", error);
          });
      }
    };

    fetchContact();
  }, [dispatch, contactId]);

  const handleEdit = (contact: any) => {
    setIsModalOpen(true);
    setSelectedContact(contact);
  };

  //get all leads api call
  useEffect(() => {
    dispatch(getLeadSource())
      .then((result: any) => {
        if (getLeadSource.fulfilled.match(result)) {
          setLeadSource(result.payload);
        } else {
          console.error("Lead Source details not found.");
        }
      })
      .catch((error: any) => {
        console.error("Error fetching Lead Source details:", error);
      });
  }, [dispatch]);

  //delete contact
  const handleDeleteContacts = async (contactId: number) => {
    try {
      const result = await dispatch(deleteContact(contactId));
      if (deleteContact.fulfilled.match(result)) {
        console.log("Contact deleted successfully!");
        setContacts((prevState) =>
          prevState.filter((contact) => contact.id !== contactId)
        );
        navigate("/contactsTable");
      } else {
        console.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  //get account B2B api
  useEffect(() => {
    const handleAccountB2B = async () => {
      try {
        const accountTypeCredentials = {
          type: "B2B",
        };
        const response = await dispatch(
          getAccountByType({ accountTypeCredentials })
        );

        if (getAccountByType.fulfilled.match(response)) {
          setAccountB2B([response.payload]);
        }
      } catch (error) {
        console.log("Error in handleAccountB2B:", error);
      }
    };
    handleAccountB2B();
  }, [dispatch]);

  //post request
  const handleUpdateContactClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const contactCredentials = {
        id: contactId,
        firstName: selectedContact.firstName,
        lastName: selectedContact.lastName,
        phone: selectedContact.phone,
        fax: selectedContact.fax,
        email: selectedContact.email,
        birthdate: selectedContact.birthdate,
        account: {
          id: selectedAccount,
        },
        leadSource: {
          id: selectedLeadSource,
        },
        address: {
          street: selectedContact.address.street,
          city: selectedContact.address.city,
          state: selectedContact.address.state,
          postalCode: selectedContact.address.postalCode,
          country: selectedContact.address.country,
        },
        description: selectedContact.description,
        createdBy: {
          id: userId,
        },
        modifiedBy: {
          id: userId,
        },
      };
      const response = await dispatch(addContact({ contactCredentials }));

      if (addContact.fulfilled.match(response)) {
        const updatedContact = {
          ...selectedContact, // Update with the modified contact details
        };

        const updatedContacts = contacts.map((contact) =>
          contact.id === contactId ? updatedContact : contact
        );

        setContacts(updatedContacts); // Update the state with modified contacts
        setIsModalOpen(false);
        console.log("Contact added!");
      }
    } catch (error) {
      console.log("Error in handleContatcClick:", error);
    }
  };

  const handleLeadSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLeadSource(e.target.value);
  };
  return (
    <>
      <FlexTableContainer>
        <TableHeader>
          <TableCell>Actions</TableCell>
          <TableCell>FirstName</TableCell>
          <TableCell>LastName</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Fax</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Account</TableCell>
          <TableCell>Birthdate</TableCell>
          <TableCell>Lead Source</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Street</TableCell>
          <TableCell>City</TableCell>
          <TableCell>State</TableCell>
          <TableCell>Postal Code</TableCell>
          <TableCell>Country</TableCell>
        </TableHeader>
        {contacts.map((contacts: any, index: number) => (
          <TableBody key={index}>
            <TableCell>
              <ButtonsHolder>
                <EditButtonContainer onClick={() => handleEdit(contacts)}>
                  Edit
                </EditButtonContainer>
                <DeleteIcon
                  style={{
                    color: "#1976d2",
                    textAlign: "center",
                    fontSize: "30px",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDeleteContacts(contacts.id)}
                />
              </ButtonsHolder>
            </TableCell>
            <TableCell>{contacts.firstName}</TableCell>
            <TableCell>{contacts.lastName}</TableCell>
            <TableCell>{contacts.phone}</TableCell>
            <TableCell>{contacts.fax}</TableCell>
            <TableCell>{contacts.email}</TableCell>
            <TableCell>{contacts.account.accountName}</TableCell>
            <TableCell>{contacts.birthdate}</TableCell>
            <TableCell>{contacts.leadSource.name}</TableCell>
            <TableCell>{contacts.description}</TableCell>
            <TableCell>{contacts.address.street}</TableCell>
            <TableCell>{contacts.address.city}</TableCell>
            <TableCell>{contacts.address.state}</TableCell>
            <TableCell>{contacts.address.postalCode}</TableCell>
            <TableCell>{contacts.address.country}</TableCell>
          </TableBody>
        ))}
      </FlexTableContainer>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedContact(null);
        }}
        headerContent={
          <EditProductTableName>Edit Contact</EditProductTableName>
        }
        bodyContent={
          <>
            <div>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="FirstName"
                    type="text"
                    value={selectedContact?.firstName || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        firstName: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="LastName"
                    value={selectedContact?.lastName || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>

              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Phone"
                    value={selectedContact?.phone || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        phone: parseFloat(e.target.value),
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Fax"
                    value={selectedContact?.fax || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        fax: parseFloat(e.target.value),
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Email"
                    value={selectedContact?.email || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        email: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  {" "}
                  <LabelDescriptionContainer>Account</LabelDescriptionContainer>
                  <StyledSelect
                    value={
                      selectedAccount !== undefined && selectedAccount !== null
                        ? selectedAccount.toString()
                        : ""
                    }
                    onChange={(e: any) => {
                      const selectedAccountId = Number(e.target.value);
                      setSelectedAccount(selectedAccountId);
                    }}
                  >
                    <option value="none">Select an Option</option>
                    {accountB2B
                      .flat(1)
                      .filter((account: any) => account.accountType === "B2B")
                      .map((account: any, index: any) => (
                        <option key={index} value={account.accountId}>
                          {account.accountName}
                        </option>
                      ))}
                  </StyledSelect>
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                {" "}
                <ProductInputHold>
                  <GenericInput
                    input_label="Birthdate"
                    type="date"
                    value={selectedContact?.birthdate || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        birthdate: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <LabelDescriptionContainer>
                    Lead Source Name
                  </LabelDescriptionContainer>
                  <StyledSelect
                    value={selectedLeadSource}
                    onChange={handleLeadSourceChange}
                  >
                    <option value="none">Select an Option</option>
                    {leadsource.map((lead: any, index: any) => (
                      <option key={index} value={lead.id}>
                        {lead.name}
                      </option>
                    ))}
                  </StyledSelect>
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                {" "}
                <ProductInputHold>
                  <GenericInput
                    input_label="Description "
                    value={selectedContact?.description || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        description: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Street"
                    value={selectedContact?.address.street || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        address: {
                          ...selectedContact.address,
                          street: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="City "
                    value={selectedContact?.address.city || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        address: {
                          ...selectedContact.address,
                          city: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="State"
                    value={selectedContact?.address.state || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        address: {
                          ...selectedContact.address,
                          state: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Postal Code "
                    value={selectedContact?.address.postalCode || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        address: {
                          ...selectedContact.address,
                          postalCode: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Country"
                    value={selectedContact?.address.country || ""}
                    onChange={(e: any) => {
                      setSelectedContact({
                        ...selectedContact,
                        address: {
                          ...selectedContact.address,
                          country: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
            </div>
          </>
        }
        footerContent={
          <GenericButton onClick={handleUpdateContactClick} name="Save" />
        }
      />
    </>
  );
};

export default ContactDetails;

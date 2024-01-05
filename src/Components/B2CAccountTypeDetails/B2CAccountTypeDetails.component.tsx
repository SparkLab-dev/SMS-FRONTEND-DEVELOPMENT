import {
  ButtonsHolder,
  DisplayProductsHolder,
  EditButtonContainer,
  EditProductTableName,
  InformationOfProduct,
  ProdDetailsHeaderText,
  ProdDetailsHolder,
  ProdTextHolders,
  ProductDetailsComponent,
  ProductDetailsContainer,
  ProductDetailsContentHolder,
  ProductList,
  Productdetails,
} from "Components/ProductDetails/style/ProductDetails.style";
import { FC, useEffect, useState } from "react";
//mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AccountTypeProps,
  addAccount,
  deleteAccount,
  fetchAccountDetailsById,
} from "redux/Pages/AccountType/AccountTypeSlice";
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "Components/Popup/Popup.component";
import {
  InputsOfProductTable,
  ProductInputHold,
} from "Components/ProductsTable/style/ProductsTable.style";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import { GenericB2BInputHold } from "Components/B2BForm/style/B2BForm.style";
import { AccountLabel } from "Components/OrderDetails/style/OrderDetails.style";
import { StyledSelect } from "App/style/App.style";

import { B2CAddressText } from "./style/B2CAccountTypeDetails.style";

const B2CAccountTypeDetails: FC<{}> = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [accountB2C, setAccountB2C] = useState<AccountTypeProps[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [selectedPriority, setSelectedPriority] = useState<string>(""); // State to store selected priority

  console.log(selectedAccount);
  
  const dispatch: AppDispatch = useDispatch();

  //get userId from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  const { id } = useParams();
  const accountId = id ? parseInt(id) : 0;

  // Static options for Account Priority
  const accountPriorityOptions = ["Low", "Medium", "High"];
  // Function to handle changes in the dropdown
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(e.target.value);
  };

  //get account B2B api by id
  useEffect(() => {
    const fetchProduct = () => {
      if (accountId) {
        console.log(accountId);
        dispatch(fetchAccountDetailsById(accountId))
          .then((result: any) => {
            console.log(result);
            if (fetchAccountDetailsById.fulfilled.match(result)) {
              setAccountB2C(result.payload);
              // Set selectedPriority here based on fetched data
              if (result.payload.length > 0) {
                setSelectedPriority(result.payload[0].accountPriority);
              }
            }
          })
          .catch((error: any) => {
            console.error("Error fetching  product details:", error);
          });
      }
    };

    fetchProduct();
  }, [dispatch, accountId]);

  const handleEdit = (account: any) => {
    setIsModalOpen(true);
    setSelectedAccount(account);
  };

  //update
  const handleUpdateAccountB2BFormClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const accountCredentials = {
        accountId: accountId,
        firstName: selectedAccount.firstName,
        lastName: selectedAccount.lastName,
        email: selectedAccount.email,
        accountPriority: selectedPriority,
        phone: selectedAccount.phone,
        description: selectedAccount.description,
        billingAddress: {
          street: selectedAccount.billingAddress.street,
          city: selectedAccount.billingAddress.city,
          state: selectedAccount.billingAddress.state,
          postalCode: selectedAccount.billingAddress.postalCode,
          country: selectedAccount.billingAddress.country,
        },
        shippingAddress: {
          street: selectedAccount.shippingAddress.street,
          city: selectedAccount.shippingAddress.city,
          state: selectedAccount.shippingAddress.state,
          postalCode: selectedAccount.shippingAddress.postalCode,
          country: selectedAccount.shippingAddress.country,
        },
        createdBy: {
          id: userId,
        },
        modifiedBy: {
          id: userId,
        },
        accountType: "B2C",
      };
      const response = await dispatch(addAccount({ accountCredentials }));

      if (response.payload) {
        const updatedProductDetails = accountB2C.map((account) =>
          account.accountId === selectedAccount.accountId
            ? selectedAccount
            : account
        );
        setAccountB2C(updatedProductDetails);
        setIsModalOpen(false);
        setSelectedPriority(selectedAccount.accountPriority); // No need to update here if already updated in handleEdit
      }
    } catch (error) {
      console.log("Error in handleEditAccountClick:", error);
    }
  };

  //delete account api call
  const handleDeleteProduct = async (accountId: number) => {
    try {
      const result = await dispatch(deleteAccount(accountId));
      if (deleteAccount.fulfilled.match(result)) {
        console.log("Account deleted successfully!");
        setAccountB2C((prevState) =>
          prevState.filter((account) => account.accountId !== accountId)
        );
        navigate("/accountB2CTable");
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <Productdetails>
      <ProductDetailsContentHolder>
        <ProductDetailsComponent>
          <ProductList>
            <DisplayProductsHolder>
              <ProductDetailsContainer>
                <ProdDetailsHolder>
                  <ProdTextHolders>
                    <ProdDetailsHeaderText>FirstName</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>LastName</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>
                      Account Priority
                    </ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>Phone</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>Email</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>Description</ProdDetailsHeaderText>
                    <B2CAddressText>Shipping Address</B2CAddressText>
                    <ProdDetailsHeaderText>Street</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>City</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>State</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>Postal Code</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>Country</ProdDetailsHeaderText>
                    <B2CAddressText>Billing Address</B2CAddressText>
                    <ProdDetailsHeaderText>Street</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>City</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>State</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>Postal Code</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>Country</ProdDetailsHeaderText>
                  </ProdTextHolders>
                  {accountB2C.map((accountB2C: any, index: number) => (
                    <>
                      <ProdTextHolders key={index}>
                        <InformationOfProduct>
                          {accountB2C.firstName}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.lastName}
                        </InformationOfProduct>

                        <InformationOfProduct>
                          {accountB2C.accountPriority}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.phone}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.email}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.description}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.shippingAddress.street}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.shippingAddress.city}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.shippingAddress.state}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.shippingAddress.postalCode}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.shippingAddress.country}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.billingAddress.street}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.billingAddress.city}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.billingAddress.state}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.billingAddress.postalCode}
                        </InformationOfProduct>
                        <InformationOfProduct>
                          {accountB2C.billingAddress.country}
                        </InformationOfProduct>
                      </ProdTextHolders>
                      <ButtonsHolder>
                        <EditButtonContainer
                          onClick={() => handleEdit(accountB2C)}
                        >
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
                          onClick={() =>
                            handleDeleteProduct(accountB2C.accountId)
                          }
                        />
                      </ButtonsHolder>
                    </>
                  ))}
                </ProdDetailsHolder>
              </ProductDetailsContainer>
            </DisplayProductsHolder>
          </ProductList>
        </ProductDetailsComponent>
      </ProductDetailsContentHolder>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAccount(null);
        }}
        headerContent={
          <EditProductTableName>Edit Account</EditProductTableName>
        }
        bodyContent={
          <>
            <div>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="FirstName"
                    type="text"
                    value={selectedAccount?.firstName || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        firstName: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="LastName"
                    value={selectedAccount?.lastName || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>

              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericB2BInputHold>
                    <AccountLabel>Account Priority</AccountLabel>
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
                  </GenericB2BInputHold>
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Phone"
                    value={selectedAccount?.phone || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        phone: parseFloat(e.target.value),
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Email"
                    value={selectedAccount?.email || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        email: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Description "
                    value={selectedAccount?.description || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        description: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <B2CAddressText>Shipping Address</B2CAddressText>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Street"
                    value={selectedAccount?.shippingAddress.street || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        shippingAddress: {
                          ...selectedAccount.shippingAddress,
                          street: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="City "
                    value={selectedAccount?.shippingAddress.city || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        shippingAddress: {
                          ...selectedAccount.shippingAddress,
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
                    value={selectedAccount?.shippingAddress.state || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        shippingAddress: {
                          ...selectedAccount.shippingAddress,
                          state: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Postal Code "
                    value={selectedAccount?.shippingAddress.postalCode || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        shippingAddress: {
                          ...selectedAccount.shippingAddress,
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
                    value={selectedAccount?.shippingAddress.country || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        shippingAddress: {
                          ...selectedAccount.shippingAddress,
                          country: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <B2CAddressText>Billing Address</B2CAddressText>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Street"
                    value={selectedAccount?.billingAddress.street || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        billingAddress: {
                          ...selectedAccount.billingAddress,
                          street: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="City "
                    value={selectedAccount?.billingAddress.city || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        billingAddress: {
                          ...selectedAccount.billingAddress,
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
                    value={selectedAccount?.billingAddress.state || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        billingAddress: {
                          ...selectedAccount.billingAddress,
                          state: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Postal Code "
                    value={selectedAccount?.billingAddress.postalCode || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        billingAddress: {
                          ...selectedAccount.billingAddress,
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
                    value={selectedAccount?.billingAddress.country || ""}
                    onChange={(e: any) => {
                      setSelectedAccount({
                        ...selectedAccount,
                        billingAddress: {
                          ...selectedAccount.billingAddress,
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
          <GenericButton
            onClick={handleUpdateAccountB2BFormClick}
            name="Save"
          />
        }
      />
    </Productdetails>
  );
};

export default B2CAccountTypeDetails;

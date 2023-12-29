import {
  ButtonsHolder,
  DisplayProductsHolder,
  EditButtonContainer,
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
  fetchAccountDetailsById,
} from "redux/Pages/AccountType/AccountTypeSlice";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const B2BAccountTypeDetails: FC<{}> = () => {
  const [accountB2B, setAccountB2B] = useState<AccountTypeProps[]>([]);
  console.log(accountB2B);
  const dispatch: AppDispatch = useDispatch();

  const { accountTypeId } = useParams();
  const accountTypeID = accountTypeId ? parseInt(accountTypeId) : 0;

  //get account B2B api
  useEffect(() => {
    const fetchDetails = () => {
      if (accountTypeID) {
        dispatch(fetchAccountDetailsById(accountTypeID))
          .then((result: any) => {
            console.log(result);
            console.log(result.payload);
            if (fetchAccountDetailsById.fulfilled.match(result)) {
              setAccountB2B(result.payload);
              console.log(accountB2B);
            }
          })
          .catch((error: any) => {
            console.error("Error fetching  account details:", error);
          });
      }
    };

    fetchDetails();
  }, [dispatch, accountTypeID]);

  return (
    <Productdetails>
      <ProductDetailsContentHolder>
        <ProductDetailsComponent>
          <ProductList>
            <DisplayProductsHolder>
              <ProductDetailsContainer>
                <ProdDetailsHolder>
                  <ProdTextHolders>
                    <ProdDetailsHeaderText>Account Name</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>Email</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>
                      Account Number
                    </ProdDetailsHeaderText>

                    <ProdDetailsHeaderText>Industry</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>
                      Account Priority
                    </ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>Phone</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>Website</ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>
                      Employees Number
                    </ProdDetailsHeaderText>
                    <ProdDetailsHeaderText>Description</ProdDetailsHeaderText>
                  </ProdTextHolders>
                  {accountB2B.map(
                    (accountB2B: any, index: number) => (
                      // accountB2B.map((accountItem: any, subIndex: number) => (
                      <>
                        <ProdTextHolders key={index}>
                          <InformationOfProduct>
                            {accountB2B.accountName}
                          </InformationOfProduct>

                          <InformationOfProduct>
                            {accountB2B.email}
                          </InformationOfProduct>

                          <InformationOfProduct>
                            {accountB2B.accountNumber}
                          </InformationOfProduct>

                          <InformationOfProduct>
                            {accountB2B.industry}
                          </InformationOfProduct>
                          <InformationOfProduct>
                            {accountB2B.accountPriority}
                          </InformationOfProduct>
                          <InformationOfProduct>
                            {accountB2B.phone}
                          </InformationOfProduct>
                          <InformationOfProduct>
                            {accountB2B.website}
                          </InformationOfProduct>
                          <InformationOfProduct>
                            {accountB2B.employeesNumber}
                          </InformationOfProduct>
                          <InformationOfProduct>
                            {accountB2B.description}
                          </InformationOfProduct>
                        </ProdTextHolders>

                        <ButtonsHolder>
                          <EditButtonContainer
                          //   onClick={() => handleEdit(product)}
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
                            //   onClick={() => handleDeleteProduct(product.id)}
                          />
                        </ButtonsHolder>
                      </>
                    )
                    // ))
                  )}
                </ProdDetailsHolder>
              </ProductDetailsContainer>
            </DisplayProductsHolder>
          </ProductList>
        </ProductDetailsComponent>
      </ProductDetailsContentHolder>
    </Productdetails>
  );
};

export default B2BAccountTypeDetails;

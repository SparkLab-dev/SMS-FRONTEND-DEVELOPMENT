import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//style
import {
  DisplayProductsHolder,
  EditIconHold,
  EditProductButton,
  EditProductButtonHolder,
  EditProductDetailsButtonNameContainer,
  EditProductText,
  HorizontalLine,
  InformationOfProduct,
  ProdDetailsHeaderText,
  ProdDetailsHolder,
  ProdTextHolders,
  ProductDetailsComponent,
  ProductDetailsContainer,
  ProductList,
} from "./style/ProductDetails.style";

//redux
import {
  ProductDetailss,
  fetchProductDetails,
} from "redux/Pages/Product/ProductSlice";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";

//mui icons
import DeleteIcon from "@mui/icons-material/Delete";

//components
import ProductImages from "Components/ProductImages/ProductImages.component";

const ProductDetails: FC<{}> = () => {
  const [productDetails, setProductDetails] = useState<ProductDetailss[]>([]);

  const { id } = useParams();
  const productId = id ? parseInt(id) : 0;

  const dispatch: AppDispatch = useDispatch();

  //get vendor by id
  useEffect(() => {
    const fetchProduct = () => {
      if (productId) {
        console.log(productId);
        dispatch(fetchProductDetails(productId))
          .then((result: any) => {
            console.log(result);
            if (fetchProductDetails.fulfilled.match(result)) {
              setProductDetails(result.payload);
            }
          })
          .catch((error: any) => {
            console.error("Error fetching  product details:", error);
          });
      }
    };

    fetchProduct();
  }, [dispatch, productId]);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "82%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ProductDetailsComponent>
          <ProductList>
            <EditProductButtonHolder>
              <EditProductButton>
                <EditProductDetailsButtonNameContainer>
                  <EditIconHold />
                  <EditProductText>Edit</EditProductText>
                </EditProductDetailsButtonNameContainer>
              </EditProductButton>
            </EditProductButtonHolder>
            <DisplayProductsHolder>
              <ProductDetailsContainer>
                <ProdDetailsHolder>
                  <ProdTextHolders>
                    <ProdDetailsHeaderText>Product Name</ProdDetailsHeaderText>
                    <HorizontalLine />
                    <ProdDetailsHeaderText>Barcode</ProdDetailsHeaderText>
                    <HorizontalLine />
                    <ProdDetailsHeaderText>
                      Stock Quantity
                    </ProdDetailsHeaderText>
                    <HorizontalLine />
                    <ProdDetailsHeaderText>ThresHold</ProdDetailsHeaderText>
                    <HorizontalLine />
                    <ProdDetailsHeaderText>
                      Product Category
                    </ProdDetailsHeaderText>
                    <HorizontalLine />
                    <ProdDetailsHeaderText>Price</ProdDetailsHeaderText>
                    <HorizontalLine />
                  </ProdTextHolders>
                  {productDetails.map((product: any, index: any) => (
                    <ProdTextHolders key={index}>
                      <InformationOfProduct>
                        {product.name}
                      </InformationOfProduct>
                      <HorizontalLine />
                      <InformationOfProduct>
                        {product.barcode}
                      </InformationOfProduct>
                      <HorizontalLine />
                      <InformationOfProduct>
                        {product.stockQuantity}
                      </InformationOfProduct>
                      <HorizontalLine />
                      <InformationOfProduct>
                        {product.threshold}
                      </InformationOfProduct>
                      <HorizontalLine />
                      <InformationOfProduct>
                        {product.productCategory.name}
                      </InformationOfProduct>
                      <HorizontalLine />
                      <InformationOfProduct>
                        {product.price}
                      </InformationOfProduct>
                      <HorizontalLine />
                      {/* {product.attributes.map(
                      (attribute: any, attrIndex: any) => (
                        <div key={attrIndex}>
                          <InformationOfProduct>
                            {attribute.attributeName}
                          </InformationOfProduct>
                          <HorizontalLine />
                          <InformationOfProduct>
                            {attribute.attributeValue}
                          </InformationOfProduct>
                          <HorizontalLine />
                        </div>
                      )
                    )} */}
                    </ProdTextHolders>
                  ))}
                </ProdDetailsHolder>
              </ProductDetailsContainer>
            </DisplayProductsHolder>
          </ProductList>
        </ProductDetailsComponent>

        {productDetails.map((product: any, index: any) => (
          <div
            key={index}
            style={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              margin: "10px 0 17px 0",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "750px",
                boxShadow: "3px 3px 15px 5px rgb(0 0 0 / 15%)",
                borderRadius: "10px",
                background: "#ffff",
                height: "fit-content",
              }}
            >
              <EditProductButtonHolder>
                <EditProductButton>
                  <EditProductDetailsButtonNameContainer>
                    <EditIconHold />
                    <EditProductText>Edit</EditProductText>
                  </EditProductDetailsButtonNameContainer>
                </EditProductButton>
              </EditProductButtonHolder>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "20px",
                }}
              >
                <thead style={{ textAlign: "left" }}>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Attribute Name
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Attribute Value
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Actions
                  </th>
                </thead>
                <tbody style={{ textAlign: "left" }}>
                  {product.attributes.map((attribute: any, attrIndex: any) => (
                    <tr key={attrIndex}>
                      <td
                        style={{
                          borderBottom: "1px solid #ccc",
                          padding: "8px",
                        }}
                      >
                        {attribute.attributeName}
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #ccc",
                          padding: "8px",
                        }}
                      >
                        {attribute.attributeValue}
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #ccc",
                          padding: "8px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "30px",
                            textAlign: "left",
                          }}
                        >
                          <DeleteIcon
                            color="primary"
                            style={{
                              fontSize: "30px",
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <ProductImages />
      </div>
    </>
  );
};

export default ProductDetails;

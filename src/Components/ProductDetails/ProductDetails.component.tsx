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
  ProductDetailsContentHolder,
  ProductList,
} from "./style/ProductDetails.style";

//redux
import {
  ProductDetailss,
  fetchProductDetails,
} from "redux/Pages/Product/ProductSlice";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";

//components
import ProductImages from "Components/ProductImages/ProductImages.component";
import ProductAttributes from "Components/ProductAttributes/ProductAttributes.component";

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
      <ProductDetailsContentHolder
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
                    </ProdTextHolders>
                  ))}
                </ProdDetailsHolder>
              </ProductDetailsContainer>
            </DisplayProductsHolder>
          </ProductList>
        </ProductDetailsComponent>
        <ProductAttributes />
        <ProductImages />
      </ProductDetailsContentHolder>
    </>
  );
};

export default ProductDetails;

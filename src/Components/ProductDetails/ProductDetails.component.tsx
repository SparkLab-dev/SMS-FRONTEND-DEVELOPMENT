import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//style
import {
  DisplayProductsHolder,
  EditIconHold,
  EditProductButton,
  EditProductButtonHolder,
  EditProductDetailsButtonNameContainer,
  EditProductTableName,
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
import {
  InputsOfProductTable,
  ProductInputHold,
} from "Components/ProductsTable/style/ProductsTable.style";

//redux
import {
  ProductDetailss,
  fetchProductDetails,
} from "redux/Pages/Product/ProductSlice";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { productForm } from "redux/Containers/ProductForm/ProductFormSlice";

//components
import ProductImages from "Components/ProductImages/ProductImages.component";
import ProductAttributes from "Components/ProductAttributes/ProductAttributes.component";
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";

//mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ShopCategoryProductProps,
  deleteProduct,
} from "redux/Pages/ShopCategory/ShopCategorySlice";
const ProductDetails: FC<{}> = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [productDetails, setProductDetails] = useState<ProductDetailss[]>([]);
  const [shopCategory, setShopCategory] = useState<ShopCategoryProductProps[]>(
    []
  );
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

  //edit button click
  const handleEdit = (product: any) => {
    console.log("producct", product);
    setIsModalOpen(true);
    setSelectedItem(product);
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedItem) {
      console.error("No selected item");
      return;
    }

    const formData = new FormData();
    formData.append("name", selectedItem.name || "");
    formData.append("barcode", selectedItem.barcode || "");
    formData.append("stockQuantity", String(selectedItem.stockQuantity) || "");
    formData.append("price", String(selectedItem.price) || "");
    formData.append("threshold", String(selectedItem.threshold) || "");
    formData.append(
      "productCategory.id",
      String(selectedItem.productCategory?.id) || ""
    );
    formData.append("description", selectedItem.description || "");
    formData.append("id", String(selectedItem.id) || "");

    try {
      const response = await dispatch(
        productForm({ userCredentials: formData })
      );

      if (response.payload) {
        const updatedProductDetails = productDetails.map((product) =>
          product.id === selectedItem.id ? selectedItem : product
        );
        setProductDetails(updatedProductDetails);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error in handleSaveProduct:", error);
    }
  };

  //delete product api call
  const handleDeleteProduct = async (productId: number) => {
    try {
      const result = await dispatch(deleteProduct(productId));
      if (deleteProduct.fulfilled.match(result)) {
        console.log("Product deleted successfully!");
        setShopCategory((prevState) =>
          prevState.filter((product) => product.id !== productId)
        );
        navigate("/table");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",

        flexDirection: "column",
        height: "82%",
      }}
    >
      <ProductDetailsContentHolder>
        <ProductDetailsComponent>
          <ProductList>
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
                    <>
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
                      <EditProductButtonHolder>
                        <EditProductButton>
                          <EditProductDetailsButtonNameContainer
                            onClick={() => handleEdit(product)}
                          >
                            <EditIconHold />
                            <EditProductText>Edit</EditProductText>
                          </EditProductDetailsButtonNameContainer>
                        </EditProductButton>
                      </EditProductButtonHolder>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          paddingRight: "50px",
                          margin: "10px",
                          background: "gray",
                          width: "100%",
                          maxWidth: "25px",
                          alignItems: "center",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <DeleteIcon
                          style={{ color: "primary", textAlign: "center" }}
                        />
                      </div>
                    </>
                  ))}
                </ProdDetailsHolder>
              </ProductDetailsContainer>
            </DisplayProductsHolder>
          </ProductList>
        </ProductDetailsComponent>
        <ProductAttributes />
        <ProductImages />
      </ProductDetailsContentHolder>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        headerContent={<EditProductTableName>Edit Item</EditProductTableName>}
        bodyContent={
          <>
            <div>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Name"
                    type="text"
                    value={selectedItem?.name || ""}
                    onChange={(e: any) => {
                      setSelectedItem({
                        ...selectedItem,
                        name: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Barcode"
                    value={selectedItem?.barcode || ""}
                    onChange={(e: any) => {
                      setSelectedItem({
                        ...selectedItem,
                        barcode: parseFloat(e.target.value),
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Stock Quantity "
                    value={selectedItem?.stockQuantity || ""}
                    onChange={(e: any) => {
                      setSelectedItem({
                        ...selectedItem,
                        stockQuantity: parseFloat(e.target.value),
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="ThresHold "
                    value={selectedItem?.threshold || ""}
                    onChange={(e: any) => {
                      setSelectedItem({
                        ...selectedItem,
                        threshold: parseFloat(e.target.value),
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Product Category"
                    type="text"
                    value={
                      selectedItem && selectedItem.productCategory
                        ? selectedItem.productCategory.name
                        : ""
                    }
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        productCategory: {
                          ...selectedItem.productCategory,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Price"
                    type="number"
                    value={selectedItem?.price || ""}
                    onChange={(e: any) => {
                      setSelectedItem({
                        ...selectedItem,
                        price: parseFloat(e.target.value),
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
            </div>
          </>
        }
        footerContent={
          <GenericButton onClick={handleSaveProduct} name="Save" />
        }
      />
    </div>
  );
};

export default ProductDetails;

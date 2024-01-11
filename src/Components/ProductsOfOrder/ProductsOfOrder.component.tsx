import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//style
import {
  EditIconMui,
  ProductsOfOrderContentHolder,
  ProductsOfOrderHead,
  ProductsOfOrderHolder,
  ProductsOfOrderTable,
  ProductsOfOrderTableBody,
  ProductsOfOrderTableData,
  ProductsOfOrderTableHead,
  ProductsOfOrderTableRow,
} from "./style/ProductsOfOrder.style";
import {
  EditProductButton,
  EditProductButtonHolder,
  EditProductDetailsButtonNameContainer,
  EditProductText,
} from "Components/ProductDetails/style/ProductDetails.style";
import {
  InputsOfModalHolder,
  ModalInputHolder,
  ModalSaveButtonHolder,
} from "Components/OrdersTable/style/OrdersTable.style";
import { LabelDescriptionContainer, StyledSelect } from "App/style/App.style";
import { DeleteIconInAttributesHold } from "Components/ProductAttributes/style/ProductAttributes.style";

//redux
import {
  OrderDetails,
  addOrderItem,
  deleteProductsOfOrder,
  fetchOrderDetailsById,
} from "redux/Pages/Orders/OrdersSlice";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  ProductDetailss,
  fetchAllProducts,
} from "redux/Pages/Product/ProductSlice";

//mui icons
import DeleteIcon from "@mui/icons-material/Delete";

//components
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import { addSnackbar } from "redux/actions/actions-snackbar";

const ProductsOfOrder: FC<{}> = () => {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [productName, setProductName] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [getAllProducts, setGetAllProducts] = useState<ProductDetailss[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductDetailss | null>(null);
  console.log(selectedProduct);
  // const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  // const [addedItems, setAddedItems] = useState<
  //   {
  //     productName: string;
  //     quantity: string;
  //     totalPrice: string;
  //     totalAmount: string;
  //     unitPrice: string;
  //     product: {
  //       id: string;
  //     };
  //   }[]
  // >([]);
  // const [selectedProductsList, setSelectedProductsList] = useState<
  //   {
  //     productId: number;
  //     quantity: string;
  //     unitPrice: string;
  //   }[]
  // >([]);
  // const [selectedOrderItemDetails, setSelectedOrderItemDetails] =
  //   useState<any>(null);
  const { orderId } = useParams();
  const orderID = orderId ? parseInt(orderId) : 0;
  console.log("orderId", orderId);

  const dispatch: AppDispatch = useDispatch();

  //get order api
  useEffect(() => {
    const fetchDetails = async () => {
      if (orderID) {
        try {
          const result = await dispatch(fetchOrderDetailsById(orderID));
          if (fetchOrderDetailsById.fulfilled.match(result)) {
            setOrders(result.payload);
          }
        } catch (error) {
          dispatch(
            addSnackbar({
              id: "error",
              type: "error",
              message: "Error fetching product details!",
            })
          );
        }
      }
    };

    fetchDetails();
  }, [dispatch, orderID]);

  //upload button click

  const handleUpload = () => {
    setIsModalOpen(true);
    setSelectedItem(null);
    setProductName("");
    setQuantity("");
    setUnitPrice("");
    setSelectedProduct(null);
  };

  //edit-upload product api call
  const handleEditOrderItemClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      let editedOrderItem = null;

      // Check if selectedItem is not null and an existing item is being edited
      if (selectedItem) {
        const orderItemId = selectedItem.id;

        // Create the editedOrderItem object using the orderItemId
        editedOrderItem = {
          id: orderItemId,
          quantity: quantity,
          unitPrice: unitPrice,
          product: {
            id: selectedProduct ? selectedProduct.id : "",
          },
          order: {
            id: orderID,
          },
        };

        const response = await dispatch(
          addOrderItem({ orderItem: editedOrderItem })
        );

        if (addOrderItem.fulfilled.match(response)) {
          console.log("done");
          setIsModalOpen(false);
          dispatch(fetchOrderDetailsById(orderID))
            .then((result: any) => {
              if (fetchOrderDetailsById.fulfilled.match(result)) {
                setOrders(result.payload);
                dispatch(
                  addSnackbar({
                    id: "attributeSuccess",
                    type: "success",
                    message: "Order product added successfully!",
                  })
                );
              }
            })
            .catch((error: any) => {
              dispatch(
                addSnackbar({
                  id: "error",
                  type: "error",
                  message: "Error adding order product!",
                })
              );
            });
        }
      } else {
        // Handle the case when a new item is being added
        editedOrderItem = {
          quantity: quantity,
          unitPrice: unitPrice,
          totalPrice: totalPrice,
          product: {
            id: selectedProduct ? selectedProduct.id : "",
          },
          order: {
            id: orderID,
          },
        };

        const response = await dispatch(
          addOrderItem({ orderItem: editedOrderItem })
        );

        if (addOrderItem.fulfilled.match(response)) {
          dispatch(
            addSnackbar({
              id: "attributeSuccess",
              type: "success",
              message: "New item added successfully!",
            })
          );
          setIsModalOpen(false);

          dispatch(fetchOrderDetailsById(orderID))
            .then((result: any) => {
              if (fetchOrderDetailsById.fulfilled.match(result)) {
                setOrders(result.payload);
              }
            })
            .catch((error: any) => {
              dispatch(
                addSnackbar({
                  id: "error",
                  type: "error",
                  message: "Error adding new item!",
                })
              );
            });
        }
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Save edited value failed!",
        })
      );
    }
  };

  //delete attribute api call
  const handleDeleteProductOfOrder = async (attributeId: number) => {
    console.log("attributeId", attributeId);
    try {
      const result = await dispatch(deleteProductsOfOrder(attributeId));
      if (deleteProductsOfOrder.fulfilled.match(result)) {
        console.log("Attribute deleted successfully!");
        // Fetch updated product details after deletion
        dispatch(fetchOrderDetailsById(orderID))
          .then((result: any) => {
            console.log(result);
            if (fetchOrderDetailsById.fulfilled.match(result)) {
              setOrders(result.payload);
              dispatch(
                addSnackbar({
                  id: "attributeSuccess",
                  type: "success",
                  message: "Item deleted successfully!",
                })
              );
            }
          })
          .catch((error: any) => {
            console.error("Error fetching product details:", error);
          });
      }
    } catch (error) {
      dispatch(
        addSnackbar({
          id: "error",
          type: "error",
          message: "Error deleting order item!",
        })
      );
      console.error("Error deleting attribute:", error);
    }
  };

  const handleEdit = (selectedOrderItem: any, index: number) => {
    setSelectedItem(selectedOrderItem);
    setSelectedProduct(selectedOrderItem.product);
    setProductName(selectedOrderItem.product.productName || "");
    setUnitPrice(selectedOrderItem.unitPrice || "");
    setQuantity(selectedOrderItem.quantity || "");
    setIsModalOpen(true);
  };

  //get product api
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await dispatch(fetchAllProducts());
        console.log(result);
        if (fetchAllProducts.fulfilled.match(result)) {
          const orders = result.payload.flat();

          setGetAllProducts(orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrderData();
  }, [dispatch]);

  console.log(getAllProducts);

  const handleProductSelect = (productId: number) => {
    const selectedProduct = getAllProducts.find(
      (product) => product.id === productId
    );
    console.log(selectedProduct);
    if (selectedProduct) {
      setSelectedProduct(selectedProduct);
      setUnitPrice(selectedProduct.price.toString());
    }
  };

  return (
    <>
      <ProductsOfOrderContentHolder>
        <ProductsOfOrderHolder>
          <EditProductButtonHolder>
            <EditProductButton>
              <EditProductDetailsButtonNameContainer>
                <EditProductText onClick={handleUpload}>Add</EditProductText>
              </EditProductDetailsButtonNameContainer>
            </EditProductButton>
          </EditProductButtonHolder>
          <ProductsOfOrderTable>
            <ProductsOfOrderTableHead>
              <ProductsOfOrderTableRow>
                <ProductsOfOrderHead>Product Name</ProductsOfOrderHead>
                <ProductsOfOrderHead>Quantity</ProductsOfOrderHead>
                <ProductsOfOrderHead>Unit Price</ProductsOfOrderHead>
                <ProductsOfOrderHead>Total Price</ProductsOfOrderHead>

                <ProductsOfOrderHead>Actions</ProductsOfOrderHead>
              </ProductsOfOrderTableRow>
            </ProductsOfOrderTableHead>

            <ProductsOfOrderTableBody>
              {orders.map((order: OrderDetails, index: number) =>
                order.orderItem.map((item: any, itemIndex: number) => (
                  <ProductsOfOrderTableRow key={itemIndex}>
                    <ProductsOfOrderTableData>
                      {item.product.productName}
                    </ProductsOfOrderTableData>
                    <ProductsOfOrderTableData>
                      {item.quantity}
                    </ProductsOfOrderTableData>
                    <ProductsOfOrderTableData>
                      {item.unitPrice}
                    </ProductsOfOrderTableData>
                    <ProductsOfOrderTableData>
                      {item.totalPrice}
                    </ProductsOfOrderTableData>

                    <ProductsOfOrderTableData>
                      <EditIconMui onClick={() => handleEdit(item, index)} />
                      <DeleteIconInAttributesHold>
                        <DeleteIcon
                          color="primary"
                          style={{
                            fontSize: "30px",
                          }}
                          onClick={() => handleDeleteProductOfOrder(item.id)}
                        />
                      </DeleteIconInAttributesHold>
                    </ProductsOfOrderTableData>
                  </ProductsOfOrderTableRow>
                ))
              )}
            </ProductsOfOrderTableBody>
          </ProductsOfOrderTable>
        </ProductsOfOrderHolder>
      </ProductsOfOrderContentHolder>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        headerContent={
          <p>{selectedItem ? "Edit Product" : "Add New Product"}</p>
        }
        bodyContent={
          <>
            <>
              <ModalInputHolder>
                <LabelDescriptionContainer>Products</LabelDescriptionContainer>
                <StyledSelect
                  key={selectedProduct?.id || "defaultKey"}
                  value={selectedProduct ? selectedProduct.id?.toString() : ""}
                  onChange={(e: any) => {
                    const selectedProductId = Number(e.target.value);
                    setSelectedProduct(
                      selectedProductId
                        ? getAllProducts.find(
                            (product) => product.id === selectedProductId
                          ) || null
                        : null
                    );
                    if (!selectedProductId) {
                      setProductName("");
                      setQuantity("");
                      setUnitPrice("");
                    }
                    handleProductSelect(selectedProductId);
                  }}
                >
                  <option value="">Select an Option</option>
                  {getAllProducts.map((product: any) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </StyledSelect>
              </ModalInputHolder>
              <InputsOfModalHolder>
                <ModalInputHolder>
                  <GenericInput
                    input_label="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </ModalInputHolder>
                <ModalInputHolder>
                  <GenericInput
                    input_label="Unit Price"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    disabled
                  />
                </ModalInputHolder>
              </InputsOfModalHolder>
            </>
          </>
        }
        footerContent={
          <ModalSaveButtonHolder>
            <GenericButton name="Save" onClick={handleEditOrderItemClick} />
          </ModalSaveButtonHolder>
        }
      />
    </>
  );
};

export default ProductsOfOrder;

import { FC, useState, useEffect } from "react";

//style
import {
  FormName,
  LabelDescriptionContainer,
  StyledSelect,
} from "App/style/App.style";
import {
  OrderFormButtonsContentHolder,
  OrderFormInputsHolder,
  OrderFormTableContainer,
  OrderInputContainer,
  OrderTableForm,
  ProductsTableBody,
  ProductsTableHead,
  OrderTable,
} from "./style/OrderForm.style";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "Components/ProductsTable/style/ProductsTable.style";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";

//redux
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { orderForm } from "redux/Containers/OrderForm/OrderFormSlice";
import { calculateItem } from "redux/Containers/CalculateItem/CalculateItemSlice";
import {
  ProductDetails,
  fetchAllProducts,
} from "redux/Pages/Product/ProductSlice";

const OrderForm: FC<{}> = () => {
  const [orderNotes, setOrderNotes] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [getAllProducts, setGetAllProducts] = useState<ProductDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [addedItems, setAddedItems] = useState<
    {
      productName: string;
      quantity: string;
      totalPrice: string;
      totalAmount: string;
      unitPrice: string;
      product: {
        id: string;
      };
    }[]
  >([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(
    null
  );
  const [selectedProductsList, setSelectedProductsList] = useState<
    {
      productId: number;
      quantity: string;
      unitPrice: string;
    }[]
  >([]);

  //get userRole from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  const dispatch: AppDispatch = useDispatch();

  //get product api
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await dispatch(fetchAllProducts());
        console.log(result);
        if (fetchAllProducts.fulfilled.match(result)) {
          const orders = result.payload.flat();

          setGetAllProducts(orders);
        } else {
          setError("Error fetching orders. Please try again later!");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Error fetching orders. Please try again later!");
      }
    };

    fetchOrderData();
  }, [dispatch]);

  console.log(getAllProducts);

  const handleProductSelect = (productId: number) => {
    const selectedProduct = getAllProducts.find(
      (product) => product.id === productId
    );
    if (selectedProduct) {
      setSelectedProduct(selectedProduct);
      setUnitPrice(selectedProduct.price.toString());
    }
  };

  //post calculated item api
  const handleCalculateItemClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      if (!selectedProduct || selectedProduct.id === undefined) {
        console.error("No product selected or invalid product ID.");
        return;
      }

      const newProductDetails = {
        productId: selectedProduct.id,
        quantity: quantity,
        unitPrice: unitPrice,
      };

      const updatedSelectedList = [...selectedProductsList, newProductDetails];

      setSelectedProductsList(updatedSelectedList);

      const itemCredentials = {
        orderItemList: updatedSelectedList.map((product) => ({
          quantity: product.quantity,
          unitPrice: product.unitPrice,
          product: {
            id: product.productId,
          },
        })),
      };

      const response = await dispatch(calculateItem({ itemCredentials }));

      if (calculateItem.fulfilled.match(response)) {
        const { orderItemList, totalPrice: calculatedTotal } = response.payload;
        setQuantity("");
        setUnitPrice("");

        orderItemList.forEach((item: any) => {
          const newItem = {
            productName: item.product.productName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.productTotalPrice,
            totalAmount: response.payload.totalAmount,
            product: {
              id: item.product.id.toString(),
            },
          };

          setAddedItems([...addedItems, newItem]);
        });

        const total =
          addedItems.reduce(
            (acc, item) => acc + parseFloat(item.totalPrice),
            0
          ) + parseFloat(calculatedTotal);

        setTotalPrice(total.toFixed(2));
      }
    } catch (error) {
      console.log("Error in calculate item click:", error);
    }
  };

  //post request
  const handleOrderFormClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const lastAddedItem = addedItems[addedItems.length - 1];

      const productsDataForOrder = addedItems.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        totalAmount: item.totalAmount,
        unitPrice: item.unitPrice,
        product: {
          id: parseInt(item.product.id),
        },
      }));

      const userCredentials = {
        totalAmount: lastAddedItem.totalAmount || "0",
        orderNotes: orderNotes,
        shippingAddress: {
          street: street,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country,
        },
        orderItemList: productsDataForOrder,
        orderClient: {
          id: userId,
        },
        createdBy: {
          id: userId,
        },
      };
      const response = await dispatch(orderForm({ userCredentials }));

      if (orderForm.fulfilled.match(response)) {
        console.log("Order added!");
      }
    } catch (error) {
      console.log("Error in handleOrderClick:", error);
    }
  };

  return (
    <OrderTable>
      <OrderTableForm>
        <FormName>Order</FormName>
        <OrderFormInputsHolder>
          <OrderInputContainer>
            <GenericInput
              placeholder="Order Notes"
              input_label="Order Notes"
              required={true}
              type="text"
              value={orderNotes || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOrderNotes(e.target.value)
              }
            />
          </OrderInputContainer>
          <OrderInputContainer>
            <GenericInput
              placeholder="Postal Code"
              input_label="Postal Code"
              required={true}
              type="number"
              value={postalCode || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPostalCode(e.target.value)
              }
            />
          </OrderInputContainer>
        </OrderFormInputsHolder>
        <OrderFormInputsHolder>
          <OrderInputContainer>
            <GenericInput
              placeholder="Street"
              input_label="Street"
              required={true}
              type="text"
              value={street || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStreet(e.target.value)
              }
            />
          </OrderInputContainer>
          <OrderInputContainer>
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
          </OrderInputContainer>
        </OrderFormInputsHolder>
        <OrderFormInputsHolder>
          <OrderInputContainer>
            <GenericInput
              placeholder="State"
              input_label="State"
              required={true}
              type="text"
              value={state || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setState(e.target.value)
              }
            />
          </OrderInputContainer>
          <OrderInputContainer>
            <GenericInput
              placeholder="Country"
              input_label="Country"
              required={true}
              type="text"
              value={country || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCountry(e.target.value)
              }
            />
          </OrderInputContainer>
        </OrderFormInputsHolder>
        <OrderFormInputsHolder>
          <OrderInputContainer>
            <LabelDescriptionContainer>Products</LabelDescriptionContainer>
            <StyledSelect
              value={
                selectedCategory !== null ? selectedCategory.toString() : ""
              }
              onChange={(e: any) => {
                const selectedProductId = Number(e.target.value);
                setSelectedCategory(selectedProductId);
                handleProductSelect(selectedProductId);
              }}
            >
              <option defaultValue="none">Select an Option</option>
              {getAllProducts.map((product: any, index: any) => (
                <option key={index} value={product.id}>
                  {product.name}
                </option>
              ))}
            </StyledSelect>
          </OrderInputContainer>
          <OrderInputContainer>
            <GenericInput
              placeholder="Quantity"
              input_label="Quantity"
              required={true}
              type="number"
              value={quantity || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuantity(e.target.value)
              }
            />
          </OrderInputContainer>
        </OrderFormInputsHolder>
        <OrderFormInputsHolder>
          <OrderInputContainer>
            <GenericInput
              placeholder="Unit Price"
              input_label="Unit Price"
              required={true}
              type="number"
              value={unitPrice || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUnitPrice(e.target.value)
              }
            />
          </OrderInputContainer>
        </OrderFormInputsHolder>
        <OrderFormButtonsContentHolder>
          <GenericButton name="Add" onClick={handleCalculateItemClick} />
          <GenericButton name="Submit" onClick={handleOrderFormClick} />
        </OrderFormButtonsContentHolder>
      </OrderTableForm>
      <OrderFormTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <ProductsTableHead>Product</ProductsTableHead>
              <ProductsTableHead>Quantity</ProductsTableHead>
              <ProductsTableHead>Unit Price</ProductsTableHead>
              <ProductsTableHead>Total Price</ProductsTableHead>
              <ProductsTableHead>Total Amount</ProductsTableHead>
            </TableRow>
          </TableHead>
          <ProductsTableBody>
            {addedItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unitPrice}</TableCell>
                <TableCell>{item.totalPrice}</TableCell>
                <TableCell>{item.totalAmount}</TableCell>
              </TableRow>
            ))}
          </ProductsTableBody>
        </Table>
      </OrderFormTableContainer>
    </OrderTable>
  );
};

export default OrderForm;

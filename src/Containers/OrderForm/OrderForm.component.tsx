import { FC, useState, useEffect } from "react";

//style
import {
  FormName,
  LabelDescriptionContainer,
  StyledForm,
  StyledSelect,
} from "App/style/App.style";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import {
  OrderFormInputsHolder,
  OrderInputContainer,
} from "./style/OrderForm.style";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { orderForm } from "redux/Containers/OrderForm/OrderFormSlice";
import { calculateItem } from "redux/Containers/CalculateItem/CalculateItemSlice";
import {
  ProductDetails,
  fetchAllProducts,
} from "redux/Pages/Product/ProductSlice";

const OrderForm: FC<{}> = () => {
  const [totalAmount, setTotalAmount] = useState<string>("");
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
    { quantity: string; totalPrice: string }[]
  >([]);
  const dispatch: AppDispatch = useDispatch();

  //get product api
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await dispatch(fetchAllProducts());
        if (fetchAllProducts.fulfilled.match(result)) {
          const orders = result.payload.flat(); // Flatten the array

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

  //post request
  const userCredentials = {
    totalAmount: totalAmount,
    orderNotes: orderNotes,
    shippingAddress: {
      street: street,
      city: city,
      state: state,
      postalCode: postalCode,
      country: country,
    },
    orderItemList: [
      {
        quantity: quantity,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
      },
    ],
  };

  const handleOrderFormClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const response = await dispatch(orderForm({ userCredentials }));

      if (orderForm.fulfilled.match(response)) {
      }
    } catch (error) {
      console.log("Error in handleOrderClick:", error);
    }
  };

  //post calculated item api
  const itemCredentials = {
    orderItemList: [
      {
        quantity: quantity,
        unitPrice: unitPrice,
      },
    ],
  };

  const handleCalculateItemClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const response = await dispatch(calculateItem({ itemCredentials }));

      if (calculateItem.fulfilled.match(response)) {
        const { totalPrice: calculatedTotal } = response.payload;

        const newItem = { quantity, totalPrice };
        setAddedItems([...addedItems, newItem]);

        const total =
          addedItems.reduce(
            (acc, item) => acc + parseFloat(item.totalPrice),
            0
          ) + parseFloat(calculatedTotal);

        setTotalPrice(total.toFixed(2)); // Adjust to your requirements
      }
    } catch (error) {
      console.log("Error in calculate item click:", error);
    }
  };

  return (
    <>
      <StyledForm>
        <FormName>Order</FormName>
        <OrderFormInputsHolder>
          {/* <OrderInputContainer>
            <GenericInput
              placeholder="Total Amount"
              input_label="Total Amount"
              required={true}
              type="number"
              value={totalAmount || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTotalAmount(e.target.value)
              }
            />
          </OrderInputContainer> */}
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
              onChange={(e: any) => setSelectedCategory(Number(e.target.value))}
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
          </OrderInputContainer>{" "}
        </OrderFormInputsHolder>
        <GenericButton name="Add" onClick={handleCalculateItemClick} />
        {/* <OrderFormInputsHolder></OrderFormInputsHolder> */}
        <OrderFormInputsHolder>
          {/* <OrderInputContainer>
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
          </OrderInputContainer> */}
          <OrderInputContainer>
            <GenericInput
              placeholder="Total Price"
              input_label="Total Price"
              required={true}
              type="number"
              value={totalAmount || ""}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              //   setTotalPrice(e.target.value)
              // }
            />
          </OrderInputContainer>
        </OrderFormInputsHolder>
        <GenericButton name="Submit" onClick={handleOrderFormClick} />
      </StyledForm>
    </>
  );
};

export default OrderForm;

import { FC, useState } from "react";

//style
import { FormName, StyledForm } from "App/style/App.style";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import {
  OrderFormInputsHolder,
  OrderInputContainer,
} from "./style/OrderForm.style";

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
  
  return (
    <>
      <StyledForm>
        <FormName>Order</FormName>
        <OrderFormInputsHolder>
          <OrderInputContainer>
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
          </OrderInputContainer>
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
          <OrderInputContainer>
            <GenericInput
              placeholder="Total Price"
              input_label="Total Price"
              required={true}
              type="number"
              value={totalPrice || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTotalPrice(e.target.value)
              }
            />
          </OrderInputContainer>
        </OrderFormInputsHolder>
        <GenericButton name="Submit" />
      </StyledForm>
    </>
  );
};

export default OrderForm;

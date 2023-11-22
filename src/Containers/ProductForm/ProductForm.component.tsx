import {
  FormName,
  LabelDescriptionContainer,
  StyledForm,
  StyledSelect,
} from "App/style/App.style";
import GenericButton from "Components/GenericButton/GenericButton.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import { InputContainer } from "Components/GenericInput/style/GenericInput.style";
import { FC, useState, useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { productForm } from "redux/Containers/ProductForm/ProductFormSlice";
import {
  ProductProps,
  fetchProductsCategory,
} from "redux/Pages/ProductCategory/ProductCategorySlice";
import { AppDispatch, RootState } from "redux/store";

interface DropdownItem {
  id: string;
  name?: string;
}
const ProductForm: FC<{}> = () => {
  const [productName, setProductName] = useState<string>("");
  const [barCode, setBarCode] = useState<string>("");
  const [productAttributes, setProductAttributes] = useState<
    { attributeName: string; attributeValue: string }[]
  >([]);
  const [newAttributeName, setNewAttributeName] = useState<string>("");
  const [newAttributeValue, setNewAttributeValue] = useState<string>("");
  const [productCategory, setProductCategory] = useState<ProductProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [category, setCategory] = useState<DropdownItem[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const productProps = useSelector(
    (state: RootState) => state.shopProducts.user
  );
  const productId = productProps?.[0]?.id ?? null;
  console.log(productId);
  const handleAttributeAddition = () => {
    const newAttribute = {
      attributeName: newAttributeName,
      attributeValue: newAttributeValue,
    };

    setProductAttributes([...productAttributes, newAttribute]);
    setNewAttributeName("");
    setNewAttributeValue("");
  };

  const handleSubmit = async () => {
    const productData = {
      name: productName,
      barcode: barCode,
      attributes: productAttributes,
      productCategory: {
        id: selectedCategory || 0,
      },
    };
    try {
      const response = await dispatch(
        productForm({ userCredentials: productData })
      );
      // Handle response if needed
      if (productForm.fulfilled.match(response)) {
        console.log("fulfilled");
        // navigate("/auth/rentlist");
      }
    } catch (error) {
      // Handle error if needed
      console.log("Error in handleProductClick:", error);
    }
  };

  //post request

  //   const handleProductFormClick = async (
  //     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  //   ) => {
  //     e.preventDefault();

  //     try {
  //       const response = await dispatch(productForm({ userCredentials }));

  //       if (productForm.fulfilled.match(response)) {
  //         // setShowRentList(true);
  //         console.log("fulfilled");
  //         // navigate("/auth/rentlist");
  //       }
  //     } catch (error) {
  //       console.log("Error in handleProductClick:", error);
  //     }
  //   };
  useEffect(() => {
    dispatch(fetchProductsCategory())
      .then((result: any) => {
        if (fetchProductsCategory.fulfilled.match(result)) {
          setProductCategory(result.payload);
        } else {
          console.error("Product details not found.");
        }
      })
      .catch((error: any) => {
        console.error("Error fetching Product details:", error);
      });
  }, [dispatch]);

  console.log("productCategory", productCategory);

  return (
    <>
      <StyledForm>
        <FormName>Product Category </FormName>
        <div>
          <GenericInput
            placeholder="Name"
            input_label="Name"
            required={true}
            type="text"
            value={productName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProductName(e.target.value)
            }
          />
          <GenericInput
            placeholder="Barcode"
            input_label="Barcode"
            required={true}
            type="text"
            value={barCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBarCode(e.target.value)
            }
          />
          <GenericInput
            placeholder="New Attribute Name"
            input_label="New Attribute Name"
            required={true}
            type="text"
            value={newAttributeName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewAttributeName(e.target.value)
            }
          />
          <GenericInput
            placeholder="New Attribute Value"
            input_label="New Attribute Value"
            required={true}
            type="text"
            value={newAttributeValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewAttributeValue(e.target.value)
            }
          />
        </div>
        {/* <label>Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        /> */}
        {/* <label>Barcode:</label>
        <input
          type="text"
          value={barCode}
          onChange={(e) => setBarCode(e.target.value)}
        /> */}
        {/* Add new attribute for the product */}
        <div>
          {/* <label>New Attribute Name:</label>
          <input
            type="text"
            value={newAttributeName}
            onChange={(e) => setNewAttributeName(e.target.value)}
          /> */}
          {/* <label>New Attribute Value:</label>
          <input
            type="text"
            value={newAttributeValue}
            onChange={(e) => setNewAttributeValue(e.target.value)}
          /> */}
          <GenericButton
            name="Add new attributes"
            onClick={handleAttributeAddition}
          />
          {/* <button onClick={handleAttributeAddition}>Add Attribute</button> */}
        </div>

        <div>
          <h3>Attributes for {productName}:</h3>
          <ul>
            {productAttributes.map((attr, index) => (
              <li key={index}>
                {attr.attributeName}: {attr.attributeValue}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <LabelDescriptionContainer>Category</LabelDescriptionContainer>
          <StyledSelect
            value={selectedCategory !== null ? selectedCategory.toString() : ""}
            onChange={(e: any) => setSelectedCategory(Number(e.target.value))}
          >
            <option defaultValue="none">Select an Option</option>
            {productCategory.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </StyledSelect>
        </div>
        <GenericButton name="Create Product" onClick={handleSubmit} />
        {/* <button onClick={handleSubmit}>Create Product</button> */}
      </StyledForm>
      {/* )} */}
      {/* <button onClick={handleSubmit}>Create Product</button>
      </div> */}
    </>
  );
};

export default ProductForm;

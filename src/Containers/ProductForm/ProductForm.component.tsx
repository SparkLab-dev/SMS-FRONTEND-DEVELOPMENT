import { FC, useState, useEffect } from "react";

//mui
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";

//redux
import { useDispatch } from "react-redux";
import { productForm } from "redux/Containers/ProductForm/ProductFormSlice";
import {
  ProductProps,
  fetchProductsCategory,
} from "redux/Pages/ProductCategory/ProductCategorySlice";
import { AppDispatch } from "redux/store";

//style
import {
  AddButton,
  LogoTitle,
  UploadLogoHolder,
} from "./style/ProductForm.style";
import {
  FormName,
  LabelDescriptionContainer,
  StyledForm,
  StyledSelect,
} from "App/style/App.style";

//components
import UploadPhoto from "Components/UploadPhoto/UploadPhoto.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import GenericInput from "Components/GenericInput/GenericInput.component";

interface LogoProps {
  profilePhoto: string;
  profilePhotoType: string;
  reload: boolean;
  sendPhoto: (file: File) => void;
}

const ProductForm: FC<LogoProps> = () => {
  const [productName, setProductName] = useState<string>("");
  const [barCode, setBarCode] = useState<string>("");
  const [productAttributes, setProductAttributes] = useState<
    { attributeName: string; attributeValue: string }[]
  >([]);
  const [newAttributeName, setNewAttributeName] = useState<string>("");
  const [newAttributeValue, setNewAttributeValue] = useState<string>("");
  const [productCategory, setProductCategory] = useState<ProductProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  // const [category, setCategory] = useState<DropdownItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoSelected, setLogoSelected] = useState<[string, string]>(["", ""]);

  const dispatch: AppDispatch = useDispatch();

  const handleAttributeAddition = (e: any) => {
    e.preventDefault();

    const newAttribute = {
      attributeName: newAttributeName,
      attributeValue: newAttributeValue,
    };

    const updatedAttributes = [...productAttributes, newAttribute];
    setProductAttributes(updatedAttributes);
    setNewAttributeName("");
    setNewAttributeValue("");
  };
  console.log("productAttributes", productAttributes);

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const productData = {
  //     name: productName,
  //     barcode: barCode,
  //     attributes: productAttributes,
  //     productCategory: {
  //       id: selectedCategory || 0,
  //     },
  //   };
  //   try {
  //     const response = await dispatch(
  //       productForm({ userCredentials: productData })
  //     );

  //     if (productForm.fulfilled.match(response)) {
  //       console.log("fulfilled");
  //     }
  //   } catch (error) {
  //     console.log("Error in handleProductClick:", error);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("barcode", barCode);
    formData.append("productCategory", String(selectedCategory));

    productAttributes.forEach((attr, index) => {
      formData.append(
        `attributes[${index}].[attributeName]`,
        attr.attributeName
      );
      formData.append(
        `attributes[${index}].[attributeValue]`,
        attr.attributeValue
      );
    });

    if (logo) {
      formData.append("productImages[0].Image", logo);
    }
    try {
      const response = await dispatch(
        productForm({ userCredentials: formData })
      );

      if (productForm.fulfilled.match(response)) {
        console.log("fulfilled");
      }
    } catch (error) {
      console.log("Error in handleProductClick:", error);
    }
  };

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

  const handleImageChange = () => {
    if (logo instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(logo);
      reader.onload = () => {
        if (reader.result) {
          const photoType = (reader.result as string).slice(
            (reader.result as string).indexOf(":") + 1,
            (reader.result as string).indexOf(";")
          );
          const photoData = (reader.result as string).split(",")[1];
          setLogoSelected([photoType, photoData]);
        }
      };
    }
  };

  const styleForAddLogoModalBox = {
    width: "25%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#FFFFFF",
    border: "none",
    boxShadow: "5px 5px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    p: 4,
    outline: 0,
    padding: "10px",
    "@media (max-width: 780px)": {
      width: "80%",
    },
  };
  // const formData = new FormData();
  // if (productName === "") {
  //   console.log("Select productName");
  // } else {
  //   formData.append("name", productName);
  // }
  // if (barCode === "") {
  //   console.log("Select barCode");
  // } else {
  //   formData.append("barCode", barCode);
  // }
  // if (newAttributeName === "") {
  //   console.log("Select newAttributeName");
  // } else {
  //   formData.append("newAttributeName", newAttributeName);
  // }
  // if (newAttributeValue === "") {
  //   console.log("Select newAttributeValue");
  // } else {
  //   formData.append("newAttributeValue", newAttributeValue);
  // }
  // if (logo.name !== undefined) {
  //   formData.append("logo", logo);
  // }
  // try {
  //   const response = await dispatch(
  //     productForm({ formData })
  //   );

  //   if (productForm.fulfilled.match(response)) {
  //     console.log("fulfilled");
  //   }
  // } catch (error) {
  //   console.log("Error in handleProductClick:", error);
  // }
  return (
    <>
      <div>
        {openModal ? (
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box sx={styleForAddLogoModalBox}>
              <div>
                <h1 className="title">Upload Logo</h1>
                <UploadPhoto
                  profilePhoto={logoSelected[1]}
                  profilePhotoType={logoSelected[0]}
                  reload={true}
                  sendPhoto={setLogo}
                />

                <div className="button">
                  <button
                    className="modal-button"
                    onClick={() => {
                      setOpenModal(false);
                      setLogoSelected(["", ""]);
                      setLogo(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="modal-button"
                    onClick={() => {
                      setOpenModal(false);
                      handleImageChange();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        ) : null}
        <StyledForm>
          <FormName>Product Category </FormName>
          <div style={{ display: "grid" }}>
            <div style={{ display: "flex" }}>
              <div style={{ flex: "1", margin: "5px " }}>
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
              </div>
              <div style={{ flex: "1", margin: "5px " }}>
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
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ flex: "1", margin: "5px " }}>
                <GenericInput
                  placeholder="New Attribute Name"
                  input_label="New Attribute Name"
                  type="text"
                  value={newAttributeName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewAttributeName(e.target.value)
                  }
                />
              </div>
              <div style={{ flex: "1", margin: "5px " }}>
                <GenericInput
                  placeholder="New Attribute Value"
                  input_label="New Attribute Value"
                  type="text"
                  value={newAttributeValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewAttributeValue(e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <GenericButton
                name="Add new attributes"
                onClick={(e: any) => handleAttributeAddition(e)}
              />
            </div>

            <div>
              <h3>Attributes for {productName}</h3>
              <ul>
                {productAttributes.map((attr, index) => (
                  <li key={index}>
                    {attr.attributeName}: {attr.attributeValue}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ flex: "1", margin: "5px" }}>
                <LabelDescriptionContainer>Category</LabelDescriptionContainer>
                <StyledSelect
                  value={
                    selectedCategory !== null ? selectedCategory.toString() : ""
                  }
                  onChange={(e: any) =>
                    setSelectedCategory(Number(e.target.value))
                  }
                >
                  <option defaultValue="none">Select an Option</option>
                  {productCategory.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </StyledSelect>
              </div>
              <div style={{ flex: "1", margin: "5px" }}>
                <LabelDescriptionContainer>
                  Upload Logo
                </LabelDescriptionContainer>
                <UploadLogoHolder>
                  <AddButton
                    name="Upload"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      setOpenModal(true);
                    }}
                  >
                    Upload
                  </AddButton>
                  {logo && <LogoTitle>{logo.name}</LogoTitle>}
                </UploadLogoHolder>
              </div>
            </div>
          </div>
          <GenericButton name="Create Product" onClick={handleSubmit} />
          {/* <button onClick={handleSubmit}>Create Product</button> */}
        </StyledForm>
      </div>
    </>
  );
};

export default ProductForm;
import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  FormAndModalHolder,
  GenericInputHold,
  InputsTableFormContainer,
  LogoDescAndNameHolder,
  LogoTitle,
  ModalButtonHolder,
  Option,
  UploadLogoHolder,
  UploadPhotoText,
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
  const navigate = useNavigate();
  const [productName, setProductName] = useState<string>("");
  const [barCode, setBarCode] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [threshold, setThreshold] = useState<string>("");
  const [stockQuantity, setStockQuantity] = useState<string>("");
  const [productAttributes, setProductAttributes] = useState<
    { attributeName: string; attributeValue: string }[]
  >([]);
  const [newAttributeName, setNewAttributeName] = useState<string>("");
  const [newAttributeValue, setNewAttributeValue] = useState<string>("");
  const [productCategory, setProductCategory] = useState<ProductProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
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
    // setNewAttributeName("");
    // setNewAttributeValue("");
  };
  console.log("productAttributes", productAttributes);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("barcode", barCode);
    formData.append("stockQuantity", stockQuantity);
    formData.append("price", price);
    formData.append("threshold", threshold);
    formData.append("productCategory", String(selectedCategory));

    productAttributes.forEach((attr, index) => {
      formData.append(`attributes[${index}].attributeName`, attr.attributeName);
      formData.append(
        `attributes[${index}].attributeValue`,
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
        navigate("/productForm");
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

  return (
    <>
      <FormAndModalHolder>
        {openModal ? (
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box sx={styleForAddLogoModalBox}>
              <UploadLogoHolder>
                <UploadPhotoText>Upload Logo</UploadPhotoText>
                <UploadPhoto
                  profilePhoto={logoSelected[1]}
                  profilePhotoType={logoSelected[0]}
                  reload={true}
                  sendPhoto={setLogo}
                />

                <ModalButtonHolder>
                  <GenericButton
                    name="Cancel"
                    onClick={() => {
                      setOpenModal(false);
                      setLogoSelected(["", ""]);
                      setLogo(null);
                    }}
                  />
                  <GenericButton
                    name="Save"
                    onClick={() => {
                      setOpenModal(false);
                      handleImageChange();
                    }}
                  />
                </ModalButtonHolder>
              </UploadLogoHolder>
            </Box>
          </Modal>
        ) : null}
        <StyledForm>
          <FormName>Product</FormName>
          <InputsTableFormContainer>
            <GenericInputHold>
              <GenericInput
                placeholder="Name"
                input_label="Name"
                required={true}
                type="text"
                value={productName || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProductName(e.target.value)
                }
              />
            </GenericInputHold>
            <GenericInputHold>
              <GenericInput
                placeholder="Barcode"
                input_label="Barcode"
                required={true}
                type="text"
                value={barCode || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBarCode(e.target.value)
                }
              />{" "}
            </GenericInputHold>
          </InputsTableFormContainer>
          <InputsTableFormContainer>
            <GenericInputHold>
              <GenericInput
                placeholder="Stock Quantity"
                input_label="Stock Quantity"
                required={true}
                type="number"
                value={stockQuantity || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStockQuantity(e.target.value)
                }
              />
            </GenericInputHold>
          </InputsTableFormContainer>
          <InputsTableFormContainer>
            <GenericInputHold>
              <GenericInput
                placeholder="Price"
                input_label="Price"
                required={true}
                type="number"
                value={price || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrice(e.target.value)
                }
              />
            </GenericInputHold>
            <GenericInputHold>
              <GenericInput
                placeholder="ThresHold"
                input_label="ThresHold"
                required={true}
                type="number"
                value={threshold || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setThreshold(e.target.value)
                }
              />
            </GenericInputHold>
          </InputsTableFormContainer>
          <InputsTableFormContainer>
            <GenericInputHold>
              <GenericInput
                placeholder="New Attribute Name"
                input_label="New Attribute Name"
                type="text"
                value={newAttributeName || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewAttributeName(e.target.value)
                }
              />
            </GenericInputHold>
            <GenericInputHold>
              <GenericInput
                placeholder="New Attribute Value"
                input_label="New Attribute Value"
                type="text"
                value={newAttributeValue || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewAttributeValue(e.target.value)
                }
              />
            </GenericInputHold>
          </InputsTableFormContainer>
          <GenericButton
            name="Add new attributes"
            onClick={(e: any) => handleAttributeAddition(e)}
          />
          {/* <div>
            <h3>Attributes for {productName}</h3>
            <ul>
              {productAttributes.map((attr, index) => (
                <li key={index}>
                  {attr.attributeName}: {attr.attributeValue}
                </li>
              ))}
            </ul>
          </div> */}
          <InputsTableFormContainer>
            <GenericInputHold>
              <LabelDescriptionContainer>Category</LabelDescriptionContainer>
              <StyledSelect
                value={
                  selectedCategory !== null ? selectedCategory.toString() : ""
                }
                onChange={(e: any) =>
                  setSelectedCategory(Number(e.target.value))
                }
              >
                <Option defaultValue="none">Select an Option</Option>
                {productCategory.map((role) => (
                  <Option key={role.id} value={role.id}>
                    {role.name}
                  </Option>
                ))}
              </StyledSelect>
            </GenericInputHold>
            <LogoDescAndNameHolder>
              <LabelDescriptionContainer>Upload Logo</LabelDescriptionContainer>
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
            </LogoDescAndNameHolder>
          </InputsTableFormContainer>
          <GenericButton name="Create Product" onClick={handleSubmit} />
        </StyledForm>
      </FormAndModalHolder>
    </>
  );
};

export default ProductForm;

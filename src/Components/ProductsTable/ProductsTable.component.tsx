import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//style
import {
  AddNewProductButton,
  AddProductNameContainerPlusIcon,
  ButtonName,
  DropdownOfProductCategory,
  EditButton,
  H2,
  IconLink,
  InputsOfProductTable,
  ProductInputHold,
  ProductsTableHolder,
  SelectOption,
  TH,
  Table,
  TableAndDatepickerHolder,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tbody,
} from "./style/ProductsTable.style";
import { StyledSelect } from "App/style/App.style";

//mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  ProductProps,
  fetchProductsCategory,
} from "redux/Pages/ProductCategory/ProductCategorySlice";
import {
  ShopCategoryProductProps,
  deleteProduct,
  fetchShopProductCategory,
} from "redux/Pages/ShopCategory/ShopCategorySlice";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";

const ProductsTable: FC<{}> = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [productCategory, setProductCategory] = useState<ProductProps[]>([]);
  const [shopCategory, setShopCategory] = useState<ShopCategoryProductProps[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const dispatch: AppDispatch = useDispatch();

  console.log("shop category", shopCategory);

  //get category
  useEffect(() => {
    dispatch(fetchProductsCategory())
      .then((result: any) => {
        if (fetchProductsCategory.fulfilled.match(result)) {
          const categories = result.payload;
          setProductCategory(categories);
          if (categories.length > 0) {
            // Set the selected category to the first category ID
            setSelectedCategory(categories[0].id);
          }
        } else {
          console.error("Product categories not found.");
        }
      })
      .catch((error: any) => {
        console.error("Error fetching product categories:", error);
      });
  }, [dispatch]);
  console.log("productCategory", productCategory);

  //get product api
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCategory !== null) {
          const result = await dispatch(
            fetchShopProductCategory(selectedCategory)
          );
          if (fetchShopProductCategory.fulfilled.match(result)) {
            setShopCategory(result.payload);
          } else {
            setError("Error fetching products. Please try again later!");
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later!");
      }
    };

    fetchData();
  }, [dispatch, selectedCategory]);

  //delete product api call
  const handleDeleteProduct = async (productId: number) => {
    try {
      const result = await dispatch(deleteProduct(productId));
      if (deleteProduct.fulfilled.match(result)) {
        console.log("Product deleted successfully!");
        setShopCategory((prevState) =>
          prevState.filter((product) => product.id !== productId)
        );
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const buttonName = (
    <AddProductNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <ButtonName>Add product</ButtonName>
    </AddProductNameContainerPlusIcon>
  );

  //edit button click
  const handleEdit = (rental: any) => {
    console.log(rental);
    setIsModalOpen(true);
    setSelectedItem(rental);
  };

  const handleSave = async () => {
    console.error("User is not authenticated or no item is selected");
  };

  return (
    <ProductsTableHolder>
      <AddNewProductButton>
        <GenericButton
          name={buttonName}
          onClick={() => navigate("/productForm")}
        />
      </AddNewProductButton>
      <TableAndDatepickerHolder>
        <DropdownOfProductCategory>
          <StyledSelect
            value={selectedCategory !== null ? selectedCategory.toString() : ""}
            onChange={(e: any) => setSelectedCategory(Number(e.target.value))}
          >
            <SelectOption defaultValue="none">Select an Option</SelectOption>
            {productCategory.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </StyledSelect>
        </DropdownOfProductCategory>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TH>Name</TH>
                <TH>Barcode</TH>
                <TH>Stock Quantity</TH>
                <TH>THresHold</TH>
                <TH>Product Category</TH>
                <TH>Price</TH>
                <TH>Attribute Name</TH>
                <TH>Attribute Value</TH>
                <TH>Actions</TH>
              </TableRow>
            </TableHead>
            <Tbody>
              {shopCategory.map((rental: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{rental.name}</TableCell>
                  <TableCell>{rental.barcode}</TableCell>
                  <TableCell> {rental.stockQuantity} </TableCell>
                  <TableCell> {rental.threshold} </TableCell>
                  <TableCell> {rental.productCategory.name} </TableCell>
                  <TableCell> ${rental.price} </TableCell>
                  <TableCell>
                    {rental.attributes.map((attr: any, attrIndex: any) => (
                      <div key={attrIndex}>
                        <p>{attr.attributeName}</p>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {rental.attributes.map((attr: any, attrIndex: any) => (
                      <div key={attrIndex}>
                        <p>{attr.attributeValue}</p>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <EditButton onClick={() => handleEdit(rental)}>
                      Edit
                    </EditButton>
                    <IconLink
                      to=""
                      onClick={() => handleDeleteProduct(rental.id)}
                    >
                      <DeleteIcon />
                    </IconLink>
                  </TableCell>
                </TableRow>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </TableAndDatepickerHolder>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        headerContent={<H2>Edit Item</H2>}
        bodyContent={
          <>
            {selectedItem && (
              <>
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
                      input_label="Product Category "
                      type="text"
                      value={selectedItem?.productCategory.name || ""}
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
              </>
            )}
            <InputsOfProductTable>
              <ProductInputHold>
                <GenericInput
                  input_label="Attribute Name"
                  value={selectedItem?.attributes[0].attributeName || ""}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      attributes: [
                        {
                          ...selectedItem.attributes[0],
                          attributeName: e.target.value,
                        },
                        ...selectedItem.attributes.slice(1),
                      ],
                    })
                  }
                />
              </ProductInputHold>
              <ProductInputHold>
                <GenericInput
                  input_label="Attribute Value"
                  value={selectedItem?.attributes[0].attributeValue || ""}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      attributes: [
                        {
                          ...selectedItem.attributes[0],
                          attributeValue: e.target.value,
                        },
                        ...selectedItem.attributes.slice(1),
                      ],
                    })
                  }
                />
              </ProductInputHold>
            </InputsOfProductTable>
          </>
        }
        footerContent={<GenericButton onClick={handleSave} name="Save" />}
      />
    </ProductsTableHolder>
  );
};

export default ProductsTable;

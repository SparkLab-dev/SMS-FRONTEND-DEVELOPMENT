import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//style
import {
  AddNewProductButton,
  AddProductNameContainerPlusIcon,
  ButtonName,
  EditButton,
  IconLink,
  Table,
  TableAndDatepickerHolder,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "./style/ProductsTable.style";
import { StyledSelect } from "App/style/App.style";

//mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//redux
import { ProductDetails } from "redux/Pages/Product/ProductSlice";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  ProductProps,
  fetchProductsCategory,
} from "redux/Pages/ProductCategory/ProductCategorySlice";
import {
  ShopCategoryProductProps,
  fetchShopProductCategory,
} from "redux/Pages/ShopCategory/ShopCategorySlice";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";

const ProductsTable: FC<{}> = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [productCategory, setProductCategory] = useState<ProductProps[]>([]);
  const [shopCategory, setShopCategory] = useState<ShopCategoryProductProps[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const dispatch: AppDispatch = useDispatch();

  console.log(product);

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

  const buttonName = (
    <AddProductNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <ButtonName>Add product</ButtonName>
    </AddProductNameContainerPlusIcon>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "700px",
        // display: "flex",
        // flexDirection: "column",
      }}
    >
      <AddNewProductButton>
        <GenericButton
          name={buttonName}
          onClick={() => navigate("/productForm")}
        />
      </AddNewProductButton>
      <TableAndDatepickerHolder>
        <div
          style={{
            margin: "10px auto",
            width: "100%",
            maxWidth: "400px",
            alignItems: "center",
            display: "flex",
            justifyContent: "cenetr",
          }}
        >
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

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <th>Name</th>
                <th>Barcode</th>
                <th>Stock Quantity</th>
                <th>ThresHold</th>
                <th>Product Category</th>
                <th>Atrribute Name</th>
                <th>Actions</th>
              </TableRow>
            </TableHead>
            <tbody>
              {shopCategory.map((rental: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{rental.name}</TableCell>
                  <TableCell>{rental.barcode}</TableCell>
                  <TableCell> {rental.stockQuantity} </TableCell>
                  <TableCell> {rental.threshold} </TableCell>
                  <TableCell> {rental.productCategory.name} </TableCell>
                  <TableCell> ${rental.price} </TableCell>
                  {/* <TableCell>
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
                  </TableCell> */}
                  <TableCell>
                    <EditButton>Edit</EditButton>
                    <IconLink to="">
                      <DeleteIcon />
                    </IconLink>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </TableAndDatepickerHolder>
    </div>
  );
};

export default ProductsTable;

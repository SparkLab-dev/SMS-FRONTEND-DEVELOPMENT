import { FC, useEffect, useState } from "react";

//style
import {
  CategoryEditButton,
  CategoryTable,
  CategoryTableAndModalHolder,
  CategoryTableContainer,
  CategoryTableRow,
  Imagecategory,
  TableCellOfCategory,
  TableHead,
  TableHeadOfCategory,
  Tablebody,
} from "./style/GetCategories.style";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  Category,
  fetchCategories,
} from "redux/Pages/CreateCategory/CreateCategorySlice";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";
import Popup from "Components/Popup/Popup.component";
import {
  InputsOfProductTable,
  ProductInputHold,
} from "Components/ProductsTable/style/ProductsTable.style";
import GenericInput from "Components/GenericInput/GenericInput.component";

const GetCategories: FC<{}> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
//   const [editLogo, setEditLogo] = useState({});
//   const [editLogoURL, setEditLogoURL] = useState(
//     `data:${projectDetails.logoType};base64,${props.projectDetails.logoByte}`
//   );
  const dispatch: AppDispatch = useDispatch();

  //get category api
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const result = await dispatch(fetchCategories());
        if (fetchCategories.fulfilled.match(result)) {
          setCategories(result.payload);
        } else {
          setError("Error fetching categories. Please try again later!");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Error fetching categories. Please try again later!");
      }
    };

    fetchCategoryData();
  }, [dispatch]);
  console.log("categories", categories);
  //edit button click
  const handleEdit = () => {
    setIsModalOpen(true);
  };
  return (
    <CategoryTableAndModalHolder>
      <CategoryTableContainer>
        <CategoryTable>
          <TableHeadOfCategory>
            <CategoryTableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </CategoryTableRow>
          </TableHeadOfCategory>
          <Tablebody>
            {categories.map((item: any, index: number) => (
              <CategoryTableRow key={index}>
                <TableCellOfCategory>
                  {item.image && (
                    <Imagecategory
                      src={`data:image/jpeg;base64,${item.image}`}
                    />
                  )}
                </TableCellOfCategory>
                <TableCellOfCategory>{item.name}</TableCellOfCategory>
                <TableCellOfCategory>
                  <CategoryEditButton onClick={() => handleEdit()}>
                    Edit
                  </CategoryEditButton>
                </TableCellOfCategory>
              </CategoryTableRow>
            ))}
          </Tablebody>
        </CategoryTable>
      </CategoryTableContainer>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        headerContent={<h2>Edit Category</h2>}
        bodyContent={
          <>
            {selectedItem && (
              <>
                <InputsOfProductTable>
                {/* <div className="edit-project-logo">
            <div className="logo-edit">
              <input
                type="file"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                onInput={(e) => {
                  setEditLogoURL(URL.createObjectURL(e.target.files[0]));
                  setEditLogo(e.target.files[0]);
                }}
              />
              <label className="image-upload-label" htmlFor="imageUpload">
                <img alt="editLogo" src={EditIcon} />
              </label>
            </div>
            <div className="logo-preview">
              <div
                id="logoPreview"
                style={{
                  backgroundImage: `url(${editLogoURL ?? ""})`,
                }}
              ></div>
            </div>
          </div> */}
                  <ProductInputHold>
                    <GenericInput input_label="Barcode" />
                  </ProductInputHold>
                </InputsOfProductTable>
              </>
            )}
          </>
        }
        footerContent={<GenericButton name="Save" />}
      />
    </CategoryTableAndModalHolder>
  );
};
export default GetCategories;

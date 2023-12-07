import { FC } from "react";
import { useNavigate } from "react-router-dom";

//mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//style
import {
  AddNewVendorButton,
  VedorTableBody,
  VendorAddProductNameContainerPlusIcon,
  VendorButtonName,
  VendorEditButton,
  VendorIconLink,
  VendorTH,
  VendorTable,
  VendorTableCell,
  VendorTableContainer,
  VendorTableHead,
  VendorTableHolder,
  VendorTableRow,
} from "./style/VendorsTable.style";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";

const VendorsTable: FC<{}> = () => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const vendorButtonName = (
    <VendorAddProductNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <VendorButtonName>New Vendor</VendorButtonName>
    </VendorAddProductNameContainerPlusIcon>
  );

  return (
    <VendorTableHolder>
      <AddNewVendorButton>
        <GenericButton
          name={vendorButtonName}
          onClick={() => navigate("/vendor")}
        />
      </AddNewVendorButton>
      <VendorTableContainer>
        <VendorTable>
          <VendorTableHead>
            <VendorTableRow>
              <VendorTH>Company Name</VendorTH>
              <VendorTH>Email</VendorTH>
              <VendorTH>Phone Number</VendorTH>
              <VendorTH>Contact Name</VendorTH>
              <VendorTH>Notes</VendorTH>
              <VendorTH>Payment Terms</VendorTH>
              <VendorTH>Bank Name</VendorTH>
              <VendorTH>Actions</VendorTH>
            </VendorTableRow>
          </VendorTableHead>
          <VedorTableBody>
            <VendorTableRow>
              <VendorTableCell></VendorTableCell>
              <VendorTableCell></VendorTableCell>
              <VendorTableCell></VendorTableCell>
              <VendorTableCell></VendorTableCell>
              <VendorTableCell></VendorTableCell>
              <VendorTableCell></VendorTableCell>
              <VendorTableCell></VendorTableCell>
              <VendorTableCell>
                <VendorEditButton>Edit</VendorEditButton>
                <VendorIconLink to="">
                  <DeleteIcon />
                </VendorIconLink>
              </VendorTableCell>
            </VendorTableRow>
          </VedorTableBody>
        </VendorTable>
      </VendorTableContainer>
    </VendorTableHolder>
  );
};

export default VendorsTable;

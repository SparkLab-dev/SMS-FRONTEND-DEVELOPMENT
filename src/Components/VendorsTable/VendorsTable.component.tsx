import { FC, useEffect, useState } from "react";
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
import {
  Vendor,
  deleteVendor,
  fetchVendors,
} from "redux/Containers/VendorForm/VendorFormSlice";

const VendorsTable: FC<{}> = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const dispatch: AppDispatch = useDispatch();

  //get all vendors api call
  useEffect(() => {
    dispatch(fetchVendors())
      .then((result: any) => {
        if (fetchVendors.fulfilled.match(result)) {
          setVendors(result.payload);
        } else {
          console.error("Vendor details not found.");
        }
      })
      .catch((error: any) => {
        console.error("Error fetching vendor details:", error);
      });
  }, [dispatch]);

  //delete vendor
  const handleDeleteVendor = async (vendorId: number) => {
    try {
      const result = await dispatch(deleteVendor(vendorId));
      if (deleteVendor.fulfilled.match(result)) {
        console.log("Vendor deleted successfully!");
        setVendors((prevState) =>
          prevState.filter((order) => order.id !== vendorId)
        );
      } else {
        console.error("Failed to delete vendor");
      }
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };
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
            {vendors.map((vendor: any, index: any) => (
              <VendorTableRow key={index}>
                <VendorTableCell>{vendor.companyName}</VendorTableCell>
                <VendorTableCell>{vendor.email}</VendorTableCell>
                <VendorTableCell>{vendor.phoneNumber}</VendorTableCell>
                <VendorTableCell>{vendor.contactPersonName}</VendorTableCell>
                <VendorTableCell>{vendor.notes}</VendorTableCell>
                <VendorTableCell>{vendor.paymentTerms}</VendorTableCell>
                <VendorTableCell>{vendor.bankName}</VendorTableCell>
                <VendorTableCell>
                  <VendorEditButton>Edit</VendorEditButton>
                  <VendorIconLink
                    to=""
                    onClick={() => handleDeleteVendor(vendor.id)}
                  >
                    <DeleteIcon />
                  </VendorIconLink>
                </VendorTableCell>
              </VendorTableRow>
            ))}
          </VedorTableBody>
        </VendorTable>
      </VendorTableContainer>
    </VendorTableHolder>
  );
};

export default VendorsTable;

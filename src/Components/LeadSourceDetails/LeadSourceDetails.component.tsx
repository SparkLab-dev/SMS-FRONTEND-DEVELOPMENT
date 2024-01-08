import { FC, useEffect, useState } from "react";
import {
  LeadDetailsTableBody,
  LeadDetailsTableCell,
  LeadDetailsTableContainer,
  LeadDetailsTableHeader,
} from "./style/LeadSourceDetails.style";
import {
  ButtonsHolder,
  EditButtonContainer,
  EditProductTableName,
} from "Components/ProductDetails/style/ProductDetails.style";
//mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import {
  LeadRequestBody,
  addLead,
  deleteLead,
  fetchLeadById,
  fetchLeadSource,
  fetchLeadStatus,
} from "redux/Pages/LeadSource/LeadSourceSlice";
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "Components/Popup/Popup.component";
import {
  InputsOfProductTable,
  ProductInputHold,
} from "Components/ProductsTable/style/ProductsTable.style";
import GenericInput from "Components/GenericInput/GenericInput.component";
import { LabelDescriptionContainer, StyledSelect } from "App/style/App.style";
import GenericButton from "Components/GenericButton/GenericButton.component";
import {
  ProductDetailss,
  fetchAllProducts,
} from "redux/Pages/Product/ProductSlice";

const LeadSourceDetails: FC<{}> = () => {
  const navigate = useNavigate();
  const [leadSourceDetails, setLeadSourceDetails] = useState<LeadRequestBody[]>(
    []
  );
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLeadSource, setSelectedLeadSource] = useState<number | null>(
    null
  );
  const [leadSource, setLeadSource] = useState<LeadRequestBody[]>([]);
  const [selectedLeadStatus, setSelectedLeadStatus] = useState<number | null>(
    null
  );
  const [leadStatus, setLeadStatus] = useState<LeadRequestBody[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [getAllProducts, setGetAllProducts] = useState<ProductDetailss[]>([]);

  console.log("selectedLead", selectedLead);
  const dispatch: AppDispatch = useDispatch();

  //get userRole from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);
  const userFirstName = useSelector(
    (state: RootState) => state.login.user?.firstName
  );
  const userLastName = useSelector(
    (state: RootState) => state.login.user?.lastName
  );

  const { id } = useParams();
  const leadDetailsId = id ? parseInt(id) : 0;

  //get lead by id
  useEffect(() => {
    const fetchLead = () => {
      if (leadDetailsId) {
        console.log(leadDetailsId);
        dispatch(fetchLeadById(leadDetailsId))
          .then((result: any) => {
            if (fetchLeadById.fulfilled.match(result)) {
              const fetchedContact = result.payload[0];
              setLeadSourceDetails(result.payload);
              setSelectedLeadSource(fetchedContact.leadSource.id);
              setSelectedLeadStatus(fetchedContact.leadStatus.id);
              setSelectedProduct(fetchedContact.productInterest.id);
            }
          })
          .catch((error: any) => {
            console.error("Error fetching  contact details:", error);
          });
      }
    };

    fetchLead();
  }, [dispatch, leadDetailsId]);

  //delete lead
  const handleDeleteLead = async (leadDetailsId: number) => {
    try {
      const result = await dispatch(deleteLead(leadDetailsId));
      if (deleteLead.fulfilled.match(result)) {
        console.log("Lead deleted successfully!");
        setLeadSourceDetails((prevState) =>
          prevState.filter((lead) => lead.id !== leadDetailsId)
        );
        navigate("/leadSourceTable");
      } else {
        console.error("Failed to delete lead");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const handleEdit = (lead: any) => {
    setIsModalOpen(true);
    setSelectedLead(lead);
  };

  //get all lead source api call
  useEffect(() => {
    dispatch(fetchLeadSource())
      .then((result: any) => {
        if (fetchLeadSource.fulfilled.match(result)) {
          setLeadSource(result.payload);
        } else {
          console.error("Lead source details not found.");
        }
      })
      .catch((error: any) => {
        console.error("Error fetching lead source details:", error);
      });
  }, [dispatch]);

  //get all lead status api call
  useEffect(() => {
    dispatch(fetchLeadStatus())
      .then((result: any) => {
        if (fetchLeadStatus.fulfilled.match(result)) {
          setLeadStatus(result.payload);
        } else {
          console.error("Lead status details not found.");
        }
      })
      .catch((error: any) => {
        console.error("Error fetching lead status details:", error);
      });
  }, [dispatch]);

  //get product api
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await dispatch(fetchAllProducts());
        if (fetchAllProducts.fulfilled.match(result)) {
          const orders = result.payload.flat();

          setGetAllProducts(orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrderData();
  }, [dispatch]);

  //post request
  const handleUpdateLeadClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const selectedLead = leadSource.find(
        (lead: any) => lead.id === selectedLeadSource
      );

      const selectedLeadName = selectedLead ? selectedLead?.name : "";

      console.log("selectedLead", selectedLeadName);
      const selectedStatus = leadStatus.find(
        (status: any) => status.id === selectedLeadStatus
      );

      const selectedStatusName = selectedStatus ? selectedStatus?.name : "";

      console.log("lead|Statsu", selectedStatusName);
      if (!selectedLead || selectedLeadSource === null) {
        console.error("Selected lead source not found.");
        return;
      }

      const selectedProductId = getAllProducts.find(
        (product: any) => product.id === selectedProduct
      );
      console.log("selectedProductId", selectedProductId);
      console.log("hiiiiiiii", selectedLead);
      const leadSouceCredentials = {
        id: leadDetailsId,
        firstName: selectedLead.firstName,
        lastName: selectedLead.lastName,
        company: selectedLead.company,
        leadSource: {
          id: selectedLeadSource,
          name: selectedLeadName,
        },
        annualRevenue: selectedLead.annualRevenue,
        phone: selectedLead.phone,
        email: selectedLead.email,
        website: selectedLead.website,
        description: selectedLead.description,
        leadStatus: {
          id: selectedLeadStatus,
          name: selectedStatusName,
        },
        numberOfEmployees: selectedLead.numberOfEmployees,
        address: {
          street: selectedLead.address.street,
          city: selectedLead.address.city,
          state: selectedLead.address.state,
          postalCode: selectedLead.address.postalCode,
          country: selectedLead.address.country,
        },
        productInterest: {
          id: selectedProduct,
        },
        createdBy: {
          id: userId,
          firstName: userFirstName,
          lastName: userLastName,
        },
        modifiedBy: {
          id: userId,
          firstName: userFirstName,
          lastName: userLastName,
        },
      };
      const response = await dispatch(addLead({ leadSouceCredentials }));

      if (addLead.fulfilled.match(response)) {
        const updatedLead = {
          ...selectedLead, // Update with the modified contact details
        };

        const updatedLeads = leadSourceDetails.map((lead) =>
          lead.id === leadDetailsId ? updatedLead : lead
        );

        setLeadSource(updatedLeads); // Update the state with modified contacts
        setIsModalOpen(false);
        console.log("Lead updated!");
      }
    } catch (error) {
      console.log("Error in handleLeadsClick:", error);
    }
  };
  return (
    <>
      <LeadDetailsTableContainer>
        <LeadDetailsTableHeader>
          <LeadDetailsTableCell>Actions</LeadDetailsTableCell>
          <LeadDetailsTableCell>FirstName</LeadDetailsTableCell>
          <LeadDetailsTableCell>LastName</LeadDetailsTableCell>
          <LeadDetailsTableCell>Company</LeadDetailsTableCell>
          <LeadDetailsTableCell>Lead Name</LeadDetailsTableCell>
          <LeadDetailsTableCell>Annual Revenue</LeadDetailsTableCell>
          <LeadDetailsTableCell>Phone</LeadDetailsTableCell>
          <LeadDetailsTableCell>Email</LeadDetailsTableCell>
          <LeadDetailsTableCell>Website</LeadDetailsTableCell>
          <LeadDetailsTableCell>Description</LeadDetailsTableCell>
          <LeadDetailsTableCell>Lead Status</LeadDetailsTableCell>
          <LeadDetailsTableCell>Number of employees</LeadDetailsTableCell>
          <LeadDetailsTableCell>Street</LeadDetailsTableCell>
          <LeadDetailsTableCell>City</LeadDetailsTableCell>
          <LeadDetailsTableCell>State</LeadDetailsTableCell>
          <LeadDetailsTableCell>Postal Code</LeadDetailsTableCell>
          <LeadDetailsTableCell>Country</LeadDetailsTableCell>
          <LeadDetailsTableCell>Product Name</LeadDetailsTableCell>
        </LeadDetailsTableHeader>
        {leadSourceDetails.map((leadDetails: any, index: number) => (
          <LeadDetailsTableBody key={index}>
            <LeadDetailsTableCell>
              <ButtonsHolder>
                <EditButtonContainer onClick={() => handleEdit(leadDetails)}>
                  Edit
                </EditButtonContainer>
                <DeleteIcon
                  style={{
                    color: "#1976d2",
                    textAlign: "center",
                    fontSize: "30px",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDeleteLead(leadDetails.id)}
                />
              </ButtonsHolder>
            </LeadDetailsTableCell>
            <LeadDetailsTableCell>{leadDetails.firstName}</LeadDetailsTableCell>
            <LeadDetailsTableCell>{leadDetails.lastName}</LeadDetailsTableCell>
            <LeadDetailsTableCell>{leadDetails.company}</LeadDetailsTableCell>
            <LeadDetailsTableCell>
              {leadDetails.leadSource?.name}
            </LeadDetailsTableCell>

            <LeadDetailsTableCell>
              {leadDetails.annualRevenue}
            </LeadDetailsTableCell>
            <LeadDetailsTableCell>{leadDetails.phone}</LeadDetailsTableCell>
            <LeadDetailsTableCell>{leadDetails.email}</LeadDetailsTableCell>
            <LeadDetailsTableCell>{leadDetails.website}</LeadDetailsTableCell>
            <LeadDetailsTableCell>
              {leadDetails.description}
            </LeadDetailsTableCell>
            <LeadDetailsTableCell>
              {leadDetails.leadStatus.name}
            </LeadDetailsTableCell>
            <LeadDetailsTableCell>
              {leadDetails.numberOfEmployees}
            </LeadDetailsTableCell>
            <LeadDetailsTableCell>
              {leadDetails.address.street}
            </LeadDetailsTableCell>
            <LeadDetailsTableCell>
              {leadDetails.address.city}
            </LeadDetailsTableCell>
            <LeadDetailsTableCell>
              {leadDetails.address.state}
            </LeadDetailsTableCell>
            <LeadDetailsTableCell>
              {leadDetails.address.postalCode}
            </LeadDetailsTableCell>
            <LeadDetailsTableCell>
              {leadDetails.address.country}
            </LeadDetailsTableCell>
            <LeadDetailsTableCell>
              {leadDetails.productInterest.productName}
            </LeadDetailsTableCell>
          </LeadDetailsTableBody>
        ))}
      </LeadDetailsTableContainer>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLead(null);
        }}
        headerContent={
          <EditProductTableName>Edit Contact</EditProductTableName>
        }
        bodyContent={
          <>
            <div>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="FirstName"
                    type="text"
                    value={selectedLead?.firstName || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        firstName: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="LastName"
                    value={selectedLead?.lastName || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>

              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Company"
                    value={selectedLead?.company || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        company: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <LabelDescriptionContainer>
                    Lead Source
                  </LabelDescriptionContainer>
                  <StyledSelect
                    value={
                      selectedLeadSource !== null
                        ? selectedLeadSource.toString()
                        : ""
                    }
                    onChange={(e: any) => {
                      const selectedLeadSourceId = Number(e.target.value);
                      setSelectedLeadSource(selectedLeadSourceId);
                    }}
                  >
                    <option value="none">Select an Option</option>
                    {leadSource.map((lead: any, index: any) => (
                      <option key={index} value={lead.id}>
                        {lead.name}
                      </option>
                    ))}
                  </StyledSelect>
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Annual Revenue"
                    value={selectedLead?.annualRevenue || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        annualRevenue: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Phone"
                    value={selectedLead?.phone || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        phone: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                {" "}
                <ProductInputHold>
                  <GenericInput
                    input_label="Email"
                    type="email"
                    value={selectedLead?.email || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        email: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Website"
                    value={selectedLead?.website || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        website: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                {" "}
                <ProductInputHold>
                  <GenericInput
                    input_label="Description "
                    value={selectedLead?.description || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        description: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <LabelDescriptionContainer>
                    Lead Status
                  </LabelDescriptionContainer>
                  <StyledSelect
                    value={
                      selectedLeadStatus !== null
                        ? selectedLeadStatus.toString()
                        : ""
                    }
                    onChange={(e: any) => {
                      const selectedLeadStatusId = Number(e.target.value);
                      setSelectedLeadStatus(selectedLeadStatusId);
                    }}
                  >
                    <option value="none">Select an Option</option>
                    {leadStatus.map((leadStatus: any, index: any) => (
                      <option key={index} value={leadStatus.id}>
                        {leadStatus.name}
                      </option>
                    ))}
                  </StyledSelect>
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Employee Number"
                    value={selectedLead?.numberOfEmployees || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        numberOfEmployees: e.target.value,
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  {" "}
                  <LabelDescriptionContainer>Product</LabelDescriptionContainer>
                  <StyledSelect
                    value={
                      selectedProduct !== null ? selectedProduct.toString() : ""
                    }
                    onChange={(e: any) => {
                      const selectedProductId = Number(e.target.value);
                      setSelectedProduct(selectedProductId);
                    }}
                  >
                    <option value="none">Select an Option</option>
                    {getAllProducts.map((product: any, index: any) => (
                      <option key={index} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </StyledSelect>
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Street"
                    value={selectedLead?.address.street || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        address: {
                          ...selectedLead.address,
                          street: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="City "
                    value={selectedLead?.address.city || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        address: {
                          ...selectedLead.address,
                          city: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="State"
                    value={selectedLead?.address.state || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        address: {
                          ...selectedLead.address,
                          state: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
                <ProductInputHold>
                  <GenericInput
                    input_label="Postal Code "
                    value={selectedLead?.address.postalCode || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        address: {
                          ...selectedLead.address,
                          postalCode: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
              <InputsOfProductTable>
                <ProductInputHold>
                  <GenericInput
                    input_label="Country"
                    value={selectedLead?.address.country || ""}
                    onChange={(e: any) => {
                      setSelectedLead({
                        ...selectedLead,
                        address: {
                          ...selectedLead.address,
                          country: e.target.value,
                        },
                      });
                    }}
                  />
                </ProductInputHold>
              </InputsOfProductTable>
            </div>
          </>
        }
        footerContent={
          <GenericButton name="Save" onClick={handleUpdateLeadClick} />
        }
      />
    </>
  );
};

export default LeadSourceDetails;

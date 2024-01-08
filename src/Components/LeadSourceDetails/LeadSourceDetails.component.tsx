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
} from "Components/ProductDetails/style/ProductDetails.style";
//mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import {
  LeadRequestBody,
  deleteLead,
  fetchLeadById,
} from "redux/Pages/LeadSource/LeadSourceSlice";
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const LeadSourceDetails: FC<{}> = () => {
  const navigate = useNavigate();
  const [leadSourceDetails, setLeadSourceDetails] = useState<LeadRequestBody[]>(
    []
  );

  const dispatch: AppDispatch = useDispatch();

  //get userRole from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

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
              //   setSelectedAccount(fetchedContact.account.id);
              //   setSelectedLeadSource(fetchedContact.leadSource.id);
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
                <EditButtonContainer>Edit</EditButtonContainer>
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
    </>
  );
};

export default LeadSourceDetails;

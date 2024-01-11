import styled from "styled-components";

export const SnackBarContainer = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  width: 300px; /* Adjust the width as needed */
  z-index: 999; /* Adjust the z-index to ensure it appears above other elements */
  display: flex;
  flex-direction: column; /* Stack messages from top to bottom */
`;

// position: fixed;
// bottom: 16px;
// right: 16px;
// width: 300px;
// z-index: 999;
//dispaly:flex;
// flex-direction: column-reverse;

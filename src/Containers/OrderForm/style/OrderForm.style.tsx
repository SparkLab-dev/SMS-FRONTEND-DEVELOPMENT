import styled from "styled-components";

export const OrderFormInputsHolder = styled.div`
  display: flex;
`;
export const OrderInputContainer = styled.div`
  flex: 1;
  margin: 5px;
`;
export const ProductsTableHead = styled.th``;
export const ProductsTableBody = styled.tbody``;
export const OrderFormTableContainer = styled.div`
  width: 100%;
  /* height: 80%; */
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  overflow-x: auto;
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

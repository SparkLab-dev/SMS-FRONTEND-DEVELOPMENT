import styled from "styled-components";

//mui icons
import EditIcon from "@mui/icons-material/Edit";

export const ProductDetailsContentHolder = styled.div`
  width: 100%;
  height: 82%;
  display: flex;
  flex-direction: column;
`;
export const ProductDetailsComponent = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 10px 0 17px 0;
`;
export const ProductList = styled.div`
  box-shadow: 3px 3px 15px 5px rgb(0 0 0 / 15%);
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  height: fit-content;
  max-width: 750px;
`;
export const EditProductButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  background-color: #0e53c5;
  border: 1px solid #0e53c5;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  height: 45px;
  gap: 5px;
  position: relative;
  width: 22%;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0;
`;
export const EditProductDetailsButtonNameContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
`;
export const EditProductButtonHolder = styled.div`
  height: fit-content;
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  z-index: 10;
`;
export const EditIconHold = styled(EditIcon)``;
export const EditProductText = styled.p`
  margin: 5px;
`;
export const DisplayProductsHolder = styled.div`
  width: 100%;
`;
export const ProductDetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: auto;
  overflow-x: auto;
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ProdDetailsHolder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const ProdTextHolders = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const ProdDetailsHeaderText = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 10px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Poppins";
`;

export const InformationOfProduct = styled.p`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 10px;
  margin-top: 20px;
  font-family: "Poppins";
  font-size: 15px;
`;
export const HorizontalLine = styled.p`
  border-bottom: 1px solid rgba(224, 224, 224, 1);
`;
export const PopupName = styled.h2`
  font-size: 30px;
  font-family: "Poppins";
  color: #0e53c5;
`;
export const PopupInputsContainer = styled.div`
  display: flex;
`;
export const InputOfPopupHolder = styled.div`
  flex: 1;
  margin: 5px;
`;
export const ProductImageHolder = styled.img`
  width: 75px;
  height: 75px;
`;

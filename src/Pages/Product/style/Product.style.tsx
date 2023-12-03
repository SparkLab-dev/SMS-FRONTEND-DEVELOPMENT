import styled from "styled-components";
export const Holder = styled.div`
  display: flex;
  height: 100%;
  margin: auto;
  justify-content: center;
  align-items: center;
`;
export const ProductContainer = styled.div`
  overflow-y: scroll;
  scrollbar-width: none; 
  -ms-overflow-style: none; 
  &::-webkit-scrollbar {
    display: none;
  }
  height: 360px;
`;
export const ImageContainer = styled.div`
  flex: 1;
  cursor: pointer;
  margin: 0 20px;
  padding: 0;
  /* position: sticky; */
  /* align-self: flex-start; */
  /* top: 36px; */
  /* justify-content: end; */
  /* overflow: hidden; */
  /* width: 400px; */
  /* height: 400px; */
`;
export const Image = styled.img`
  width: 350px;
  height: 350px;
`;
export const ProductDetailsHolder = styled.div`
  flex: 1;
  height: 360px;
`;
export const DetailContainer = styled.div``;
export const PriceParag = styled.p`
  font-family: "Poppins";
`;
export const ProductName = styled.h2`
  font-family: "Poppins";
`;

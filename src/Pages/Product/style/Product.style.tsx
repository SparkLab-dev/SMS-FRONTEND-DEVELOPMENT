import styled from "styled-components";
export const Holder = styled.div`
  display: flex;
  /* width: 100%; */
  height: 100%;
  margin: auto;
  justify-content: center;
  align-items: center;
`;
export const ProductContainer = styled.div`
  /* display: grid; */
  overflow-y: scroll; /* Enable vertical scrolling */
  /* Hide the scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer/Edge */
  /* WebKit-based browsers like Chrome and Safari */
  &::-webkit-scrollbar {
    display: none;
  }
  /* width: 400px; */
  height: 360px;

  /* max-width: 932px; */
  /* width: 100%; */
  /* height: 100%; */
  /* margin: 0 auto; */
  /* grid-column-gap: 64px; */
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

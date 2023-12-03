import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";

//style
import {
  Hr,
  ItemHandler,
  PopularDiv,
  PopularItem,
  PopularText,
} from "./style/Popular.style";

//components
import Item from "Components/Item/Item.component";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  ProductProps,
  fetchProductsCategory,
} from "redux/Pages/ProductCategory/ProductCategorySlice";

const Popular: FC<{}> = () => {
  const navigate = useNavigate();
  const [productCategory, setProductCategory] = useState<ProductProps[]>([]);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsCategory())
      .then((result: any) => {
        if (fetchProductsCategory.fulfilled.match(result)) {
          setProductCategory(result.payload);
        } else {
          console.error("Product details not found.");
        }
      })
      .catch((error: any) => {
        console.error("Error fetching Product details:", error);
      });
  }, [dispatch]);

  console.log("productCategory", productCategory);

  const handleProductCategoryClick = (item: ProductProps) => {
    console.log(item.id);
    navigate(`/shopcategory/${item.id}`);
  };

  return (
    <>
      <PopularDiv>
        <PopularText>POPULAR PRODUCTS</PopularText>
        <Hr />
        <PopularItem>
          {productCategory.map((item: any, index: any) => {
            return (
              <ItemHandler key={index} onClick={() => handleProductCategoryClick(item)}>
                <Item id={item.id} name={item.name} image={item.image} />
              </ItemHandler>
            );
          })}
        </PopularItem>
      </PopularDiv>
    </>
  );
};

export default Popular;

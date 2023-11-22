import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";

//style
import { ShopCategoryProducts } from "./style/ShopCategory.style";

//components
import Item from "Components/Item/Item.component";

//redux
import {
  ShopCategoryProductProps,
  fetchShopProductCategory,
} from "redux/Pages/ShopCategory/ShopCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";

const ShopCategory: FC<{}> = () => {
  const navigate = useNavigate();
  const [shopCategory, setShopCategory] = useState<ShopCategoryProductProps[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const productProps = useSelector((state: RootState) => state.products.user);
  const productId = productProps?.[0]?.id ?? null;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      if (productId) {
        console.log(productId);
        dispatch(fetchShopProductCategory(productId))
          .then((result: any) => {
            console.log("result", result);
            if (fetchShopProductCategory.fulfilled.match(result)) {
              setShopCategory(result.payload);
            } else if (fetchShopProductCategory.rejected.match(result)) {
              setError("Error fetching product names. Please try again later!");
            }
          })
          .catch((error: any) => {
            console.error("Error fetching product names:", error);
            setError("Error fetching product names. Please try again later!");
          });
      } else {
        setError("User ID not available.");
      }
    };

    fetchData();
  }, [dispatch, productId]);

  const handleProductClick = (item: ShopCategoryProductProps) => {
    console.log(item.id);
    navigate(`/product/${item.id}`);
  };

  return (
    <>
      <ShopCategoryProducts>
        {shopCategory.map((item: any, index: any) => {
          return (
            <div key={index} onClick={() => handleProductClick(item)}>
              <Item
                id={item.id}
                image={item.primaryImage}
                price={item.price}
                description={item.description}
              />
            </div>
          );
        })}
      </ShopCategoryProducts>
    </>
  );
};

export default ShopCategory;

import { FC, useState, useEffect } from "react";

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
// import { ProductImage, fetchImageCategory } from "redux/Pages/ImageCategory/ImageCategorySlice";

const ShopCategory: FC<{}> = () => {
  const [shopCategory, setShopCategory] = useState<ShopCategoryProductProps[]>(
    []
  );
  //   const [shopImage, setShopImage] = useState<ProductImage[]>([]);
  //   console.log("shopImage",shopImage);
  const [error, setError] = useState<string | null>(null);
  console.log("shopCategory", shopCategory);

  const productProps = useSelector((state: RootState) => state.products.user);
  const productId = productProps?.[0]?.id ?? null;

  console.log(productId);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      if (productId) {
        console.log(productId);
        dispatch(fetchShopProductCategory(productId))
          .then((result: any) => {
            console.log(result);
            if (fetchShopProductCategory.fulfilled.match(result)) {
              setShopCategory(result.payload);
            } else if (fetchShopProductCategory.rejected.match(result)) {
              setError(
                "Error fetching apartment names. Please try again later!"
              );
            }
          })
          .catch((error: any) => {
            console.error("Error fetching apartment names:", error);
            setError("Error fetching apartment names. Please try again later!");
          });
      } else {
        setError("User ID not available.");
      }
    };

    fetchData();
  }, [dispatch, productId]);

  //image api call
  //   useEffect(() => {
  //     const fetchImage = () => {
  //       if (productId) {
  //         console.log(productId);
  //         dispatch(fetchImageCategory(productId))
  //           .then((result: any) => {
  //             console.log(result);
  //             if (fetchImageCategory.fulfilled.match(result)) {
  //               setShopImage(result.payload);
  //             } else if (fetchImageCategory.rejected.match(result)) {
  //               setError("Error fetching images!");
  //             }
  //           })
  //           .catch((error: any) => {
  //             setError("Error images!");
  //           });
  //       } else {
  //         setError("Product ID not available.");
  //       }
  //     };

  //     fetchImage();
  //   }, [dispatch, productId]);
  return (
    <>
      <ShopCategoryProducts>
        {shopCategory.map((item: any, index: any) => {
          return (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              image={item.primaryImage}
              price={item.price}
              description={item.description}
            />
          );
        })}
      </ShopCategoryProducts>
    </>
  );
};

export default ShopCategory;

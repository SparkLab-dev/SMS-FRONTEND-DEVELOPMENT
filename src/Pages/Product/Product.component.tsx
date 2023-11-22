import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import {
  ProductImage,
  fetchImageCategory,
} from "redux/Pages/ImageCategory/ImageCategorySlice";
import { AppDispatch } from "redux/store";

//style
import {
  DetailContainer,
  Holder,
  Image,
  ImageContainer,
  PriceParag,
  ProductContainer,
  ProductDetailsHolder,
  ProductName,
} from "./style/Product.style";
import {
  ProductDetails,
  fetchProductDetails,
} from "redux/Pages/Product/ProductSlice";

const Product: FC<{}> = () => {
  const [image, setImage] = useState<ProductImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductDetails[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const productId = id ? parseInt(id) : 0;
  console.log(productId);
  useEffect(() => {
    const fetchImage = () => {
      if (productId) {
        console.log(productId);
        dispatch(fetchImageCategory(productId))
          .then((result: any) => {
            console.log(result);
            if (fetchImageCategory.fulfilled.match(result)) {
              setImage(result.payload);
            } else if (fetchImageCategory.rejected.match(result)) {
              setError("Error fetching images. Please try again later!");
            }
          })
          .catch((error: any) => {
            console.error("Error fetching images:", error);
            setError("Error fetching images. Please try again later!");
          });
      } else {
        setError("Product ID not available.");
      }
    };

    fetchImage();
  }, [dispatch, productId]);

  //get product api
  useEffect(() => {
    const fetchProduct = () => {
      if (productId) {
        console.log(productId);
        dispatch(fetchProductDetails(productId))
          .then((result: any) => {
            console.log(result);
            if (fetchProductDetails.fulfilled.match(result)) {
              setProduct(result.payload);
            } else if (fetchProductDetails.rejected.match(result)) {
              setError("Error fetching product details");
            }
          })
          .catch((error: any) => {
            console.error("Error fetching  product details:", error);
            setError(
              "Error fetching  product details. Please try again later!"
            );
          });
      } else {
        setError("Product ID not available.");
      }
    };

    fetchProduct();
  }, [dispatch, productId]);
  return (
    <Holder>
      <ProductContainer>
        {image.map((item: any, index: any) => {
          return (
            <ImageContainer key={index}>
              <Image
                id={item.id}
                src={`data:image/jpeg;base64,${item.image}`}
              />
            </ImageContainer>
          );
        })}
      </ProductContainer>
      <ProductDetailsHolder>
        {product.map((prod: any, i: any) => {
          return (
            <DetailContainer key={i}>
              <ProductName>{prod.name}</ProductName>
              <PriceParag>{prod.description}</PriceParag>
              <PriceParag>{prod.price} $</PriceParag>
              <PriceParag>{prod.stockQuantity}</PriceParag>
              <PriceParag>{prod.productCategory?.name}</PriceParag>
            </DetailContainer>
          );
        })}{" "}
      </ProductDetailsHolder>
    </Holder>
  );
};

export default Product;

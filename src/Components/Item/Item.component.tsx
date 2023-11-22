import { FC } from "react";

//style
import { Image, ItemPriceNew, ItemPrices } from "./style/Item.style";

interface ItemProps {
  id?: number;
  image?: string;
  name?: string;
  price?: any;
  old_item?: any;
  description?: string;
}

const Item: FC<ItemProps> = (props) => {
  return (
    <div>
      {props.image ? (
        <Image
          src={`data:image/jpeg;base64,${props.image}`}
          alt={props.name || ""}
        />
      ) : (
        <div>No Image Available</div>
      )}
      <p>{props.description}</p>
      <ItemPrices>
        {props.price && <ItemPriceNew>{props.price} $</ItemPriceNew>}
      </ItemPrices>
    </div>
  );
};

export default Item;

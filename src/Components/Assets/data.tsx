const Pencil = require("../Assets/pencil.jpg") as string;
const Bicycle = require("../Assets/bicycle.jpg") as string;
const CellPhone = require("../Assets/cellphone.jpg") as string;
interface Product {
  id: number;
  name: string;
  image: string;
  new_price: number;
  old_price: number;
}

const data_product: Product[] = [
  {
    id: 1,
    name: "Pencil",
    image: Pencil,
    new_price: 50.0,
    old_price: 80.5,
  },
  {
    id: 2,
    name: "Bicycle",
    image: Bicycle,
    new_price: 85.0,
    old_price: 80.5,
  },
  {
    id: 3,
    name: "CellPhone",
    image: CellPhone,
    new_price: 45.0,
    old_price: 70.5,
  },
];

export default data_product;

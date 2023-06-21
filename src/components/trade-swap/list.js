import bnb from "../../Assets/coins/bnb.png";
import usdt from "../../Assets/coins/usdt.jpeg";
import paris from "../../Assets/coins/0xbc5609612b7c44bef426de600b5fd1379db2ecf1.png";
import { nativeCurrency } from "../../utils";
const TokenList = [
  {
    name: nativeCurrency,
    decimal: 18,
    image: bnb,
  },
  {
    name: "USDT",
    decimal: 18,
    image: usdt,
  },
  {
    name: "Paris",
    decimal: 18,
    image: paris,
  },
];
export default TokenList;

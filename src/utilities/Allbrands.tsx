import Data from "../Data.json"
import { allbrandsProps } from "../types/Store";

const men = Data.fashionPage.fashionStore.men;
const women = Data.fashionPage.fashionStore.women;
const kids = Data.fashionPage.fashionStore.kids;
const allbrands: allbrandsProps[] = [...men, ...women, ...kids];

export default allbrands;

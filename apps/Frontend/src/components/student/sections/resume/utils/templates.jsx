import Modern from "./templates/Modern";
import Professional from "./templates/Professional";
import Minimalist from "./templates/Minimalist";
import Creative from "./templates/Creative";
import Modernthumbnail from "../../../../../assets/modern.png";
import Professionalthumbnail from "../../../../../assets/professional.png";
import Minimalistthumbnail from "../../../../../assets/minimalist.png";
import Creativethumbnail from "../../../../../assets/creative.png";
export const templates = {
  modern: {
    name: "Modern",
    component: Modern,
    thumbnail: Modernthumbnail,
  },
  professional: {
    name: "Professional",
    component: Professional,
    thumbnail: Professionalthumbnail,
  },
  minimalist: {
    name: "Minimalist",
    component: Minimalist,
    thumbnail: Minimalistthumbnail,
  },
  creative: {
    name: "Creative",
    component: Creative,
    thumbnail: Creativethumbnail,
  },
};

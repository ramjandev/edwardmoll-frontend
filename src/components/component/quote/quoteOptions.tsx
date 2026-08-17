export type IconNode = LucideIcon | IconType;
export interface IconOption {
  name: string;
  icon: IconNode;
}
import type { LucideIcon } from "lucide-react";
import { BsStars } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import type { IconType } from "react-icons/lib";
import { LuPackage, LuPackageOpen } from "react-icons/lu";
import { TbHomeSignal } from "react-icons/tb";

export interface SpecialtyOption extends IconOption {
  dropdownKey:
    | "applianceType"
    | "heavyFurnitureType"
    | "pianoType"
    | "safeType"
    | "specialtyType";
  options: string[];
}

export const step1Options: IconOption[] = [
  { name: "Apartment", icon: LuPackageOpen },
  { name: "Condo", icon: LuPackageOpen },
  { name: "House", icon: FiHome },
  { name: "Office", icon: LuPackageOpen },
  { name: "Storage Unit", icon: TbHomeSignal },
  { name: "Senior Move", icon: FiHome },
];

export const step2Options: string[] = [
  "Studio",
  "1 Bedroom",
  "2 Bedroom",
  "3 Bedroom",
  "4 Bedroom",
  "5+ Bedroom",
];

export const step3Options: IconOption[] = [
  { name: "Same building", icon: GrLocation },
  { name: "Same city", icon: GrLocation },
  { name: "Phoenix Metro Area", icon: GrLocation },
  { name: "Long distance", icon: GrLocation },
];

export const step4Options: string[] = [
  "1 flight",
  "2 flights",
  "No stairs",
  "Multiple flights",
];

export const step5Options: IconOption[] = [
  { name: "No packing", icon: LuPackage },
  { name: "Partial packing", icon: LuPackage },
  { name: "Full packing", icon: LuPackage },
  { name: "Boxes and materials", icon: LuPackage },
];

export const step6Options: IconOption[] = [
  { name: "Furniture relocation", icon: BsStars },
  { name: "Storage moves", icon: BsStars },
  { name: "Realtor services", icon: BsStars },
  { name: "Leasing agent services", icon: BsStars },
  { name: "Staging assistance", icon: BsStars },
  { name: "Senior moving assistance", icon: BsStars },
];

export const step7Options: SpecialtyOption[] = [
  {
    name: "Appliances",
    icon: LuPackageOpen,
    dropdownKey: "applianceType",
    options: ["Refrigerator", "Washer", "Dryer", "Stove / Range", "Freezer"],
  },
  {
    name: "Heavy furniture",
    icon: LuPackageOpen,
    dropdownKey: "heavyFurnitureType",
    options: [
      "Armoire / Wardrobe",
      "Triple Dresser",
      "Buffet / Credenza",
      "Sleep Sofa / Futon",
      "Large Desk",
    ],
  },
  {
    name: "Piano",
    icon: LuPackageOpen,
    dropdownKey: "pianoType",
    options: [
      "Upright piano",
      "Console / spinet piano",
      "Baby grand",
      "Full grand piano",
      "Digital piano / keyboard",
    ],
  },
  {
    name: "Safe",
    icon: LuPackageOpen,
    dropdownKey: "safeType",
    options: [
      "Gun safe (small)",
      "Gun safe (large)",
      "Document safe",
      "Heavy home safe",
    ],
  },
  {
    name: "Specialty items",
    icon: LuPackageOpen,
    dropdownKey: "specialtyType",
    options: [
      "Pool table",
      "Hot tub",
      "Gym equipment / Treadmill",
      "Grandfather clock",
      "Artwork / Sculpture",
    ],
  },
];

import type { QuoteFields } from "./schema/quoteSchema";

export const getMappedPayload = (
  data: QuoteFields,
  actualDetails?: {
    name: string;
    email: string;
    phone: string;
    pickup: string;
  },
) => {
  let mappedHouseSize = "1 Bedroom Apartment";
  if (data.propertyType === "Office") {
    mappedHouseSize = "Office / Commercial space";
  } else if (
    data.propertyType === "Apartment" ||
    data.propertyType === "Condo"
  ) {
    if (data.moveSize === "Studio") mappedHouseSize = "Studio Apartment";
    else if (data.moveSize === "1 Bedroom")
      mappedHouseSize = "1 Bedroom Apartment";
    else if (data.moveSize === "2 Bedroom")
      mappedHouseSize = "2 Bedroom Apartment";
    else mappedHouseSize = "3 Bedroom House";
  } else {
    if (data.moveSize.includes("3 Bedroom"))
      mappedHouseSize = "3 Bedroom House";
    else if (data.moveSize.includes("4 Bedroom"))
      mappedHouseSize = "4+ Bedroom House";
    else if (data.moveSize.includes("5+ Bedroom"))
      mappedHouseSize = "4+ Bedroom House";
    else if (data.moveSize.includes("1 Bedroom"))
      mappedHouseSize = "1 Bedroom Apartment";
    else mappedHouseSize = "2 Bedroom Apartment";
  }

  let stairsCount = 0;
  if (data.stairsCategory === "1 flight") stairsCount = 1;
  else if (data.stairsCategory === "2 flights") stairsCount = 2;
  else if (data.stairsCategory === "Multiple flights") stairsCount = 4;

  let distanceMiles = 10;
  if (data.distanceCategory === "Same building") distanceMiles = 1;
  else if (data.distanceCategory === "Phoenix Metro Area") distanceMiles = 25;
  else if (data.distanceCategory === "Long distance") distanceMiles = 100;

  const mappedHeavyItems: string[] = [];
  if (data.selectedSpecialtyItems.includes("Appliances") && data.applianceType)
    mappedHeavyItems.push(data.applianceType);
  if (
    data.selectedSpecialtyItems.includes("Heavy furniture") &&
    data.heavyFurnitureType
  )
    mappedHeavyItems.push(data.heavyFurnitureType);
  if (data.selectedSpecialtyItems.includes("Piano") && data.pianoType)
    mappedHeavyItems.push(data.pianoType);
  if (data.selectedSpecialtyItems.includes("Safe") && data.safeType)
    mappedHeavyItems.push(data.safeType);
  if (
    data.selectedSpecialtyItems.includes("Specialty items") &&
    data.specialtyType
  )
    mappedHeavyItems.push(data.specialtyType);

  const nameParts = (actualDetails?.name || "Anonymous Customer")
    .trim()
    .split(" ");
  const firstName = nameParts[0] || "Anonymous";
  const lastName = nameParts.slice(1).join(" ") || "Customer";

  return {
    firstName,
    lastName,
    email: actualDetails?.email || "anonymous@moving.com",
    phone: actualDetails?.phone || "0000000000",
    addressLine1: actualDetails?.pickup || "Phoenix, AZ",
    city: "Phoenix",
    state: "AZ",
    zip: "85001",
    houseSize: mappedHouseSize,
    stairs: stairsCount,
    heavyItems: mappedHeavyItems,
    distance: distanceMiles,
  };
};

export const getNormalizedBreakdowns = (
  data: QuoteFields,
  calculatedQuote: any,
  watchAdditionalServices: string[],
  watchSelectedSpecialtyItems: string[],
) => {
  if (!calculatedQuote) return null;

  const rawTotal = Number(calculatedQuote.estimatedTotal);

  let base = 320;
  if (data.moveSize === "Studio") base = 200;
  else if (data.moveSize === "2 Bedroom") base = 450;
  else if (data.moveSize === "3 Bedroom") base = 600;
  else if (data.moveSize.includes("4")) base = 750;

  let dist = 60;
  if (data.distanceCategory === "Same building") dist = 30;
  else if (data.distanceCategory === "Phoenix Metro Area") dist = 120;
  else if (data.distanceCategory === "Long distance") dist = 350;

  let stairs = 0;
  if (data.stairsCategory === "1 flight") stairs = 60;
  else if (data.stairsCategory === "2 flights") stairs = 120;
  else if (data.stairsCategory === "Multiple flights") stairs = 240;

  let packing = 0;
  if (data.packingCategory === "Partial packing") packing = 95;
  else if (data.packingCategory === "Full packing") packing = 280;
  else if (data.packingCategory === "Boxes and materials") packing = 150;

  const addl = watchAdditionalServices.length * 150;
  const specialty = watchSelectedSpecialtyItems.length * 200;

  const sum = base + dist + stairs + packing + addl + specialty;
  const factor = rawTotal / (sum || 1);

  return {
    base: Math.round(base * factor),
    dist: Math.round(dist * factor),
    stairs: Math.round(stairs * factor),
    packing: Math.round(packing * factor),
    addl: Math.round(addl * factor),
    specialty: Math.round(specialty * factor),
  };
};

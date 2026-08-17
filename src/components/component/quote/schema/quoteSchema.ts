import { z } from "zod";

const dropdownRules = [
  {
    item: "Appliances",
    field: "applianceType" as const,
    label: "an appliance type",
  },
  {
    item: "Heavy furniture",
    field: "heavyFurnitureType" as const,
    label: "a furniture type",
  },
  { item: "Piano", field: "pianoType" as const, label: "a piano type" },
  { item: "Safe", field: "safeType" as const, label: "a safe type" },
  {
    item: "Specialty items",
    field: "specialtyType" as const,
    label: "a specialty item type",
  },
];

export const quoteSchema = z
  .object({
    // Step 1
    propertyType: z
      .string()
      .min(1, { message: "Please select a property type." }),
    // Step 2
    moveSize: z.string().min(1, { message: "Please select a space size." }),
    // Step 3
    distanceCategory: z
      .string()
      .min(1, { message: "Please select moving distance." }),
    // Step 4
    stairsCategory: z
      .string()
      .min(1, { message: "Please select stairs detail." }),
    // Step 5
    packingCategory: z
      .string()
      .min(1, { message: "Please select a packing option." }),
    // Step 6
    additionalServices: z.array(z.string()),
    // Step 7
    selectedSpecialtyItems: z.array(z.string()),
    applianceType: z.string().optional(),
    heavyFurnitureType: z.string().optional(),
    pianoType: z.string().optional(),
    safeType: z.string().optional(),
    specialtyType: z.string().optional(),
    // Step 9
    bookingName: z
      .string()
      .trim()
      .min(2, { message: "Your name is required." }),
    bookingPhone: z
      .string()
      .trim()
      .min(10, { message: "Phone number is required." }),
    bookingEmail: z
      .string()
      .trim()
      .email({ message: "Valid email is required." }),
    bookingDate: z.string().min(1, { message: "Select a moving date." }),
    pickupAddress: z
      .string()
      .trim()
      .min(5, { message: "Pickup address is required." }),
    deliveryAddress: z
      .string()
      .trim()
      .min(5, { message: "Delivery address is required." }),
  })

  .superRefine((data, ctx) => {
    dropdownRules.forEach(({ item, field, label }) => {
      const isCardSelected = data.selectedSpecialtyItems.includes(item);
      const hasDropdownValue = !!data[field];

      if (isCardSelected && !hasDropdownValue) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Please select ${label}.`,
          path: [field],
        });
      }
    });
  });

export type QuoteFields = z.infer<typeof quoteSchema>;

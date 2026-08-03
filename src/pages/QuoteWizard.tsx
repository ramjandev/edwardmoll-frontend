import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateQuoteMutation, useUpdateQuoteMutation } from "../store/quotes/quoteApi";
import { useCreateBookingMutation, useMockPaySuccessMutation } from "../store/bookings/bookingApi";
import { useCreatePaymentIntentMutation } from "../store/payments/paymentApi";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  setQuoteId,
  setBookingId,
  setCalculatedQuote,
  setBookingResult,
  resetBookingFlow,
} from "../store/Booking/bookingSlice";

// Load Stripe with fallback developer test key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51TzScoRy6387gtSAlM017hR1Y94FoJ9bnChcoLqkU7WigTgfskZnUyGvx1xwg7YC0bH0P2gpCmZrjyhazdrGD66g00rNfpqYeI"
);

// Define Zod Validation Schema for all Wizard fields
const quoteSchema = z.object({
  // Step 1: Property Type
  propertyType: z.string().min(1, { message: "Please select a property type." }),
  
  // Step 2: Space Size
  moveSize: z.string().min(1, { message: "Please select a space size." }),
  
  // Step 3: Distance category
  distanceCategory: z.string().min(1, { message: "Please select moving distance." }),
  
  // Step 4: Stairs Category
  stairsCategory: z.string().min(1, { message: "Please select stairs detail." }),
  
  // Step 5: Packing Category
  packingCategory: z.string().min(1, { message: "Please select a packing option." }),

  // Step 6: Additional Services (Multi-select)
  additionalServices: z.array(z.string()),

  // Step 7: Large & Specialty Items (Multi-select with sub-selections)
  selectedSpecialtyItems: z.array(z.string()),
  applianceType: z.string().optional(),
  heavyFurnitureType: z.string().optional(),
  pianoType: z.string().optional(),
  safeType: z.string().optional(),
  specialtyType: z.string().optional(),

  // Step 9: Booking details form
  bookingName: z.string().trim().min(2, { message: "Your name is required." }),
  bookingPhone: z.string().trim().min(10, { message: "Phone number is required." }),
  bookingEmail: z.string().trim().email({ message: "Valid email is required." }),
  bookingDate: z.string().min(1, { message: "Select a moving date." }),
  pickupAddress: z.string().trim().min(5, { message: "Pickup address is required." }),
  deliveryAddress: z.string().trim().min(5, { message: "Delivery address is required." }),
});

type QuoteFields = z.infer<typeof quoteSchema>;

// Stripe Checkout Component
const StripeCheckoutForm = ({
  bookingId,
  amount,
  onSuccess,
}: {
  bookingId: string;
  amount: number;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent, { isLoading: isIntentLoading }] =
    useCreatePaymentIntentMutation();
  const [mockPaySuccess] = useMockPaySuccessMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage("");

    try {
      // 1. Create PaymentIntent in backend
      const intentRes = await createPaymentIntent({ bookingId }).unwrap();
      const clientSecret = intentRes.clientSecret;

      // 2. Confirm Card Payment directly on Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setErrorMessage(error.message || "Payment verification failed.");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        try {
          await mockPaySuccess(bookingId).unwrap();
        } catch (confirmErr) {
          console.error("Failed to confirm payment success on local backend:", confirmErr);
        }
        onSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err.data?.message || err.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-md border border-[var(--border)] bg-[#0d1e33] p-4">
        <CardElement
          options={{
            style: {
              base: {
                color: "#ffffff",
                fontFamily: "Inter, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                  color: "#94a3b8",
                },
              },
              invalid: {
                color: "#ef4444",
                iconColor: "#ef4444",
              },
            },
          }}
        />
      </div>

      {errorMessage && (
        <div className="text-sm text-red-400 font-medium bg-red-950/40 border border-red-800 rounded p-2">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing || isIntentLoading}
        className="w-full rounded-md bg-[var(--primary)] py-3 px-4 text-center text-sm font-semibold text-[var(--primary-foreground)] shadow transition hover:opacity-90 disabled:opacity-50 cursor-pointer"
      >
        {isProcessing ? "Processing Security Deposit..." : `Pay Deposit $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

// Main Quote Wizard Page
const QuoteWizard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [createQuote, { isLoading: isQuoteLoading }] = useCreateQuoteMutation();
  const [updateQuote, { isLoading: isUpdateLoading }] = useUpdateQuoteMutation();
  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();

  // Retrieve states from Redux slice to avoid duplicate calls
  const { quoteId, calculatedQuote, bookingResult } = useSelector(
    (state: RootState) => state.bookingFlow
  );

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Initialize React Hook Form with Zod schema
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<QuoteFields>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      propertyType: "",
      moveSize: "",
      distanceCategory: "",
      stairsCategory: "",
      packingCategory: "",
      additionalServices: [],
      selectedSpecialtyItems: [],
      applianceType: "",
      heavyFurnitureType: "",
      pianoType: "",
      safeType: "",
      specialtyType: "",
      bookingName: "",
      bookingPhone: "",
      bookingEmail: "",
      bookingDate: "",
      pickupAddress: "",
      deliveryAddress: "",
    },
  });

  // Dynamic Options (Replicating Client Screenshots)
  const step1Options = [
    { name: "Apartment", icon: "🏢" },
    { name: "Condo", icon: "🏙️" },
    { name: "House", icon: "🏠" },
    { name: "Office", icon: "💼" },
    { name: "Storage Unit", icon: "📦" },
    { name: "Senior Move", icon: "🤝" },
  ];

  const step2Options = [
    "Studio",
    "1 Bedroom",
    "2 Bedroom",
    "3 Bedroom",
    "4 Bedroom",
    "5+ Bedroom",
  ];

  const step3Options = [
    { name: "Same building", icon: "📍" },
    { name: "Same city", icon: "📍" },
    { name: "Phoenix Metro Area", icon: "📍" },
    { name: "Long distance", icon: "📍" },
  ];

  const step4Options = [
    "1 flight",
    "2 flights",
    "No stairs",
    "Multiple flights",
  ];

  const step5Options = [
    { name: "No packing", icon: "📦" },
    { name: "Partial packing", icon: "📦" },
    { name: "Full packing", icon: "📦" },
    { name: "Boxes and materials", icon: "📦" },
  ];

  const step6Options = [
    { name: "Furniture relocation", icon: "✨" },
    { name: "Storage moves", icon: "✨" },
    { name: "Realtor services", icon: "✨" },
    { name: "Leasing agent services", icon: "✨" },
    { name: "Staging assistance", icon: "✨" },
    { name: "Senior moving assistance", icon: "✨" },
  ];

  const step7Options = [
    { name: "Appliances", icon: "📦", dropdownKey: "applianceType", options: ["Refrigerator", "Washer", "Dryer", "Stove / Range", "Freezer"] },
    { name: "Heavy furniture", icon: "📦", dropdownKey: "heavyFurnitureType", options: ["Armoire / Wardrobe", "Triple Dresser", "Buffet / Credenza", "Sleep Sofa / Futon", "Large Desk"] },
    { name: "Piano", icon: "📦", dropdownKey: "pianoType", options: ["Upright piano", "Console / spinet piano", "Baby grand", "Full grand piano", "Digital piano / keyboard"] },
    { name: "Safe", icon: "📦", dropdownKey: "safeType", options: ["Gun safe (small)", "Gun safe (large)", "Document safe", "Heavy home safe"] },
    { name: "Specialty items", icon: "📦", dropdownKey: "specialtyType", options: ["Pool table", "Hot tub", "Gym equipment / Treadmill", "Grandfather clock", "Artwork / Sculpture"] },
  ];

  // Watch selected items for multi-select states
  const watchAdditionalServices = watch("additionalServices") || [];
  const watchSelectedSpecialtyItems = watch("selectedSpecialtyItems") || [];

  const handleAdditionalServicesToggle = (name: string) => {
    const updated = watchAdditionalServices.includes(name)
      ? watchAdditionalServices.filter((s) => s !== name)
      : [...watchAdditionalServices, name];
    setValue("additionalServices", updated);
  };

  const handleSpecialtyItemsToggle = (name: string) => {
    const updated = watchSelectedSpecialtyItems.includes(name)
      ? watchSelectedSpecialtyItems.filter((s) => s !== name)
      : [...watchSelectedSpecialtyItems, name];
    setValue("selectedSpecialtyItems", updated);
  };

  // Helper: map frontend properties into CreateQuote payload
  const getMappedPayload = (data: QuoteFields, actualDetails?: { name: string; email: string; phone: string; pickup: string }) => {
    let mappedHouseSize = "1 Bedroom Apartment";
    if (data.propertyType === "Office") {
      mappedHouseSize = "Office / Commercial space";
    } else if (data.propertyType === "Apartment" || data.propertyType === "Condo") {
      if (data.moveSize === "Studio") mappedHouseSize = "Studio Apartment";
      else if (data.moveSize === "1 Bedroom") mappedHouseSize = "1 Bedroom Apartment";
      else if (data.moveSize === "2 Bedroom") mappedHouseSize = "2 Bedroom Apartment";
      else mappedHouseSize = "3 Bedroom House";
    } else {
      if (data.moveSize.includes("3 Bedroom")) mappedHouseSize = "3 Bedroom House";
      else if (data.moveSize.includes("4 Bedroom")) mappedHouseSize = "4+ Bedroom House";
      else if (data.moveSize.includes("5+ Bedroom")) mappedHouseSize = "4+ Bedroom House";
      else if (data.moveSize.includes("1 Bedroom")) mappedHouseSize = "1 Bedroom Apartment";
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
    if (data.selectedSpecialtyItems.includes("Appliances") && data.applianceType) mappedHeavyItems.push(data.applianceType);
    if (data.selectedSpecialtyItems.includes("Heavy furniture") && data.heavyFurnitureType) mappedHeavyItems.push(data.heavyFurnitureType);
    if (data.selectedSpecialtyItems.includes("Piano") && data.pianoType) mappedHeavyItems.push(data.pianoType);
    if (data.selectedSpecialtyItems.includes("Safe") && data.safeType) mappedHeavyItems.push(data.safeType);
    if (data.selectedSpecialtyItems.includes("Specialty items") && data.specialtyType) mappedHeavyItems.push(data.specialtyType);

    const nameParts = (actualDetails?.name || "Anonymous Customer").trim().split(" ");
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

  // Step 7 trigger: fetch anonymous estimate sheets calculation only once
  const handleCalculateAnonymousEstimate = async () => {
    const data = watch();
    const payload = getMappedPayload(data);

    try {
      if (quoteId) {
        // If we already have a quote ID generated, UPDATE it instead of posting again!
        const res = await updateQuote({ id: quoteId, data: payload }).unwrap();
        dispatch(setCalculatedQuote(res));
        setStep(8);
      } else {
        // First time calculation: create new quote
        const res = await createQuote(payload).unwrap();
        dispatch(setCalculatedQuote(res));
        dispatch(setQuoteId(res.quoteId));
        setStep(8); // Go to estimate details page
      }
    } catch (err) {
      // Handled automatically
    }
  };

  // Step 9 trigger: submit actual booking details using stored quoteId from Redux
  const handleConfirmReservation = async (data: QuoteFields) => {
    if (bookingResult) {
      setStep(10);
      return;
    }

    try {
      if (!quoteId) throw new Error("No quote ID found.");

      const nameParts = data.bookingName.trim().split(" ");
      const firstName = nameParts[0] || "Anonymous";
      const lastName = nameParts.slice(1).join(" ") || "Customer";
      const fcmToken = localStorage.getItem("fcm_token") || undefined;

      const bookingRes = await createBooking({
        quoteId: quoteId,
        movingDate: new Date(data.bookingDate).toISOString(),
        firstName,
        lastName,
        email: data.bookingEmail,
        phone: data.bookingPhone,
        addressLine1: data.pickupAddress,
        addressLine2: data.deliveryAddress,
        fcmToken,
      }).unwrap();

      dispatch(setBookingResult(bookingRes));
      dispatch(setBookingId(bookingRes.bookingId));
      setStep(10); // Transition directly to Stripe Elements checkout page (Step 10)
    } catch (err) {
      // Handled automatically
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Custom step validation triggers
  const handleStep1Next = async () => {
    const isValid = await trigger(["propertyType"]);
    if (isValid) nextStep();
  };

  const handleStep2Next = async () => {
    const isValid = await trigger(["moveSize"]);
    if (isValid) nextStep();
  };

  const handleStep3Next = async () => {
    const isValid = await trigger(["distanceCategory"]);
    if (isValid) nextStep();
  };

  const handleStep4Next = async () => {
    const isValid = await trigger(["stairsCategory"]);
    if (isValid) nextStep();
  };

  const handleStep5Next = async () => {
    const isValid = await trigger(["packingCategory"]);
    if (isValid) nextStep();
  };

  const handleStep6Next = async () => {
    const isValid = await trigger(["additionalServices"]);
    if (isValid) nextStep();
  };

  // Helper to compute dynamic breakdowns that normalize exactly to the estimatedTotal
  const getNormalizedBreakdowns = () => {
    if (!calculatedQuote) return null;

    const data = watch();
    const rawTotal = Number(calculatedQuote.estimatedTotal);

    // Initial mock values based on choices
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

    // Normalize values
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

  const breakdowns = getNormalizedBreakdowns();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[#071425]/90 backdrop-blur w-full">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logoImg} alt="AAAAAffordable Moving" className="h-10 object-contain" />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase">
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/")}>Home</span>
            <span className="cursor-pointer text-[var(--primary)] hover:opacity-90">Instant Quote</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/services")}>Services</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/realtors")}>Realtors & Leasing</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/about")}>About</span>
            <span className="cursor-pointer text-slate-300 hover:text-white" onClick={() => navigate("/contact")}>Contact</span>
          </nav>

          <a
            href="tel:602-921-5749"
            className="flex items-center gap-2 rounded border border-[var(--primary)] bg-[var(--primary)]/10 py-1.5 px-4 text-sm font-bold text-[var(--primary)] shadow hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition duration-200"
          >
            📞 602-921-5749
          </a>
        </div>
      </header>

      {/* Sub-Hero Text for Quote Page */}
      {step === 1 && (
        <section className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center space-y-6">
          <span className="text-xs font-black uppercase text-[var(--primary)] tracking-widest block">Instant Quote</span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
            Build your flat-rate <br />
            <span className="text-[var(--primary)]">quote.</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            No sign-up. No spam. Just an honest number before you commit to anything.
          </p>
        </section>
      )}

      {/* Main Form Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-10 flex flex-col justify-center animate-fadeIn">
        {/* Progress visualizer */}
        {step <= 7 && (
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
            <span className="text-[var(--primary)]">Step {step} of 7</span>
            <span>No sign-up required</span>
          </div>
        )}

        {/* Progress bar line */}
        {step <= 7 && (
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-10 border border-[var(--border)]">
            <div
              className="h-full bg-[var(--primary)] transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        )}

        {/* Card Wrapper */}
        <div className="w-full bg-[#0c1f36]/40 backdrop-blur rounded-lg border border-[var(--border)] p-6 sm:p-10 shadow-2xl flex flex-col">
          
          {/* Step 1: Property Type */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                  What are you moving?
                </h2>
                <p className="text-sm text-slate-400 font-medium">Pick the option that best describes your move.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {step1Options.map((opt) => {
                  const isSelected = watch("propertyType") === opt.name;
                  return (
                    <div
                      key={opt.name}
                      onClick={() => setValue("propertyType", opt.name)}
                      className={`rounded border p-5 flex items-center justify-between cursor-pointer transition duration-150 ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary)]/10"
                          : "border-[var(--border)] bg-[#071425] hover:border-[var(--primary)]/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="size-10 rounded bg-[var(--primary)]/15 border border-[var(--border)] flex items-center justify-center text-lg">
                          {opt.icon}
                        </span>
                        <span className="text-sm font-bold text-white uppercase tracking-wider">{opt.name}</span>
                      </div>
                      {isSelected && <span className="text-[var(--primary)] font-bold">✓</span>}
                    </div>
                  );
                })}
              </div>
              {errors.propertyType && (
                <p className="text-xs font-semibold text-red-400">{errors.propertyType.message}</p>
              )}

              <div className="flex justify-end pt-4 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={handleStep1Next}
                  className="rounded bg-[var(--primary)] py-3.5 px-8 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: HOW BIG IS THE SPACE? */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                  How big is the space?
                </h2>
                <p className="text-sm text-slate-400 font-medium">Size helps us estimate crew and truck time.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {step2Options.map((opt) => {
                  const isSelected = watch("moveSize") === opt;
                  return (
                    <div
                      key={opt}
                      onClick={() => setValue("moveSize", opt)}
                      className={`rounded border p-5 flex items-center justify-between cursor-pointer transition duration-150 ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary)]/10"
                          : "border-[var(--border)] bg-[#071425] hover:border-[var(--primary)]/30"
                      }`}
                    >
                      <span className="text-sm font-bold text-white uppercase tracking-wider">{opt}</span>
                      {isSelected && <span className="text-[var(--primary)] font-bold">✓</span>}
                    </div>
                  );
                })}
              </div>
              {errors.moveSize && (
                <p className="text-xs font-semibold text-red-400">{errors.moveSize.message}</p>
              )}

              <div className="flex justify-between pt-4 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded border border-[var(--border)] py-3 px-6 text-sm font-bold uppercase text-white transition hover:bg-white/5 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleStep2Next}
                  className="rounded bg-[var(--primary)] py-3.5 px-8 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: HOW FAR ARE YOU MOVING? */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                  How far are you moving?
                </h2>
                <p className="text-sm text-slate-400 font-medium">Local Phoenix moves keep our flat rates lowest.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {step3Options.map((opt) => {
                  const isSelected = watch("distanceCategory") === opt.name;
                  return (
                    <div
                      key={opt.name}
                      onClick={() => setValue("distanceCategory", opt.name)}
                      className={`rounded border p-5 flex items-center justify-between cursor-pointer transition duration-150 ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary)]/10"
                          : "border-[var(--border)] bg-[#071425] hover:border-[var(--primary)]/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="size-10 rounded bg-[var(--primary)]/15 border border-[var(--border)] flex items-center justify-center text-lg">
                          {opt.icon}
                        </span>
                        <span className="text-sm font-bold text-white uppercase tracking-wider">{opt.name}</span>
                      </div>
                      {isSelected && <span className="text-[var(--primary)] font-bold">✓</span>}
                    </div>
                  );
                })}
              </div>
              {errors.distanceCategory && (
                <p className="text-xs font-semibold text-red-400">{errors.distanceCategory.message}</p>
              )}

              <div className="flex justify-between pt-4 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded border border-[var(--border)] py-3 px-6 text-sm font-bold uppercase text-white transition hover:bg-white/5 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleStep3Next}
                  className="rounded bg-[var(--primary)] py-3.5 px-8 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: ANY STAIRS? */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                  Any Stairs?
                </h2>
                <p className="text-sm text-slate-400 font-medium">Stairs affect crew time – be generous if you're not sure.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {step4Options.map((opt) => {
                  const isSelected = watch("stairsCategory") === opt;
                  return (
                    <div
                      key={opt}
                      onClick={() => setValue("stairsCategory", opt)}
                      className={`rounded border p-5 flex items-center justify-between cursor-pointer transition duration-150 ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary)]/10"
                          : "border-[var(--border)] bg-[#071425] hover:border-[var(--primary)]/30"
                      }`}
                    >
                      <span className="text-sm font-bold text-white uppercase tracking-wider">{opt}</span>
                      {isSelected && <span className="text-[var(--primary)] font-bold">✓</span>}
                    </div>
                  );
                })}
              </div>
              {errors.stairsCategory && (
                <p className="text-xs font-semibold text-red-400">{errors.stairsCategory.message}</p>
              )}

              <div className="flex justify-between pt-4 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded border border-[var(--border)] py-3 px-6 text-sm font-bold uppercase text-white transition hover:bg-white/5 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleStep4Next}
                  className="rounded bg-[var(--primary)] py-3.5 px-8 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 5: DO YOU NEED PACKING? */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                  Do you need packing?
                </h2>
                <p className="text-sm text-slate-400 font-medium">We can bring boxes, pack a room, or handle everything.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {step5Options.map((opt) => {
                  const isSelected = watch("packingCategory") === opt.name;
                  return (
                    <div
                      key={opt.name}
                      onClick={() => setValue("packingCategory", opt.name)}
                      className={`rounded border p-5 flex items-center justify-between cursor-pointer transition duration-150 ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary)]/10"
                          : "border-[var(--border)] bg-[#071425] hover:border-[var(--primary)]/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="size-10 rounded bg-[var(--primary)]/15 border border-[var(--border)] flex items-center justify-center text-lg">
                          {opt.icon}
                        </span>
                        <span className="text-sm font-bold text-white uppercase tracking-wider">{opt.name}</span>
                      </div>
                      {isSelected && <span className="text-[var(--primary)] font-bold">✓</span>}
                    </div>
                  );
                })}
              </div>
              {errors.packingCategory && (
                <p className="text-xs font-semibold text-red-400">{errors.packingCategory.message}</p>
              )}

              <div className="flex justify-between pt-4 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded border border-[var(--border)] py-3 px-6 text-sm font-bold uppercase text-white transition hover:bg-white/5 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleStep5Next}
                  className="rounded bg-[var(--primary)] py-3.5 px-8 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 6: ADDITIONAL SERVICES (Multi-Select) */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                  Additional Services
                </h2>
                <p className="text-sm text-slate-400 font-medium">Select any that apply — or continue if none.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {step6Options.map((opt) => {
                  const isSelected = watchAdditionalServices.includes(opt.name);
                  return (
                    <div
                      key={opt.name}
                      onClick={() => handleAdditionalServicesToggle(opt.name)}
                      className={`rounded border p-5 flex items-center justify-between cursor-pointer transition duration-150 ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary)]/10"
                          : "border-[var(--border)] bg-[#071425] hover:border-[var(--primary)]/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="size-10 rounded bg-[var(--primary)]/15 border border-[var(--border)] flex items-center justify-center text-lg">
                          {opt.icon}
                        </span>
                        <span className="text-sm font-bold text-white uppercase tracking-wider">{opt.name}</span>
                      </div>
                      {isSelected && <span className="text-[var(--primary)] font-bold">✓</span>}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded border border-[var(--border)] py-3 px-6 text-sm font-bold uppercase text-white transition hover:bg-white/5 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleStep6Next}
                  className="rounded bg-[var(--primary)] py-3.5 px-8 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 7: LARGE OR SPECIALTY ITEMS? (Multi-Select with Dropdowns) */}
          {step === 7 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                  Large or Specialty Items?
                </h2>
                <p className="text-sm text-slate-400 font-medium">Pick any that apply, then tell us the type so we send the right crew and equipment.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {step7Options.map((opt) => {
                  const isSelected = watchSelectedSpecialtyItems.includes(opt.name);
                  return (
                    <div key={opt.name} className="flex flex-col gap-2">
                      <div
                        onClick={() => handleSpecialtyItemsToggle(opt.name)}
                        className={`rounded border p-5 flex items-center justify-between cursor-pointer transition duration-150 ${
                          isSelected
                            ? "border-[var(--primary)] bg-[var(--primary)]/10"
                            : "border-[var(--border)] bg-[#071425] hover:border-[var(--primary)]/30"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="size-10 rounded bg-[var(--primary)]/15 border border-[var(--border)] flex items-center justify-center text-lg">
                              {opt.icon}
                            </span>
                            <span className="text-sm font-bold text-white uppercase tracking-wider">{opt.name}</span>
                          </div>
                          {isSelected && <span className="text-[var(--primary)] font-bold">✓</span>}
                        </div>

                        {/* Dropdown rendered dynamically if card selected */}
                        {isSelected && (
                          <div className="animate-slideDown">
                            <select
                              {...register(opt.dropdownKey as any)}
                              className="w-full rounded border border-[var(--border)] bg-[#071425] p-2.5 text-xs text-white focus:outline-none focus:border-[var(--primary)]"
                            >
                              <option value="">Select type...</option>
                              {opt.options.map((val) => (
                                <option key={val} value={val}>
                                  {val}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4 border-t border-[var(--border)]">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="rounded border border-[var(--border)] py-3 px-6 text-sm font-bold uppercase text-white transition hover:bg-white/5 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={isQuoteLoading || isUpdateLoading}
                    onClick={handleCalculateAnonymousEstimate}
                    className="rounded bg-[var(--primary)] py-3.5 px-8 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                  >
                    {isQuoteLoading || isUpdateLoading ? "Checking flat rates..." : "See my estimate →"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 8: YOUR INSTANT ESTIMATE */}
            {step === 8 && calculatedQuote && breakdowns && (
              <div className="space-y-8 animate-fadeIn">
                {/* Header Box */}
                <div className="text-center space-y-4">
                  <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 block">
                    Your Instant Estimate
                  </span>
                  <span className="text-5xl font-black text-[var(--primary)] tracking-tighter block">
                    ${Math.round(Number(calculatedQuote.estimatedTotal) * 0.9).toLocaleString()} - ${Math.round(Number(calculatedQuote.estimatedTotal) * 1.15).toLocaleString()}
                  </span>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Flat-rate range based on your selections. Final price confirmed after a quick walkthrough – no obligation, ever.
                  </p>
                </div>

                {/* Estimate breakdowns grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-y border-[var(--border)] py-6 bg-[#071425]/25 p-4 rounded-md">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Base + Size</span>
                    <span className="text-sm font-bold text-white">${breakdowns.base}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Distance</span>
                    <span className="text-sm font-bold text-white">${breakdowns.dist}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Stairs</span>
                    <span className="text-sm font-bold text-white">${breakdowns.stairs}</span>
                  </div>
                  <div className="space-y-1 border-t border-[var(--border)] pt-4">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Packing</span>
                    <span className="text-sm font-bold text-white">${breakdowns.packing}</span>
                  </div>
                  <div className="space-y-1 border-t border-[var(--border)] pt-4">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Additional Services</span>
                    <span className="text-sm font-bold text-white">${breakdowns.addl}</span>
                  </div>
                  <div className="space-y-1 border-t border-[var(--border)] pt-4">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Large Items</span>
                    <span className="text-sm font-bold text-white">${breakdowns.specialty}</span>
                  </div>
                </div>

                {/* Edit Answers link */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(setCalculatedQuote(null));
                      dispatch(setBookingResult(null));
                      setStep(1);
                    }}
                    className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    Edit Answers
                  </button>
                </div>

                {/* CTAs row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border)]">
                  {/* Book Move */}
                  <div className="rounded-lg bg-[#071425]/40 border border-[var(--border)] p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-white tracking-wide">Book This Move</h3>
                      <p className="text-[11px] text-slate-400 font-medium">Reserve your date. A specialist confirms your flat rate within one business hour.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(9)}
                      className="w-full rounded bg-[var(--primary)] py-3 px-4 text-center text-xs font-black uppercase tracking-wider text-[var(--primary-foreground)] shadow hover:opacity-90 transition cursor-pointer"
                    >
                      Book This Move
                    </button>
                  </div>

                  {/* Call Support */}
                  <div className="rounded-lg bg-[#071425]/40 border border-[var(--border)] p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-white tracking-wide">Talk to a Moving Specialist</h3>
                      <p className="text-[11px] text-slate-400 font-medium">Prefer to talk it through? Call now – we answer live during business hours.</p>
                    </div>
                    <a
                      href="tel:602-921-5749"
                      className="w-full rounded border border-[var(--primary)] bg-transparent py-3 px-4 text-center text-xs font-black uppercase tracking-wider text-[var(--primary)] hover:bg-[var(--primary)]/10 transition block"
                    >
                      📞 602-921-5749
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Step 9: BOOK YOUR MOVE Form */}
            {step === 9 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-[var(--border)] pb-4">
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white">Book Your Move</h2>
                    <p className="text-sm text-slate-400 font-medium">We only ask for what we need to confirm your date.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(8)}
                    className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    Back
                  </button>
                </div>

                <form onSubmit={handleSubmit(handleConfirmReservation)} className="space-y-6">
                  
                  {/* Name & Phone side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Name</label>
                      <input
                        type="text"
                        placeholder="Edward Moll"
                        {...register("bookingName")}
                        className={`w-full rounded border bg-[#071425] p-2.5 text-sm text-white focus:outline-none focus:border-[var(--primary)] ${
                          errors.bookingName ? "border-red-500" : "border-[var(--border)]"
                        }`}
                      />
                      {errors.bookingName && (
                        <p className="text-[10px] text-red-400">{errors.bookingName.message}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Phone</label>
                      <input
                        type="tel"
                        placeholder="(602) 555-0199"
                        {...register("bookingPhone")}
                        className={`w-full rounded border bg-[#071425] p-2.5 text-sm text-white focus:outline-none focus:border-[var(--primary)] ${
                          errors.bookingPhone ? "border-red-500" : "border-[var(--border)]"
                        }`}
                      />
                      {errors.bookingPhone && (
                        <p className="text-[10px] text-red-400">{errors.bookingPhone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email (Full width) */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Email</label>
                    <input
                      type="email"
                      placeholder="edward@example.com"
                      {...register("bookingEmail")}
                      className={`w-full rounded border bg-[#071425] p-2.5 text-sm text-white focus:outline-none focus:border-[var(--primary)] ${
                        errors.bookingEmail ? "border-red-500" : "border-[var(--border)]"
                      }`}
                    />
                    {errors.bookingEmail && (
                      <p className="text-[10px] text-red-400">{errors.bookingEmail.message}</p>
                    )}
                  </div>

                  {/* Move Date (Calendar Select) */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Move date</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      {...register("bookingDate")}
                      onClick={(e) => {
                        try {
                          e.currentTarget.showPicker();
                        } catch (err) {}
                      }}
                      onFocus={(e) => {
                        try {
                          e.currentTarget.showPicker();
                        } catch (err) {}
                      }}
                      className={`w-full rounded border bg-[#071425] p-2.5 text-sm text-white focus:outline-none focus:border-[var(--primary)] ${
                        errors.bookingDate ? "border-red-500" : "border-[var(--border)]"
                      }`}
                    />
                    {errors.bookingDate && (
                      <p className="text-[10px] text-red-400">{errors.bookingDate.message}</p>
                    )}
                  </div>

                  {/* Pickup Address */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Pickup address</label>
                    <input
                      type="text"
                      placeholder="123 Phoenix Way, Suite 4, Phoenix, AZ 85001"
                      {...register("pickupAddress")}
                      className={`w-full rounded border bg-[#071425] p-2.5 text-sm text-white focus:outline-none focus:border-[var(--primary)] ${
                        errors.pickupAddress ? "border-red-500" : "border-[var(--border)]"
                      }`}
                    />
                    {errors.pickupAddress && (
                      <p className="text-[10px] text-red-400">{errors.pickupAddress.message}</p>
                    )}
                  </div>

                  {/* Delivery Address */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Delivery address</label>
                    <input
                      type="text"
                      placeholder="789 Scottsdale Rd, Scottsdale, AZ 85251"
                      {...register("deliveryAddress")}
                      className={`w-full rounded border bg-[#071425] p-2.5 text-sm text-white focus:outline-none focus:border-[var(--primary)] ${
                        errors.deliveryAddress ? "border-red-500" : "border-[var(--border)]"
                      }`}
                    />
                    {errors.deliveryAddress && (
                      <p className="text-[10px] text-red-400">{errors.deliveryAddress.message}</p>
                    )}
                  </div>

                  {/* Warning note */}
                  <div className="rounded border border-dashed border-[var(--primary)] bg-[var(--primary)]/5 p-5 space-y-2">
                    <span className="text-[10px] font-black uppercase text-[var(--primary)] tracking-widest block">
                      Deposit & Payment
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Online deposit and final invoice payment are coming soon. For now, no payment is required to reserve your date – we'll confirm your flat rate by phone.
                    </p>
                  </div>

                  {/* Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isQuoteLoading || isBookingLoading}
                      className="w-full rounded bg-[var(--primary)] py-4 px-4 text-center text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] shadow hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                    >
                      {isQuoteLoading || isBookingLoading ? "Reserving slot..." : "Reserve My Date"}
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* Step 10: Secure Slot Stripe Checkout */}
            {step === 10 && bookingResult && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-white">Secure slot</h2>
                  <p className="text-sm text-slate-400 font-medium">Process deposit to schedule trucks and crew.</p>
                </div>

                <div className="rounded border border-[var(--border)] bg-[#071425]/60 p-5 space-y-2 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Moving Date:</span>
                    <span className="font-bold text-white">
                      {new Date(bookingResult.requestedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>30% Deposit Charge:</span>
                    <span className="font-black text-[var(--primary)]">
                      ${Number(bookingResult.depositAmount).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Elements stripe={stripePromise}>
                  <StripeCheckoutForm
                    bookingId={bookingResult.bookingId || bookingResult.id}
                    amount={Number(bookingResult.depositAmount)}
                    onSuccess={() => {
                      setCheckoutSuccess(true);
                      setStep(11);
                    }}
                  />
                </Elements>

                <button
                  type="button"
                  onClick={() => setStep(9)}
                  className="w-full rounded border border-[var(--border)] bg-transparent py-2 text-center text-xs text-slate-400 transition hover:bg-white/5 cursor-pointer"
                >
                  Back to booking details
                </button>
              </div>
            )}

            {/* Success Page (Step 11) */}
            {step === 11 && checkoutSuccess && (
              <div className="text-center space-y-6 py-6 animate-scaleUp">
                <div className="mx-auto size-20 bg-emerald-500/10 border border-emerald-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="size-10 text-emerald-400"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h2 className="text-4xl font-black uppercase text-white">Move Scheduled!</h2>
                  <p className="text-sm text-slate-300 px-6 max-w-lg mx-auto leading-relaxed">
                    Thank you! Your 30% deposit has been securely charged via Stripe. Your slot is officially reserved, and details have been synced to Jobber.
                  </p>
                </div>

                <div className="rounded border border-emerald-900 bg-emerald-950/20 p-4 text-xs text-emerald-400 max-w-sm mx-auto">
                  🌵 Synced successfully with Jobber moving coordinator scheduling.
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      dispatch(resetBookingFlow());
                      setCheckoutSuccess(false);
                      setStep(1);
                      navigate("/");
                    }}
                    className="rounded bg-white py-3 px-8 text-sm font-bold text-slate-900 shadow hover:bg-slate-200 transition cursor-pointer"
                  >
                    Return to Home Page
                  </button>
                </div>
              </div>
            )}

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--border)] bg-[#071425] py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-6 space-y-4">
            <img src={logoImg} alt="AAAAAffordable Moving" className="h-10 object-contain" />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Licensed, insured, and locally operated. Serving homes, apartments, businesses, seniors, and real estate professionals across the Valley.
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase text-[var(--primary)] tracking-widest">Company</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/")}>Home</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/quote")}>Instant Quote</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/services")}>Services</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/realtors")}>Realtors & Leasing</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/about")}>About</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate("/contact")}>Contact</li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase text-[var(--primary)] tracking-widest">Contact</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li>📞 602-921-5749</li>
              <li>📧 Aaaaaffordablemovingsvcs@gmail.com</li>
              <li>📍 Phoenix, Arizona</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-[var(--border)] text-center text-[10px] text-slate-500 uppercase tracking-widest">
          © 2026 AAAAAffordable Moving. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default QuoteWizard;

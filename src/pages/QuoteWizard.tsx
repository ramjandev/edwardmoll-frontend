import Progressbar from "@/components/component/quote/Progressbar";
import QuoteHeader from "@/components/component/quote/QuoteHeader";
import CommonWrapper from "@/components/shared/CommonWrapper";
import CommonSpace from "@/components/shared/space/CommonSpace";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetBookingFlow,
  setBookingId,
  setBookingResult,
  setCalculatedQuote,
  setQuoteId,
} from "../store/Booking/bookingSlice";
import { useCreateBookingMutation } from "../store/bookings/bookingApi";
import {
  useCreateQuoteMutation,
  useUpdateQuoteMutation,
} from "../store/quotes/quoteApi";
import type { RootState } from "../store/store";

import {
  getMappedPayload,
  getNormalizedBreakdowns,
} from "@/components/component/quote/quoteHelpers";
import {
  quoteSchema,
  type QuoteFields,
} from "@/components/component/quote/schema/quoteSchema";

import StepFooter from "@/components/component/quote/StepFooter";
import Step10Checkout from "@/components/component/quote/steps/Step10Checkout";
import Step11Success from "@/components/component/quote/steps/Step11Success";
import Step1PropertyType from "@/components/component/quote/steps/Step1PropertyType";
import Step2MoveSize from "@/components/component/quote/steps/Step2MoveSize";
import Step3Distance from "@/components/component/quote/steps/Step3Distance";
import Step4Stairs from "@/components/component/quote/steps/Step4Stairs";
import Step5Packing from "@/components/component/quote/steps/Step5Packing";
import Step6AdditionalServices from "@/components/component/quote/steps/Step6AdditionalServices";
import Step7SpecialtyItems from "@/components/component/quote/steps/Step7SpecialtyItems";
import Step8Estimate from "@/components/component/quote/steps/Step8Estimate";
import Step9BookingForm from "@/components/component/quote/steps/Step9BookingForm";

const QuoteWizard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [createQuote, { isLoading: isQuoteLoading }] = useCreateQuoteMutation();
  const [updateQuote, { isLoading: isUpdateLoading }] =
    useUpdateQuoteMutation();
  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();

  const { quoteId, calculatedQuote, bookingResult } = useSelector(
    (state: RootState) => state.bookingFlow,
  );

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const form = useForm<QuoteFields>({
    resolver: zodResolver(quoteSchema),
    mode: "onChange",
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

  const { watch, trigger, handleSubmit, reset } = form;
  const watchAdditionalServices = watch("additionalServices") || [];
  const watchSelectedSpecialtyItems = watch("selectedSpecialtyItems") || [];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Fields to validate before advancing, per step (1-6)
  const stepValidationFields: Partial<Record<number, (keyof QuoteFields)[]>> = {
    1: ["propertyType"],
    2: ["moveSize"],
    3: ["distanceCategory"],
    4: ["stairsCategory"],
    5: ["packingCategory"],
    6: ["additionalServices"],
  };

  const handleGenericNext = async () => {
    const fields = stepValidationFields[step];
    const isValid = fields ? await trigger(fields) : true;
    if (isValid) nextStep();
  };

  const handleCalculateAnonymousEstimate = async () => {
    const isValid = await trigger([
      "selectedSpecialtyItems",
      "applianceType",
      "heavyFurnitureType",
      "pianoType",
      "safeType",
      "specialtyType",
    ]);
    if (!isValid) return;

    const data = watch();
    const payload = getMappedPayload(data);

    try {
      if (quoteId) {
        const res = await updateQuote({ id: quoteId, data: payload }).unwrap();
        dispatch(setCalculatedQuote(res));
        setStep(8);
      } else {
        const res = await createQuote(payload).unwrap();
        dispatch(setCalculatedQuote(res));
        dispatch(setQuoteId(res.quoteId));
        setStep(8);
      }
    } catch (err) {
      // Handled automatically
    }
  };

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
      setStep(10);
    } catch (err) {}
  };

  const breakdowns = calculatedQuote
    ? getNormalizedBreakdowns(
        watch(),
        calculatedQuote,
        watchAdditionalServices,
        watchSelectedSpecialtyItems,
      )
    : null;

  const showGlobalFooter = step >= 1 && step <= 7;
  const isEstimateStep = step === 7;
  const isCheckStep =
    step === 1 ||
    step === 2 ||
    step === 3 ||
    step === 4 ||
    step === 5 ||
    step === 6 ||
    step === 7;
  return (
    <div className=" bg-[#071425]">
      <CommonSpace>
        <CommonWrapper>
          <div className=" flex flex-col">
            <QuoteHeader />

            <main className="flex-1 w-full max-w-5xl mx-auto  flex flex-col justify-center pt-5 sm:pt-10">
              {isCheckStep ? (
                <div className="w-full bg-[#0c1f36]/40 backdrop-blur rounded-2xl border border-yellow/20  flex flex-col ">
                  <div className="bg-[#08111E] border-b border-yellow/20 p-6 rounded-t-2xl border">
                    <Progressbar step={step} />
                  </div>
                  <div className="flex-1 p-6 space-y-6">
                    {step === 1 && <Step1PropertyType form={form} />}

                    {step === 2 && <Step2MoveSize form={form} />}

                    {step === 3 && <Step3Distance form={form} />}

                    {step === 4 && <Step4Stairs form={form} />}

                    {step === 5 && <Step5Packing form={form} />}

                    {step === 6 && <Step6AdditionalServices form={form} />}

                    {step === 7 && <Step7SpecialtyItems form={form} />}

                    {showGlobalFooter && (
                      <StepFooter
                        onBack={step > 1 ? prevStep : undefined}
                        onNext={
                          isEstimateStep
                            ? handleCalculateAnonymousEstimate
                            : handleGenericNext
                        }
                        loadingLabel="Checking flat rates..."
                        isLoading={
                          isEstimateStep && (isQuoteLoading || isUpdateLoading)
                        }
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full  flex flex-col ">
                  <div className="flex-1  space-y-6">
                    {step === 8 && calculatedQuote && breakdowns && (
                      <Step8Estimate
                        form={form}
                        calculatedQuote={calculatedQuote}
                        breakdowns={breakdowns}
                        onEditAnswers={() => {
                          dispatch(setCalculatedQuote(null));
                          dispatch(setBookingResult(null));
                          setStep(1);
                        }}
                        onBookMove={() => setStep(9)}
                      />
                    )}
                    {step === 9 && (
                      <Step9BookingForm
                        form={form}
                        onBack={() => setStep(8)}
                        onSubmit={handleSubmit(handleConfirmReservation)}
                        isSubmitting={isQuoteLoading || isBookingLoading}
                      />
                    )}
                    {step === 10 && bookingResult && (
                      <Step10Checkout
                        bookingResult={bookingResult}
                        onBack={() => setStep(9)}
                        onSuccess={() => {
                          setCheckoutSuccess(true);
                          setStep(11);
                        }}
                      />
                    )}
                    {step === 11 && checkoutSuccess && (
                      <Step11Success
                        onReturnHome={() => {
                          reset();
                          dispatch(resetBookingFlow());
                          setCheckoutSuccess(false);
                          setStep(1);
                          navigate("/");
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            </main>
          </div>
        </CommonWrapper>
      </CommonSpace>
    </div>
  );
};

export default QuoteWizard;

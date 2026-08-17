import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51TzScoRy6387gtSAlM017hR1Y94FoJ9bnChcoLqkU7WigTgfskZnUyGvx1xwg7YC0bH0P2gpCmZrjyhazdrGD66g00rNfpqYeI",
);

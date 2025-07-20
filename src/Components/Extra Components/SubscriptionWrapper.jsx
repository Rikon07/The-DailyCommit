
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Subscription from "../../Pages/Home pages/Subscription.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function SubscriptionWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <Subscription />
    </Elements>
  );
}
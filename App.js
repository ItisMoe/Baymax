import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_YourPublishableKey">
      <Navigation />
    </StripeProvider>
  );
}

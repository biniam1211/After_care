import { Redirect } from 'expo-router';

// The root layout's auth guard handles the real routing; this just bootstraps.
export default function Index() {
  return <Redirect href="/(tabs)" />;
}

import { SophiaPage } from '@/app/SophiaPage';
import { useVendorScripts } from '@/app/useVendorScripts';

export function App() {
  useVendorScripts();
  return <SophiaPage />;
}

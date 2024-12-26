import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css';
import dynamic from 'next/dynamic';

const DynamicFooterMobile = dynamic(() => import('@/components/footerMobile'), { ssr: false });
const DynamicFooter = dynamic(() => import('@/components/footer'), { ssr: false });
const DynamicHeader = dynamic(() => import('@/components/headers'), { ssr: false });

export const metadata = {
  title: "پربار باغستان",
  description: "فروشگاه انلاین کودهای کشاورزی"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <GoogleAnalytics />
      <body>
        <DynamicHeader />
        {children}
        <DynamicFooterMobile />
        <DynamicFooter />
      </body>
    </html>
  );
}

import Navigation from '@/components/Navigation';

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}

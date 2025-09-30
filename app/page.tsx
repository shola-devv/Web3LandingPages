import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px' }}>
      <Link href="/LangBlockchainAgent">LANG BLOCKCHAIN AGENT</Link>
      <Link href="/services">S</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/faq">FAQ</Link>
    </div>
  );
}
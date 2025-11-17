import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px' }}>
     <p> PROJECTS DEPLOYED ON BLOCKCHAIN ARE STARED *, They might require testnet or mainnet transactions</p>
      <Link href="/LangBlockchainAgent" className="underline hover:text-blue-500">LANG BLOCKCHAIN AGENT</Link>
      <Link href="/buymyemmanuelcoin" className="underline hover:text-blue-500">Buy my Emmanuel token launched on sepolia landing page *</Link>
      <Link href="/cooldappwithviem" className="underline hover:text-blue-500">set and change mood simple clicker*</Link>
      
    </div>
  );
}
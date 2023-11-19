import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex flex-col h-screen items-center justify-center gap-3'>
{/*       <Image alt='Stoic Logo' src={StoicLogo} placeholder='blur' className='w-16 h-20 mb-2'/> */}
      <h2 className='text-7xl font-medium leading-[3rem]'>404</h2>
      <h3 className='text-2xl font-medium'>Page not found</h3>
      <Link href="/">
        <button className="btn btn-primary uppercase">Take me back to homepage</button>
      </Link>
    </div>
  )
}

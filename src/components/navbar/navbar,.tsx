import { useRouter } from 'next/navigation';
const Navbar = () => {
  const router = useRouter();
  return (
    <>
      <div className='flex justify-center items-center gap-8 bg-black text-white p-4'>
        <div className='cursor-pointer' onClick={() => router.push('/')}>
          genarel form
        </div>
        <div
          onClick={() => router.push('/react-hook-form')}
          className='cursor-pointer'
        >
          react-hook-form
        </div>
        <div className='cursor-pointer'>react-hook-form(Zod)</div>
      </div>
    </>
  );
};

export default Navbar;

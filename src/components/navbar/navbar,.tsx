import { useRouter } from 'next/navigation';
const Navbar = () => {
  const router = useRouter();
  return (
    <>
      <div className='flex justify-center items-center gap-8 bg-black text-white p-4'>
        <div>genarel form</div>
        <div onClick={() => router.push('/react-hook-form')}>
          react-hook-form
        </div>
        <div>react-hook-form(Zod)</div>
      </div>
    </>
  );
};

export default Navbar;

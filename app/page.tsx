import Link from "next/link";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-[50svh]">
        <h1 className="text-6xl font-semibold mt-4 mb-2">The crypto of tomorrow, today</h1>
        <h4 className="text-2xl text-gray-500 my-2">Create a frictionless wallet with just a Google Account.</h4>
        <Link href={'create-new-wallet'}>
          <button className='rounded-3xl px-8 py-2 bg-blue-600 mt-6 text-xl'>
            Get Started
          </button>
        </Link>
      </div>
    </>
  );
}

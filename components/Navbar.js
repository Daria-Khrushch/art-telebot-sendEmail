"use client";

import { signOut, useSession } from "next-auth/react";
import Filters from "./Filters";
import { useFilterContext } from "./FilterContext";
import Link from "next/link";

const Navbar = () => {
  const session = useSession();
  const {toggleMenu, isMenuOpen} = useFilterContext()

  return (
    <header>
      <nav className="hidden lg:flex items-center justify-between flex-wrap p-4 shadow-lg shadow-slate-20 lg:px-20">
        <div>
          
          <h1 className="text-2xl font-bold lg:text-3xl"><Link href="/">Telegram.ads</Link></h1>
        </div>

        {session?.data && (
          <>
            <div className="other flex lg:text-xl">
              <Link href="/admin">{session?.data?.user.name}</Link>
              <div
                className="lg-button ml-4 cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </div>
            </div>
          </>
        )}
      </nav>

      <nav className="flex items-center justify-between flex-wrap p-2 lg:hidden shadow-lg shadow-slate-20">
        <div className="flex items-center flex-shrink-0 mr-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Telegram.ads</h1>
           
          </div>
        </div>
       
        <div className="flex lg:hidden">
            {session?.data && (<div className="mr-2">{session?.data?.user.name}</div>)}
          <button onClick={toggleMenu} className="flex items-center">
            {isMenuOpen ? (
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                  fill="#0F1729"
                />
              </svg>
            ) : (
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 18L20 18"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12L20 12"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 6L20 6"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm lg:flex-grow">
            <Filters />
            {session?.data && (
          <>
            <div className="other">
              
              <div
                className="button text-center hover:shadow-md"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </div>
            </div>
          </>
        )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

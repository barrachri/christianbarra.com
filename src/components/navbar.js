import { Link } from "gatsby"
import React from "react"

const Navbar = () => {
  return (
    <header className="max-w-xl mx-auto pt-8 pb-5">
      {/* <header className="sm:container sm:mx-auto lg:w-2/4 p-4"> */}
      <div className="flex flex-wrap -mx-2 overflow-hidden px-5 lg:px-0">
        <div className="my-2 px-2 w-full overflow-hidden md:w-1/8 lg:w-1/8 xl:w-1/8 text-center">
          <h1 className="font-bold text-2xl">Christian Barra</h1>
        </div>
        <nav className="my-2 px-2 w-full overflow-hidden md:w-1/8 lg:w-1/8 xl:w-1/8 text-center">
          <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
              <Link
                className="block text-base font-semibold mt-4 lg:inline-block lg:mt-0 hover:underline mr-4"
                to="/"
                alt="Home"
              >
                Home
              </Link>
              <a
                className="block text-base font-semibold mt-4 lg:inline-block lg:mt-0 hover:underline mr-4"
                ahref="https://www.orkestrato.com/"
                alt="Orkestrato"
              >
                Consulting
              </a>
              <Link
                className="block text-base font-semibold mt-4 lg:inline-block lg:mt-0 hover:underline mr-4"
                to="/posts/"
                alt="Posts"
              >
                Journal
              </Link>
              <Link
                className="block text-base font-semibold mt-4 lg:inline-block lg:mt-0 hover:underline mr-4"
                to="/speaking/"
                alt="Speaking"
              >
                Speaking
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

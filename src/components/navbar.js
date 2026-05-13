import { Link } from "gatsby"
import React from "react"

const Navbar = () => {
  return (
    <header className="max-w-xl mx-auto pt-8 pb-5">
      <div className="flex flex-wrap -mx-2 overflow-hidden px-5 lg:px-0">
        <div className="my-2 px-2 w-full overflow-hidden text-center">
          <Link to="/" aria-label="Home" className="hover:underline">
            <h1 className="font-bold text-2xl">Christian Barra</h1>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar

import React from "react"
import { useStaticQuery, Link } from "gatsby"

const Navbar = () => {
  return (
    <header className="max-w-5xl mx-auto pt-8 pb-5">
      <div className="flex flex-wrap -mx-2 overflow-hidden px-5 lg:px-0">
        <div className="my-2 px-2 w-full overflow-hidden md:w-1/6 lg:w-1/2 xl:w-1/2 text-center md:text-left">
          <h1 className="font-bold text-2xl font-mono">Christian Barra</h1>
        </div>
        <nav className="my-2 px-2 w-full overflow-hidden md:w-3/6 lg:w-1/2 xl:w-1/2 text-center md:text-left">
          <ul>
            <li className="inline-block">
              <Link className="block font-mono font-semibold px-3" to="/">
                Home
              </Link>
            </li>
            <li className="inline-block">
              <a className="block font-mono font-semibold px-3" href="">
                Articles
              </a>
            </li>
            <li className="inline-block">
              <Link className="block font-mono font-semibold px-3" to="/books">
                Books
              </Link>
            </li>
            <li className="inline-block">
              <Link
                className="block font-mono font-semibold px-3"
                to="/talk-and-workshop"
              >
                Talks and Workshops
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

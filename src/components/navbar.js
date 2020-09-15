import React from "react"
import { Link } from "gatsby"

const Navbar = () => {
  return (
    <header className="max-w-5xl mx-auto pt-8 pb-5">
      <div className="flex flex-wrap -mx-2 overflow-hidden px-5 lg:px-0">
        <div className="my-2 px-2 w-full overflow-hidden md:w-1/8 lg:w-1/8 xl:w-1/8 text-center md:text-left">
          <h1 className="font-bold text-2xl">Christian Barra</h1>
        </div>
        <nav className="my-2 px-2 w-full overflow-hidden md:w-6/8 lg:w-6/8 xl:w-6/8 text-center md:text-left">
          <ul>
            <li className="inline-block">
              <Link className="block font-semibold underline px-3" to="/">
                Home
              </Link>
            </li>
            <li className="inline-block">
              <Link
                className="block font-semibold underline px-3"
                to="/consulting-and-training"
              >
                Consulting &amp; Training
              </Link>
            </li>
            <li className="inline-block">
              <Link
                className="block font-semibold underline px-3"
                to="/articles"
              >
                Articles
              </Link>
            </li>
            <li className="inline-block">
              <Link
                className="block font-semibold underline px-3"
                to="/page/talk-and-workshop"
              >
                Talks &amp; Workshops
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

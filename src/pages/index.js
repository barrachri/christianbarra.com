import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import { StyledLink } from "../components/utils"
import SEO from "../components/seo"

export default function Home() {
  return (
    <Layout>
      <SEO title="Home" />
      <p className="text-lg text-gray-800">
        I'm a developer, engineering leader and entrepreneur living in Berlin.
      </p>
      <p className="text-lg text-gray-800">
        Now building{" "}
        <StyledLink href="https://www.machinalia.com" text="Machinalia" /> and{" "}
        <Link className="underline" to="/consulting-and-training/">
          fourbit
        </Link>
        .
      </p>
      <p className="text-lg text-gray-800">
        If you want to learn about my journey follow me on{" "}
        <StyledLink href="https://twitter.com/christianbarra" text="twitter" />.
      </p>
      <p className="text-lg text-gray-800">
        Or send me an email at <b>me [AT] christianbarra.com</b>
      </p>
    </Layout>
  )
}

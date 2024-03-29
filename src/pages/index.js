import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StyledLink } from "../components/utils"

export default function Home() {
  return (
    <Layout>
      <SEO title="Home" />
      <p className="text-lg text-gray-800">
        Developer and founder.
      </p>
      <p className="text-lg text-gray-800">
        Working on Fintech Infrastructure, Automation and IoT.
      </p>
      <p className="text-lg text-gray-800">
        You can find me on{" "}
        <StyledLink href="https://twitter.com/christianbarra" text="twitter" />.
      </p>
      <p className="text-lg text-gray-800">
        Or send me an email at <b>[ me @ this domain ]</b>.
      </p>
    </Layout>
  )
}

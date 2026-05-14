import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StyledLink } from "../components/utils"

export default function Home() {
  return (
    <Layout>
      <SEO title="Home" />
      <p className="text-lg text-gray-800">Software engineer and founder.</p>
      <p className="text-lg text-gray-800 font-bold">
        Now building AI agents and a constellation of software products.
        Acquiring SaaS companies doing $10k to $800k in ARR.
      </p>
      <p className="text-lg text-gray-800">
        Current projects include{" "}
        <StyledLink href="https://www.dearmachines.com/" text="dearmachines" />,{" "}
        <StyledLink href="https://www.orderlayer.com/" text="orderlayer" />,{" "}
        <StyledLink href="https://www.funnelhype.com/" text="funnelhype" />, and{" "}
        <StyledLink href="https://www.uptimenine.com/" text="uptimenine" />.
      </p>
      <p className="text-lg text-gray-800">
        You can find me on{" "}
        <StyledLink
          href="https://www.linkedin.com/in/christianbarra/"
          text="LinkedIn"
        />{" "}
        or{" "}
        <StyledLink href="https://twitter.com/christianbarra" text="Twitter" />.
      </p>
      <p className="text-lg text-gray-800">
        Or send me an email at <b>[ me @ this domain ]</b>.
      </p>
    </Layout>
  )
}

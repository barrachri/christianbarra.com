import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StyledLink } from "../components/utils"

export default function Home() {
  return (
    <Layout>
      <SEO title="Home" />
      <p className="text-lg text-gray-800">Developer, founder and SaaS operator.</p>
      <p className="text-lg text-gray-800">
        I used to work as a software engineer and consultant. Now I buy and
        build SaaS companies, focusing on products between $10k and $800k ARR.
      </p>
      <p className="text-lg text-gray-800">
        I am building a constellation of software across Fintech
        Infrastructure, Automation and IoT.
      </p>
      <p className="text-lg text-gray-800">
        Current projects include{" "}
        <StyledLink href="https://dearmachines.com/" text="Dear Machines" />,{" "}
        <StyledLink href="https://orderlayer.com/" text="Orderlayer" />,{" "}
        <StyledLink href="https://funnelhype.com/" text="FunnelHype" />, and{" "}
        <StyledLink href="https://uptimenine.com/" text="UptimeNine" />.
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

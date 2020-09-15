import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StyledLink } from "../components/utils"

const Consulting = () => {
  return (
    <Layout>
      <SEO
        title="Blog"
        description="Screencasts and useful tips about Python and DevOps"
      />
      <p className="text-lg text-gray-800 text-gray-800 pb-3">
        Hi! I am an entrepreneur, tech lead and developer living in Berlin.
      </p>
      <p className="text-lg text-gray-800 text-gray-800 pb-3">
        I am a proactive member in the tech community, through contributions to{" "}
        <StyledLink
          href="https://en.wikipedia.org/wiki/Open-source_software"
          text="OSS"
        />
        , coaching,{" "}
        <Link className="font-bold underline" to="/consulting-and-training">
          consulting
        </Link>
        , writing and organising events.
      </p>
      <p className="text-lg text-gray-800 text-gray-800 pb-3">
        You can find me on{" "}
        <StyledLink href="https://twitter.com/christianbarra" text="twitter" />,{" "}
        <StyledLink
          href="https://www.linkedin.com/in/christianbarra/"
          text="linkedin"
        />
        , <StyledLink href="https://github.com/barrachri/" text="github" /> or
        by using me [AT] christianbarra.com
      </p>
    </Layout>
  )
}

export default Consulting

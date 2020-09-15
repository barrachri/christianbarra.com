import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import { StyledLink } from "../components/utils"
import SEO from "../components/seo"

export default function Home() {
  return (
    <Layout>
      <SEO title="Home" />
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
        I am a proactive member in the tech community, through contributions to{" "}
        <StyledLink
          href="https://en.wikipedia.org/wiki/Open-source_software"
          text="OSS"
        />
        , coaching,{" "}
        <Link className="font-bold underline" to="/page/talk-and-workshop">
          speaking
        </Link>
        , writing and organising events.
      </p>
      <p className="text-lg text-gray-800 text-gray-800 pb-3">
        I organized more than 20 events in the last years, ranging from meetups
        to +1000 people conferences like{" "}
        <StyledLink href="https://www.europython.eu" text="EuroPython" /> and{" "}
        <StyledLink
          href="https://de.pycon.org/"
          text="PyCon DE & PyData Berlin"
        />
        .
      </p>
      <p className="text-lg text-gray-800 text-gray-800 pb-3">
        I am a{" "}
        <StyledLink
          href="http://pyfound.blogspot.com/2018/06/"
          text="Python Software Foundation Fellow"
        />{" "}
        and former board member of the{" "}
        <StyledLink
          href="http://www.europython-society.org/about"
          text="EuroPython Society"
        />
        .
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

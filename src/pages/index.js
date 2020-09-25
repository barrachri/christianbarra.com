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
        I'm currently the Tech Lead of the Farm Service Domain at{" "}
        <StyledLink href="https://www.infarm.com" text="Infarm" />.
      </p>
      <p className="text-lg text-gray-800">
        I'm a proactive member in the tech community, through contributions to
        open source software, coaching,{" "}
        <Link className="underline" to="/speaking">
          speaking
        </Link>{" "}
        and organising events.
      </p>
      <p className="text-lg text-gray-800">
        I organized more than 20 events in the last years, ranging from meetups
        to +1000 people conferences, like{" "}
        <StyledLink href="https://www.europython.eu" text="EuroPython" /> and{" "}
        <StyledLink
          href="https://de.pycon.org/"
          text="PyCon DE & PyData Berlin"
        />
        .
      </p>
      <p className="text-lg text-gray-800">
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
      <div className="border-t-4 border-b-4 mt-5">
        <p className="text-lg text-gray-800 font-bold pt-2 pb-2">
          <Link className="underline" to="/consulting-and-training">
            I'm available for consulting engagements on backend development,
            cloud infrastructure and more
          </Link>
          .
        </p>
      </div>
      <p className="text-lg text-gray-800 mt-10">
        You can find me on{" "}
        <StyledLink href="https://twitter.com/christianbarra" text="twitter" />,{" "}
        <StyledLink
          href="https://www.linkedin.com/in/christianbarra/"
          text="linkedin"
        />
        , <StyledLink href="https://github.com/barrachri/" text="github" /> or
        you can send me an email at <b>me [AT] christianbarra.com</b>
      </p>
    </Layout>
  )
}

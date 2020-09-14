import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Home() {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="lg:container lg:mx-auto">
        <p className="font-mono text-lg text-gray-800 text-gray-800 pb-3">
          <b>I am</b> an entrepreneur, developer, author, speaker, podcaster,
          and doer of things. I used to hack video game consoles to make money
          during my teenage-hood, then after I dropped out of university I
          started a company about renewable energies.
        </p>
        <p className="font-mono text-lg text-gray-800 text-gray-800 pb-3">
          Fast forward a few years I am now a senior software engineer and tech
          lead living in Berlin where I work at{" "}
          <a href="https://www.infarm.com">infarm</a>, the farming as a service
          company.
        </p>
        <p className="font-mono text-lg text-gray-800 text-gray-800 pb-3">
          I am a proactive member in the tech community, through contributions
          to{" "}
          <a
            className="font-bold underline"
            href="https://en.wikipedia.org/wiki/Open-source_software"
          >
            OSS
          </a>
          , coaching, speaking, writing and organising events. I organized more
          than 20 events in the last years, ranging from meetups to +1000 people
          conferences like [EuroPython](https://www.europython.eu "EuroPython
          Conference") and [PyCon DE & PyData Berlin](https://de.pycon.org/
          "PyCon DE & PyData Berlin 2019"). I am a [Python Software Foundation
          Fellow](http://pyfound.blogspot.com/2018/06/ "Python Fellow") and
          former board member of the [EuroPython
          Society](http://www.europython-society.org/about "EuroPython
          Society"). Online you can find me on
          [twitter](https://twitter.com/christianbarra),
          [github](https://github.com/barrachri/),
          [linkedin](https://www.linkedin.com/in/christianbarra/) and you can
          send me an email at `me [AT] christianbarra [DOT] com`.
        </p>
        <h3>Consulting</h3>
        <p className="font-mono text-lg text-gray-800 text-gray-800 pb-3">
          Topics I am really into (AKA I read, talk, blog and tweet about):
          <ul>
            <li>AI, IoT and DevOps</li>
            <li>System Design</li>
            <li>remote work</li>
          </ul>
        </p>
      </div>
    </Layout>
  )
}

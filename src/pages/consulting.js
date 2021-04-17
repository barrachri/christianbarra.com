import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Consulting = () => {
  return (
    <Layout>
      <SEO
        title="Consulting"
        description="Learn how I can support your company"
      />
      <div>
        <h1 className="text-gray-800 pb-5">Consulting</h1>
        <p className="font-bold">
          Have you ever had the feeling of having a badass team/organization but
          things are not working out as you expected?
        </p>
        <p>I've been there too.</p>
        <p>
          I've put my +12 years of experience in software and engineering
          leadership in{" "}
          <a href="https://www.four-bit.com" className="underline">
            fourbit
          </a>
          .
        </p>
        <p>
          The mission of <b>fourbit</b> is to help fast-growing startups unstuck
          their teams.
        </p>
        <p>
          The success of a team depends on four different dimensions, what I call
          the TDWx framework:
        </p>

        <ul>
          <li>- Team: skills, engagement</li>
          <li>- Deliverability: lead time, rework, deployment frequency</li>
          <li>- Work: agile framework, scopes, clarity, focus</li>
        </ul>

        <p>
          The last bit, x, is randomness and unknowns. Things that you can't
          control. So it's fundamental to get the first 3 bits right.
        </p>
        <p className="font-bold">
          During a consulting engagement we focus on one bit only at a time and drive a
          key metric up.
        </p>
        <p>
          Sounds interesting? Get in touch: <b>christian@four-bit.com</b>
        </p>
      </div>
    </Layout>
  )
}

export default Consulting

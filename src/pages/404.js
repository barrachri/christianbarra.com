import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Home() {
  return (
    <Layout>
      <SEO title="404" />
      <h1 className="text-4xl text-800 text-center">
        That page does not exist :/
      </h1>
    </Layout>
  )
}

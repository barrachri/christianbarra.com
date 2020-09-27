import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = ({ pageContext }) => {
  const { page } = pageContext
  return (
    <Layout>
      <SEO
        title={page.frontmatter.title}
        description={page.frontmatter.description}
      />
      <h1 className="text-gray-800 pb-5">{page.frontmatter.title}</h1>
      <div className="pt-5" dangerouslySetInnerHTML={{ __html: page.html }} />
    </Layout>
  )
}

export default Page

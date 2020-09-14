import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Header = ({ page }) => {
  return (
    <section className="pb-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <h1>{page.frontmatter.title}</h1>
          </div>
        </div>
      </div>
    </section>
  )
}

const Page = ({ pageContext }) => {
  const { page } = pageContext
  return (
    <Layout>
      <SEO
        title={page.frontmatter.title}
        description={page.frontmatter.description}
      />
      <Header page={page} />
      <div className="article" dangerouslySetInnerHTML={{ __html: page.html }} />
    </Layout>
  )
}

export default Page

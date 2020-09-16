import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Header = ({ post }) => {
  const { title, description, date, category } = post.frontmatter

  return (
    <section className="pb-0 pb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="mr-2">
                <div className="badge bg-primary text-white">{category}</div>
              </div>
            </div>
            <h1>{title}</h1>
            <h4>{description}</h4>
            <div className="d-flex align-items-center">
              <div>
                <div className="text-small text-muted">{date}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Post = ({ pageContext }) => {
  const { post } = pageContext

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <Header post={post} />
      <div
        className="article"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  )
}

export default Post

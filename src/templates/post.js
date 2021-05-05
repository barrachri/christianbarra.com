import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Header = ({ post }) => {
  const { title, date } = post.frontmatter

  return (
    <div className="container">
      <div className="col-lg-10 col-xl-8">
        <h1>{title}</h1>
        <div>
          <p className="pt-3 text-sm italic">{date}</p>
        </div>
      </div>
    </div>
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
      <div className="pt-5 post" dangerouslySetInnerHTML={{ __html: post.html }} />
      <p className="mt-5 post font-medium">Enjoyed this post? For more, follow me on <a href="https://twitter.com/christianbarra">twitter</a>.</p>
    </Layout>
  )
}

export default Post

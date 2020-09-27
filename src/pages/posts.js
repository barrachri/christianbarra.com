import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const DisplayPosts = () => (
  <StaticQuery
    query={graphql`
      query {
        allFile(
          filter: {
            sourceInstanceName: { eq: "posts" }
            extension: { eq: "md" }
          }
          sort: {
            fields: [childMarkdownRemark___frontmatter___date]
            order: DESC
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
              childMarkdownRemark {
                excerpt(pruneLength: 150)
                frontmatter {
                  title
                  date(formatString: "MMMM DD, YYYY")
                  description
                }
              }
            }
          }
        }
      }
    `}
    render={data => <SinglePost data={data} />}
  />
)

const SinglePost = ({
  data: {
    allFile: { edges },
  },
}) => {
  return edges.map((edge, index) => {
    const {
      title,
      date,
      description,
    } = edge.node.childMarkdownRemark.frontmatter
    return (
      <div key={index}>
        <Link to={edge.node.fields.slug}>
          <h2 className="underline font-medium text-lg pt-4">{title}</h2>
        </Link>
        <h2 className="text-base pb-1">{description}</h2>
        <span className="text-sm">{date}</span>
      </div>
    )
  })
}

const Posts = () => {
  return (
    <Layout>
      <SEO
        title="Posts"
        description="Posts and thoughts about tech, business and life"
      />
      <DisplayPosts />
    </Layout>
  )
}

export default Posts

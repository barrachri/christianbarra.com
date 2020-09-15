import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const DisplayPosts = () => (
  <StaticQuery
    query={graphql`
      query {
        allFile(
          filter: {sourceInstanceName: {eq: "posts"}, extension: {eq: "md"}},
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
    render={data => <Posts data={data} />}
  />
)

const Posts = ({
  data: {
    allFile: { edges },
  },
}) => {
  return edges.map((edge, index) => {
    const { title, date, category } = edge.node.childMarkdownRemark.frontmatter
    return (
      <div className="p-3" key={index}>
        <Link
          to={edge.node.fields.slug}
        >
          <div>
            <div>
              <div>
                <div>{category}</div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="underline font-medium text-base">{title}</h2>
              <span className="text-sm">{date}</span>
            <p>{edge.node.excerpt}</p>
          </div>
        </Link>
      </div>
    )
  })
}

const Articles = () => {
  return (
    <Layout>
      <SEO
        title="Blog"
        description="Screencasts and useful tips about Python and DevOps"
      />
      <DisplayPosts />
    </Layout>
  )
}

export default Articles

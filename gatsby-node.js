const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        posts: allFile(
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
              extension
              fields {
                slug
              }
              childMarkdownRemark {
                html
                frontmatter {
                  title
                  date(formatString: "MMMM DD, YYYY")
                  description
                }
              }
            }
          }
        }
        pages: allFile(
          filter: { sourceInstanceName: { eq: "pages" }
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
                html
                frontmatter {
                  title
                  description
                  date(formatString: "MMMM DD, YYYY")
                }
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages
  const posts = result.data.posts.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: require.resolve(`./src/templates/post.js`),
      context: {
        post: post.node.childMarkdownRemark,
        previous,
        next,
      },
    })
  })

  // Create pages
  const pages = result.data.pages.edges

  pages.forEach((page, index) => {
    createPage({
      path: page.node.fields.slug,
      component: require.resolve(`./src/templates/page.js`),
      context: {
        page: page.node.childMarkdownRemark,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  const type = node.sourceInstanceName

  if (type === "posts" || type === "pages") {
    let value = createFilePath({ node, getNode })

    if (type === "posts") {
      value = `/posts${value}`
    }
    if (type === "pages") {
      value = `${value}`
    }

    createNodeField({
      name: `slug`,
      node,
      value: value,
    })
  }
}

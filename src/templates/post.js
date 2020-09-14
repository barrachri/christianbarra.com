import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


const SinglePost = ({ post }) => {
  if (post !== null) {
    const fields = post.childMarkdownRemark.frontmatter
    return (
      <div className="col-md-6 col-lg-6 d-flex">
        <Link
          to={post.fields.slug}
          className="card card-body justify-content-between bg-primary-3 text-light"
        >
          <div className="d-flex justify-content-between mb-3">
            <div className="text-small d-flex">
              <div className="mr-2 badge bg-white text-dark">
                {fields.category}
              </div>
              <span className="opacity-70">{fields.date}</span>
            </div>
          </div>
          <div>
            <h2>{fields.title}</h2>
            <span className="text-small opacity-70">{fields.description}</span>
          </div>
        </Link>
      </div>
    )
  } else {
    return <div></div>
  }
}

const RecommendedPosts = ({ next, previous }) => {
  if (next === null && previous === null) {
    return null
  }
  return (
    <section className="bg-primary-2-alt has-divider">
      <div className="divider flip-y">
      </div>
      <div className="container">
        <div className="row mb-4">
          <div className="col">
            <h3 className="h2">Latest from the blog</h3>
          </div>
        </div>
        <div className="row">
          <SinglePost post={previous} />
          <SinglePost post={next} />
        </div>
      </div>
    </section>
  )
}

const Header = ({ post }) => {
  const { title, description, author, date, category } = post.frontmatter

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
                <div>by {author}</div>
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
  const { post, previous, next } = pageContext
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )

  const { site } = data
  const { siteUrl } = site.siteMetadata

  const Video = () => {
    if (post.frontmatter.video) {
      return (
        <div className="col-lg-12 col-xl-12">
          <iframe
            title={post.frontmatter.title + " screencast"}
            width="100%"
            height="630"
            src={post.frontmatter.video}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope"
            allowFullScreen
          ></iframe>
        </div>
      )
    }
    return null
  }
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <Header post={post} />
      <section className="p-0">
        <div className="container">
          <div className="row justify-content-center position-relative">
            <Video />
          </div>
          <div className="row justify-content-center pt-5">
            <div className="col-xl-10 col-lg-10 col-md-10">
              <article
                className="article"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </div>
        </div>
      </section>
      <RecommendedPosts next={next} previous={previous} />
    </Layout>
  )
}

export default Post

module.exports = {
  siteMetadata: {
    title: `Christian Barra`,
    description: `Software engineer and founder. Now building AI agents and a constellation of software products. Acquiring SaaS companies doing $10k to $800k in ARR.`,
    author: `@christianbarra`,
    siteUrl: `https://www.christianbarra.com`,
    email: `me@christianbarra.com`,
    twitter: {
      url: `https://twitter.com/christianbarra`,
      account: `christianbarra`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-41799543-1",
        anonymize: true,
        respectDNT: true,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-postcss`,
  ],
}

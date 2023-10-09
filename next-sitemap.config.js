module.exports = {
  siteUrl: "https://www.mapleboss.io",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 1,
  exclude: ["/party", "/party/**", "/settlement", "/settlement/**"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/party", "/settlement"],
      },
    ],
  },
};

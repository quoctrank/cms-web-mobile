
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
module.exports = { siteMetadata: { title: 'Expense Manager' }, plugins: ['gatsby-plugin-postcss','gatsby-plugin-react-helmet'] };

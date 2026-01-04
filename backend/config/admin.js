"use strict";

module.exports = ({ env }) => ({
  url: "/admin",

  auth: {
    secret: env("ADMIN_JWT_SECRET", "test_admin_jwt_secret"),
    options: { expiresIn: "30d" },
  },

  apiToken: {
    salt: env("API_TOKEN_SALT", "test_api_token_salt"),
  },

  autoOpen: true,
});

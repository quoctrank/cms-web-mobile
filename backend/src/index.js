"use strict";

module.exports = {
  register() {},
  async bootstrap({ strapi }) {
    // Seed Categories
    const food = await strapi.db
      .query("api::category.category")
      .findOne({ where: { name: "Ăn uống" } });
    if (!food) {
      await strapi.db.query("api::category.category").create({
        data: {
          name: "Ăn uống",
          color: "#F87171",
          icon: "utensils",
          kind: "expense",
        },
      });
      await strapi.db.query("api::category.category").create({
        data: {
          name: "Di chuyển",
          color: "#60A5FA",
          icon: "car",
          kind: "expense",
        },
      });
      await strapi.db.query("api::category.category").create({
        data: {
          name: "Lương",
          color: "#34D399",
          icon: "cash",
          kind: "income",
        },
      });
    }
    // Seed Wallet
    const wallet = await strapi.db
      .query("api::wallet.wallet")
      .findOne({ where: { name: "Tiền mặt" } });
    if (!wallet) {
      await strapi.db.query("api::wallet.wallet").create({
        data: { name: "Tiền mặt", currency: "VND", initial_balance: 0 },
      });
      await strapi.db.query("api::wallet.wallet").create({
        data: { name: "Chuyển Khoản", currency: "VND", initial_balance: 0 },
      });
    }
  },
};

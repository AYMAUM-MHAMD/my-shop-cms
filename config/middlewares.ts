export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: [
        "http://localhost:3000",
        "http://localhost:1337",
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "https://hadia-green.vercel.app", // ✅ السماح للواجهة الأمامية
      ],      
      credentials: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
// { resolve: "./src/middlewares/set-cookie" },

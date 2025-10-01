/**
 * order controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async find(ctx) {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized("يجب تسجيل الدخول لرؤية الطلبات الخاصة بك");
      }

      const entities = await strapi.entityService.findMany("api::order.order", {
        filters: { user: user.id },
        populate: ctx.query.populate,
      });

      return { data: entities };
    },

    async findOne(ctx) {
      const { id } = ctx.params;
      const user = ctx.state.user;

      const entity = await strapi.entityService.findOne(
        "api::order.order",
        id,
        {
          filters: { user: user.id },
          populate: ctx.query.populate,
        }
      );

      if (!entity) {
        return ctx.unauthorized("لا تملك صلاحية للوصول إلى هذا الطلب");
      }

      return { data: entity };
    },

    // ✅ create يقبل عملاء مسجلين وغير مسجلين
    async create(ctx) {
      const {
        fullName,
        phone,
        whatsapp,
        invoice,
        address,
        city,
        postalCode,
        country,
        products,
        total_price,
        statuS, // 👈 هنا CamelCase زي ما في schema.json
      } = ctx.request.body.data || ctx.request.body;

      let userId: number | null = null;
      if (ctx.state.user) {
        userId = ctx.state.user.id;
      }

      // توليد رقم الطلب (UID بسيط)
      const orderNumber = `ORD-${Date.now()}`;

      const newOrder = await strapi.entityService.create("api::order.order", {
        data: {
          order_number: orderNumber,
          fullName,
          phone,
          whatsapp,
          invoice,
          address,
          city,
          postalCode,
          country: country || "Libya",
          total_price,
          user: userId,
          statuS: statuS || "pending",
          products, // 👈 هنا مصفوفة IDs فقط
        },
      });

      return { data: newOrder };
    },
  })
);

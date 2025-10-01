/**
 * profile controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::profile.profile', ({ strapi }) => ({
  async upsert(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized('يجب تسجيل الدخول');

    const body = ctx.request.body;

    // ابحث عن بروفايل مرتبط بالمستخدم
    const existing = await strapi.db.query('api::profile.profile').findOne({
      where: { user: user.id },
    });

    if (existing) {
      const updated = await strapi.db.query('api::profile.profile').update({
        where: { id: existing.id },
        data: { ...body },
      });
      return { data: updated };
    } else {
      const created = await strapi.db.query('api::profile.profile').create({
        data: { ...body, user: user.id },
      });
      return { data: created };
    }
  },
}));


// import { factories } from '@strapi/strapi';

// export default factories.createCoreController('api::profile.profile', ({ strapi }) => ({
//   async testJWT(ctx) {
//     const user = ctx.state.user;
//     if (!user) {
//       return ctx.unauthorized('JWT غير صالح أو المستخدم غير موجود');
//     }
//     return { message: 'JWT صالح!', userId: user.id, username: user.username };
//   },
// }));


// import { factories } from '@strapi/strapi';
// import jwt from 'jsonwebtoken';

// export default factories.createCoreController('api::profile.profile', ({ strapi }) => ({
//   async generateJWT(ctx) {
//     const user = ctx.state.user;
//     if (!user) {
//       return ctx.unauthorized('يجب تسجيل الدخول أولا');
//     }

//     const token = jwt.sign(
//       { id: user.id },
//       process.env.JWT_SECRET!,
//       { expiresIn: '7d' } // صلاحية 7 أيام
//     );

//     return { jwt: token, user };
//   },
// }));

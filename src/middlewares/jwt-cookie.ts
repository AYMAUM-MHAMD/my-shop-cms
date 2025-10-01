// src/middlewares/jwt-cookie.ts
import jwt from "jsonwebtoken";

export default (config: any, { strapi }: any) => {
  return async (ctx: any, next: any) => {
    try {
      // أولًا: جِب التوكن من الـ cookie أو من Authorization header كـ fallback
      const cookieToken = ctx.cookies.get?.("token");
      const header =
        ctx.request.header?.authorization || ctx.request.headers?.authorization;
      const bearerToken =
        header && header.startsWith("Bearer ") ? header.split(" ")[1] : null;
      const token = cookieToken || bearerToken;

      if (token) {
        try {
          // تحقق من التوكن عبر JWT_SECRET (او استخدم jsonwebtoken مباشرة)
          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
          ) as any;

          if (decoded && decoded.id) {
            // جلب المستخدم من قاعدة البيانات
            const user = await strapi.db
              .query("plugin::users-permissions.user")
              .findOne({
                where: { id: Number(decoded.id) },
              });

            if (user) {
              ctx.state.user = user; // الآن الكود اللاحق (controllers) يقدر يقرأ ctx.state.user
            }
          }
        } catch (err) {
          // توكن غير صحيح أو انتهت صلاحيته — نتجاهل ونكمل بدون user
          // console.log('JWT verify failed', err);
        }
      }
    } catch (e) {
      // لا نريد أن يكسر الميدلوير السيرفر، لذا فقط نكمل
      // console.error('jwt-cookie middleware error', e);
    }

    await next();
  };
};

export default (config: any, { strapi }: any) => {
  return async (ctx: any, next: any) => {
    await next(); // نفذ الكود الأصلي أولاً

    // تحقق إذا كان هذا endpoint تسجيل دخول
    if (ctx.request.url === '/api/auth/local' && ctx.response.body?.jwt) {
      const token = ctx.response.body.jwt;

      // أضف الكوكيز HTTPOnly
      ctx.cookies.set('token', token, {
        httpOnly: true,
        secure: true, // true في الإنتاج مع HTTPS
        sameSite: 'Lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      console.log('🍪 [Middleware] Set-Cookie added:', token);

      // 🔒 إزالة JWT من body — الآن نرسل فقط بيانات المستخدم
      if (ctx.response.body.user) {
        ctx.response.body = {
          user: ctx.response.body.user,
        };
      }
    }
  };
};

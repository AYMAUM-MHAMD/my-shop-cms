export default (plugin: any) => {
  return plugin;
};

// export default (plugin: any) => {
//   const originalCallback = plugin.controllers?.auth?.callback;

//   plugin.controllers.auth.callback = async (ctx: any) => {
//     const response = originalCallback ? await originalCallback(ctx) : null;

//     if (!response) {
//       return ctx.badRequest('Invalid login');
//     }

//     if (response.jwt) {
//       const token = response.jwt;

//       // ✅ أضف الكوكي
//       ctx.cookies.set('token', token, {
//         httpOnly: true,
//         secure: false, // في التطوير خليه false
//         sameSite: 'Lax',
//         path: '/',
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       });

//       // ✅ نجبر الهيدر
//       ctx.set('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax`);

//       // 🔎 Debug log هنا
//       console.log('🔎 Set-Cookie header:', ctx.response.headers['set-cookie']);
//     }

//     return response;
//   };

//   return plugin;
// };

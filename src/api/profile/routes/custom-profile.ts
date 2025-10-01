/**
 * custom profile routes
 */

// export default {
//   routes: [
//     {
//       method: 'POST',
//       path: '/profiles/upsert',
//       handler: 'profile.upsert',
//       config: {
//         auth: {
//           strategies: ['jwt'], // ✅ المستخدم يجب أن يكون مسجّل دخول
//         },
//         policies: [],
//       },
//     },
//   ],
// };


// export default {
//   routes: [
//     {
//       method: 'GET',
//       path: '/profiles/test-jwt',
//       handler: 'profile.testJWT',
//       config: {
//         auth: { strategies: ['jwt'] },
//       },
//     },
//   ],
// };

// export default {
//   routes: [
//     {
//       method: 'GET',
//       path: '/profiles/generate-jwt',
//       handler: 'profile.generateJWT',
//       config: {
//         auth: { strategies: ['jwt'] },
//       },
//     },
//   ],
// };

// export default {
//   routes: [
//     {
//       method: 'POST',
//       path: '/profiles/upsert',
//       handler: 'profile.upsert',
//       config: {
//         auth: { strategies: ['jwt'] },
//         policies: [],
//       },
//     },
//   ],
// };

export default {
  routes: [
    {
      method: 'POST',
      path: '/profiles/upsert',
      handler: 'profile.upsert',
      config: {
        auth: { strategies: ['jwt'] }, // هذا الشكل الصحيح في Strapi v5
        policies: [],
      },
    },
  ],
};


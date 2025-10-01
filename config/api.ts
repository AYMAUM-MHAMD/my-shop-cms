module.exports = {
  rest: {
    defaultLimit: 2000, // لو أنت نسيت تحديد pageSize، يرجع 100
    maxLimit: 2000, // حتى لو طلبت pageSize=1000، Strapi يسمح بذلك
    withCount: true,
  },
};

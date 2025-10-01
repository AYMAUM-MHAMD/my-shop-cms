export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },

  // ✅ تخصيص الهوية البصرية
  config: {
    theme: {
      light: {
        colors: {
          primary100: '#FDE7EE', // وردي فاتح جدًا خلفية ثانوية
          primary200: '#F9B6CF', // وردي متوسط
          primary500: '#E72463', // اللون الأساسي لهويتك
          primary600: '#C91E55', // لون أغمق للهوفر
          primary700: '#A01845', // لون غامق للعناوين/التأكيد
        },
      },
      dark: {
        colors: {
          primary100: '#3B0F1F', // خلفية خافتة مع لمسة من الهوية
          primary200: '#701636', 
          primary500: '#E72463', // اللون الأساسي يبقى نفسه
          primary600: '#F03B73', // أخف شوي للإبراز
          primary700: '#F46C96', // لون فاتح للعناصر الداكنة
        },
      },
    },
  },
});

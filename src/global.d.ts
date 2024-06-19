// global.d.ts
interface TelegramWebAppUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
  }
  
  interface TelegramWebAppInitDataUnsafe {
    user: TelegramWebAppUser;
  }
  
  interface TelegramWebApp {
    initDataUnsafe: TelegramWebAppInitDataUnsafe;
    // Добавьте другие необходимые свойства и методы, если нужно
  }
  
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
  
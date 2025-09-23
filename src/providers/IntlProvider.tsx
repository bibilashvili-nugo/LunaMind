"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { IntlProvider as NextIntlProvider } from "next-intl";

type Locale = "ka" | "en" | "ru";

type IntlContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const IntlContext = createContext<IntlContextType | undefined>(undefined);

export const useIntlContext = () => {
  const context = useContext(IntlContext);
  if (!context)
    throw new Error("useIntlContext must be used within IntlProvider");
  return context;
};

type Props = {
  children: ReactNode;
};

// import all locale messages
import kaMessages from "../locales/ka.json";
import enMessages from "../locales/en.json";
import ruMessages from "../locales/ru.json";

const messagesMap = {
  ka: kaMessages,
  en: enMessages,
  ru: ruMessages,
};

export const IntlProvider = ({ children }: Props) => {
  // Try to get locale from localStorage first
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("locale") as Locale | null;
      return saved || "ka";
    }
    return "ka";
  });

  const setLocale = (lang: Locale) => {
    setLocaleState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", lang);
    }
  };

  const messages = messagesMap[locale] || kaMessages;

  return (
    <IntlContext.Provider value={{ locale, setLocale }}>
      <NextIntlProvider locale={locale} messages={messages} timeZone="UTC">
        {children}
      </NextIntlProvider>
    </IntlContext.Provider>
  );
};

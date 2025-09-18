"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { IntlProvider as NextIntlProvider } from "next-intl";

type Locale = "ka" | "en";

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

const messagesMap = {
  ka: kaMessages,
  en: enMessages,
};

export const IntlProvider = ({ children }: Props) => {
  const [locale, setLocale] = useState<Locale>("ka");

  const messages = messagesMap[locale] || kaMessages;

  return (
    <IntlContext.Provider value={{ locale, setLocale }}>
      <NextIntlProvider locale={locale} messages={messages}>
        {children}
      </NextIntlProvider>
    </IntlContext.Provider>
  );
};

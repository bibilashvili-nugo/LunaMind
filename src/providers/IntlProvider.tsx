"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IntlProvider as NextIntlProvider } from "next-intl"; // rename import

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

export const IntlProvider = ({ children }: Props) => {
  const [locale, setLocale] = useState<Locale>("ka");
  const [messages, setMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadMessages = async () => {
      const msgs = await import(`../locales/${locale}.json`);
      setMessages(msgs.default);
    };
    loadMessages();
  }, [locale]);

  return (
    <IntlContext.Provider value={{ locale, setLocale }}>
      <NextIntlProvider locale={locale} messages={messages}>
        {children}
      </NextIntlProvider>
    </IntlContext.Provider>
  );
};

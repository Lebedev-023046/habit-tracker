import { useMemo } from 'react';

type SupportedLocale = 'en' | 'ru';

type PluralForms = Record<Intl.LDMLPluralRule, string>;

const DEFAULT_FORMS: Record<SupportedLocale, PluralForms> = {
  en: {
    zero: 'days',
    one: 'day',
    two: 'days',
    few: 'days',
    many: 'days',
    other: 'days',
  },
  ru: {
    zero: 'дней',
    one: 'день',
    two: 'дня',
    few: 'дня',
    many: 'дней',
    other: 'дней',
  },
};

export function usePlural(locale: SupportedLocale = 'en') {
  const pluralRules = useMemo(() => new Intl.PluralRules(locale), [locale]);

  const pluralize = (count: number, forms?: PluralForms) => {
    const selectedForms = forms ?? DEFAULT_FORMS[locale];
    const rule = pluralRules.select(count);

    const word = selectedForms[rule] ?? selectedForms.other;

    return `${count} ${word}`;
  };

  return { pluralize };
}

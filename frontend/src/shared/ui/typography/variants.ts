import styles from './Typography.module.css';

export type TypographyVariant =
  | 'display' // div
  | 'pageTitle' // h1
  | 'sectionTitle' // h2
  | 'cardTitle' // h3
  | 'cardTitleMuted'
  | 'subtitle'
  | 'subtitleMuted'
  | 'body'
  | 'bodyMuted'
  | 'caption'
  | 'captionMuted';

export const VARIANT_MAP = {
  display: {
    as: 'div',
    className: styles.display,
  },
  pageTitle: {
    as: 'h1',
    className: styles.pageTitle,
  },
  sectionTitle: {
    as: 'h2',
    className: styles.sectionTitle,
  },
  cardTitle: {
    as: 'h3',
    className: styles.cardTitle,
  },
  cardTitleMuted: {
    as: 'h3',
    className: styles.cardTitleMuted,
  },
  subtitle: {
    as: 'p',
    className: styles.subtitle,
  },
  subtitleMuted: {
    as: 'p',
    className: styles.subtitleMuted,
  },
  body: {
    as: 'p',
    className: styles.body,
  },
  bodyMuted: {
    as: 'p',
    className: styles.bodyMuted,
  },
  caption: {
    as: 'span',
    className: styles.caption,
  },
  captionMuted: {
    as: 'span',
    className: styles.captionMuted,
  },
  overline: {
    as: 'span',
    className: styles.overline,
  },
} as const;

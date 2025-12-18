import styles from './Button.module.css';

export const stateClassMap = {
  chip: {
    active: styles.chipActive,
  },
};

export const variantClassMap = {
  primary: styles.primary,
  outlined: styles.outlined,
  ghost: styles.ghost,
  plain: styles.plain,
  neutral: styles.neutral,
  danger: styles.danger,
  icon: styles.icon,
  chip: styles.chip,
};

export const textToneClassMap = {
  default: '',
  success: styles.textSuccess,
  error: styles.textError,
  warning: styles.textWarning,
  info: styles.textInfo,
  danger: styles.textDanger,
  neutral: styles.textNeutral,
  positive: styles.textPositive,
};

export const animationClassMap = {
  'light-sweep': styles.lightSweep,
  none: '',
};

import styles from './HabitForm.module.css';

interface HabitFormProps extends React.HTMLAttributes<HTMLFormElement> {
  title?: string;
  subtitle?: string;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

export function HabitForm({ onSubmit, ...props }: HabitFormProps) {
  const { className, ...rest } = props;

  return (
    <form
      onSubmit={onSubmit}
      className={`${styles.form} ${className}`}
      {...rest}
    >
      FORM!
    </form>
  );
}

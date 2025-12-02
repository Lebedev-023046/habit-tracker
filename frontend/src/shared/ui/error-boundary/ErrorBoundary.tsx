import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import React from 'react';
import styles from './ErrorBoundary.module.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: Error | null) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload() {
    window.location.reload();
  }

  handleGoBack() {
    window.history.back();
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error);
      }

      return (
        <Container className={styles.errorBoundary}>
          <h2>We couldn't load your data</h2>
          <p>Error message: {this.state.error?.message}</p>
          <div className={styles.controls}>
            <Button onClick={this.handleReload}>Reload page</Button>
            <Button variant="ghost" onClick={this.handleGoBack}>
              Go back
            </Button>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}

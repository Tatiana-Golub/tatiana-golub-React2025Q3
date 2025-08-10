import { Component, type ErrorInfo } from 'react';
import styles from './ErrorBoundary.module.css';
import type { Props, State } from '../../types';

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className={styles.errorMessage}>
          Something bad happened. <br /> Reload the page.
        </p>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

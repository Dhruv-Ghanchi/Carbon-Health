import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface-muted p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-soft p-6 text-center">
            <h1 className="text-2xl font-display font-bold text-carbon-900 mb-2">Something went wrong</h1>
            <p className="text-carbon-600 mb-4 text-sm">
              An unexpected error occurred in the Carbon Health Platform.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-carbon-600 text-white rounded-lg hover:bg-carbon-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

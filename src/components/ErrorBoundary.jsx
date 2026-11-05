import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log to console in development; in production you could send to a logging service
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] Caught rendering error:', error, info);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-xl border border-neutral-200 bg-white p-8 text-center"
        >
          <p className="font-heading text-lg font-semibold text-charcoal">
            Something went wrong.
          </p>
          <p className="text-sm text-neutral-600">
            This section couldn&apos;t load. Try refreshing the page.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="rounded-full border border-charcoal px-5 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-charcoal hover:text-offwhite"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full bg-charcoal px-5 py-2 text-sm font-medium text-offwhite transition-colors hover:bg-neutral-700"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

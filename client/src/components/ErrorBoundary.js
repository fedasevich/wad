import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>An error occurred</h1>
          <pre>{this.state.error.message}</pre>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
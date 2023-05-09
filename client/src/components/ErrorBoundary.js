import React, { useState } from 'react'
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error };
  }

  componentDidCatch(error, errorInfo) {
    alert(JSON.stringify(error) + " " + JSON.stringify(errorInfo));
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. {this.state.errorMessage}</h1>;
    }

    return this.props.children; 
  }
}
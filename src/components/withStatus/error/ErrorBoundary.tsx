import React, { Component, ReactNode } from "react";
import ErrorIMG from "../../../assets/ErrorIMG";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex gap-2 flex-col w-full h-screen justify-center items-center">
          <div className="w-[540px]">
            <ErrorIMG />
          </div>
          <div>
            <h1 className=" capitalize font-medium">
              Oops something went wrong...Try again Later
            </h1>
          </div>
        </div>
      );
    }
    return this.props.children || null;
  }
}

export default ErrorBoundary;

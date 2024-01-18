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
          <div className="lg:w-[540px] md:w-[440px] sm:w-[340px] w-[240px]">
            <ErrorIMG />
          </div>
          <div>
            <h1 className=" capitalize font-medium">
              Oops something went wrong...
            </h1>
          </div>
        </div>
      );
    }
    return this.props.children || null;
  }
}

export default ErrorBoundary;

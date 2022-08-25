import React, { Component, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default class ErrorCatch extends Component {
  state = {
    hasError: false,
    errorInfo: "",
    errorMessage: "",
  };
  componentDidCatch(error: any, errorInfo: any) {
    // 可以在这里上报错误日志
    console.dir(error, errorInfo);

    const info = JSON.stringify(error.stack, null, 2);

    this.setState({
      hasError: true,
      errorInfo: error.stack,
      errorMessage: error.message,
    });
    // this.setState
  }
  componentDidMount() {
    window.addEventListener("error", this.catchError, true);
    // async code
    window.addEventListener("unhandledrejection", this.catchRejectEvent, true);
  }
  catchError(error: any) {
    console.log("$error>>>>1", error);
  }
  catchRejectEvent(error: any) {
    console.log("$unhandledrejection>>>>2", error);
  }

  render() {
    const { children } = this.props as any;

    const { hasError } = this.state;

    if (hasError) {
      const { errorInfo, errorMessage } = this.state;
      return (
        <div
          style={{
            padding: 10,
            color: "#666",
          }}
        >
          <h2>出现了一些错误</h2>
          <h3
            style={{
              color: "red",
            }}
          >
            {errorMessage}
          </h3>
          <div
            style={{
              whiteSpace: "pre",
              textAlign: "left",
            }}
            dangerouslySetInnerHTML={{
              __html: errorInfo,
            }}
          />
          <div style={{ textAlign: "center", paddingTop: 20 }}>
            <button
              onClick={(e) => {
                localStorage.clear();
                location.reload();
              }}
            >
              清空缓存刷新
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}

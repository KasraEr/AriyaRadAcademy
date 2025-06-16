import React from "react";

const convertNumbers = (text) => {
  if (typeof text !== "string") return text;
  return text.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};

const processChildren = (child) => {
  if (typeof child === "string") {
    return convertNumbers(child);
  } else if (React.isValidElement(child)) {
    return React.cloneElement(child, {
      children: React.Children.map(child.props.children, processChildren),
    });
  } else if (Array.isArray(child)) {
    return child.map(processChildren);
  }
  return child;
};

const PersianWrapper = ({ children }) => {
  return <>{React.Children.map(children, processChildren)}</>;
};

export default PersianWrapper;

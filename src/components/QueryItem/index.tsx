/**
 * @file QueryItem.tsx
 * @description Main QueryItem component that renders query items based on the variant.
 */

import React from "react";
import { QueryItemProps } from "./QueryItem.types";
import { DirectQueryItem } from "./DirectQueryItem";
import { InteractiveQueryItem } from "./InteractiveQueryItem";

/**
 * QueryItem component to display a query item with actions.
 * @param {QueryItemProps} props - The properties for the component.
 */
const QueryItem: React.FC<QueryItemProps> = (props) => {
  if (props.variant === "direct") {
    return <DirectQueryItem {...props} />;
  }
  return <InteractiveQueryItem {...props} />;
};

export default QueryItem;

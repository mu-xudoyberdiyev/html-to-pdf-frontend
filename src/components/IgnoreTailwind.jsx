// IgnoreTailwind.jsx
import React, { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";

const IgnoreTailwind = ({ children }) => {
  const wrapperRef = useRef(null);
  const shadowRootRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Shadow DOM faqat bir marta yaratilsin
    if (!shadowRootRef.current) {
      shadowRootRef.current = wrapperRef.current.attachShadow({ mode: "open" });
      rootRef.current = createRoot(shadowRootRef.current);
    }

    rootRef.current.render(children);
  }, [children]);

  return <div ref={wrapperRef} />;
};

export default IgnoreTailwind;

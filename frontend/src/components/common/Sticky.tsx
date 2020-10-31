/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { getScrollTop } from "../../lib/utils";

export interface StickyProps {
  top: number;
}

export const Sticky: React.FC<StickyProps> = ({ top, children, ...props }) => {
  const [y, setY] = useState(0);
  const element = useRef<HTMLDivElement | null>(null);
  const [fixed, setFixed] = useState(false);

  const setup = useCallback(() => {
    if (!element.current) return;
    const pos = element.current.getBoundingClientRect();
    setY(pos.top + getScrollTop());
  }, []);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    const nextFixed = scrollTop + 112 > y;
    if (fixed !== nextFixed) {
      setFixed(nextFixed);
    }
  }, [fixed, y]);

  useEffect(() => {
    setup();
  }, [setup]);

  // register scroll event
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <div
      ref={element}
      css={css`
        ${fixed &&
        css`
          position: fixed;
          top: ${top}px;
        `}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

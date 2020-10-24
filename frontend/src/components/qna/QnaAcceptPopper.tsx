/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { usePopper } from "react-popper";
import React from "react";
import { useState } from "react";
import { AcceptIcon } from "../common/Icon";
import styled from "@emotion/styled";

const PopperContainer = styled.div<{ show?: boolean }>`
  background: #ffffff;
  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  border-radius: 4px;

  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: -0.02em;

  color: #000000;

  padding: 9px 17px 9px 11px;
  ${({ show }) =>
    !show &&
    css`
      display: none;
    `}

  .arrow {
    position: absolute;
    width: 10px;
    height: 10px;

    &:after {
      content: " ";
      position: absolute;
      top: 50%;
      left: -19px;
      transform: rotate(45deg) translateY(-50%);
      width: 10px;
      height: 10px;
      background-color: white;
      box-shadow: -1px 1px 0px #e3e3e3;
    }
  }
  &[data-popper-placement^="left"] > .arrow {
    right: 0px;
    :after {
      left: 1px;
      box-shadow: 1px -1px 0px #e3e3e3;
    }
  }
`;

export interface QnaAcceptPopperProps {
  anchorEl?: Element | null;
  show?: boolean;
}

export const QnaAcceptPopper: React.FC<QnaAcceptPopperProps> = ({
  anchorEl,
  show,
}) => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(anchorEl, popperElement, {
    placement: "left",
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  return (
    <PopperContainer
      ref={setPopperElement}
      style={styles.popper}
      show={show}
      {...attributes.popper}
    >
      <div ref={setArrowElement} style={styles.arrow} className="arrow" />
      <div>
        <div>답변이 도움이 되셨다면,</div>
        <div>
          <AcceptIcon
            disabled
            css={css`
              width: 14px;
              height: 11px;
            `}
          />
          를 눌러 채택해 주세요!
        </div>
      </div>
    </PopperContainer>
  );
};

/** @jsx jsx */
import { jsx } from "@emotion/core";

export interface CommonIconProps {
  disabled?: boolean;
}

export const AcceptIcon: React.FC<CommonIconProps> = ({
  disabled,
  ...props
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 17 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.94.94a1.5 1.5 0 012.142 2.1l-7.984 9.98a1.5 1.5 0 01-2.16.04L.648 7.768a1.5 1.5 0 112.12-2.12l4.188 4.186 6.946-8.85a.465.465 0 01.04-.044h-.002z"
      fill={disabled ? "#c4c4c4" : "#627BFF"}
    />
  </svg>
);

export const PencilIcon: React.FC<CommonIconProps> = ({
  disabled,
  ...props
}) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.896 6.976l-7.908 7.908-.518 1.764 1.729-.5 7.934-7.934-1.237-1.238zm1.349-1.35l1.237 1.238 1.154-1.154a.437.437 0 000-.618l-.62-.619a.437.437 0 00-.619 0l-1.151 1.153h-.001zm3.01-2.39l.618.618a2.188 2.188 0 010 3.094L7.117 17.704l-3.692 1.067a.875.875 0 01-1.083-1.085l1.092-3.723L14.162 3.235a2.187 2.187 0 013.093 0z"
      fill={disabled ? "#b4b4b4" : "#627bff"}
    />
  </svg>
);

export const TrashIcon: React.FC<CommonIconProps> = ({
  disabled,
  ...props
}) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.594 4.594l.82 13.125c.039.758.59 1.312 1.313 1.312h7.546c.725 0 1.267-.554 1.313-1.312l.82-13.125"
      stroke={disabled ? "#b4b4b4" : "#627bff"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.281 4.594H17.72"
      stroke={disabled ? "#b4b4b4" : "#627bff"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M7.875 4.594v-1.64a.982.982 0 01.984-.985h3.282a.982.982 0 01.984.984v1.64M10.5 7.219v9.187M7.547 7.219l.328 9.187M13.453 7.219l-.328 9.187"
      stroke={disabled ? "#b4b4b4" : "#627bff"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GitLabIcon: React.FC = (props) => (
  <svg
    width="17"
    height="15"
    viewBox="0 0 17 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.971 8.312L14.653.7c-.145-.419-.491-.7-.955-.7-.464 0-.84.252-.985.671l-1.535 4.422H5.82L4.285.673C4.14.255 3.764.003 3.3.003c-.464 0-.84.278-.955.7L.029 8.311c-.087.28.03.587.261.755L8.487 15l8.225-5.933a.694.694 0 00.26-.755z"
      fill="#797979"
    />
  </svg>
);

export const LocationIcon: React.FC = (props) => (
  <svg
    width="12"
    height="16"
    viewBox="0 0 12 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.6 0A5.596 5.596 0 000 5.6C0 9.8 5.6 16 5.6 16s5.6-6.2 5.6-10.4C11.2 2.504 8.696 0 5.6 0zm0 7.6a2 2 0 110-4 2 2 0 010 4z"
      fill="#797979"
    />
  </svg>
);

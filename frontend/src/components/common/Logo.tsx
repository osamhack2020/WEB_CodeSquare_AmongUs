/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

interface LogoProps {
  disabled?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ disabled }) => (
  <React.Fragment>
    {disabled && (
      <svg
        width="152"
        height="36"
        viewBox="0 0 152 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M52.42 26.09c-.86 0-1.645-.13-2.356-.39a4.438 4.438 0 01-1.803-1.25c-.491-.573-.88-1.325-1.168-2.253-.273-.93-.41-2.063-.41-3.402 0-1.338.137-2.479.41-3.422.287-.956.677-1.734 1.168-2.335a4.458 4.458 0 011.803-1.312c.71-.287 1.496-.43 2.357-.43 1.284 0 2.295.28 3.032.84.752.546 1.366 1.38 1.844 2.5l-2.54 1.311c-.082-.3-.178-.58-.287-.84a1.784 1.784 0 00-.41-.656 1.76 1.76 0 00-.676-.41c-.26-.109-.58-.163-.963-.163-.82 0-1.462.246-1.926.737-.465.492-.697 1.23-.697 2.213v3.73c0 .983.232 1.72.697 2.212.464.492 1.106.738 1.926.738.382 0 .71-.055.983-.164.287-.123.526-.28.717-.471.192-.205.349-.437.472-.697a7.39 7.39 0 00.327-.881l2.418 1.393a8.957 8.957 0 01-.82 1.435c-.3.423-.648.785-1.044 1.086a4.185 4.185 0 01-1.332.655c-.506.15-1.08.226-1.721.226zM63.052 26.09c-1.502 0-2.643-.458-3.422-1.373-.765-.915-1.147-2.33-1.147-4.242s.383-3.326 1.148-4.241c.778-.929 1.919-1.393 3.421-1.393 1.503 0 2.637.464 3.402 1.393.778.915 1.168 2.329 1.168 4.241 0 1.913-.39 3.327-1.168 4.242-.765.915-1.9 1.373-3.402 1.373zm0-2.275c1.052 0 1.578-.614 1.578-1.844V18.96c0-1.23-.526-1.844-1.578-1.844-1.051 0-1.578.615-1.578 1.844v3.012c0 1.23.527 1.844 1.578 1.844zM75.404 24.061h-.328a2.738 2.738 0 01-.328.8 2.82 2.82 0 01-.553.655 2.435 2.435 0 01-.738.41c-.273.109-.553.164-.84.164-1.257 0-2.172-.465-2.746-1.394-.573-.942-.86-2.35-.86-4.22 0-1.872.287-3.279.86-4.221.588-.943 1.503-1.414 2.746-1.414.287 0 .567.054.84.164.274.095.52.239.738.43.219.178.403.39.553.635.15.246.26.512.328.8h.328V10.68h2.868v15.163h-2.868V24.06zm-1.64-.307c.52 0 .923-.116 1.21-.349.286-.245.43-.607.43-1.085v-3.71c0-.477-.144-.832-.43-1.065-.287-.246-.69-.368-1.21-.368-.532 0-.962.17-1.29.512-.314.328-.472.799-.472 1.414v2.725c0 .614.158 1.093.472 1.434.328.328.758.492 1.29.492zM85.01 26.09c-1.476 0-2.657-.465-3.545-1.394-.874-.942-1.312-2.35-1.312-4.22 0-1.913.383-3.327 1.148-4.242.778-.929 1.92-1.393 3.422-1.393 1.502 0 2.636.464 3.401 1.393.779.915 1.168 2.329 1.168 4.241v.697h-6.147v.676c0 .601.184 1.086.553 1.455.369.355.874.533 1.516.533.533 0 .984-.116 1.353-.349.382-.245.73-.58 1.045-1.004l1.455 1.701a4.65 4.65 0 01-1.68 1.393c-.67.342-1.462.513-2.377.513zm-.287-9.098c-1.052 0-1.578.615-1.578 1.844v.656H86.3v-.656c0-1.23-.525-1.844-1.577-1.844zM95.296 26.09c-2.144 0-3.824-.752-5.04-2.254l1.885-1.885c.82 1.052 1.892 1.577 3.217 1.577 1.366 0 2.049-.6 2.049-1.803 0-.491-.123-.874-.369-1.147s-.628-.465-1.147-.574l-1.312-.246c-1.325-.246-2.301-.703-2.93-1.372-.615-.683-.922-1.626-.922-2.828 0-1.393.41-2.452 1.23-3.176.82-.724 2.021-1.086 3.606-1.086 2.022 0 3.558.656 4.61 1.967l-1.885 1.885c-.355-.437-.758-.758-1.209-.963-.437-.219-.956-.328-1.557-.328-.656 0-1.134.123-1.434.369-.287.246-.43.642-.43 1.188 0 .479.108.84.327 1.086.232.246.601.424 1.106.533l1.312.266c.697.15 1.29.335 1.782.554.506.205.916.471 1.23.799.328.328.56.717.697 1.168.15.45.225.976.225 1.578 0 1.53-.43 2.697-1.29 3.503-.861.793-2.111 1.189-3.75 1.189zM108.26 24.061h-.328a2.766 2.766 0 01-.881 1.455 2.444 2.444 0 01-.738.41c-.273.109-.553.164-.84.164-1.257 0-2.172-.465-2.746-1.394-.573-.942-.86-2.35-.86-4.22 0-1.872.287-3.279.86-4.221.588-.943 1.503-1.414 2.746-1.414.287 0 .567.054.84.164.273.095.519.239.738.43.218.178.403.39.553.635.15.246.259.512.328.8h.328v-1.783h2.868v14.855h-2.868v-5.88zm-1.64-.307c.52 0 .922-.116 1.209-.349.287-.245.431-.607.431-1.085v-3.71c0-.477-.144-.832-.431-1.065-.287-.246-.689-.368-1.209-.368-.532 0-.963.17-1.29.512-.315.328-.472.799-.472 1.414v2.725c0 .614.157 1.093.472 1.434.327.328.758.492 1.29.492zM119.32 24.02h-.328a3.233 3.233 0 01-.348.8 2.662 2.662 0 01-.512.655 2.285 2.285 0 01-.717.45 2.59 2.59 0 01-.963.165c-.957 0-1.687-.321-2.193-.963-.505-.656-.758-1.564-.758-2.726v-7.314h2.869v6.761c0 1.27.444 1.906 1.331 1.906.438 0 .813-.13 1.127-.39.328-.273.492-.648.492-1.126v-7.151h2.869v10.757h-2.869V24.02zM131.779 25.844c-1.12 0-1.728-.622-1.824-1.865h-.266c-.109.656-.403 1.175-.881 1.557-.478.37-1.086.554-1.824.554-.97 0-1.701-.274-2.192-.82-.492-.56-.738-1.332-.738-2.315 0-1.175.355-2.029 1.066-2.561.724-.533 1.728-.8 3.012-.8h1.557v-.84c0-.56-.116-.976-.349-1.25-.232-.273-.621-.41-1.167-.41-.479 0-.882.123-1.209.37a3.317 3.317 0 00-.84.942l-1.701-1.516a4.76 4.76 0 011.598-1.496c.628-.369 1.434-.553 2.418-.553 1.407 0 2.445.328 3.114.983.67.656 1.004 1.633 1.004 2.93v4.856h.881v2.234h-1.659zm-3.647-1.762c.423 0 .785-.117 1.086-.349.314-.246.471-.621.471-1.127v-1.332h-1.291c-.984 0-1.475.41-1.475 1.23v.39c0 .409.102.71.307.9.219.192.519.288.902.288zM135.254 25.844V15.087h2.869v2.294h.328c.041-.3.109-.587.205-.86a2.35 2.35 0 01.389-.738c.178-.218.396-.39.656-.512.259-.123.567-.184.922-.184h.512v2.91h-.738c-.778 0-1.352.108-1.721.327-.369.219-.553.635-.553 1.25v6.27h-2.869zM146.919 26.09c-1.475 0-2.657-.465-3.544-1.394-.875-.942-1.312-2.35-1.312-4.22 0-1.913.383-3.327 1.148-4.242.778-.929 1.919-1.393 3.421-1.393 1.503 0 2.637.464 3.402 1.393.778.915 1.168 2.329 1.168 4.241v.697h-6.147v.676c0 .601.184 1.086.553 1.455.369.355.874.533 1.516.533.533 0 .984-.116 1.353-.349.382-.245.73-.58 1.045-1.004l1.454 1.701a4.65 4.65 0 01-1.68 1.393c-.669.342-1.461.513-2.377.513zm-.287-9.098c-1.051 0-1.577.615-1.577 1.844v.656h3.155v-.656c0-1.23-.526-1.844-1.578-1.844z"
          fill="#AEADBE"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.6 11.386c-2.134 1.232-2.134 4.313 0 5.545l13.047 7.532V10.89c0-2.465 2.668-4.005 4.802-2.773l5.923 3.42V25.11 3.206c0-2.464-2.668-4.005-4.802-2.772L1.6 11.386z"
          fill="#C4C3CA"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.372 25.11V11.537l13.047 7.532c2.134 1.233 2.134 4.313 0 5.545l-18.97 10.952c-2.134 1.232-4.802-.308-4.802-2.772v-8.331l5.923 3.42c2.134 1.232 4.802-.308 4.802-2.773z"
          fill="#C4C3CA"
        />
      </svg>
    )}
    {!disabled && (
      <svg
        width="152"
        height="36"
        viewBox="0 0 152 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M52.42 26.09c-.86 0-1.645-.13-2.356-.39a4.44 4.44 0 01-1.803-1.25c-.491-.573-.88-1.325-1.168-2.253-.273-.93-.41-2.063-.41-3.402 0-1.338.137-2.479.41-3.422.287-.956.677-1.734 1.168-2.335a4.458 4.458 0 011.803-1.312c.71-.287 1.496-.43 2.357-.43 1.284 0 2.295.28 3.032.84.752.546 1.366 1.38 1.844 2.5l-2.54 1.311a6.73 6.73 0 00-.287-.84 1.785 1.785 0 00-.41-.656 1.763 1.763 0 00-.676-.41c-.26-.109-.58-.163-.963-.163-.82 0-1.462.246-1.926.737-.465.492-.697 1.23-.697 2.213v3.73c0 .983.232 1.72.697 2.212.464.492 1.106.738 1.926.738.382 0 .71-.055.983-.164.287-.123.526-.28.717-.471a2.72 2.72 0 00.472-.697c.123-.273.232-.567.327-.88l2.418 1.392a8.965 8.965 0 01-.82 1.435c-.3.423-.648.785-1.044 1.086a4.183 4.183 0 01-1.332.655c-.506.15-1.08.226-1.721.226zM63.052 26.09c-1.502 0-2.643-.458-3.422-1.373-.765-.915-1.147-2.33-1.147-4.241 0-1.913.383-3.327 1.148-4.242.778-.929 1.919-1.393 3.421-1.393 1.503 0 2.637.464 3.402 1.393.778.915 1.168 2.33 1.168 4.241 0 1.913-.39 3.327-1.168 4.242-.765.915-1.9 1.373-3.402 1.373zm0-2.275c1.052 0 1.578-.614 1.578-1.844V18.96c0-1.23-.526-1.844-1.578-1.844-1.051 0-1.578.615-1.578 1.844v3.012c0 1.23.527 1.844 1.578 1.844zM75.404 24.061h-.328a2.738 2.738 0 01-.328.8 2.82 2.82 0 01-.553.655 2.44 2.44 0 01-.738.41c-.273.109-.553.164-.84.164-1.257 0-2.172-.465-2.746-1.394-.573-.942-.86-2.35-.86-4.22 0-1.872.287-3.279.86-4.221.588-.943 1.503-1.414 2.746-1.414.287 0 .567.054.84.164.274.095.52.239.738.43.219.178.403.39.553.635.15.246.26.512.328.8h.328V10.68h2.868v15.163h-2.868V24.06zm-1.64-.307c.52 0 .923-.116 1.21-.349.286-.245.43-.607.43-1.085v-3.71c0-.477-.144-.832-.43-1.065-.287-.246-.69-.368-1.21-.368-.532 0-.962.17-1.29.512-.314.328-.472.799-.472 1.414v2.725c0 .614.158 1.093.472 1.434.328.328.758.492 1.29.492zM85.01 26.09c-1.476 0-2.657-.465-3.545-1.394-.874-.942-1.312-2.35-1.312-4.22 0-1.913.383-3.327 1.148-4.242.778-.929 1.92-1.393 3.422-1.393 1.502 0 2.636.464 3.401 1.393.779.915 1.168 2.33 1.168 4.241v.697h-6.147v.676c0 .601.184 1.086.553 1.455.369.355.874.533 1.516.533.533 0 .984-.116 1.353-.348a4.02 4.02 0 001.045-1.005l1.455 1.701a4.65 4.65 0 01-1.68 1.393c-.67.342-1.462.513-2.377.513zm-.287-9.098c-1.052 0-1.578.615-1.578 1.844v.656H86.3v-.656c0-1.23-.525-1.844-1.577-1.844zM95.296 26.09c-2.144 0-3.824-.752-5.04-2.254l1.885-1.885c.82 1.052 1.892 1.577 3.217 1.577 1.366 0 2.049-.6 2.049-1.803 0-.491-.123-.874-.369-1.147s-.628-.465-1.147-.574l-1.312-.246c-1.325-.246-2.301-.703-2.93-1.372-.615-.683-.922-1.626-.922-2.828 0-1.393.41-2.452 1.23-3.176.82-.724 2.021-1.086 3.606-1.086 2.022 0 3.558.656 4.61 1.967l-1.885 1.885c-.355-.437-.758-.758-1.209-.963-.437-.219-.956-.328-1.557-.328-.656 0-1.134.123-1.434.369-.287.246-.43.642-.43 1.188 0 .479.108.84.327 1.086.232.246.601.424 1.106.533l1.312.266c.697.15 1.29.335 1.782.554.506.205.916.471 1.23.799.328.328.56.717.697 1.168.15.45.225.977.225 1.578 0 1.53-.43 2.697-1.29 3.503-.861.793-2.111 1.189-3.75 1.189zM108.26 24.061h-.328a2.766 2.766 0 01-.881 1.455 2.449 2.449 0 01-.738.41c-.273.109-.553.164-.84.164-1.257 0-2.172-.465-2.746-1.394-.573-.942-.86-2.35-.86-4.22 0-1.872.287-3.279.86-4.221.588-.943 1.503-1.414 2.746-1.414.287 0 .567.054.84.164.273.095.519.239.738.43.218.178.403.39.553.635.15.246.259.512.328.8h.328v-1.783h2.868v14.855h-2.868v-5.88zm-1.64-.307c.52 0 .922-.116 1.209-.349.287-.245.431-.607.431-1.085v-3.71c0-.477-.144-.832-.431-1.065-.287-.246-.689-.368-1.209-.368-.532 0-.963.17-1.29.512-.315.328-.472.799-.472 1.414v2.725c0 .614.157 1.093.472 1.434.327.328.758.492 1.29.492zM119.32 24.02h-.328a3.231 3.231 0 01-.348.8 2.662 2.662 0 01-.512.655 2.285 2.285 0 01-.717.45c-.274.11-.595.165-.963.165-.957 0-1.687-.321-2.193-.963-.505-.656-.758-1.564-.758-2.726v-7.314h2.869v6.761c0 1.27.444 1.906 1.331 1.906.438 0 .813-.13 1.127-.39.328-.273.492-.648.492-1.126v-7.151h2.869v10.757h-2.869V24.02zM131.779 25.844c-1.12 0-1.728-.622-1.824-1.865h-.266c-.109.656-.403 1.175-.881 1.558-.478.368-1.086.553-1.824.553-.97 0-1.701-.273-2.192-.82-.492-.56-.738-1.332-.738-2.315 0-1.175.355-2.029 1.066-2.561.724-.533 1.728-.8 3.012-.8h1.557v-.84c0-.56-.116-.976-.349-1.25-.232-.273-.621-.41-1.167-.41-.479 0-.882.124-1.209.37a3.318 3.318 0 00-.84.942l-1.701-1.516a4.76 4.76 0 011.598-1.496c.628-.369 1.434-.553 2.418-.553 1.407 0 2.445.328 3.114.983.67.656 1.004 1.633 1.004 2.93v4.856h.881v2.234h-1.659zm-3.647-1.762c.423 0 .785-.116 1.086-.349.314-.245.471-.621.471-1.127v-1.331h-1.291c-.984 0-1.475.41-1.475 1.229v.39c0 .41.102.71.307.9.219.192.519.288.902.288zM135.254 25.844V15.087h2.869v2.294h.328c.041-.3.109-.587.205-.86.095-.287.225-.533.389-.738.178-.218.396-.389.656-.512.259-.123.567-.184.922-.184h.512v2.91h-.738c-.778 0-1.352.108-1.721.327-.369.219-.553.635-.553 1.25v6.27h-2.869zM146.919 26.09c-1.475 0-2.657-.465-3.544-1.394-.875-.942-1.312-2.35-1.312-4.22 0-1.913.383-3.327 1.148-4.242.778-.929 1.919-1.393 3.421-1.393 1.503 0 2.637.464 3.402 1.393.778.915 1.168 2.33 1.168 4.241v.697h-6.147v.676c0 .601.184 1.086.553 1.455.369.355.874.533 1.516.533.533 0 .984-.116 1.353-.348a4.04 4.04 0 001.045-1.005l1.454 1.701a4.65 4.65 0 01-1.68 1.393c-.669.342-1.461.513-2.377.513zm-.287-9.098c-1.051 0-1.577.615-1.577 1.844v.656h3.155v-.656c0-1.23-.526-1.844-1.578-1.844z"
          fill="#2F2E41"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.6 11.386c-2.134 1.232-2.134 4.313 0 5.545l13.047 7.532V10.89c0-2.465 2.668-4.005 4.802-2.773l5.923 3.42V25.11 3.206c0-2.464-2.668-4.005-4.802-2.772L1.6 11.386z"
          fill="#6DA3F3"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.6 11.386c-2.134 1.232-2.134 4.313 0 5.545l13.047 7.532V10.89c0-2.465 2.668-4.005 4.802-2.773l5.923 3.42V25.11 3.206c0-2.464-2.668-4.005-4.802-2.772L1.6 11.386z"
          fill="url(#paint0_linear)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.372 25.11V11.537l13.047 7.532c2.134 1.233 2.134 4.313 0 5.545l-18.97 10.952c-2.134 1.232-4.802-.308-4.802-2.772v-8.331l5.923 3.42c2.134 1.232 4.802-.308 4.802-2.773z"
          fill="#D462E7"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.372 25.11V11.537l13.047 7.532c2.134 1.233 2.134 4.313 0 5.545l-18.97 10.952c-2.134 1.232-4.802-.308-4.802-2.772v-8.331l5.923 3.42c2.134 1.232 4.802-.308 4.802-2.773z"
          fill="url(#paint1_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="3.202"
            y1="7.964"
            x2="26.978"
            y2="23.788"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3ADCB5" />
            <stop offset=".714" stopColor="#7BB0FF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="12.166"
            y1="16.239"
            x2="36.177"
            y2="30.646"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6DA3F3" />
            <stop offset="1" stopColor="#D462E7" />
          </linearGradient>
        </defs>
      </svg>
    )}
  </React.Fragment>
);
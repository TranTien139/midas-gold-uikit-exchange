import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <defs>
        <image  width="24" height="24" id="img5" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAEECAMAAAD51ro4AAAAAXNSR0IB2cksfwAAAqNQTFRFycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUycTUH/eP4QAAAOF0Uk5TACZgos/n+/+oaSoIWbXy9rhaC13Q0wKztitb6etcf4CLjH5YJ+zttwEJ0tFXufTzJWVjpuj64QPKycxuI/FhGhmsVVQT5OWeR0gN25I8PQeEhTEFxscEd3i7vGoerxXqo1EPlkRD2Dn+OM4uw3L1ZhvvqhJN3wyRQf1ABtWDNcu/ayAhXhjwiYqpwdnINu7UPhfgh9r8ecAOgWKIFG+T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"/>
      </defs>
      <use id="Background" href="#img5" x="0" y="0" />
    </Svg>
  );
};

export default Icon;

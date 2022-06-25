import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgSubtract = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || "100%"}
    height={props.height || "100%"}
    fill="none"
  // viewBox="0 0 100, 100"
  >
    <Path
      fill="#000"
      fillOpacity="0.9"
      fillRule="evenodd"
      d="M428 0H0V926H428V0ZM97 313C78.7746 313 64 327.775 64 346V580C64 598.225 78.7746 613 97 613H331C349.225 613 364 598.225 364 580V346C364 327.775 349.225 313 331 313H97Z"
      clipRule="evenodd"
    ></Path>
  </Svg>

)

export default SvgSubtract

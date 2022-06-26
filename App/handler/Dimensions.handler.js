import React, { Component } from "react"
import { Dimensions } from "react-native"


const window = Dimensions.get("window")
const screen = Dimensions.get("screen")
class ScreenDimensions extends Component {
    state = {
        dimensions: {
            window,
            screen
        }
    };

    onChange = ({ window, screen }) => {
        this.setState({ dimensions: { window, screen } })
    };

    componentDidMount() {
        this.dimensionsSubscription = Dimensions.addEventListener("change", this.onChange)
    }

    componentWillUnmount() {
        this.dimensionsSubscription?.remove()
    }

    width = Math.floor(this.state.dimensions.window.width)
    height = Math.floor(this.state.dimensions.window.height)


}

export default ScreenDimensions
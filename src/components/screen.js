import React from "react"

import { View, TouchableWithoutFeedback, StyleSheet } from "react-native"

import { screen, colors } from "../constants"

const Screen = ({ onPress, children}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                {
                    children
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100 * screen.width,
        height: 100 * screen.height,
        backgroundColor: colors.lightGrey
    }
})

export default Screen
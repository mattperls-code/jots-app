import React from "react"

import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import { screen, colors, icons } from "../constants"

const Header = ({ backButton, title, rightIcon, rightAction, navigation }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitleText}>
                    {
                        title
                    }
                </Text>
            </View>
            {
                backButton ? (
                    <TouchableOpacity style={{ padding: 12 }} onPress={navigation.goBack} activeOpacity={0.6}>
                        <View><FontAwesomeIcon icon={icons.leftArrow} size={22} color={colors.white} /></View>
                        
                    </TouchableOpacity>
                ) : <View/>
            }
            <TouchableOpacity style={{ padding: 12 }} onPress={rightAction} activeOpacity={0.6}>
                <FontAwesomeIcon icon={rightIcon} size={22} color={colors.white} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: 100 * screen.width,
        height: 72 + screen.top,
        padding: 18,
        paddingTop: 18 + screen.top,
        backgroundColor: colors.darkPurple,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 2
    },
    headerTitleContainer: {
        position: "absolute",
        top: screen.top,
        width: 100 * screen.width,
        height: 72,
        alignItems: "center",
        justifyContent: "center"
    },
    headerTitleText: {
        color: colors.white,
        fontFamily: "Comfortaa",
        fontWeight: "900",
        fontSize: 28
    }
})

export default Header
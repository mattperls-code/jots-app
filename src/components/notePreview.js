import React, { useState } from "react"

import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

import Vault from "react-native-vault"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import { screen, colors, icons } from "../constants"

const NotePreview = ({ uuid, date, value, onRemove, navigation }) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => {
            navigation.push("editor", { isNew: false, date, value })
        }}>
            <View style={styles.notePreviewContainer}>
                <View style={styles.noteInfoContainer}>
                    <View style={styles.noteTitleContainer}>
                        <Text style={styles.noteTitleText} numberOfLines={1} ellipsizeMode={"tail"}>
                            {
                                value.length == 0 ? "(Empty Note)" : value
                            }
                        </Text>
                    </View>
                    <View style={styles.noteDateContainer}>
                        <Text style={styles.noteDateText} numberOfLines={1} ellipsizeMode={"tail"}>
                            {
                                new Date().toLocaleDateString(date)
                            }
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={{ padding: 8 }} activeOpacity={0.6} onPress={() => {
                    new Vault("vault", "123abc").getCollection("notes").then(collection => {
                        collection.removeOneByUuid(uuid).then(onRemove)
                    })
                }}>
                    <FontAwesomeIcon icon={icons.trash} size={28} color={colors.lightGrey} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    notePreviewContainer: {
        width: 100 * screen.width,
        height: 72,
        marginBottom: 3,
        paddingHorizontal: 18,
        paddingVertical: 6,
        backgroundColor: colors.mediumPurple,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    noteInfoContainer: {
        width: 100 * screen.width - 78,
        height: "100%",
    },
    noteTitleContainer: {
        width: "100%",
        height: 32,
        marginTop: 4
    },
    noteTitleText: {
        color: colors.white,
        fontFamily: "Roboto",
        fontWeight: "700",
        fontSize: 24
    },
    noteDateContainer: {
        width: "100%",
        height: 22
    },
    noteDateText: {
        color: colors.white,
        fontFamily: "Roboto-Italic",
        fontWeight: "500",
        fontSize: 16
    }
})

export default NotePreview
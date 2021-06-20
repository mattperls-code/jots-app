import React, { useState, useEffect, useRef } from "react"

import { TextInput, StyleSheet, Share } from "react-native"

import Vault from "react-native-vault"

import Screen from "../components/screen"
import Header from "../components/header"

import { colors, icons } from "../constants"

const EditorStack = ({ navigation, route }) => {
    let [notes, setNotes] = useState(false)
    useEffect(() => {
        if(notes === false){
            new Vault("vault", "123abc").getCollection("notes").then(setNotes)
        }
    }, [notes])

    let [isEditing, setIsEditing] = useState(false)

    let inputEditor = useRef()

    let [noteContent, setNoteContent] = useState(route.params.value ? route.params.value : "")

    return (
        <Screen>
            <Header backButton title={"Editor"} rightIcon={isEditing ? icons.cancel : icons.share} rightAction={() => {
                if(isEditing){
                    inputEditor.current.blur()
                } else {
                    Share.share({
                        message: `Sent From Jots:\n\n${noteContent}`
                    }).catch(error => {
                        console.warn(error)
                    })
                }
            }} navigation={navigation} />
            <TextInput ref={inputEditor} value={noteContent} onChangeText={(text) => {
                setNoteContent(text)
                if(notes !== false){
                    if(route.params.isNew){
                        const date = Date.now()
                        notes.addOne({ date, value: text })
                        navigation.setParams({ isNew: false, date })
                    } else {
                        notes.updateOne(({ date }) => date == route.params.date, { value: text })
                    }
                }
            }} style={styles.textEditorInput} multiline onFocus={() => {
                setIsEditing(true)
            }} onBlur={() => {
                setIsEditing(false)
            }} />
        </Screen>
    )
}

const styles = StyleSheet.create({
    textEditorInput: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 30,
        fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: "500",
        color: colors.darkPurple
    }
})

export default EditorStack
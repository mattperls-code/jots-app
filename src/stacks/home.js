import React, { useState, useRef, useEffect } from "react"

import { View, FlatList, RefreshControl, TextInput, StyleSheet, Animated } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import Vault from "react-native-vault"

import Screen from "../components/screen"
import Header from "../components/header"
import NotePreview from "../components/notePreview"

import { screen, colors, icons } from "../constants"

const HomeStack = ({ navigation }) => {
    let [notes, setNotes] = useState(false)

    let [refreshing, setRefreshing] = useState(false)

    let [searchInput, setSearchInput] = useState("")

    let searchBarOffset = useRef(new Animated.Value(0)).current

    const filter = (notes, query) => {
        const queryWords = query.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLocaleLowerCase().split(" ")
        if(queryWords.length == 0){
            return notes
        }
        const filtered = []
        notes.forEach(note => {
            const noteKeywords = note.value.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLocaleLowerCase().split(" ")
            let score = 0
            queryWords.forEach(queryWord => {
                noteKeywords.forEach(noteKeyword => {
                    if(queryWord == noteKeyword){
                        score += 2.5
                    } else if(queryWord.includes(noteKeyword) || noteKeyword.includes(queryWord)){
                        score++
                    }
                })
            })
            if(score != 0){
                filtered.push({
                    score,
                    note
                })
            }
        })
        filtered.sort((a, b) => {
            return +(a.score < b.score) * 2  - 1
        })
        return filtered.map(({note}) => note)
    }

    useEffect(() => {
        if(notes === false){
            const myVault = new Vault("vault", "123abc")
            myVault.initialize(["notes"]).then(() => {
                myVault.getCollection("notes").then(collection => {
                    setNotes(collection)
                })
            })
        }
    }, [notes])

    useEffect(() => {
        return navigation.addListener("focus", () => {
            if(notes !== false){
                setRefreshing(true)
                notes.syncData().then(() => {
                    setNotes(notes)
                    setRefreshing(false)
                })
            }
        })
    })

    return (
        <Screen>
            <Header title={"Your Jots"} rightIcon={icons.plus} rightAction={() => {
                navigation.push("editor", { isNew: true })
            }} />
            <Animated.View style={[styles.searchBarWrapper, {
                transform: [
                    {
                        translateY: searchBarOffset
                    }
                ]
            }]}>
                <View style={styles.searchBarContainer}>
                    <TextInput style={styles.searchBarInput} value={searchInput} onChangeText={setSearchInput} multiline={false} placeholderTextColor={colors.lightPurple} placeholder={"Search"} />
                    <FontAwesomeIcon style={styles.searchBarIcon} icon={icons.search} color={colors.lightPurple} size={22} />
                </View>
            </Animated.View>
            <FlatList contentContainerStyle={{ paddingBottom: screen.bottom }} contentOffset={{ y: -74 }} contentInset={{ top: 74 }} showsVerticalScrollIndicator={false} scrollEventThrottle={4} onScroll={(e) => {
                searchBarOffset.setValue(Math.min(-e.nativeEvent.contentOffset.y-74, 0))
            }} data={filter(notes === false ? [] : notes.data, searchInput)} renderItem={({item}) => <NotePreview uuid={item._uuid} date={item.date} value={item.value} onRemove={() => {
                if(notes !== false){
                    setRefreshing(true)
                    notes.syncData().then(() => {
                        setNotes(notes)
                        setRefreshing(false)
                    })
                }
            }} navigation={navigation} />} keyExtractor={({ _uuid }) => _uuid} refreshControl={(
                <RefreshControl refreshing={refreshing} onRefresh={() => {
                    if(notes !== false){
                        setRefreshing(true)
                        notes.syncData().then(() => {
                            setNotes(notes)
                            setRefreshing(false)
                        })
                    }
                }} tintColor={colors.lightPurple} />
            )} />
        </Screen>
    )
}

const styles = StyleSheet.create({
    searchBarWrapper: {
        position: "absolute",
        top: 72 + screen.top,
        width: 100 * screen.width,
        height: 90,
        padding: 18
    },
    searchBarContainer: {
        width: "100%",
        height: 36,
        borderWidth: 1,
        borderColor: colors.darkPurple,
        borderRadius: 12,
        backgroundColor: colors.white
    },
    searchBarInput: {
        width: "100%",
        height: "100%",
        padding: 7,
        paddingLeft: 42,
        fontFamily: "Roboto",
        fontWeight: "500",
        fontSize: 18,
        color: colors.darkPurple
    },
    searchBarIcon: {
        position: "absolute",
        top: 7,
        left: 11
    }
})

export default HomeStack
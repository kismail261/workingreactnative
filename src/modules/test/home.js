import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import SearchableDropdownSingle from './searchableDropdownSingle'


const home = () => {
    return (
        <View style={styles.container} >
            <SearchableDropdownSingle />
            <SearchableDropdownSingle />
        </View>

    )
}

export default home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})

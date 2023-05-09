import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,TouchableHighlight,
    Modal} from 'react-native';


function Header(props){
    return(
        <View style={styles.container}>
            <View style ={styles.titlediv}>
                <Text style ={styles.title}> {props.data} </Text>
                <View style ={{width : '100%',flexDirection :'row', justifyContent : 'flex-end'}}>
                    <TouchableOpacity style={styles.EditButton} onPress={()=>{
                        console.log(props.data)}
                    }>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height : '80%'
    },
    title : {
        fontSize : 25,
        padding : 20
    },

    titlediv : {
        width : '100%',
        borderBottomWidth: 1,
        borderColor: '#000',
        padding: 10,
        fontSize: 20,
    },

    EditButton : {
        padding : 5,
        fontSize : 18,
        textAlign : 'right'
    }
});

export {Header}
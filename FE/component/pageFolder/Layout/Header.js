import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,TouchableHighlight,
    Modal} from 'react-native';


function Header(props){

    const [page, setPage] = useState('');

    useEffect(() => {
        if (props.data === 'HomePage') {
            setPage("MY BUCKET");
        }
        else if (props.data === 'FriendPage') {
            setPage("내 정보");
        }
        else if (props.data === 'SearchPage') {
            setPage("검색");
        }
        else if (props.data === 'ChattingPage') {
            setPage("GPT");
        }
        else if (props.data === 'AddCategory') {
            setPage("카테고리 추가");
        }
        else{
            setPage(props.data)
        }
    }, [props.data]);

    return(
        <View style={styles.container}>
            <View style ={styles.navBox}>
                <Text style ={styles.title}> {page} </Text>
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
        height : '80%',
        backgroundColor: 'white'
    },
    navBox: {
        width: "100%",
        height: 50,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F08484',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'

    },
    title : {
        fontSize : 20,
        color: 'black',
        fontWeight: 'bold',
    },
    titlediv : {
        width : '100%',
        borderBottomWidth: 1,
        borderColor: '#000',
        fontSize: 15,
    },
    EditButton : {
        padding : 5,
        fontSize : 18,
        textAlign : 'right'
    }
});

export {Header}
import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function LoginPage(props){
    return(
        <View style={styles.container}>
            <View style={{flex: 0.6}}></View>
            <Text style={styles.textBold}>BucketList Ap</Text>
            <Text style={styles.text}>로그인</Text>
            <View style={{flex: 0.4}}></View>
            <View>
                <TextInput
                    style={styles.them}
                    //onChangeText={(text) => {this.setState({inputText: text})}}
                    placeholder="Enter Login"
                />

                <TextInput
                    style={styles.them}
                    //onChangeText={(text) => {this.setState({inputText: text})}}
                    placeholder="Enter passward"
                />
            </View>

            <TouchableOpacity onPress={console.log(1)} style={styles.button}>
                <Text style={styles.buttonText}>로그인 하기</Text>
            </TouchableOpacity>
            
            <View style={{flex: 1}}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white",
    },

    textBold:{
        width: "55%",
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 32,
        color: "black"
    },
    text:{
        width: "55%",
        textAlign: "left",
        fontSize: 32
    },

    them: {
        marginBottom : 25,
        width : 250,
        height : 70,
        textAlign : "center",
        color : "black",
        fontSize : 20,
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
    },

    buttonText: {
        width: 200,
        height: 40,
        borderRadius: 40,
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#FF037C",
        fontSize : 20,
        textAlign: "center",
        margin : 20
    }
});

export {LoginPage}
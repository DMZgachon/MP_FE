import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image,
    TouchableHighlight, Modal} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Completion(props){
    return(
        <View style={styles.container}>
            <View style={{flex: 2}}></View>
            <Text style={styles.Title}>회원가입 완료</Text>
            <Text style={styles.text}>당신의 꿈을 응원합니다</Text>
            <View style={{flex: 1.5}}></View>

            <View style={{flexDirection: 'row', flex: 2}}>
                <TouchableOpacity style={styles.button} onPress={(

                )=>{props.navigation.navigate('Login', {data : 'Login'})}}>

                    <Text style={styles.buttonText}>로그인 페이지 이동</Text>
                </TouchableOpacity>

             </View>
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white",
    },
    Title:{
        width: "47%",
        fontWeight: 'bold',
        fontSize: 32,
        color: "black"
    },
    button:{
        marginTop: 15,
        width: "60%",
        borderRadius: 40,
        height: "25%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#FF037C"
    },
    text:{
        width: "50%",
        paddingTop: 10,
        fontSize: 20,
        color: "#4b4b4b"
    },
    buttonText:{
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    },
    textInput: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        //borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1
    }
});

export {Completion}
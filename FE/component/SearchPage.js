import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    Image,
    View,
    Button,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Footer} from "./footer";
import {Header} from './Header'

function SearchPage(props){
    return(
        <View style={styles.container}>
            <Header data = {props.route.params.data}></Header>
            <View style={{flex: 2}}></View>
            <Text style={styles.textBold}>안녕하세요.</Text>
            <Text style={styles.text}>{props.route.params.data}</Text>
            <View style={{flex: 2}}></View>
            <View style={{flexDirection: 'row', flex: 4, width : '95%', justifyContent : 'center'}}>
                <Footer navigation = {props.navigation}></Footer>
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
    button:{
        width: "80%",
        borderRadius: 40,
        height: "35%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#FF037C"
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
    buttonText:{
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
});

export {SearchPage}
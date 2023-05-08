import React from 'react';
import {Header} from './Header'

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

function Edit(props){
    return(
        <View style={styles.container}>
            <Header data = {props.data}></Header>
            <View style={{flex: 2}}></View>
            <Text style={styles.textBold}>안녕하세요.</Text>
            <Text style={styles.text}>편집 화면입니다..</Text>
            <View style={{flex: 2}}></View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <TouchableOpacity style={styles.button} onPress={()=>{
                    props.navigation.navigate('LoginPage', {data : 'My Bucket App'})}
                }>
                    <Text style={styles.buttonText}>메인 화면 돌아가기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
});

export {Edit}
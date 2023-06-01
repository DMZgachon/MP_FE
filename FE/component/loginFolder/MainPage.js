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
import FastImage from 'react-native-fast-image';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function MainPage(props){
    return(
        <FastImage
            style={styles.container}
            source={{
                uri: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2NlN2MyODlmNGI4N2E5YTQzYTI0OGNmOGJhYjRhNzIzMTA1M2NkMyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/VDGOdvmp1bpc3PcCry/giphy-downsized-large.gif',
                priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
        >
            <View style={{flex: 2}}>
            </View>


            <Text style={styles.textBold}>夢は遠くない</Text>
            <Text style ={{color : "#dcdcbe", marginLeft : 120}}>꿈은 멀리 있지 않다.</Text>
            <View style={{flex: 5}}></View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <TouchableOpacity style={styles.button} onPress={()=>{
                    props.navigation.navigate('Login')}
                }>
                    <Text style={styles.buttonText}>
                        꿈 담기</Text>
                </TouchableOpacity>
            </View>
        </FastImage>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems : 'center'
    },
    button:{
        width: "80%",
        borderRadius: 40,
        height: "35%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#91917f"
    },
    textBold:{
        width: "55%",
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 32,
        color: "#fcf2cb"
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

export {MainPage};

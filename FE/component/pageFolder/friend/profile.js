import React, {Component, useEffect, useState} from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, TouchableHighlight,
    Modal, ToastAndroid, Image
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { instance, setAccessTokenHeader } from "../../../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";


function profile(props){
    return(
        <View style={styles.container}>

            <Image
                style={{width: 200, height: 300}}
                source={props.route.params.data ? {uri: props.route.params.data} : require('../../img/default_profile.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        position : 'absolute',
        bottom : 300,
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F08484',
    },
});

export {profile}
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
    Button, TextInput,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Footer} from "../Layout/footer";
import {Header} from '../Layout/Header';

function Condition(props){
    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>

            <View style={styles.navBox1}>
                <View style={{flex: 1}}></View>
                <ScrollView style={{marginTop: '20%'}}>
                    <Text>
                        [버킷리스트 어플 이용 약관]
                        {'\n\n'}{'\n'}
                        서문
                        1.1 이용 약관은 [버킷리스트 어플] (이하 "어플")을 이용하는 모든 사용자 (이하 "사용자" 또는 "회원")에게 적용됩니다. 어플 이용은 본 약관에 동의하는 것으로 간주됩니다.
                        {'\n\n'}
                        1.2 어플은 사용자가 자신의 버킷리스트를 작성하고 관리하며, 다른 사용자와 공유할 수 있는 기능을 제공합니다.
                        {'\n\n'}
                        회원 가입 및 계정
                        2.1 어플을 이용하기 위해서는 회원 가입이 필요합니다. 회원은 개인정보 보호 정책에 동의한 후, 필요한 정보를 제공하여 회원 가입을 완료해야 합니다.
                        {'\n\n'}
                        2.2 회원은 자신의 계정 정보를 안전하게 보관해야 하며, 어플 이용 중 발생하는 모든 활동에 대한 책임을 져야 합니다. 계정 정보의 무단 사용이나 타인에 의한 액세스로 인해 발생하는 손해에 대해서는 회사는 책임을 지지 않습니다.
                        {'\n\n'}
                        어플 이용 규칙
                        3.1 어플의 모든 콘텐츠(텍스트, 이미지, 동영상 등)는 회원 개인의 책임 하에 작성되어야 합니다. 회원은 타인의 권리를 침해하지 않아야 하며, 불법적인 내용이나 제3자의 저작권을 침해하는 콘텐츠의 게시는 엄격히 금지됩니다.
                        {'\n\n'}
                        3.2 회원은 어플을 부적절하게 사용하거나 다른 회원의 이용을 방해하는 행위를 해서는 안 됩니다. 어플의 기능을 악용하여 스팸 메시지를 발송하거나, 시스템에 부하를 주는 행위 등은 엄격히 금지됩니다.
                        {'\n\n'}
                        지적 재산권
                        4.1 어플에 게시된 모든 콘텐츠(텍스트, 이미지, 동영상 등)의 저작권은 해당 콘텐츠를 작성한 회원에게 귀속됩니다.
                        {'\n\n'}
                        4.2 회원은 자신이 작성한 콘텐츠를 어플 내에서 공유할 수 있지만, 어플 외부로의 무단 복제, 배포, 수정 등은 저작권 침해로 간주되며, 이에 따른 법적인 책임을 지게 됩니다.
                        {'\n\n'}
                        개인정보 보호
                        5.1 회사는 회원의 개인정보를 보호하기 위해 노력하며, 개인정보 처리는 개인정보 보호 정책에 따릅니다.
                        {'\n\n'}
                        5.2 회원은 개인정보 보호 정책을 숙지하고 동의한 후에만 회원 가입 및 이용할 수 있습니다.
                        {'\n\n'}
                        면책 조항
                        6.1 회사는 어플 이용으로 인해 발생하는 어떠한 손해에 대해서도 책임을 지지 않습니다. 어플 이용으로 인해 발생하는 모든 손실, 손해, 상해 등은 회원 본인의 책임입니다.
                        {'\n\n'}
                        6.2 회사는 어플의 정상적인 운영을 위해 필요한 경우 사전 공지 후 서비스 일시 중단, 변경, 중단 등의 조치를 취할 수 있습니다.
                        {'\n\n'}
                        약관의 변경
                        7.1 회사는 필요한 경우 어플의 약관을 변경할 수 있습니다. 약관의 변경은 어플 내 공지사항을 통해 사전에 공지됩니다. 변경된 약관은 공지 후 일정 기간 이후부터 효력이 발생합니다.
                        {'\n\n'}
                        7.2 회원은 약관 변경에 동의하지 않을 경우 회원 탈퇴를 선택할 수 있습니다.
                        {'\n\n'}{'\n'}
                        위의 약관은 일반적인 버킷리스트 어플의 이용 약관을 기반으로 작성된 것입니다. 실제 약관 작성 시에는 해당 국가의 법적인 요구 사항 및 전문적인 법률 자문을 고려하여 작성해야 합니다. 또한, 회원의 개인정보 보호에 대한 내용은 개인정보 보호법과 관련 규정을 준수해야 합니다.
                    </Text>
                </ScrollView>
            </View>

            <View style={styles.bottomView}>
                <View style={{flexDirection: 'row', flex: 2, width : '95%', justifyContent : 'center'}}>
                    <Footer navigation = {props.navigation} data ={props.route.params.data}></Footer>
                </View>
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
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    storeCon:{
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'flex-end',
        width: '88%',
    },
    navBox1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: '90%',
        marginBottom: '5%',
        padding: '5%',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 'bold',
        flexDirection: 'column', // Here, change 'row' to 'column'
    },
    Title:{
        width: "100%",
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 17,
        color: "black"
    },
    text1:{
        width: '100%',
        fontSize: 16,
        color: "black",
        padding: 5,
    },
    textInput: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        width: "60%",
        fontSize: 16,
        //borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    settext:{
        width: '50%',
        fontSize: 16,
        color: "black",
        marginLeft: 20,
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    profileImg: {
        width: 90,
        height: 90,
        resizeMode: "cover",
    },
    moreImg:{
        marginLeft: 5,
        marginRight: 30,
        width: 20,
        height: 20,
        resizeMode: "cover",
    },
    editbtn:{
        marginTop: -15,
        width: "80%",
        borderRadius: 40,
        height: "8%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#e3e3f6"
    },

    buttonText:{
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
    },
    buttonText2:{
        textAlign: 'right',
        color: "#d91717",
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: '20%'
    },
});

export {Condition}
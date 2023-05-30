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

function Question(props){
    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>

            <View style={styles.navBox1}>
                <View style={{flex: 1}}></View>
                <ScrollView>
                    <Text style={styles.text1}>
                        버킷리스트 어플을 이용하는 사용자들이 자주 묻는 질문(FAQ)을 아래에 제시해 드리겠습니다.
                        {'\n\n'}
                    </Text>
                    <Text style={styles.text1}>
                        Q1. 어떻게 버킷리스트를 작성하고 관리할 수 있나요?
                        {'\n'}
                    </Text>
                    <Text>
                        A1. 어플 내에서 버킷리스트 항목을 추가하고 편집할 수 있는 기능을 제공합니다. "+" 버튼을 클릭하여 새로운 항목을 추가하거나, 기존 항목을 선택하여 수정할 수 있습니다.
                        {'\n\n'}
                    </Text>
                    <Text style={styles.text1}>
                        Q2. 다른 사용자와 버킷리스트를 공유할 수 있나요?
                        {'\n'}
                    </Text>
                    <Text>
                        A2. 네, 어플 내에서 다른 사용자와 버킷리스트를 공유할 수 있습니다. 버킷리스트 항목을 공유하고 싶다면 해당 항목을 선택하고 공유 옵션을 선택하세요.
                        {'\n\n'}
                    </Text>
                    <Text style={styles.text1}>
                        Q3. 버킷리스트 항목을 달성했을 때 어떻게 체크할 수 있나요?
                        {'\n'}
                    </Text>
                    <Text>
                        A3. 버킷리스트 항목을 달성했다면 해당 항목을 선택하고 "달성" 또는 "체크" 버튼을 클릭하세요. 체크된 항목은 완료된 것으로 표시됩니다.
                        {'\n\n'}
                    </Text>
                    <Text style={styles.text1}>
                        Q4. 어플에서 다른 사용자의 버킷리스트를 확인할 수 있나요?
                        {'\n'}
                    </Text>
                    <Text>
                        A4. 네, 어플 내에서 다른 사용자의 공개된 버킷리스트를 확인할 수 있습니다. 탐색 또는 검색 기능을 통해 다른 사용자의 버킷리스트를 찾아볼 수 있습니다.
                        {'\n\n'}
                    </Text>
                    <Text style={styles.text1}>
                        Q5. 버킷리스트를 카테고리별로 분류할 수 있나요?
                        {'\n'}
                    </Text>
                    <Text>
                        A5. 네, 어플 내에서 버킷리스트를 사용자가 지정한 카테고리로 분류할 수 있습니다. 카테고리를 생성하고 각 항목에 카테고리를 지정하여 관리할 수 있습니다.
                        {'\n\n'}
                    </Text>
                    <Text style={styles.text1}>
                        Q6. 어플을 삭제하거나 새 기기로 전환해도 버킷리스트 정보는 유지되나요?
                        {'\n'}
                    </Text>
                    <Text>
                        A6. 네, 회원 계정으로 로그인한 경우 버킷리스트 정보는 서버에 저장되므로 어플을 삭제하거나 새 기기로 전환해도 버킷리스트 정보는 유지됩니다.
                        {'\n\n'}
                    </Text>
                    <Text style={styles.text1}>
                        Q7.어플 이용에 대한 도움말이나 문제 해결 방법을 어디에서 찾을 수 있나요?
                        {'\n'}
                    </Text>
                    <Text>
                        A7. 어플 내에 도움말 섹션을 제공하고 있으며, 자주 묻는 질문(FAQ)과 문제 해결 방법을 참고할 수 있습니다. 또한, 문제가 지속되는 경우 어플 지원팀에 문의할 수 있는 연락처를 제공하고 있습니다.
                    </Text>
                </ScrollView>
            </View>

            <View style={styles.bottomView}>
                <View style={{flexDirection: 'row', flex: 2, width : '100%', justifyContent : 'center'}}>
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
        height: '85%',
        marginBottom: '5%',
        padding: '5%',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 'bold',
        flexDirection: 'column', // Here, change 'row' to 'column'
    },
    text1:{
        fontSize: 14,
        color: "black",
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    buttonText:{
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
    },

});

export {Question}
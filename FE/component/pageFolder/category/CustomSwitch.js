import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CustomSwitch = ({
                          navigation,
                          selectionMode,
                          roundCorner,
                          option1,
                          option2,
                          onSelectSwitch,
                          selectionColor
                      }) => {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);
    const [getRoundCorner, setRoundCorner] = useState(roundCorner);

    const updatedSwitchData = val => {
        setSelectionMode(val);
        onSelectSwitch(val);
    };

    return (
        <View>
            <View
                style={{
                    height: 30,
                    width: 110,
                    backgroundColor: 'white',
                    borderRadius: getRoundCorner ? 25 : 0,
                    borderWidth: 1,
                    borderColor: selectionColor,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 1,
                }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updatedSwitchData('')}
                    style={{
                        flex: 1,

                        backgroundColor: getSelectionMode == '' ? selectionColor : 'white',
                        borderRadius: getRoundCorner ? 25 : 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            color: getSelectionMode == '' ? 'white' : selectionColor,
                        }}>
                        {option1}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updatedSwitchData('비')}
                    style={{
                        flex: 1,

                        backgroundColor: getSelectionMode == '비' ? selectionColor : 'white',
                        borderRadius: getRoundCorner ? 25 : 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            color: getSelectionMode == '비' ? 'white' : selectionColor,
                        }}>
                        {option2}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default CustomSwitch;
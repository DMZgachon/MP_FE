import * as React from 'react';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import {StyleSheet, TextInput, View} from "react-native";

function SelectBox(props) {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return(
        <Provider>
            <View style={styles.container}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button style={styles.button} onPress={openMenu}>Show Menu</Button>}>
                    <Menu.Item onPress={() => {}} title="Item 1" />
                    <Menu.Item onPress={() => {}} title="Item 2" />
                    <Divider />
                    <Menu.Item onPress={() => {}} title="Item 3" />
                </Menu>
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#F08484',
        padding: 10
    },
    inputBox: {
        fontSize: 16,
        borderBottomWidth: 1,
        width: "90%",
        borderStyle: 'solid',
        borderColor: '#F08484',
        justifyContent: 'center',
        margin:"3%"
    }
});

export {SelectBox};

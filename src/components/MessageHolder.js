import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MessageHolder = ({ inputText }) => {
    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text>{inputText}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: '1%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    text: {
        backgroundColor: '#99D9EA',
        padding: 15,
        borderRadius: 10,
    }
});

export default MessageHolder;

import React, { Component } from 'react';
import { Container, View, Spinner } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
    },
});

export default class Splash extends Component {
    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Spinner size="small" color="#000000" />
                </View>
            </Container>
        );
    }
}

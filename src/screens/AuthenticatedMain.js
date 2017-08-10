import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Button, Container, Input, Icon, InputGroup, Spinner, Text, Title, View } from 'native-base';
import * as sessionApi from '../api/session';
import { getSession } from "../helpers/session"

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 30,
        flex: 1,
    },
    shadow: {
        flex: 1,
        width: null,
        height: null,
    },
    button: {
        marginTop: 20,
    }
});

const logoutReset = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Login'})
    ]
});

export default class AuthenticatedMain extends Component {

    onPressEmailUpdate() {
        alert('Email');
    }

    onPressLogout() {
        const session = getSession();
        sessionApi.revoke(session.tokens.refresh).then(() => {
            this.props.navigation.dispatch(logoutReset);
        })
        .catch((exception) => {
            throw exception;
        });
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text>This is the Authenticated Home Screen</Text>
                    <Button block danger
                            style={styles.button}
                            onPress={() => this.onPressLogout()}
                    >
                        <Icon name="ios-power" />
                        <Text>Log Out</Text>
                    </Button>
                    <Button block success
                            style={styles.button}
                            onPress={() => this.onPressEmailUpdate()}
                    >
                        <Icon name="ios-person" />
                        <Text>Change Email Address</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}
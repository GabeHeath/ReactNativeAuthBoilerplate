import React, { Component, PropTypes } from 'react';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { StyleSheet } from 'react-native';
import { Button, Container, Input, Icon, InputGroup, Spinner, Text, Title, View } from 'native-base';

import FormMessage from '../components/FormMessage';
import * as session from '../helpers/session';
import * as api from '../api/services';

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
    inputIcon: {
        width: 30,
    },
    input: {
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
});

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            isLoading: false,
            error: null,
            email: 'user1@facebook.com',
            password: '12345678',
        };
        this.state = this.initialState;
    }

    onPressLogin() {
        this.setState({
            isLoading: true,
            error: '',
        });
        dismissKeyboard();

        session.authenticate(this.state.email, this.state.password)
            .then(() => {
                this.setState(this.initialState);
                this.props.navigation.navigate('AuthenticatedMain');
            })
            .catch((exception) => {
                // Displays only the first error message
                const error = api.exceptionExtractError(exception);
                this.setState({
                    isLoading: false,
                    ...(error ? { error } : {}),
                });

                if (!error) {
                    throw exception;
                }
            });
    }

    onPressRegister() {
        this.props.navigation.navigate('Register');
    }

    render() {
        return(
            <Container>
                <View style={styles.container}>
                    {this.state.error ? ( <FormMessage message={this.state.error} /> ) : null}
                    <InputGroup style={styles.input}>
                        <Icon style={styles.inputIcon} name="ios-person" />
                        <Input
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        />
                    </InputGroup>

                    <InputGroup style={styles.input}>
                        <Icon style={styles.inputIcon} name="ios-unlock" />
                        <Input
                            placeholder="Password"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            secureTextEntry
                        />
                    </InputGroup>

                    {this.state.isLoading ? (
                        <Spinner size="small" color="#000000" />
                    ) : (
                        <Button block
                            style={styles.button}
                            onPress={() => this.onPressLogin()}
                        >
                            <Text>Sign In</Text>
                        </Button>
                    )}

                    <Button block danger
                            style={styles.button}
                            onPress={() => this.onPressRegister()}
                    >
                        <Text>Sign Up</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}
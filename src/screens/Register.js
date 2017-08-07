import React, { Component, PropTypes } from 'react';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { StyleSheet } from 'react-native';
import { Button, Container, Input, Icon, InputGroup, Spinner, Text, Title, View } from 'native-base';

import FormMessage from '../components/FormMessage';
import * as usersApi from '../api/users';
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

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            isLoading: false,
            error: null,
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        };
        this.state = this.initialState;
    }

    onPressRegister() {
        this.setState({
            isLoading: true,
            error: '',
        });
        dismissKeyboard();

        const { firstName, lastName, username, email, password, passwordConfirmation } = this.state;
        usersApi.create({user: { firstName, lastName, username, email, password, passwordConfirmation }})
            .then((response) => {
                if(response.ok && !response.data.hasOwnProperty('errors')) {
                    session.authenticate(email, password)
                        .then(() => {
                            this.setState(this.initialState);
                            this.props.navigation.navigate('AuthenticatedMain');
                        });
                } else {
                    // Displays only the first error message
                    const error = api.exceptionExtractError(response.data.errors);
                    const newState = {
                        isLoading: false,
                        ...(error ? { error } : {}),
                    };
                    this.setState(newState);
                }
            })
            .catch((exception) => {
               console.error(exception);
            });
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    {this.state.error ? ( <FormMessage message={this.state.error} /> ) : null}
                    <InputGroup style={styles.input}>
                        <Icon style={styles.inputIcon} name="ios-arrow-forward" />
                        <Input
                            placeholder="First name"
                            autoCorrect={false}
                            onChangeText={firstName => this.setState({ firstName })}
                            value={this.state.firstName}
                        />
                    </InputGroup>
                    <InputGroup style={styles.input}>
                        <Icon style={styles.inputIcon} name="ios-arrow-forward" />
                        <Input
                            placeholder="Last name"
                            autoCorrect={false}
                            onChangeText={lastName => this.setState({ lastName })}
                            value={this.state.lastName}
                        />
                    </InputGroup>
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
                        <Icon style={styles.inputIcon} name="ios-person" />
                        <Input
                            placeholder="Username"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={username => this.setState({ username })}
                            value={this.state.username}
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
                    <InputGroup style={styles.input}>
                        <Icon style={styles.inputIcon} name="ios-unlock" />
                        <Input
                            placeholder="Confirm Password"
                            onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
                            value={this.state.passwordConfirmation}
                            secureTextEntry
                        />
                    </InputGroup>
                    {this.state.isLoading ? (
                        <Spinner size="small" color="#000000" />
                    ) : (
                        <Button block danger
                            style={styles.button}
                            onPress={() => this.onPressRegister()}
                        >
                            <Text>Register</Text>
                        </Button>
                    )}
                </View>
            </Container>
        );
    }
}
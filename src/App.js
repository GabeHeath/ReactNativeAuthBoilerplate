import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Provider } from 'react-redux';
import store from './store';
import * as session from './helpers/session';

import Splash from './screens/Splash';
import { createAuthenticationStack } from './config/router'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
});

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialRoute: null
        };
    }

    componentDidMount() {
        // Waits for the redux store to be populated with the previously saved state,
        // then it will try to auto-login the user.
        const unsubscribe = store.subscribe(() => {
            if (store.getState().services.persist.isHydrated) {
                unsubscribe();
                this.autoLogin();
            }
        });
    }

    autoLogin() {
        session.refreshToken().then(() => {
            this.setState({ initialRoute: 'AuthenticatedMain' });
        }).catch(() => {
            this.setState({ initialRoute: 'Login' });
        });
    }

    renderContent() {
        if (!this.state.initialRoute) {
            return <Splash />;
        }
        const Layout = createAuthenticationStack(this.state.initialRoute);
        return <Layout />;
    }

    render() {
        return (
            <View style={styles.container}>
                <Provider store={store}>
                    {this.renderContent()}
                </Provider>
            </View>
        );
    }
}
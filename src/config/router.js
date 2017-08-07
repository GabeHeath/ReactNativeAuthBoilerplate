import React from 'react';
import { StackNavigator } from 'react-navigation';

import AuthenticatedMain from '../screens/AuthenticatedMain';
import ForgotPassword from '../screens/Register';
import Login from '../screens/Login';
import Register from '../screens/Register';

export const createAuthenticationStack = (initialRoute) => {
    return StackNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                title: 'Login'
            }
        },
        Register: {
            screen: Register,
            navigationOptions: {
                title: 'Sign Up'
            }
        },
        ForgotPassword: {
            screen: ForgotPassword,
            navigationOptions: {
                title: 'Forgot Password'
            }
        },
        AuthenticatedMain: {
            screen: AuthenticatedMain,
            navigationOptions: {
                title: 'Welcome'
            }
        },
    }, {
        initialRouteName: initialRoute
    });
};
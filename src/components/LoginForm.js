import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { 
    Card,
    CardSection,
    Input,
    Button,
    Spinner,
} from './common';

class LoginForm extends Component {
    onEmailChanged = (text) => {
        this.props.emailChanged(text);
    };

    onPasswordChanged = (text) => {
        this.props.passwordChanged(text);
    };

    onLoginPressed = () => {
        const { email, password } = this.props;
        this.props.loginUser(email, password);
    };

    renderLoadingOrButton = () => {
        const { isLoading } = this.props;
        if (isLoading) {
            return <Spinner size={'large'} />;
        }
        return (
            <Button onPress={this.onLoginPressed}>
                Login
            </Button>
        );
    };

    renderError = () => {
        const { error } = this.props;
        if (error) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            );
        }
        return null;
    };

    render() {
        const { email, password } = this.props;
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        value={email}
                        onChangeText={this.onEmailChanged}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Password"
                        placeholder="password"
                        value={password}
                        secureTextEntry
                        onChangeText={this.onPasswordChanged}
                    />
                </CardSection>
                {this.renderError()}
                <CardSection>
                    {this.renderLoadingOrButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    errorContainer: {
        backgroundColor: 'white',
        padding: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
    },
});

const mapStateToProps = ({ auth }) => ({
    email: auth.email,
    password: auth.password,
    isLoading: auth.isLoading,
    error: auth.error,
});

const mapDispatchToProps = (dispatch) => ({
    emailChanged: bindActionCreators(emailChanged, dispatch),
    passwordChanged: bindActionCreators(passwordChanged, dispatch),
    loginUser: bindActionCreators(loginUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Form,
  Item,
  Input,
  Text,
  Icon,
  Button,
} from 'native-base';
import {showMessage, hideMessage} from 'react-native-flash-message';

import axios from '../../helpers/axios';
import {emailValidation} from '../../helpers/validation';

// Redux
import {connect} from 'react-redux';
import {login} from '../../redux/actions/auth';

import {green, lightGrey} from '../../colorPallete';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    security: true,
    isValidEmail: false,
    isValidPassword: false,
    eyeColor: '#c3c3c3',
    errorMsg: '',
  };

  handleLogin = () => {
    const input = {
      email: this.state.email,
      password: this.state.password,
    };

    axios({
      method: 'POST',
      url: '/login',
      data: input,
    })
      .then(({data}) => {
        this.props.dispatch(login(data));
        this.props.navigation.navigate('ForYou');
      })
      .catch(error => {
        const errorMsg = error.response.data.error;
        showMessage({
          message: errorMsg,
          type: 'danger',
        });
      });
  };

  checkEmail(input) {
    const isTrue = emailValidation(input);
    if (isTrue) {
      this.setState({isValidEmail: true});
    } else {
      this.setState({isValidEmail: false});
    }

    this.setState({email: input});
  }

  checkPassword(input) {
    if (input.length < 1) {
      this.setState({isValidPassword: false});
    } else {
      this.setState({isValidPassword: true});
    }

    this.setState({password: input});
  }

  changeIcon() {
    let eyeColor;
    if (this.state.security) {
      eyeColor = '#555';
    } else {
      eyeColor = '#c3c3c3';
    }

    this.setState({
      security: !this.state.security,
      eyeColor,
    });
  }

  render() {
    let status = false;
    if (this.state.isValidEmail && this.state.isValidPassword) {
      status = true;
    }

    return (
      <Container style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>LOG IN</Text>
          <Text style={styles.subtitle}>Login with your account SANTOON</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Form>
            <Item rounded style={styles.form}>
              <Input
                placeholder="Email"
                style={{fontSize: 15}}
                onChangeText={this.checkEmail.bind(this)}
              />
            </Item>
            <Item rounded style={styles.form}>
              <Input
                placeholder="Password"
                style={{fontSize: 15}}
                secureTextEntry={this.state.security}
                onChangeText={this.checkPassword.bind(this)}
              />
              <Icon
                name={this.state.security ? 'eye-off' : 'eye'}
                onPress={this.changeIcon.bind(this)}
                style={{color: this.state.eyeColor}}
              />
            </Item>
          </Form>
          <Button
            style={[styles.button, status && {backgroundColor: green}]}
            onPress={this.handleLogin}
            disabled={!status}>
            <Text>Login</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  title: {
    fontSize: 30,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: green,
  },
  subtitle: {
    fontSize: 15,
    letterSpacing: 1,
    color: green,
  },
  form: {
    marginVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '5%',
  },
  bottomContainer: {
    flex: 2,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: lightGrey,
    marginTop: 20,
    justifyContent: 'center',
  },
});

export default connect()(Login);

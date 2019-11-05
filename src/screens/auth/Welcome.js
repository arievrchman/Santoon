import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import WhiteLogo from '../../assets/images/white-logo.png';
import {robotoWeights, iOSColors} from 'react-native-typography';
import {dark} from '../../colorPallete';

import {connect} from 'react-redux';

export class Welcome extends Component {
  componentDidMount() {
    if (this.props.isLogin) {
      this.props.navigation.navigate('ForYou');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={WhiteLogo} style={{width: 250, height: 200}} />
          <Text style={styles.title}>Your Manga Reader</Text>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
            style={styles.button}>
            <Text style={styles.buttonText}>Login with Email</Text>
          </TouchableOpacity>
          <Text style={styles.divider}>────── OR Register Account ──────</Text>
          <TouchableOpacity
            onPress={() => console.log('register screen')}
            style={styles.button}>
            <Text style={styles.buttonText}>Register an Account</Text>
          </TouchableOpacity>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('ForYou')}
          >
            <Text style={styles.skipText}>Skip ></Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...robotoWeights.medium,
    fontSize: 22,
    color: dark,
    marginVertical: 10,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    padding: 15,
    width: 250,
    marginVertical: 20,
    backgroundColor: iOSColors.green,
    borderRadius: 5,
  },
  buttonText: {
    ...robotoWeights.thin,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
  },
  divider: {
    ...robotoWeights.thin,
    fontWeight: 'bold',
    color: iOSColors.gray,
  },
  skipText: {
    ...robotoWeights.thin,
    marginTop: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: iOSColors.gray,
  },
});

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
  };
};

export default connect(mapStateToProps)(Welcome);

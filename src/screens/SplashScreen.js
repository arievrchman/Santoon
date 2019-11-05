import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Logo from '../assets/images/logo.png';

import {green} from '../colorPallete';

export class SplashScreen extends Component {
  async componentDidMount() {
    const {navigate} = this.props.navigation;
    setTimeout(() => {
      navigate('Welcome');
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={Logo}
          style={{width: 300, height: 250, marginBottom: 20}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: green,
  },
});

export default SplashScreen;

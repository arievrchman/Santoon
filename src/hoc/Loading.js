import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import {robotoWeights, iOSColors} from 'react-native-typography';
import {dark} from '../colorPallete';

const LoadingComponent = WrappedComponent => {
  return class LoadingScreen extends PureComponent {
    _renderLoading() {
      return (
        <View style={{flex: 1}}>
          <BarIndicator color={iOSColors.green} style={styles.indicator} />
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.text}>Loading...</Text>
          </View>
        </View>
      );
    }
    render() {
      if (this.props.isLoading) return this._renderLoading();
      return <WrappedComponent {...this.props} />;
    }
  };
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text: {
    ...robotoWeights.light,
    color: dark,
  },
});

export default LoadingComponent;

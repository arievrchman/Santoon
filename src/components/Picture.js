import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {dark} from '../colorPallete';

export class Picture extends Component {
  render() {
    const {image} = this.props;
    let renderImage;
    if (image) {
      renderImage = <Image source={{uri: image}} style={styles.profilePic} />;
    } else {
      renderImage = <Icon name="user" color="#ccc" size={140} />;
    }

    return (
      <View style={styles.profile}>
        <View style={styles.profileImage}>{renderImage}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  profile: {
    width: 150,
    height: 150,
  },
  profilePic: {
    overflow: 'hidden',
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: dark,
  },
});

export default Picture;

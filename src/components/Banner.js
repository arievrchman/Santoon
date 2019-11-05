import React, {Component} from 'react';
import {
  Image,
  View,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import {validateImageUrl} from '../helpers/validation';

import Icon from 'react-native-vector-icons/FontAwesome';

const dim = Dimensions.get('window');

export class Banner extends Component {
  state = {
    bannerWidth: dim.width,
    bannerHeight: dim.height * 0.3,
  };

  renderImage(santoon, index) {
    const image = validateImageUrl(santoon.image);
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.props.navigation.navigate('DetailToon', {
            id: santoon.id,
            title: santoon.title,
            image,
            genre: santoon.genre,
          })
        }
        key={index}>
        <View>
          <Image
            style={{
              width: this.state.bannerWidth,
              height: this.state.bannerHeight,
              overflow: 'hidden',
            }}
            source={{uri: image}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const {santoons} = this.props;
    return (
      <View style={{flex: 1}}>
        <View style={styles.searchContainer}></View>
        <Icon
          name="search"
          size={25}
          color="white"
          style={styles.searchIcon}
          onPress={() => this.props.navigation.navigate('Search')}
        />
        <Carousel
          pageIndicatorStyle={styles.unactiveIndicators}
          activePageIndicatorStyle={styles.activeIndicators}
          pageIndicatorOffset={20}
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={this.state.bannerWidth}>
          {santoons.map((santoon, idx) => this.renderImage(santoon, idx))}
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  unactiveIndicators: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  activeIndicators: {
    backgroundColor: 'white',
  },
  searchContainer: {
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  searchIcon: {
    position: 'absolute',
    top: 16,
    right: 19,
    zIndex: 2,
  },
});

export default Banner;

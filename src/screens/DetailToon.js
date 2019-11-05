import React, {Component} from 'react';
import {
  Text,
  View,
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Share,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import convertDate from '../helpers/date';
import Icon from 'react-native-vector-icons/Ionicons';
import {BarIndicator} from 'react-native-indicators';
import {robotoWeights, iOSColors} from 'react-native-typography';
import {validateImageUrl} from '../helpers/validation';

import {green} from '../colorPallete';

// Redux
import {connect} from 'react-redux';
import {findToonEpisodes} from '../redux/actions/toon';

const dim = Dimensions.get('window');
const HEADER_MAX_HEIGHT = dim.height * 0.3;
const HEADER_MIN_HEIGHT = 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export class DetailWebtoon extends Component {
  state = {
    scrollY: new Animated.Value(0),
  };

  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.dispatch(findToonEpisodes(id));
  }

  renderEpisodes = () => {
    const {episodes, isLoading} = this.props;

    let renderContent;
    if (isLoading) {
      renderContent = (
        <View style={styles.bottomContainer}>
          <BarIndicator color={green} />
        </View>
      );
    } else if (episodes.length) {
      renderContent = (
        <View>
          {episodes.map((episode, i) => (
            <TouchableWithoutFeedback
              onPress={() =>
                this.props.navigation.navigate('DetailEpisode', {
                  title: episode.title,
                  santoonId: this.props.navigation.getParam('id'),
                  episodeId: episode.id,
                })
              }>
              <View key={i} style={styles.card}>
                <Image
                  source={{uri: validateImageUrl(episode.image)}}
                  style={{height: 80, width: 80}}
                />
                <View style={{marginLeft: 15, justifyContent: 'space-evenly'}}>
                  <Text style={robotoWeights.regular}>{episode.title}</Text>
                  <Text style={{fontSize: 12, color: '#bbb'}}>
                    {convertDate(new Date(episode.createdAt))}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      );
    } else if (!episodes.length) {
      renderContent = (
        <View style={styles.bottomContainer}>
          <Text style={{fontSize: 13, color: iOSColors.midGray}}>
            The creator not yet published any episode.
          </Text>
        </View>
      );
    }

    return <View style={styles.scrollViewContent}>{renderContent}</View>;
  };

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.fill}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
          ])}>
          {this.renderEpisodes()}
        </ScrollView>
        <Animated.View style={[styles.header, {height: headerHeight}]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                transform: [{translateY: imageTranslate}],
              },
            ]}
            source={{uri: this.props.navigation.getParam('image')}}
          />
          <View style={styles.bar}>
            <Icon
              name="md-arrow-back"
              size={25}
              style={{marginLeft: 15, color: '#fff'}}
              onPress={() => this.props.navigation.goBack()}
            />
            <Text style={styles.title}>
              {this.props.navigation.getParam('title')}
            </Text>
            <Icon
              name="md-share"
              size={25}
              style={{marginRight: 20, color: '#fff'}}
              onPress={() =>
                Share.share({
                  message: 'Webtoon aing yeuh!',
                })
              }
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  bar: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...robotoWeights.medium,
    color: iOSColors.white,
    fontSize: 20,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  card: {
    height: 80,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: iOSColors.lightGray2,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
  },
  bottomContainer: {
    flex: 1,
    width: dim.width,
    height: dim.height - (HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    episodes: state.toon.episodes,
    isLoading: state.toon.isLoading,
  };
};

export default connect(mapStateToProps)(DetailWebtoon);

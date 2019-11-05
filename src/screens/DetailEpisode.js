import React, {Component} from 'react';
import {Image, Dimensions, FlatList, Share} from 'react-native';
import {Icon} from 'native-base';
import axios from '../helpers/axios';
import {validateImageUrl} from '../helpers/validation';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

function Item({images, width, height}) {
  return (
    <Image
      source={{uri: images}}
      style={{width, height}}
      // resizeMode={width < height ? 'stretch' : 'center'}
    />
  );
}

export class DetailEpisode extends Component {
  state = {
    screenWidth: Width,
    screenHeight: Height,
    pages: [],
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: `${navigation.getParam('title')}`,
      headerStyle: {
        backgroundColor: '#3d3d3d',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerRight: (
        <Icon
          name="share"
          size={25}
          style={{marginRight: 15, color: '#fff'}}
          onPress={() =>
            Share.share({
              message: 'Webtoon aing yeuh!',
            })
          }
        />
      ),
    };
  };

  async componentDidMount() {
    const episodeId = this.props.navigation.getParam('episodeId');
    const santoonId = this.props.navigation.getParam('santoonId');

    // LOG
    // console.log('Printed from DetailEpisode.js');
    // console.log('episodeId:', episodeId);
    // console.log('santoonId:', santoonId, '\n');

    const {data} = await axios({
      method: 'GET',
      url: `/santoons/${santoonId}/episode/${episodeId}`,
    });

    this.setState({pages: data});
  }

  updateLayout = event => {
    const {width, height} = event.nativeEvent.layout;

    // LOG

    // console.log('width:', width);
    // console.log('height:', height);

    this.setState({
      screenWidth: width,
      screenHeight: height,
    });
  };

  render() {
    return (
      <FlatList
        contentContainerStyle={{backgroundColor: '#f0f0f0'}}
        data={this.state.pages}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Item
            images={validateImageUrl(item.image)}
            width={this.state.screenWidth}
            height={this.state.screenHeight}
          />
        )}
        onLayout={this.updateLayout}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default DetailEpisode;

import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import axios from '../helpers/axios';
import {FlatGrid} from 'react-native-super-grid';
import {iOSColors, robotoWeights} from 'react-native-typography';
import {validateImageUrl} from '../helpers/validation';

const dim = Dimensions.get('window');

export class Search extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: (
        <TextInput
          autoFocus={true}
          placeholder="Search manga"
          style={{marginLeft: 15, width: 200, fontSize: 18}}
          onChangeText={input => params.handleInput(input)}
        />
      ),
    };
  };

  state = {
    title: '',
    toons: [],
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleInput: this.handleInput,
    });
  }

  handleInput = input => {
    axios({
      method: 'GET',
      url: `/santoons?title=${input}`,
    }).then(({data}) => {
      if (!this.state.title) {
        this.setState({toons: []});
      } else {
        this.setState({toons: data});
      }
    });
    this.setState({title: input});
  };

  render() {
    const {toons} = this.state;
    if (!toons.length)
      return (
        <View style={{flex: 1, alignItems: 'center', marginTop:'30%'}}>
          <Image
            source={{
              uri:
                'https://static.zerochan.net/New.Danganronpa.V3.full.2197320.jpg',
            }}
            style={{width: 200, height: 200}}
          />
          <Text style={styles.textSearch}>You can search any toons by title.</Text>
        </View>
      );
    return (
      <FlatGrid
        itemDimension={130}
        items={toons}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({item, index}) => (
          <View style={styles.itemContainer}>
            <Image
              source={{uri: validateImageUrl(item.image)}}
              style={{
                flex: 1,
                width: undefined,
                height: undefined,
              }}
            />
            <Text style={styles.itemName}>{item.title}</Text>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
    marginTop: 20,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    width: 165,
    height: 150,
    overflow: 'hidden',
  },
  itemName: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600',
  },
  textSearch: {
    ...robotoWeights.light,
    marginTop: 10,
    color: iOSColors.gray
  }
});

export default Search;

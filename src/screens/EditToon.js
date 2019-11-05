import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import Dialog from 'react-native-dialog';
import axios from '../helpers/axios';

// Component
import {SmallHorizontalCard} from '../components/Card';
import {green, dark, lightGrey} from '../colorPallete';

// Redux
import {connect} from 'react-redux';
import {findMyCreationEpisodes} from '../redux/actions/creation';

const dim = Dimensions.get('window');

export class EditWebtoon extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerRight: (
        <Icon
          name="check"
          size={25}
          color="#009b00"
          style={{marginRight: 20}}
          onPress={params.handleUpdateToon}
        />
      ),
    };
  };

  state = {
    title: '',
    genre: '',
    image: '',
    confirmDelete: false,
  };

  componentDidMount() {
    const {navigation} = this.props;
    const title = navigation.getParam('title');
    const genre = navigation.getParam('genre');
    const image = navigation.getParam('image');
    this.setState({title, genre, image});

    // throw method to header navigation
    this.props.navigation.setParams({
      handleUpdateToon: this.handleUpdateToon,
    });
  }

  fetchMyEpisodes = () => {
    const {user, token} = this.props;
    const toonId = this.props.navigation.getParam('id');
    this.props.dispatch(findMyCreationEpisodes(user.id, toonId, token));
  };

  handleUploadImage = () => {
    ImagePicker.showImagePicker(response => {
      if (response.uri) {
        const dataImage = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };
        console.log(dataImage)

        this.setState({image: response.uri, dataImage});
      }
    });
  };

  handleUpdateToon = async () => {
    const toonId = this.props.navigation.getParam('id');
    const {user, token} = this.props;

    const data = new FormData();
    data.append('title', this.state.title);
    data.append('genre', this.state.genre);
    data.append('img', this.state.dataImage);

    try {
      const response = await axios({
        method: 'PUT',
        url: `/user/${user.id}/santoon/${toonId}`,
        data,
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

      if (response.status == 200) {
        this.props.navigation.pop();
      }
    } catch (error) {
      // feedback error
      console.log(error.response, '=> error update toon');
    }
  };

  handleDeleteToon = async toonId => {
    const {user, token} = this.props;

    try {
      const response = await axios({
        method: 'DELETE',
        url: `/user/${user.id}/santoon/${toonId}`,
        headers: {
          Authorization: token,
        },
      });
      if (response.status == 200) {
        this.setState({confirmDelete: false});
        this.props.navigation.pop();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  navigateAddEpisode = () => {
    const toonId = this.props.navigation.getParam('id');
    this.props.navigation.navigate('CreateEpisode', {
      toonId: toonId
    })
  }

  renderHeader() {
    const toonId = this.props.navigation.getParam('id');
    return (
      <View style={{flex: 1}}>
        <Text style={styles.textTitle}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={this.state.title}
          onChangeText={input => this.setState({title: input})}
        />

        <Text style={styles.textTitle}>Genre</Text>
        <TextInput
          style={styles.textInput}
          value={this.state.genre}
          onChangeText={input => this.setState({genre: input})}
        />

        <Text style={styles.textTitle}>Cover Image</Text>
        <TouchableWithoutFeedback onPress={this.handleUploadImage}>
          <View style={styles.coverContainer}>
            {!this.state.image ? (
              <>
                <Icon name="photo" size={40} color={dark} />
                <Text style={{fontSize: 13, color: dark, marginTop: 10}}>
                  Select Image
                </Text>
              </>
            ) : (
              <Image
                source={{uri: this.state.image}}
                style={{height: 200, width: dim.width}}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
        <Text style={[styles.textTitle, {marginBottom: 10}]}>
          List(s) Episode
        </Text>
        <View>
          <Dialog.Container visible={this.state.confirmDelete}>
            <Dialog.Title>Manga delete</Dialog.Title>
            <Dialog.Description>
              Do you want to delete this manga? You cannot undo this action.
            </Dialog.Description>
            <Dialog.Button
              label="Cancel"
              onPress={() => this.setState({confirmDelete: false})}
            />
            <Dialog.Button
              label="Delete"
              onPress={() => this.handleDeleteToon(toonId)}
            />
          </Dialog.Container>
        </View>
      </View>
    );
  }

  render() {
    const {navigation, myCreationEpisodes} = this.props;
    const toonId = this.props.navigation.getParam('id');
    return (
      <View style={styles.mainContainer}>
        <NavigationEvents onWillFocus={this.fetchMyEpisodes} />
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader()}
          data={myCreationEpisodes}
          renderItem={({item}) => (
            <SmallHorizontalCard
              data={item}
              navigation={navigation}
              route="EditEpisode"
              text=""
              toonId={toonId}
            />
          )}
          keyExtractor={item => String(item.id)}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            style={[styles.button, {flex: 1}]}
            onPress={this.navigateAddEpisode}>
            <Text style={styles.btnText}>+ Add Episode</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, {flex: 1, backgroundColor: dark}]}
            onPress={() => this.setState({confirmDelete: true})}>
            <Text style={styles.btnText}>Delete Manga</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  textTitle: {
    fontSize: 15,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  textInput: {
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: lightGrey,
    height: 40,
  },
  coverContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#bbb',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  button: {
    backgroundColor: green,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
});

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    myCreationEpisodes: state.creation.myCreationEpisodes,
    isLoading: state.creation.isLoading,
  };
};

export default connect(mapStateToProps)(EditWebtoon);

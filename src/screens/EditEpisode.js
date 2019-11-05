import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import Dialog from 'react-native-dialog';
import Modal from 'react-native-modal';
import axios from '../helpers/axios';

// Components
import {SmallHorizontalCard} from '../components/Card';
import {green, dark, lightGrey} from '../colorPallete';

// Redux
import {connect} from 'react-redux';
import {
  findCreationPages,
  addEpisodePage,
  removePage,
} from '../redux/actions/creation';

const dim = Dimensions.get('window');

export class CreateEpisode extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerRight: (
        <Icon
          name="check"
          size={25}
          color="#009b00"
          style={{marginRight: 20}}
          onPress={params.handleUpdateEpisode}
        />
      ),
    };
  };

  state = {
    title: '',
    image: '',
    dataImageEpisode: null,
    //page
    page: '',
    imagePage: '',
    dataImagePage: null,
    // flag
    confirmDelete: false,
    isModalVisible: false,
  };

  componentDidMount() {
    const {navigation} = this.props;
    const title = navigation.getParam('title');
    const image = navigation.getParam('image');
    this.setState({title, image});

    // throw method to header navigation
    this.props.navigation.setParams({
      handleUpdateEpisode: this.handleUpdateEpisode,
    });
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      imagePage: '',
      page: '',
    });
  };

  fetchMyPages = () => {
    const {user, token, navigation} = this.props;
    const episodeId = navigation.getParam('id');
    const toonId = navigation.getParam('toonId');

    const credentials = {
      token,
      userId: user.id,
      episodeId,
      toonId,
    };

    this.props.dispatch(findCreationPages(credentials));
  };

  handleEditImageEpisode = () => {
    ImagePicker.showImagePicker(response => {
      if (response.uri) {
        const dataImageEpisode = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };

        this.setState({image: response.uri, dataImageEpisode});
      }
    });
  };

  handleUpdateEpisode = async () => {
    const episodeId = this.props.navigation.getParam('id');
    const toonId = this.props.navigation.getParam('toonId');
    const {user, token} = this.props;

    const data = new FormData();
    data.append('title', this.state.title);
    data.append('img', this.state.dataImageEpisode);

    try {
      const response = await axios({
        method: 'PUT',
        url: `/user/${user.id}/santoon/${toonId}/episode/${episodeId}`,
        data,
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status == 200) {
        this.props.navigation.pop();
      }
    } catch (error) {
      console.log(error.response, '====>');
    }
  };

  handleDeleteEpisode = async episodeId => {
    const {user, token, navigation} = this.props;
    const toonId = navigation.getParam('toonId');

    try {
      const response = await axios({
        method: 'DELETE',
        url: `/user/${user.id}/santoon/${toonId}/episode/${episodeId}`,
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
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

  handleImagePage = () => {
    ImagePicker.showImagePicker(response => {
      if (response.uri) {
        const dataImagePage = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };

        this.setState({imagePage: response.uri, dataImagePage});
      }
    });
  };

  handleAddPage = () => {
    const episodeId = this.props.navigation.getParam('id');
    const toonId = this.props.navigation.getParam('toonId');
    const {user, token} = this.props;

    const data = new FormData();
    data.append('page', this.state.page);
    data.append('img', this.state.dataImagePage);

    const credentials = {
      userId: user.id,
      token,
      toonId,
      episodeId,
    };

    console.log(credentials, 'credentials ====>');
    console.log(data, 'data to be uploaded ======>');

    this.props.dispatch(addEpisodePage(credentials, data));
    this.toggleModal();
  };

  handleDeletePage = pageId => {
    const episodeId = this.props.navigation.getParam('id');
    const toonId = this.props.navigation.getParam('toonId');
    const {user, token} = this.props;

    const credentials = {
      userId: user.id,
      token,
      toonId,
      episodeId,
      pageId,
    };

    this.props.dispatch(removePage(credentials));
  };

  renderHeader() {
    const episodeId = this.props.navigation.getParam('id');
    return (
      <View style={{flex: 1}}>
        <Text style={styles.textTitle}>Title</Text>
        <TextInput
          value={this.state.title}
          style={styles.textInput}
          onChangeText={input => this.setState({title: input})}
        />

        <Text style={styles.textTitle}>Cover Image</Text>
        <TouchableWithoutFeedback onPress={this.handleEditImageEpisode}>
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
        <Text style={[styles.textTitle, {marginBottom: 10}]}>List(s) Page</Text>
        <View>
          <Dialog.Container visible={this.state.confirmDelete}>
            <Dialog.Title>Episode delete</Dialog.Title>
            <Dialog.Description>
              Do you want to delete this episode? You cannot undo this action.
            </Dialog.Description>
            <Dialog.Button
              label="Cancel"
              onPress={() => this.setState({confirmDelete: false})}
            />
            <Dialog.Button
              label="Delete"
              onPress={() => this.handleDeleteEpisode(episodeId)}
            />
          </Dialog.Container>
        </View>
      </View>
    );
  }

  renderModal() {
    return (
      <View style={{flex: 1}}>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={this.toggleModal}>
          <View
            style={{
              flex: 0.8,
              padding: 10,
              backgroundColor: 'white',
              overflow: 'hidden',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback onPress={this.handleImagePage}>
              <View style={styles.modalContainer}>
                {!this.state.imagePage ? (
                  <>
                    <Icon name="photo" size={30} color={dark} />
                    <Text style={{fontSize: 13, color: dark, marginTop: 10}}>
                      Select Image
                    </Text>
                  </>
                ) : (
                  <Image
                    source={{uri: this.state.imagePage}}
                    style={{height: 400, width: 200}}
                    resizeMode="stretch"
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
            <View>
              <Text style={[styles.textTitle, {marginLeft: 5}]}>Page</Text>
              <TextInput
                style={[styles.textInput, {width: 40}]}
                onChangeText={input => this.setState({page: input})}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                style={[styles.modalButton, {backgroundColor: green}]}
                onPress={this.handleAddPage}>
                <Text style={{color: 'white'}}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={this.toggleModal}>
                <Text style={{color: 'white'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  render() {
    const {navigation, pages} = this.props;
    return (
      <View style={styles.mainContainer}>
        <NavigationEvents onWillFocus={this.fetchMyPages} />
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader()}
          data={pages}
          renderItem={({item}) => {
            console.log(item);
            return (
              <SmallHorizontalCard
                data={item}
                navigation={navigation}
                button={true}
                eventTrigger={this.handleDeletePage}
              />
            );
          }}
          keyExtractor={item => String(item.id)}
        />
        {this.renderModal()}
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            style={[styles.button, {flex: 1}]}
            onPress={this.toggleModal}>
            <Text style={styles.btnText}> + Pages </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, {flex: 1, backgroundColor: dark}]}
            onPress={() => this.setState({confirmDelete: true})}>
            <Text style={styles.btnText}>Delete Episode</Text>
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
  modalContainer: {
    flex: 2,
    marginTop: 20,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 200,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: green,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  modalButton: {
    width: 100,
    height: 40,
    borderRadius: 5,
    backgroundColor: dark,
    marginHorizontal: 20,
    padding: 10,
    alignItems: 'center',
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
    pages: state.creation.myCreationPages,
    isLoading: state.creation.isLoading,
  };
};

export default connect(mapStateToProps)(CreateEpisode);

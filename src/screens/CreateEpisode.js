import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import axios from '../helpers/axios';
import {green, dark, lightGrey} from '../colorPallete';

// Redux
import {connect} from 'react-redux';

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
          onPress={params.handleCreateEpisode}
        />
      ),
    };
  };

  state = {
    title: '',
    image: '',
    dataImage: null,
  };

  componentDidMount() {
    // throw method to header navigation
    this.props.navigation.setParams({
      handleCreateEpisode: this.handleCreateEpisode,
    });
  }

  handleUploadImage = () => {
    ImagePicker.showImagePicker(response => {
      if (response.uri) {
        const dataImage = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };

        this.setState({image: response.uri, dataImage});
      }
    });
  };

  handleCreateEpisode = async () => {
    const {user, token} = this.props;
    const toonId = this.props.navigation.getParam('toonId');

    const data = new FormData();
    data.append('title', this.state.title);
    data.append('img', this.state.dataImage);

    try {
      const response = await axios({
        method: 'POST',
        url: `/user/${user.id}/santoon/${toonId}/episode`,
        data,
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status == 201) {
        this.props.navigation.pop();
        this.setState({
          title: '',
          image: '',
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={input => this.setState({title: input})}
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
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
  },
});

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(CreateEpisode);

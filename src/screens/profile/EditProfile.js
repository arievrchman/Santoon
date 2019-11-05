import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {URI} from 'react-native-dotenv';

// Component
import Picture from '../../components/Picture';

// Redux
import {connect} from 'react-redux';
import {updateUser} from '../../redux/actions/auth';

export class EditProfile extends Component {
  state = {
    name: '',
    image: '',
    dataImage: null,
  };

  componentDidMount() {
    const {user} = this.props;
    this.setState({
      name: user.name,
      image: URI + user.imageUrl,
    });
  }

  handleImagePicker = () => {
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

  handleUpload = () => {
    const token = this.props.token;
    const userId = this.props.user.id;

    // Data to be Upload
    const data = new FormData();
    data.append('name', this.state.name);
    if (this.state.dataImage) data.append('img', this.state.dataImage);

    // Dispatch event to userAction
    this.props.dispatch(updateUser(userId, token, data));

    // If request success, go back in the stack
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={{fontSize: 18}}>Edit Profile</Text>
          <Icon
            name="check"
            size={25}
            color="#009b00"
            onPress={this.handleUpload}
          />
        </View>
        <View style={styles.profile}>
          <Picture image={this.state.image} />
          <View style={styles.camera}>
            <Icon name="camera" size={20} onPress={this.handleImagePicker} />
          </View>
          <TextInput
            style={styles.nameInput}
            placeholder="Your Name"
            value={this.state.name}
            onChangeText={input => this.setState({name: input})}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    elevation: 2,
  },
  profile: {
    flex: 1,
    paddingVertical: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  camera: {
    padding: 5,
    borderRadius: 30,
    marginTop: -40,
    marginLeft: 110,
    backgroundColor: '#fff',
  },
  nameInput: {
    width: 300,
    height: 40,
    paddingHorizontal: 15,
    marginVertical: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
});

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(EditProfile);

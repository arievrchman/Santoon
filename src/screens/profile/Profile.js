import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {robotoWeights, iOSColors} from 'react-native-typography';
import {URI} from 'react-native-dotenv';
import {dark} from '../../colorPallete';

// Component
import Picture from '../../components/Picture';

// Redux
import {connect} from 'react-redux';
import {logout} from '../../redux/actions/auth';

export class Profile extends Component {
  static navigationOptions = () => {
    return {
      title: 'Profile',
      headerTintColor: dark,
    };
  };

  handleLogout = () => {
    this.props.dispatch(logout());
    if (this.props.isLogin) {
      this.props.navigation.navigate('Welcome');
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  validationLogin() {
    if (this.props.isLogin) {
      this.props.navigation.navigate('MyCreation');
    } else {
      return ToastAndroid.showWithGravity(
        `You should login to create your own manga.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  }

  render() {
    const {user, isLogin, navigation} = this.props;
    const name = navigation.getParam('name');
    const image = navigation.getParam('image');
    return (
      <View style={{flex: 1}}>
        <View style={styles.profile}>
          <Picture
            image={user.imageUrl ? URI + user.imageUrl : user.imageUrl}
          />
          <Text style={styles.yourName}>
            {isLogin ? user.name : 'No Account'}
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          {isLogin && (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('EditProfile', {
                  name,
                  image,
                })
              }>
              <View style={styles.content}>
                <Icon name="gear" color={dark} size={25} />
                <Text style={styles.textContent}>Edit Profile</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          <TouchableWithoutFeedback onPress={() => this.validationLogin()}>
            <View
              style={styles.content}>
              <Icon name="book" color={dark} size={25} />
              <Text style={styles.textContent}>My Webtoon Creation</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.handleLogout()}>
            <View style={styles.content}>
              <Icon name="user" color={dark} size={25} />
              <Text style={[styles.textContent]}>
                {isLogin ? 'Logout' : 'Login'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  yourName: {
    ...robotoWeights.light,
    color: dark,
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  profile: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: iOSColors.white,
    borderColor: '#ddd',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  profileImage: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  content: {
    padding: 10,
    height: 50,
    flexDirection: 'row',
    width: '80%',
    borderColor: iOSColors.midGray,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  textContent: {
    ...robotoWeights.light,
    alignSelf: 'center',
    marginLeft: 20,
    fontWeight: 'bold',
    color: dark,
  },
});

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Profile);

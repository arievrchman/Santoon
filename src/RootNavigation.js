import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import {lightGrey} from './colorPallete';
import {iOSColors} from 'react-native-typography';

// Splash Screen
import SplashScreen from './screens/SplashScreen';

// Auth Route
import Welcome from './screens/auth/Welcome';
import Login from './screens/auth/Login';

// Public Route
import ForYou from './screens/ForYou';
import Favorite from './screens/Favorite';
import DetailToon from './screens/DetailToon';
import DetailEpisode from './screens/DetailEpisode';
import Search from './screens/Search';

// Profile Stack
import Profile from './screens/profile/Profile';
import EditProfile from './screens/profile/EditProfile';

// User Creation
import MyCreation from './screens/MyCreation';
import CreateToon from './screens/CreateToon';
import CreateEpisode from './screens/CreateEpisode';
import EditToon from './screens/EditToon';
import EditEpisode from './screens/EditEpisode';

const AuthStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

const ProfileNavigation = createStackNavigator({
  Profile: Profile,
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      header: null,
    },
  },
});

const BottomNavigation = createBottomTabNavigator(
  {
    ForYou: {
      screen: ForYou,
      navigationOptions: {
        tabBarLabel: 'For You',
        tabBarIcon: ({tintColor}) => (
          <Icon name="th-large" color={tintColor} size={25} />
        ),
      },
    },
    Favorite: {
      screen: Favorite,
      navigationOptions: {
        tabBarLabel: 'Favorites',
        tabBarIcon: ({tintColor}) => (
          <Icon name="heart" color={tintColor} size={25} />
        ),
      },
    },
    Profile: {
      screen: ProfileNavigation,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <Icon name="user" color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: iOSColors.green,
      inactiveTintColor: lightGrey,
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        borderTopColor: 'black',
        elevation: 6,
        paddingTop: 10,
      },
    },
  },
);

const StackNavigation = createStackNavigator({
  BottomNavigation: {
    screen: BottomNavigation,
    navigationOptions: {
      header: null,
    },
  },
  Search: {
    screen: Search,
  },
  DetailToon: {
    screen: DetailToon,
    navigationOptions: {
      header: null,
    },
  },
  DetailEpisode: {
    screen: DetailEpisode,
  },
  Search: {
    screen: Search,
  },
  MyCreation: {
    screen: MyCreation,
    navigationOptions: {
      title: 'My Creation',
    },
  },
  CreateToon: {
    screen: CreateToon,
    navigationOptions: {
      title: 'Create New Toon',
    },
  },
  CreateEpisode: {
    screen: CreateEpisode,
    navigationOptions: {
      title: 'Create Episode',
    },
  },
  EditToon: {
    screen: EditToon,
    navigationOptions: {
      title: 'Edit Toon',
    },
  },
  EditEpisode: {
    screen: EditEpisode,
    navigationOptions: {
      title: 'Edit Episode',
    },
  },
});

const RootNavigation = createSwitchNavigator({
  SplashScreen: SplashScreen,
  AuthStack: AuthStack,
  StackNavigation: StackNavigation,
});

export default createAppContainer(RootNavigation);

import React, {Component} from 'react';
import {ScrollView, YellowBox, ToastAndroid} from 'react-native';
import {Content, Container} from 'native-base';
import {NavigationEvents} from 'react-navigation';

// Components
import Banner from '../components/Banner';
import Favorite from '../components/Favorite';
import AllToons from '../components/AllToons';
import Loading from '../hoc/Loading';

// Redux
import {compose} from 'redux';
import {connect} from 'react-redux';
import {findAllToons, handleFavorite} from '../redux/actions/toon';

// Ignore Yellow Warnings
YellowBox.ignoreWarnings(['Warning: ']);

export class ForYou extends Component {
  fetchAllToons = () => {
    const token = this.props.token;
    this.props.dispatch(findAllToons(token));
  };

  handleFavorite = (status, id) => {
    const request = status ? 'DELETE' : 'POST';
    const message = status
      ? 'Removed from Favorite list.'
      : 'Added to Favorite list.';
    const {token, isLogin} = this.props;

    if (!isLogin) {
      return ToastAndroid.showWithGravity(
        `Please login to add to your favorite lists.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    this.props.dispatch(handleFavorite(id, request, token));
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  render() {
    const {navigation, santoons, isLogin} = this.props;
    return (
      <Container style={{flex: 1, backgroundColor: '#fff'}}>
        <NavigationEvents onWillFocus={this.fetchAllToons} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Content>
            <Banner santoons={santoons} navigation={this.props.navigation} />
          </Content>
          <Content>
            {isLogin && (
              <Favorite
                navigation={navigation}
                favorites={this.props.favorites}
              />
            )}
            <AllToons
              navigation={navigation}
              handleFavorite={this.handleFavorite}
              santoons={santoons}
            />
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    token: state.auth.token,
    santoons: state.toon.santoons,
    favorites: state.toon.favorites,
    isLoading: state.toon.isLoading,
  };
};

export default compose(
  connect(mapStateToProps),
  Loading,
)(ForYou);

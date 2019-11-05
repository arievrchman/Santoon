import React, {PureComponent} from 'react';
import {Text, View, FlatList, StyleSheet, Image} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {iOSColors, robotoWeights} from 'react-native-typography';

// Redux
import {compose} from 'redux';
import {connect} from 'react-redux';
import {findMyFavorites} from '../redux/actions/toon';

// Components
import Loading from '../hoc/Loading';
import SearchBar from '../components/SearchBar';
import {SmallHorizontalCard} from '../components/Card';

export class Favourite extends PureComponent {
  fetchData = () => {
    const token = this.props.token;
    this.props.dispatch(findMyFavorites(token));
  };

  handleSearch = async title => {
    console.log(title);
    // const token = await AsyncStorage.getItem('token');
    // const {data} = await axios({
    //   method: 'GET',
    //   url: `/santoons?is_favorite=true&title=${title}`,
    //   headers: {
    //     Authorization: token,
    //   },
    // });
    // this.setState({favorites: data});
  };

  render() {
    const {navigation, favorites, isLogin} = this.props;

    let renderContent;
    if (favorites.length) {
      renderContent = (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <SmallHorizontalCard
              data={item}
              navigation={navigation}
              text="Favorite(s)"
              route="DetailWebtoon"
            />
          )}
          keyExtractor={item => item.title}
        />
      );
    } else {
      let uri = isLogin
        ? 'https://i-love-png.com/images/719591.png'
        : 'https://media.giphy.com/media/yfEnQ0yTIXXiM/giphy.gif';
      renderContent = (
        <View style={styles.emptyContainer}>
          <Image
            source={{uri}}
            style={{
              width: 250,
              height: 250,
            }}
          />
          <Text style={styles.emptyText}>
            {isLogin
              ? `You don't have any favorited toon.`
              : `You should login first to list your favorite manga.`}
          </Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <NavigationEvents onWillFocus={this.fetchData} />
        <SearchBar handleSearch={this.handleSearch} />
        {renderContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 25,
  },
  emptyText: {
    ...robotoWeights.light,
    marginTop: 15,
    color: iOSColors.gray,
  },
});

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    token: state.auth.token,
    favorites: state.toon.favorites,
    isLoading: state.toon.isLoading,
  };
};

export default compose(
  connect(mapStateToProps),
  Loading,
)(Favourite);

import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {green} from '../colorPallete';

// Component
import {SmallHorizontalCard} from '../components/Card';
import Loading from '../hoc/Loading';

// Redux
import {compose} from 'redux';
import {connect} from 'react-redux';
import {findMyCreations} from '../redux/actions/creation';

export class MyWebtoon extends Component {
  fetchMyCreations = () => {
    const {user, token} = this.props;
    this.props.dispatch(findMyCreations(user.id, token));
  };

  render() {
    const {navigation, myCreations} = this.props;
    return (
      <View style={{flex: 1}}>
        <NavigationEvents onWillFocus={this.fetchMyCreations} />
        <FlatList
          contentContainerStyle={{marginTop: 20}}
          data={myCreations}
          renderItem={({item}) => (
            <SmallHorizontalCard
              data={item}
              navigation={navigation}
              text="Episode(s)"
              route="EditToon"
            />
          )}
          keyExtractor={item => String(item.id)}
        />
        <View style={styles.iconContainer}>
          <Icon
            name="plus-circle"
            size={60}
            color={green}
            onPress={() => this.props.navigation.navigate('CreateToon')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    width: 60,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    myCreations: state.creation.myCreations,
    isLoading: state.creation.isLoading,
  };
};

export default compose(
  connect(mapStateToProps),
  Loading,
)(MyWebtoon);

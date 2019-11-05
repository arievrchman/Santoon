import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import trunc from '../helpers/trunc';
import {validateImageUrl} from '../helpers/validation';
import {robotoWeights, iOSColors} from 'react-native-typography';

function VerticalCard({navigation, favorite, checker}) {
  let rightMargin = checker.index == checker.length - 1 ? 10 : 0;
  const image = validateImageUrl(favorite.image);
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('DetailToon', {
          id: favorite.id,
          title: favorite.title,
          image: image,
          genre: favorite.genre,
        })
      }>
      <View style={[styles.favCard, {marginRight: rightMargin}]}>
        <Image source={{uri: image}} style={styles.imageSize} />
        <Text style={styles.favTitleText}>{trunc(favorite.title)}</Text>
        <Text style={styles.favSubText}>{favorite.author}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

class Favourite extends Component {
  state = {
    favorites: null,
  };

  render() {
    const {favorites} = this.props;
    const len = favorites ? favorites.length : null;

    let renderContent;

    if (favorites.length) {
      renderContent = (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {favorites
            ? favorites.map((favorite, idx) => (
                <VerticalCard
                  key={favorite.id}
                  favorite={favorite}
                  checker={{index: idx, length: len}}
                  navigation={this.props.navigation}
                />
              ))
            : null}
        </ScrollView>
      );
    } else {
      renderContent = (
        <View
          style={[
            styles.favCard,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={[styles.favSubText, {textAlign: 'center'}]}>
            You don't have any favorited toon.
          </Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <Text style={styles.textTitle}>Your Favorites</Text>
        {renderContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textTitle: {
    ...robotoWeights.medium,
    fontSize: 18,
    padding: 10,
  },
  imageSize: {
    width: 140,
    height: 130,
  },
  favCard: {
    marginLeft: 10,
    width: 140,
    height: 190,
    borderWidth: 0.5,
    borderColor: iOSColors.lightGray,
    borderRadius: 5,
    overflow: 'hidden',
  },
  favTitleText: {
    ...robotoWeights.bold,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  favSubText: {
    ...robotoWeights.light,
    fontSize: 12,
    marginTop: 5,
    paddingHorizontal: 10,
    color: iOSColors.gray,
  },
});

export default Favourite;

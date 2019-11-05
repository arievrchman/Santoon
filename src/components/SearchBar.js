import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

// Color pallete
import { green, lightGrey } from '../colorPallete';

class SearchBar extends PureComponent {
  state = {
    input: '',
  }

  handleOnChangeText = input => {
    this.setState({ input });
  }

  handleOnSearchSubmit() {
    const input = this.state.input;
    this.props.handleSearch(input);
    this.setState({ input: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <Input
            placeholder="Search"
            value={this.state.input}
            style={{fontSize: 13}}
            onChangeText={this.handleOnChangeText}
            returnKeyLabel="done"
          />
          <Icon
            name="search"
            style={styles.searchIcon}
            onPress={this.handleOnSearchSubmit.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  searchWrapper: {
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: lightGrey,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  searchIcon: {
    fontSize: 28,
    color: green,
  },
});

export default SearchBar;

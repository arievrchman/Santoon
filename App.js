import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import FlashMessage from 'react-native-flash-message';

import RootNavigation from './src/RootNavigation';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigation />
          <FlashMessage position="bottom" />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

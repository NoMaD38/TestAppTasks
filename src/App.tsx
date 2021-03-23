import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import AppContainer from './app/AppContainer';
import { enableScreens } from 'react-native-screens';
import store from './store/store';
import PrimaryTheme from './styles/primary-theme';

enableScreens();

const theme = {
  ...PrimaryTheme,
};

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <AppContainer />
        </PaperProvider>
      </StoreProvider>
    );
  }
}

export default App;

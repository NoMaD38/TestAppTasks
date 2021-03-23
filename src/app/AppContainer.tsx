import React, { Component } from 'react';
import { View } from 'react-native';
import MainStack from '../navigation/StackNavigation';
import { checkAccessToken } from '../utils/utils';
import { styles } from './style';

export default class AppContainer extends Component {
  public componentDidMount(): void {
    checkAccessToken();
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <MainStack />
      </View>
    );
  }
}

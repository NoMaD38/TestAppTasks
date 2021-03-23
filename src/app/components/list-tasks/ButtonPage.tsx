import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './style';

interface IProps {
  currentPage: number;
  page: number;
  disabled: boolean;
  changePage: (page: number) => void;
}

export default class ButtonPage extends React.PureComponent<IProps> {
  render(): JSX.Element {
    const { page, currentPage, disabled, changePage } = this.props;
    const equal = currentPage === page;
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => changePage(page)}
        style={[
          styles.button__page,
          equal ? styles.button__page__active : styles.button__page__inactive,
        ]}
      >
        <Text
          style={[
            styles.button__page__text,
            equal ? styles.button__page__text__inactive : styles.button__page__text__active,
          ]}
        >
          {page}
        </Text>
      </TouchableOpacity>
    );
  }
}

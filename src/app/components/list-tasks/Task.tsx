import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import COLORS from '../../../constants/color';
import { styles } from './style';
import { StackNavigationProp } from '@react-navigation/stack';
import { SortDirectionEnum, SortFieldEnum } from '../../../utils/Api';
import { RootParamList } from '../../../navigation/StackNavigation';

interface IProps {
  navigation: StackNavigationProp<RootParamList, 'ListTasks'>;
  id: number;
  email: string;
  status: number;
  text: string;
  username: string;
  isEdit: boolean;
  data: {
    page: number;
    sortDirection: SortDirectionEnum | undefined;
    sortField: SortFieldEnum | undefined;
  };
}

export enum StatusTaskEnum {
  NOTEXECUTED = 0,
  NOTEXECUTEDADMIN = 1,
  EXECUTED = 10,
  EXECUTEDADMIN = 11,
}

export enum TextStatusEnum {
  NOTEXECUTED = 'задача не выполнена',
  NOTEXECUTEDADMIN = 'задача не выполнена, отредактирована админом',
  EXECUTED = 'задача выполнена',
  EXECUTEDADMIN = 'задача отредактирована админом и выполнена',
}

export default class Task extends React.PureComponent<IProps> {
  private statusTask(status: number) {
    switch (status) {
      case StatusTaskEnum.NOTEXECUTED:
        return TextStatusEnum.NOTEXECUTED;
      case StatusTaskEnum.NOTEXECUTEDADMIN:
        return TextStatusEnum.NOTEXECUTEDADMIN;
      case StatusTaskEnum.EXECUTED:
        return TextStatusEnum.EXECUTED;
      case StatusTaskEnum.EXECUTEDADMIN:
        return TextStatusEnum.EXECUTEDADMIN;
    }
  }

  render(): JSX.Element {
    const { status, username, email, text, id, navigation, isEdit, data } = this.props;
    return (
      <View style={styles.wrapper__task}>
        {isEdit && (
          <TouchableOpacity
            style={styles.button__edit__task}
            onPress={() => navigation.navigate('ChangeTask', { id, text, status, data })}
          >
            <Icon type="ionicon" name="create-outline" size={20} color={COLORS.PRIMARY} />
          </TouchableOpacity>
        )}
        <View style={styles.wrapper__text}>
          <Text style={[styles.task__common__text, styles.task__color__text]}>
            {this.statusTask(status)}
          </Text>
        </View>
        <View style={styles.wrapper__text}>
          <Text style={styles.task__text}>{text}</Text>
        </View>
        <Text numberOfLines={1} style={styles.task__common__text}>
          Пользователь: {username}
        </Text>
        <Text numberOfLines={1} style={[styles.task__common__text, styles.task__color__text]}>
          {email}
        </Text>
      </View>
    );
  }
}

import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import COLORS from '../../../constants/color';
import { CustomHeader } from '../common/custom-header/CustomHeader';
import { Input } from 'react-native-elements';
import { StatusTaskEnum, TextStatusEnum } from '../list-tasks/Task';
import { Picker } from '@react-native-picker/picker';
import { styles } from './style';
import { ErrorEnum } from '../create-task/CreateTask';
import Utils, { handleChangeTask } from '../../../utils/utils';
import { SortDirectionEnum, SortFieldEnum } from '../../../utils/Api';
import { StatusMessageEnum } from '../../../utils/auth-service';
import { RootParamList } from '../../../navigation/StackNavigation';

interface IRoteParams {
  params: {
    id: number;
    status: StatusTaskEnum;
    text: string;
    data: {
      page: number;
      sortDirection: SortDirectionEnum;
      sortField: SortFieldEnum;
    };
  };
}

interface IProps {
  navigation: StackNavigationProp<RootParamList, 'CreateTask'>;
  route: IRoteParams;
}

interface IState {
  status: StatusTaskEnum;
  text: string;
  textError: string;
  saveStatus: boolean;
  commonError: string;
}

export default class ChangeTask extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      status: props.route.params.status,
      text: props.route.params.text,
      textError: '',
      commonError: '',
      saveStatus: false,
    };
  }

  private async onChangeTask() {
    this.setState({ saveStatus: true });
    const { text, status } = this.state;
    const textTrim = text.trim();
    const textTrimLength = textTrim.length;
    if (!textTrimLength) {
      this.setState({ textError: ErrorEnum.ERRORTEXT });
    } else if (
      textTrim !== this.props.route.params.text ||
      this.props.route.params.status !== status
    ) {
      let newStatus;
      if (textTrim !== this.props.route.params.text) {
        if (status === StatusTaskEnum.EXECUTED) {
          newStatus = StatusTaskEnum.EXECUTEDADMIN;
        } else {
          newStatus = StatusTaskEnum.NOTEXECUTEDADMIN;
        }
      } else if (
        this.props.route.params.status === StatusTaskEnum.EXECUTEDADMIN ||
        this.props.route.params.status === StatusTaskEnum.NOTEXECUTEDADMIN
      ) {
        if (status === StatusTaskEnum.EXECUTED) {
          newStatus = StatusTaskEnum.EXECUTEDADMIN;
        } else {
          newStatus = StatusTaskEnum.NOTEXECUTEDADMIN;
        }
      } else {
        newStatus = status;
      }
      const res = await handleChangeTask({
        text,
        status: newStatus,
        id: this.props.route.params.id,
      });
      if (res.status === StatusMessageEnum.OK) {
        const { page, sortDirection, sortField } = this.props.route.params.data;
        Utils.saveList(page, sortField, sortDirection);
        this.props.navigation.goBack();
      } else {
        res?.error && this.setState({ commonError: res.error });
      }
    } else if (
      textTrim === this.props.route.params.text &&
      this.props.route.params.status === status
    ) {
      this.props.navigation.goBack();
    }
    this.setState({ saveStatus: false });
  }

  render(): JSX.Element {
    const { navigation } = this.props;
    const { status, text, textError, saveStatus, commonError } = this.state;
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Редактировать задачу"
          rightIcon="save-outline"
          rightIconColor={COLORS.PRIMARY}
          onRightPress={() => this.onChangeTask()}
          rightButtonLoading={saveStatus}
          leftIcon="arrow-back-outline"
          leftIconColor={COLORS.PRIMARY}
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.wrapper__form}>
          <Text>Статус</Text>
          <View style={styles.wrapper__picker}>
            <Picker
              selectedValue={status}
              onValueChange={(itemValue) => this.setState({ status: itemValue })}
            >
              <Picker.Item
                label={TextStatusEnum.NOTEXECUTED}
                value={
                  status === StatusTaskEnum.NOTEXECUTEDADMIN
                    ? StatusTaskEnum.NOTEXECUTEDADMIN
                    : StatusTaskEnum.NOTEXECUTED
                }
              />
              <Picker.Item
                label={TextStatusEnum.EXECUTED}
                value={
                  status === StatusTaskEnum.EXECUTEDADMIN
                    ? StatusTaskEnum.EXECUTEDADMIN
                    : StatusTaskEnum.EXECUTED
                }
              />
            </Picker>
          </View>
          <Input
            placeholder="Текст"
            value={text}
            onChangeText={(text) => this.setState({ text })}
            errorMessage={textError ? textError : undefined}
          />
          {!!commonError && <Text style={styles.common__error}>{commonError}</Text>}
        </View>
      </View>
    );
  }
}

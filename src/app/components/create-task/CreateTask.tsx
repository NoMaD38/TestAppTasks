import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import COLORS from '../../../constants/color';
import { CustomHeader } from '../common/custom-header/CustomHeader';
import { Input } from 'react-native-elements';
import { styles } from './styles';
import { StatusMessageEnum } from '../../../utils/auth-service';
import Utils, { handleCreateTask } from '../../../utils/utils';
import { SortDirectionEnum, SortFieldEnum } from '../../../utils/Api';
import { RootParamList } from '../../../navigation/StackNavigation';

interface IRoteParams {
  params: {
    data: {
      page: number;
      sortDirection: SortDirectionEnum | undefined;
      sortField: SortFieldEnum | undefined;
    };
    hideSuccessModal: () => void;
  };
}

interface IProps {
  navigation: StackNavigationProp<RootParamList, 'CreateTask'>;
  route: IRoteParams;
}

interface IState {
  username: string;
  email: string;
  text: string;
  usernameError: string;
  emailError: string;
  textError: string;
  commonError: string;
  saveStatus: boolean;
}

export enum ErrorEnum {
  ERRORUSERNAME = 'Некорректный username',
  ERROREMAIL = 'Некорректный email',
  ERRORTEXT = 'Некорректный текст',
}

export default class CreateTask extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: '',
      email: '',
      text: '',
      usernameError: '',
      emailError: '',
      textError: '',
      commonError: '',
      saveStatus: false,
    };
  }

  private async onCreateTask() {
    this.setState({ saveStatus: true });
    const reg = /\S+@\S+\.\S+/;
    const { username, email, text } = this.state;
    const userNameTrim = username.trim();
    const emailTrim = email.trim();
    const textTrim = text.trim();
    const userNameTrimLength = userNameTrim.length;
    const textTrimLength = textTrim.length;
    const validateEmail = reg.test(email);
    if (!userNameTrimLength && !textTrimLength && !validateEmail) {
      this.setState({
        usernameError: ErrorEnum.ERRORUSERNAME,
        textError: ErrorEnum.ERRORTEXT,
        emailError: ErrorEnum.ERROREMAIL,
      });
    } else if (!userNameTrimLength) {
      this.setState({ usernameError: ErrorEnum.ERRORUSERNAME });
    } else if (!textTrimLength) {
      this.setState({ textError: ErrorEnum.ERRORTEXT });
    } else if (!validateEmail) {
      this.setState({ emailError: ErrorEnum.ERROREMAIL });
    } else {
      const res = await handleCreateTask({
        username: userNameTrim,
        email: emailTrim,
        text: textTrim,
      });
      if (res?.status === StatusMessageEnum.OK) {
        const { page, sortDirection, sortField } = this.props.route.params.data;
        Utils.saveList(page, sortField, sortDirection);
        this.props.route.params.hideSuccessModal();
        this.props.navigation.goBack();
      } else {
        res?.error && this.setState({ commonError: res.error });
      }
    }
    this.setState({ saveStatus: false });
  }

  render(): JSX.Element {
    const { navigation } = this.props;
    const {
      username,
      email,
      text,
      usernameError,
      emailError,
      textError,
      commonError,
      saveStatus,
    } = this.state;
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Создать задачу"
          rightIcon="checkmark-outline"
          rightIconColor={COLORS.PRIMARY}
          onRightPress={() => this.onCreateTask()}
          rightButtonLoading={saveStatus}
          leftIcon="arrow-back-outline"
          leftIconColor={COLORS.PRIMARY}
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.wrapper__inputs}>
          <Input
            placeholder="Введите имя"
            value={username}
            onChangeText={(text) =>
              this.setState({
                username: text,
                usernameError: '',
                commonError: '',
              })
            }
            errorMessage={usernameError ? usernameError : undefined}
          />
          <Input
            placeholder="Введите email"
            value={email}
            onChangeText={(text) => this.setState({ email: text, emailError: '', commonError: '' })}
            errorMessage={emailError ? emailError : undefined}
          />
          <Input
            placeholder="Введите текст"
            value={text}
            onChangeText={(text) => this.setState({ text, textError: '', commonError: '' })}
            errorMessage={textError ? textError : undefined}
          />
          {!!commonError && <Text style={styles.common__error}>{commonError}</Text>}
        </View>
      </View>
    );
  }
}

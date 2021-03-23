import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Input, Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { styles } from './style';
import { handleLogin, StatusMessageEnum } from '../../../utils/auth-service';

const initialState = {
  password: '',
  login: '',
  errorPassword: '',
  errorLogin: '',
  commonError: '',
  loginStatus: false,
};

interface IProps {
  visible: boolean;
  closeModal: () => void;
}

interface IState {
  password: string;
  login: string;
  errorPassword: string;
  errorLogin: string;
  commonError: string;
  loginStatus: boolean;
}

enum ErrorEnum {
  ERRORPASSWORD = 'Некорректный пароль',
  ERRORLOGIN = 'Некорректный логин',
}

export default class AuthModal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...initialState };
  }

  public componentDidUpdate(prevProps: IProps): void {
    prevProps.visible !== this.props.visible && this.setState({ ...initialState });
  }

  private async onLogin() {
    this.setState({ loginStatus: true });
    const { password, login } = this.state;
    const passwordTrim = password.trim();
    const loginTrim = login.trim();
    const passwordLength = passwordTrim.length;
    const loginLength = loginTrim.length;
    if (!passwordLength && !loginLength) {
      this.setState({
        errorLogin: ErrorEnum.ERRORLOGIN,
        errorPassword: ErrorEnum.ERRORPASSWORD,
      });
    } else if (!passwordLength) {
      this.setState({ errorPassword: ErrorEnum.ERRORPASSWORD });
    } else if (!loginLength) {
      this.setState({ errorLogin: ErrorEnum.ERRORLOGIN });
    } else {
      const res = await handleLogin({
        username: loginTrim,
        password: passwordTrim,
      });
      if (res?.status === StatusMessageEnum.OK) {
        this.setState({ loginStatus: false });
        this.props.closeModal();
      } else {
        res?.error && this.setState({ commonError: res.error });
      }
    }
    this.setState({ loginStatus: false });
  }

  render(): JSX.Element {
    const { visible, closeModal } = this.props;
    const { password, login, errorLogin, errorPassword, commonError, loginStatus } = this.state;
    return (
      <Modal
        isVisible={visible}
        style={styles.auth__modal}
        animationInTiming={300}
        backdropOpacity={0.54}
        useNativeDriver={true}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
      >
        <View style={styles.content}>
          <Text style={styles.task__common__text}>Авторизация</Text>
          <Input
            placeholder="Логин"
            value={login}
            onChangeText={(text) => this.setState({ login: text, errorLogin: '', commonError: '' })}
            errorMessage={errorLogin ? errorLogin : undefined}
          />
          <Input
            placeholder="Пароль"
            value={password}
            onChangeText={(text) =>
              this.setState({
                password: text,
                errorPassword: '',
                commonError: '',
              })
            }
            errorMessage={errorPassword ? errorPassword : undefined}
            textContentType="password"
            secureTextEntry
          />
          {!!commonError && <Text style={styles.common__error}>{commonError}</Text>}
          <Button
            disabled={loginStatus}
            title="Войти"
            onPress={() => this.onLogin()}
            loading={loginStatus}
          />
        </View>
      </Modal>
    );
  }
}

import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { styles } from './style';
import { Icon } from 'react-native-elements';

interface IProps {
  visible: boolean;
  closeModal: () => void;
}

export default class SuccessModal extends Component<IProps> {
  render(): JSX.Element {
    const { visible, closeModal } = this.props;
    return (
      <Modal
        isVisible={visible}
        style={styles.success_modal}
        animationInTiming={300}
        backdropOpacity={0.54}
        useNativeDriver={true}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
      >
        <View style={styles.content}>
          <Icon type="ionicon" name="checkmark-circle" size={40} color="green" />
          <Text style={styles.success__modal}>Задача создана</Text>
          <Button title="ОК" type="outline" onPress={() => closeModal()} />
        </View>
      </Modal>
    );
  }
}

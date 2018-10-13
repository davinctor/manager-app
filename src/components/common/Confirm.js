import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({
  isVisible,
  message,
  submit,
  onSubmitPressed,
  cancel,
  onCancelPressed,
}) => (
  <Modal
    visible={isVisible}
    transparent
    animationType={'slide'}
    onRequestClose={() => {}}
  >
    <View style={styles.container}>
      <CardSection style={styles.cardSection}>
        <Text style={styles.message}>
          {message}
        </Text>
      </CardSection>
      <CardSection style={styles.cardSection}>
        <Button onPress={onSubmitPressed}>{submit}</Button>
        <Button onPress={onCancelPressed}>{cancel}</Button>
      </CardSection>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  cardSection: {
    justifyContent: 'center',
  },
  message: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
});

export { Confirm };

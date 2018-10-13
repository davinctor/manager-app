import React, { Component } from 'react';
import {
  Picker,
  Text,
  StyleSheet,
} from 'react-native';
import {
  Card,
  CardSection,
  Input,
  Button
} from './common';

class EmployeeForm extends Component {
  renderWeekDayPicker = () => {
    return (
        <Picker
            selectedValue={this.props.shift}
            onValueChange={this.props.onShiftChanged}
        >
            <Picker.Item
                label={'Monday'}
                value={'mon'}
            />
            <Picker.Item
                label={'Tuesday'}
                value={'tue'}
            />
            <Picker.Item
                label={'Wednesday'}
                value={'wed'}
            />
            <Picker.Item
                label={'Thursday'}
                value={'thu'}
            />
            <Picker.Item
                label={'Friday'}
                value={'fri'}
            />
            <Picker.Item
                label={'Saturday'}
                value={'sat'}
            />
            <Picker.Item
                label={'Sunday'}
                value={'sun'}
            />
        </Picker>
    );
};

render() {
    const {
        name,
        onNameChanged,
        phone,
        onPhoneChanged,
        shift,
        submitText,
        onSubmitPressed,
    } = this.props;
    return (
        <Card>
            <CardSection>
                <Input
                    label={'Name'}
                    placeholder={'Jane'}
                    value={name}
                    onChangeText={onNameChanged}
                />
            </CardSection>
            <CardSection>
                <Input
                    label={'Phone'}
                    placeholder={'555-55-55'}
                    value={phone}
                    onChangeText={onPhoneChanged}
                />
            </CardSection>
            <CardSection style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Shift</Text>
                {this.renderWeekDayPicker(shift)}
            </CardSection>
            <CardSection>
                <Button onPress={onSubmitPressed}>
                    {submitText}
                </Button>
            </CardSection>
        </Card>
    );
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
      flexDirection: 'column',
  },
  pickerLabel: {
      fontSize: 18,
      paddingHorizontal: 20,
      paddingVertical: 8,
  },
});

export default EmployeeForm;

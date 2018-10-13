import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';

import { View } from 'react-native';
import { CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';

import {
  employeeUpdate,
  employeeEdit,
  employeeDelete,
} from '../actions';

class EmployeeEdit extends Component {
  state = {
    isFireConfirmVisible: false,
  };

  onNameChanged = (newName) => {
    this.props.employeeUpdate({
        prop: 'name',
        value: newName,
    });
  };

  onPhoneChanged = (newPhone) => {
    this.props.employeeUpdate({
        prop: 'phone',
        value: newPhone,
    });
  };

  onShiftChanged = (newShift) => {
    this.props.employeeUpdate({
        prop: 'shift',
        value: newShift,
    });
  };

  onSubmitPressed = () => {
    const {
      uid,
      name,
      phone,
      shift,
      employeeEdit,
    } = this.props;
    employeeEdit({
      uid,
      name,
      phone,
      shift
    });
  };

  onSendTextSchedulePressed = () => {
    const { phone, shift } = this.props;
    console.log(phone);
    Communications.text(
      phone,
      `Your upcoming shift is on ${shift}`,
    );
  }

  onFirePressed = () => this.toggleFireConfirmVisibility()

  onSubmitFireConfirmPressed = () => {
    const { uid, employeeDelete } = this.props;
    employeeDelete(uid);
    this.toggleFireConfirmVisibility();
  }

  onCancelFireConfirmPressed = () => this.toggleFireConfirmVisibility()

  toggleFireConfirmVisibility = () => {
    const { isFireConfirmVisible } = this.state;
    this.setState({
      isFireConfirmVisible: !isFireConfirmVisible,
    });
  }

  render() {
    const {
      name,
      phone,
      shift,
    } = this.props;
    return (
      <View>
        <EmployeeForm
          name={name}
          onNameChanged={this.onNameChanged}
          phone={phone}
          onPhoneChanged={this.onPhoneChanged}
          shift={shift}
          onShiftChanged={this.onShiftChanged}
          submitText={'Save'}
          onSubmitPressed={this.onSubmitPressed}
        />
        <CardSection>
          <Button onPress={this.onSendTextSchedulePressed}>
            Text Schedule
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onFirePressed}>
            Fire
          </Button>
        </CardSection>
        <Confirm
          isVisible={this.state.isFireConfirmVisible}
          message={'Are you sure you want to fire?'}
          submit={'YES'}
          onSubmitPressed={this.onSubmitFireConfirmPressed}
          cancel={'NO'}
          onCancelPressed={this.onCancelFireConfirmPressed}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { uid, name, phone, shift } = state.employeeForm;
  return {
    uid,
    name,
    phone,
    shift,
  };
};

const mapDispatchToProps = (dispatch) => ({
  employeeUpdate: bindActionCreators(employeeUpdate, dispatch),
  employeeEdit: bindActionCreators(employeeEdit, dispatch),
  employeeDelete: bindActionCreators(employeeDelete, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEdit);

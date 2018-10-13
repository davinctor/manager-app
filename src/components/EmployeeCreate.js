import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EmployeeForm from './EmployeeForm';

import {
    employeeUpdate,
    employeeCreate,
} from '../actions';

class EmployeeCreate extends Component {
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
        const { name, phone, employeeCreate } = this.props;
        let { shift } = this.props;
        shift = shift || 'Monday';
        employeeCreate({
            name,
            phone,
            shift
        });
    };

    render() {
        const {
            name,
            phone,
            shift,
        } = this.props;
        return (
            <EmployeeForm
                name={name}
                onNameChanged={this.onNameChanged}
                phone={phone}
                onPhoneChanged={this.onPhoneChanged}
                shift={shift}
                onShiftChanged={this.onShiftChanged}
                submitText={'Create'}
                onSubmitPressed={this.onSubmitPressed}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return {
        name,
        phone,
        shift,
    };
};

const mapDispatchToProps = (dispatch) => ({
    employeeUpdate: bindActionCreators(employeeUpdate, dispatch),
    employeeCreate: bindActionCreators(employeeCreate, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);

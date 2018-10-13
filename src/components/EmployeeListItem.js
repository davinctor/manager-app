import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { CardSection } from './common';

import { employeeSelect } from '../actions';

const selectEmployeeAndNavigateToEdit = ({ employee, employeeSelect }) => {
    employeeSelect(employee);
    Actions.employeeEdit();
};

const EmployeeListItem = (props) => {
    const { employee: { name } } = props;
    return (
        <TouchableHighlight onPress={() => selectEmployeeAndNavigateToEdit(props)}>
            <CardSection>
                <Text style={styles.title}>
                    {name}
                </Text>
            </CardSection>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        padding: 16,
    },
});

const mapDispatchToProps = (dispatch) => ({
    employeeSelect: bindActionCreators(employeeSelect, dispatch),
});

export default connect(null, mapDispatchToProps)(EmployeeListItem);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ListView } from 'react-native';

import EmployeeListItem from './EmployeeListItem';

import { employeesFetch } from '../actions';

class EmployeeList extends Component {
    componentWillMount() {
        this.props.employeesFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ employees }) {
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.dataSource = dataSource.cloneWithRows(employees);
    }

    renderRow = (employee) => (<EmployeeListItem employee={employee} />);

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = ({ employees }) => ({
    employees: _.map(employees.data, (val, uid) => ({ ...val, uid, })),
});

const mapDispatchToProps = (dispatch) => {
    return {
        employeesFetch: bindActionCreators(employeesFetch, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

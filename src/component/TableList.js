import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';

class TableList extends Component {
    
    state = {
        modal6: false,
        modal7: false,
        data: {
            columns: [
              {
                label: 'Title',
                field: 'title',
                sort: 'asc'
              },
              {
                label: 'Description',
                field: 'description',
                sort: 'asc'
              },
              {
                label: 'City',
                field: 'city',
                sort: 'asc'
              },
              {
                label: 'State',
                field: 'state',
                sort: 'asc'
              },
              {
                label: 'Address',
                field: 'address',
                sort: 'asc'
              }
            ],
            rows: this.props.filtered_features
        }
    }

        
    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    render() {
        return (
            <MDBDataTable
                bordered
                hover
                data={this.state.data}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    map: state.map,
    filtered_features: state.filtered_features
});

export default connect(
    mapStateToProps,
    {  }
)(TableList);
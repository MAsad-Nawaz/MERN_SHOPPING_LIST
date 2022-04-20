import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
// import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };
    onChangeItem = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            name: this.state.name
        };
        // ADD item Action
        this.props.addItem(newItem);

        // close modal
        this.toggle();
    };
    render() {
        return (
            <div>
                {
                    this.props.isAuthenticated ?
                        <Button
                            color='dark'
                            style={{ marginBottom: '2rem' }}
                            onClick={() => this.toggle()}
                        >
                            Add Item
                        </Button>
                        :
                        <h4 className='mb-3 ml-4'>
                            Please login to manage items
                        </h4>
                }
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Add To Shopping List
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='item'>
                                    Item
                                </Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='item'
                                    placeholder='Add shopping item'
                                    onChange={this.onChangeItem}
                                />
                                <Button
                                    color='dark'
                                    block
                                    style={{ marginTop: '2rem' }}
                                >
                                    Add Item
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { addItem })(ItemModal);
import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
// import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
        // If authenticated closed modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    };

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };
    onChangeItem = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state;
        const newUser = {
            name,
            email,
            password
        };
        //Attemp to Register 
        this.props.register(newUser);

        // close modal
        //this.toggle();
    }
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Register
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='item'>
                                    Name
                                </Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Name'
                                    className='mb-3'
                                    onChange={this.onChangeItem}
                                />
                                <Label for='item'>
                                    email
                                </Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='email'
                                    className='mb-3'
                                    onChange={this.onChangeItem}
                                />
                                <Label for='item'>
                                    Password
                                </Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    className='mb-3'
                                    onChange={this.onChangeItem}
                                />
                                <Button
                                    color='dark'
                                    block
                                    style={{ marginTop: '2rem' }}
                                >
                                    Register User
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
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})
export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
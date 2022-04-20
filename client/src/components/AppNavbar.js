import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Nav,
    NavLink,
    NavItem,
    NavbarBrand,
    NavbarToggler,
    Container,
    Navbar
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class AppNavbar extends Component {
    state = {
        isOpen: false,
    };
    // constructor(props){
    //     super(props);
    //     this.state={
    //         isOpen:false,
    //     }; 
    // };

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    render() {
        const { user, isAuthenticated } = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavItem >
                    <span className='navbar-text'>
                        <strong>
                            {
                                user ? `Welcome ${user.name}` : null
                            }
                        </strong>

                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );
        const guestLink = (
            <Fragment>
                <NavItem>
                    <LoginModal />
                </NavItem>
                <NavItem>
                    < RegisterModal />
                </NavItem>
            </Fragment>
        );
        return (
            <div>
                <Navbar color='dark' dark expand='sm' className='mb-5'>
                    <Container>
                        <NavbarBrand href='/'> Shoppinglist</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav navbar>
                                {
                                    isAuthenticated ?
                                        authLinks :
                                        guestLink
                                }
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }

};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps, null)(AppNavbar);
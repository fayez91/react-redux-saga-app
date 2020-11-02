import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { signUpStart } from '../../actions/authActions';
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from './index.module.css'

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            repassword: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        var newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            repassword: this.state.repassword
        };

        var { history } = this.props;
        newUser = { ...newUser, history }

        this.props.signUpStart(newUser);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className={styles.Register}>
                <div className="container">
                    <div className="row">
                        <div className="col s8 offset-s2">
                            <Link to="/" className="btn-flat waves-effect">
                                <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
                            <div className="col s12">
                                <h4>
                                    <b>Register</b> below
              </h4>
                                <p className="grey-text text-darken-1">
                                    Already have an account? <Link className={styles.linkcolor} to="/login">Log in</Link>
                                </p>
                            </div>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        error={errors.name}
                                        id="name"
                                        type="text"
                                        className={classnames("", {
                                            invalid: errors.name
                                        })}
                                    />
                                    <label htmlFor="name">Name</label>
                                    <span className="red-text">{errors.name}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id="email"
                                        type="email"
                                        className={classnames("", {
                                            invalid: errors.email
                                        })}
                                    />
                                    <label htmlFor="email">Email</label>
                                    <span className="red-text">{errors.email}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password"
                                        className={classnames("", {
                                            invalid: errors.password
                                        })}
                                    />
                                    <label htmlFor="password">Password</label>
                                    <span className="red-text">{errors.password}</span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.repassword}
                                        error={errors.repassword}
                                        id="repassword"
                                        type="password"
                                        className={classnames("", {
                                            invalid: errors.repassword
                                        })}
                                    />
                                    <label htmlFor="repassword">Confirm Password</label>
                                    <span className="red-text">{errors.repassword}</span>
                                </div>
                                <div className="col s12">
                                    <button
                                        type="submit"
                                        className={`${styles.btnstyle} btn btn-large waves-effect waves-light hoverable blue accent-3`}
                                    >
                                        Sign up
                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


Register.propTypes = {
    signUpStart: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { signUpStart }
)(withRouter(Register));
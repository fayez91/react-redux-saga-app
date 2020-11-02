import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { emailSignInStart } from '../../actions/authActions';
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from './index.module.css'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }


    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        var userData = {
            email: this.state.email,
            password: this.state.password
        };
        var { history } = this.props;

        userData = { ...userData, history }

        this.props.emailSignInStart(userData);
        console.log(userData, "User Data");
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
        console.log(nextProps.errors, "Errors")
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        console.log(this.state.email, "Email state")
    }

    render() {
        const { errors } = this.state;
        return (
            <div className={styles.Login}>
                <div className="container">
                    <div className="row">
                        <div className="col s8 offset-s2">
                            <Link to="/" className="btn-flat waves-effect">
                                <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
                            <div className="col s12">
                                <h4>
                                    <b>Login</b> below
                            </h4>
                                <p className="grey-text text-darken-1">
                                    Don't have an account? <Link className={styles.linkcolor} to="/register">Register</Link>
                                </p>
                            </div>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id="email"
                                        type="email"
                                        className={classnames("", {
                                            invalid: errors.email || errors.emailnotfound
                                        })}
                                    />
                                    <label htmlFor="email">Email</label>
                                    <span className="red-text">
                                        {errors.email}
                                        {errors.emailnotfound}
                                    </span>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password"
                                        className={classnames("", {
                                            invalid: errors.password || errors.passwordincorrect
                                        })}
                                    />
                                    <label htmlFor="password">Password</label>
                                    <span className="red-text">
                                        {errors.password}
                                        {errors.passwordincorrect}
                                    </span>
                                </div>
                                <div className="col s12">
                                    <button
                                        type="submit"
                                        className={`${styles.btnstyle} btn btn-large waves-effect  waves-light hoverable green accent-3`}
                                    >
                                        Login
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

Login.propTypes = {
    emailSignInStart: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
}
);

export default connect(
    mapStateToProps,
    { emailSignInStart }
)(Login);
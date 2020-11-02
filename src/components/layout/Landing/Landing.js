import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import './styles.css'
import PropTypes from "prop-types";

class Landing extends Component {

    render() {
        return (

            <div className="heightdiv container valign-wrapper" >
                <div className="row">
                    <div className="col s12 center-align">

                        <div className="img-1">
                            <h4>
                                <div className="div-center">
                                    <span className="span-style">HOME PAGE APP</span>
                                </div>
                            </h4>
                        </div>

                        <br />
                        <br />
                        <br />

                        <div className="col s6">
                            <Link
                                to="/register"
                                className="btnstyle btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Register
              </Link>
                        </div>
                        <div className="col s6">
                            <Link
                                to={this.props.auth.isAuthenticated ? "/dashboard" : "/login"}
                                className="btnstyle btn btn-large waves-effect  waves-light hoverable green accent-3"
                            >
                                Log In
              </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Landing);
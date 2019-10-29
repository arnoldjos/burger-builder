import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentDidMount() {
            axios.interceptors.reqest.use(req => {
                this.setState({ error: null });
            });
            axios.interceptors.response.use(null, error => {
                this.setState({ error });
            });
        }

        errorConfirmedHanlder = () => {
            this.setState({ error: null });
        };

        render() {
            return (
                <React.Fragment>
                    <Modal
                        show={this.state.error}
                        clicked={this.errorConfirmedHanlder}
                    >
                        <p style={{ textAlign: "center" }}>
                            {this.state.error ? this.state.error.message : null}
                        </p>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    };
};

export default withErrorHandler;

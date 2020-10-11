import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observe } from 'mobx';

import { ToastContainer, ToastMessage } from 'react-toastr';
import { AlertStore } from '../../stores/Alert';

import './animation.css';
import './toastr.css';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

@observer
export default class Alert extends Component {
    constructor(props) {
        super(props);
        let that = this;
        this.disposer = observe(AlertStore, 'alertProps', change => {
           that.addAlert();
        });

        this.addAlert = this.addAlert.bind(this);
        //this.clearAlert = this.clearAlert.bind(this);
    }

    addAlert(store) {
        if(!AlertStore.alertProps) {
            return;
        }

        let { type, title, message, options } = AlertStore.alertProps;
        if (!type || !title || !message) {
            return;
        }

        this.refs.container[type](message, title, options);
    }

    /*  clearAlert() {
        this.refs.container.clear();
    }  */

    render() {
        return (
            <div>
                <ToastContainer
                    toastMessageFactory={ToastMessageFactory}
                    ref="container"
                    className="toast-top-right"
                />
            </div>
        )
    }
}

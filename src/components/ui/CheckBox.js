import React, { Component } from "react";
import ConfirmationDialog from "./ConfirmationDialog";

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked, 
            showDialog: false, 
            tempChecked: false, 
        };
    }

    handleCheckboxChange(e) {
        const { checked } = e.target;
        this.setState({
            showDialog: true, 
            tempChecked: checked, 
        });
    }

    handleConfirm = () => {
        this.setState(
            {
                checked: this.state.tempChecked, 
                showDialog: false, 
            },
            () => {
                this.props.onChange(this.state.checked);
            }
        );
    };

    handleCancel = () => {
        this.setState({
            showDialog: false, 
        });
    };

    render() {
        return (
            <div>
                <input
                    type="checkbox"
                    checked={this.state.checked}
                    onChange={this.handleCheckboxChange.bind(this)}
                />

                {this.state.showDialog && (
                    <ConfirmationDialog
                        message={
                            this.state.tempChecked
                                ? "Do you want to mark this task as completed?"
                                : "Do you want to mark this task as incomplete?"
                        }
                        onConfirm={this.handleConfirm}
                        onCancel={this.handleCancel}
                    />
                )}
            </div>
        );
    }
}

export default CheckBox;

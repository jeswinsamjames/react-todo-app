import React, { Component } from "react";
import ConfirmationDialog from "./ConfirmationDialog";

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked, // Current checkbox state
            showDialog: false, // Whether the confirmation dialog is shown
            tempChecked: false, // Temporary state to hold the checkbox value during dialog
        };
    }

    // Handle the change of checkbox state
    handleCheckboxChange = (e) => {
        // If the dialog is already open, prevent the checkbox change from occurring
        if (this.state.showDialog) return;

        // Otherwise, show the dialog with the temporary checkbox value
        const { checked } = e.target;
        this.setState({
            showDialog: true, // Show the dialog
            tempChecked: checked, // Temporarily store the checkbox value
        });
    };

    // Confirm the action, update checkbox state, and close the dialog
    handleConfirm = () => {
        this.setState(
            {
                checked: this.state.tempChecked, // Apply the new checkbox state
                showDialog: false, // Close the dialog
            },
            () => {
                this.props.onChange(this.state.checked); // Call parent onChange with new state
            }
        );
    };

    // Cancel the action and close the dialog
    handleCancel = () => {
        this.setState({
            showDialog: false, // Close the dialog without changing the checkbox state
        });
    };

    render() {
        return (
            <div>
                <input
                    type="checkbox"
                    checked={this.state.checked} // Use the current state of the checkbox
                    onChange={this.handleCheckboxChange} // Trigger the dialog on checkbox change
                />

                {/* Render the confirmation dialog if showDialog is true */}
                {this.state.showDialog && (
                    <ConfirmationDialog
                        message={
                            this.state.tempChecked
                                ? "Do you want to mark this task as completed?"
                                : "Do you want to mark this task as incomplete?"
                        }
                        onConfirm={this.handleConfirm} // Trigger the handleConfirm on confirmation
                        onCancel={this.handleCancel} // Trigger handleCancel on cancellation
                    />
                )}
            </div>
        );
    }
}

export default CheckBox;

import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <p>{message}</p>
                <div className="dialog-actions">
                    <button onClick={onConfirm} className="btn btn-confirm">Confirm</button>
                    <button onClick={onCancel} className="btn btn-cancel">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;

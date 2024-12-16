import React from "react";
import { compose, withState, withHandlers } from "recompose";
import KeyCode from "keycode-js";

const InputBox = ({
    value,
    priority,
    dueDate,
    handleKeyUp,
    handleChange,
    handlePriorityChange,
    handleDueDateChange,
    addNew,
}) => (
    <div>
        <input
            type="text"
            value={value}
            onChange={handleChange} 
            onKeyUp={handleKeyUp} 
            placeholder="Enter new task"
        />

        <select value={priority} onChange={handlePriorityChange}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>

        <input
            type="date"
            value={dueDate}
            onChange={handleDueDateChange} 
            placeholder="Select due date"
        />

        <button onClick={() => addNew(value, priority, dueDate)}>
            Add Task
        </button>
    </div>
);

export default compose(
    withState("value", "setValue", (props) => props.value || ""), 
    withState("priority", "setPriority", "Medium"), 
    withState("dueDate", "setDueDate", ""), 
    withHandlers({
        handleKeyUp:
            ({ addNew, setValue, setPriority, setDueDate }) =>
            (e) => {
                const text = e.target.value.trim();
                if (e.keyCode === KeyCode.KEY_RETURN && text) {
                    addNew(text, "Medium", ""); 
                    setValue(""); 
                    setPriority("Medium"); 
                    setDueDate(""); 
                }
            },
        handleChange:
            ({ setValue }) =>
            (e) => {
                setValue(e.target.value); 
            },
        handlePriorityChange:
            ({ setPriority }) =>
            (e) => {
                setPriority(e.target.value); 
            },
        handleDueDateChange:
            ({ setDueDate }) =>
            (e) => {
                
                const dateString = new Date(
                    e.target.value
                ).toLocaleDateString();
                setDueDate(dateString); 
            },
    })
)(InputBox);

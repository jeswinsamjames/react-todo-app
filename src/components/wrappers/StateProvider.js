import React, { Component } from "react";
import { FILTER_ALL } from "../../services/filter";
import { MODE_CREATE, MODE_NONE } from "../../services/mode";
import { objectWithOnly, wrapChildrenWith } from "../../util/common";
import { getAll, addToList, updateStatus } from "../../services/todo";

const sortByDueDate = (tasks, ascending = true) => {
    return tasks.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return ascending ? dateA - dateB : dateB - dateA;
    });
};

const sortByPriority = (tasks) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return tasks.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
};

class StateProvider extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            mode: MODE_CREATE,
            filter: FILTER_ALL,
            list: getAll(),
            sortBy: "dueDate",
            sortOrder: "ascending",
        };
    }

    render() {
        let children = wrapChildrenWith(this.props.children, {
            data: this.state,
            actions: objectWithOnly(this, [
                "addNew",
                "changeFilter",
                "changeStatus",
                "changeMode",
                "setSearchQuery",
                "changeSortOrder",
                "changeSortBy",
            ]),
        });

        return <div>{children}</div>;
    }

    addNew(text, priority, dueDate) {
        let createdDate = new Date().toLocaleDateString();
        let updatedList = addToList(this.state.list, {
            text,
            completed: false,
            priority,
            dueDate,
            createdDate,
        });

        this.setState({ list: updatedList });
    }

    changeFilter(filter) {
        this.setState({ filter });
    }

    changeStatus(itemId, completed) {
        const updatedList = updateStatus(this.state.list, itemId, completed);

        this.setState({ list: updatedList });
    }

    changeMode(mode = MODE_NONE) {
        this.setState({ mode });
    }

    setSearchQuery(text) {
        this.setState({ query: text || "" });
    }

    changeSortOrder(order) {
        const isAscending = order === "ascending";
        const sortedList = this.state.sortBy === "dueDate"
            ? sortByDueDate(this.state.list, isAscending)
            : sortByPriority(this.state.list);
        this.setState({ list: sortedList, sortOrder: order });
    }

    changeSortBy(criteria) {
        const sortedList = criteria === "dueDate"
            ? sortByDueDate(this.state.list, this.state.sortOrder === "ascending")
            : sortByPriority(this.state.list);
        this.setState({ list: sortedList, sortBy: criteria });
    }

}

export default StateProvider;

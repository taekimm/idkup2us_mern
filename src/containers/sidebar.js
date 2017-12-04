import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import CheckboxGroup from '../components/checkboxgroup';

class SideBar extends Component {
    renderField(field) {
        return (
            <div>
                <label>{field.label}</label>
                <input
                    type={field.type}
                    {...field.input}
                />
            </div>
        );
    }

    renderCheckboxes(field) {
        return (
            <div>
                <label>{field.label}</label>
                <input
                    type={field.type}
                    {...field.input}
                />
            </div>
        )
    }

    onSubmit(values) {
        console.log(values);
    }

    render() {
        const { handleSubmit } = this.props;

        const checkboxes = [
            { label: '$', value: '$' },
            { label: '$$', value: '$$' },
            { label: '$$$', value: '$$$' },
            { label: '$$$$', value: '$$$$' }
        ]

        const style = {
            display: 'block'
        }

        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                    <Field
                        label="Select mile radius for search: "
                        type="number"
                        name="radius"
                        component={this.renderField}
                    />
                    <Field
                        label="Select # of results to pick from: "
                        type="number"
                        name="numResult"
                        component={this.renderField}
                    />
                    <Field
                        label="Categories are seperated by commas: "
                        type="text"
                        name="categories"
                        component={this.renderField}
                    />
                    <label>Price Range :</label>
                    <CheckboxGroup
                        name='price' 
                        options={checkboxes}
                    />
                    <button style={style} type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'SidebarForm'
})(
    connect(null)(SideBar)
);
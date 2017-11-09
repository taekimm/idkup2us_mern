import React, { Component } from 'react';

class SideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            radius: 0,
            lat: 0,
            long: 0,
            categories: '',
            limit: 20,
            price: '',
            price1: true,
            price2: true,
            price3: false,
            price4: false,
        }

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(event) {
        console.log(event);
    }

    render() {
        return (
            <div>
                <input
                    name='radius'
                    type='number'
                />
                <input
                    name='limit'
                    type='number'
                />
                <input
                    name='categories'
                    type='text'
                />
                <input
                    name='price1'
                    type='checkbox'
                    checked={this.state.price1}
                    onChange={this.handleCheckboxChange}
                />
                <input
                    name='price2'
                    type='checkbox'
                    checked={this.state.price2}
                    onChange={this.handleCheckboxChange}
                />
                <input
                    name='price3'
                    type='checkbox'
                    checked={this.state.price3}
                    onChange={this.handleCheckboxChange}
                />
                <input
                    name='price4'
                    type='checkbox'
                    checked={this.state.price4}
                    onChange={this.handleCheckboxChange}
                />
                <button
                    type='submit'
                >
                    Search!
                </button>
            </div>
        );
    }
}

export default SideBar;
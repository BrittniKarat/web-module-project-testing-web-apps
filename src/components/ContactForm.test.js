import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent';



    

test('renders without errors', ()=>{
    render(<ContactForm/>);
    const label = screen.getByLabelText(/First Name*/i);
    expect(label).toBeTruthy();
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header= screen.getByText(/Contact Form/i);
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/Contact Form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'Beth');
    const firstNameErr = screen.findByText('firstName must have at least 5 characters');
    expect(firstNameErr).toBeTruthy();    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    const firstNameErr = screen.findByText('firstName must have at least 5 characters');
    expect(firstNameErr).toBeTruthy(); 

    const lastNameErr = screen.findByText('lastName is a required field.');
    expect(lastNameErr).toBeTruthy();

    const emailErr = screen.findByText('email must be a valid email address');
    expect(emailErr).toBeTruthy();

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    
    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'Beth Anne');
    
    const lastName = screen.getByPlaceholderText('Burke');
    userEvent.type(lastName, 'Huffenstuff');
    
    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    const emailErr = screen.findByText('email must be a valid email address');
    expect(emailErr).toBeTruthy();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'Beth Anne');
    
    const lastName = screen.getByPlaceholderText('Burke');
    userEvent.type(lastName, 'Huffenstuff');

    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(email, 'invalidAddress')

    const emailErr = screen.findByText('email must be a valid email address');
    expect(emailErr).toBeTruthy();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'Beth Anne');

    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(email, 'validAddress@valid.org')
    
    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    const emailErr = screen.findByText('email must be a valid email address');
    expect(emailErr).toBeTruthy();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'Beth Anne');

    const lastName = screen.getByPlaceholderText('Burke');
    userEvent.type(lastName, 'Huffenstuff');

    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(email, 'validAddress@valid.org')
    
    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);

    const firstNameRender = await screen.findByTestId('firstnameDisplay');
    expect(firstNameRender).toBeTruthy();

    const lastNameRender = await screen.findByTestId('lastnameDisplay');
    expect(lastNameRender).toBeTruthy();

    const emailRender = await screen.findByTestId('emailDisplay');
    expect(emailRender).toBeTruthy();

    const messageRender = await screen.queryByTestId('messageDisplay');
    expect(messageRender).toBeFalsy();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'Beth Anne');

    const lastName = screen.getByPlaceholderText('Burke');
    userEvent.type(lastName, 'Huffenstuff');

    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(email, 'validAddress@valid.org')
    
    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);
    
    const firstNameRender = screen.findAllByTestId('firstnameDisplay');
    expect(firstNameRender).toBeTruthy();

    const lastNameRender = screen.findAllByTestId('lastnameDisplay');
    expect(lastNameRender).toBeTruthy();

    const emailRender = screen.findAllByTestId('emailDisplay');
    expect(emailRender).toBeTruthy();

    const messageRender = screen.findAllByTestId('messageDisplay');
    expect(messageRender).toBeTruthy();
});

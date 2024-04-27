import React, { useState } from 'react';

const FormWithoutYup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: '',
        interest: [],
        birthDate: '',
    });

    const [errors, setErrors] = useState({});

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const isValidPhoneNo = () => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(formData.phoneNo);
    };

    const isValidPassword = (password) => {
        const symbolRegex = /[!@#$%^&*()_|/.,><?]/;
        const numberRegex = /[0-9]/;
        const upperCaseRegex = /[A-Z]/;
        const lowerCaseRegex = /[a-z]/;
        return (
            password.length >= 8 &&
            symbolRegex.test(password) &&
            numberRegex.test(password) &&
            upperCaseRegex.test(password) &&
            lowerCaseRegex.test(password)
        );
    };

    const isValidAge = (age) => {
        return parseInt(age) >= 18 && parseInt(age) <= 100;
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.firstName) {
            newErrors.firstName = 'First Name is Required';
        }
        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Invalid email';
        }
        if (!formData.phoneNo) {
            newErrors.phoneNo = 'Phone no is required';
        } else if (!isValidPhoneNo(formData.phoneNo)) {
            newErrors.phoneNo = 'Invalid Phone no';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!isValidPassword(formData.password)) {
            newErrors.password =
                'Password must be 8 characters long and include characters, number, and symbol etc.';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Password must match';
        }
        if (!formData.age) {
            newErrors.age = 'Please provide age';
        } else if (!isValidAge(formData.age)) {
            newErrors.age = 'You must be at least 18 years old';
        }
        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }
        if (formData.interest.length === 0) {
            newErrors.interest = 'Please select at least one interest';
        }
        if (!formData.birthDate) {
            newErrors.birthDate = 'Birth date is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    console.log(errors);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            console.log('Form Submitted', formData);
        } else {
            console.log('Form Validation failed');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckChange = (e) => {
        const { name, checked } = e.target;
        let updatedInterest = [...formData.interest];
        if (checked) {
            updatedInterest.push(name);
        } else {
            updatedInterest = updatedInterest.filter((i) => i !== name);
        }
        setFormData({
            ...formData,
            interest: updatedInterest,
        });
    };

    return (
        <form className='formdata' onSubmit={handleSubmit}>
            <div>
                <label>FirstName:</label>
                <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder='Enter Your First Name'
                    className='text-white'
                />
                {errors.firstName && (
                    <div className='error text-red-500'>{errors.firstName}</div>
                )}
            </div>
            <div>
                <label>Lastname:</label>
                <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder='Enter Your last Name'
                />
                {errors.lastName && (
                    <div className='error'>{errors.lastName}</div>
                )}
            </div>
            <div>
                <label>Email:</label>
                <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Enter Your email'
                />
                {errors.email && <div className='error'>{errors.email}</div>}
            </div>
            <div>
                <label>PhoneNo:</label>
                <input
                    type='text'
                    name='phoneNo'
                    value={formData.phoneNo}
                    onChange={handleChange}
                    placeholder='Enter Your PhoneNo'
                />
                {errors.phoneNo && (
                    <div className='error'>{errors.phoneNo}</div>
                )}
            </div>
            <div>
                <label>Password:</label>
                <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Enter Your password'
                />
                {errors.password && (
                    <div className='error'>{errors.password}</div>
                )}
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type='password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='Enter Your confirmPassword'
                />
                {errors.confirmPassword && (
                    <div className='error'>{errors.confirmPassword}</div>
                )}
            </div>
            <div>
                <label>Age:</label>
                <input
                    type='number'
                    name='age'
                    value={formData.age}
                    onChange={handleChange}
                    placeholder='Enter Your Age'
                />
                {errors.age && <div className='error'>{errors.age}</div>}
            </div>
            <div>
                <label>Gender:</label>
                <select
                    name='gender'
                    value={formData.gender}
                    onChange={handleChange}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                </select>
                {errors.gender && (
                    <div className='error'>{errors.gender}</div>
                )}
            </div>
            <div>
                <label>Interest:</label>
                <label>
                    <input
                        type='checkbox'
                        name='coding'
                        checked={formData.interest.includes('coding')}
                        onChange={handleCheckChange}
                    />
                    Coding
                </label>
                <label>
                    <input
                        type='checkbox'
                        name='sports'
                        checked={formData.interest.includes('sports')}
                        onChange={handleCheckChange}
                    />
                    Sports
                </label>
                <label>
                    <input
                        type='checkbox'
                        name='reading'
                        checked={formData.interest.includes('reading')}
                        onChange={handleCheckChange}
                    />
                    Reading
                </label>
                {errors.interest && (
                    <div className='error'>{errors.interest}</div>
                )}
            </div>
            <div>
                <label>Date of Birth</label>
                <input
                    type='date'
                    name='birthDate'
                    value={formData.birthDate}
                    onChange={handleChange}
                    placeholder='Enter Your Birth Date'
                />
                {errors.birthDate && (
                    <div className='error'>{errors.birthDate}</div>
                )}
            </div>
            <button type='submit'>Submit</button>
        </form>
    );
};

export default FormWithoutYup;

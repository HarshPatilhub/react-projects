import React, { useState } from 'react';
import * as Yup from 'yup'

const FormWithYup = () => {
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

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('last name is required'),
        email: Yup.string().required('Enter you email').email('Enter valid email address'),
        phoneNo: Yup.string().required('enter you age').matches(/^\d{10}$/, "phoneNo should be 10 digit long"),
        password: Yup.string().required('password is required')
        .min(8,'password must be 8 characters long')
        .matches(/[!@#$%^&*()_|/.,><?]/,'password must contain at least one symbol')
        .matches(/[0-9]/,'password must contain one number')
        .matches(/[A-Z]/,'password must contain uppercase letter')
        .matches(/[a-z]/,'password must contain lowercase letter'),
        confirmPassword: Yup.string().required('confirm password is required').oneOf([Yup.ref('password')],"password must match"),
        age: Yup.number()
        .min(18, "Age must be 18 years")
        .max(100, "Age should not be greater than 100")
        .required('Age is required')
        .typeError("Age must be number"),
        gender: Yup.string().required('Gender is required'),
        interest: Yup.array()
        .min(1, "Select at least one interest")
        .required('interest is required'),
        birthDate: Yup.date().required('birth date is required')
    })


   
    const handleSubmit =  async (e) => {
        e.preventDefault();

        try{
            await validationSchema.validate(formData,{abortEarly:false})
            console.log("Form Submitted",formData);
        }
        catch(error)
        {
        const newError = {};
        error.inner.forEach((err)=>{
            newError[err.path] = err.message
        })

        setErrors(newError)
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
        <form className='formdata flex border border-black flex-col justify-center items-center w-full h-screen' onSubmit={handleSubmit}>
            <div>
                <label className='font-bold text-xl'>FirstName:</label>
                <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder='Enter Your First Name'
                    className='border border-black mx-6 px-5 font-bold my-2'
                />
                {errors.firstName && (
                    <div className='error text-red-500'>{errors.firstName}</div>
                )}
            </div>
            <div>
                <label className='font-bold text-xl'>Lastname:</label>
                <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder='Enter Your last Name'
                    className='border border-black mx-6 px-5 font-bold my-2'

                />
                {errors.lastName && (
                    <div className='error text-red-500'>{errors.lastName}</div>
                )}
            </div>
            <div>
                <label className='font-bold text-xl'>Email:</label>
                <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Enter Your email'
                    className='border border-black mx-6 px-5 font-bold my-2'

                />
                {errors.email && <div className='error text-red-500'>{errors.email}</div>}
            </div>
            <div>
                <label className='font-bold text-xl'>PhoneNo:</label>
                <input
                    type='text'
                    name='phoneNo'
                    value={formData.phoneNo}
                    onChange={handleChange}
                    placeholder='Enter Your PhoneNo'
                    className='border border-black mx-6 px-5 font-bold my-2'

                />
                {errors.phoneNo && (
                    <div className='error text-red-500'>{errors.phoneNo}</div>
                )}
            </div>
            <div>
                <label className='font-bold text-xl'>Password:</label>
                <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Enter Your password'
                    className='border border-black mx-6 px-5 font-bold my-2'

                />
                {errors.password && (
                    <div className='error text-red-500'>{errors.password}</div>
                )}
            </div>
            <div>
                <label className='font-bold text-xl'>Confirm</label>
                <input
                    type='password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='Enter Your confirmPassword'
                    className='border border-black mx-6 px-5 font-bold my-2'

                />
                {errors.confirmPassword && (
                    <div className='error text-red-500'>{errors.confirmPassword}</div>
                )}
            </div>
            <div>
                <label className='font-bold text-xl'>Age:</label>
                <input
                    type='number'
                    name='age'
                    value={formData.age}
                    onChange={handleChange}
                    placeholder='Enter Your Age'
                    className='border border-black mx-6 px-5 font-bold my-2'

                />
                {errors.age && <div className='error text-red-500'>{errors.age}</div>}
            </div>
            <div>
                <label className='font-bold text-xl'>Gender:</label>
                <select
                    name='gender'
                    value={formData.gender}
                    onChange={handleChange}
                    className='border border-black mx-6 px-5 font-bold my-2'
                    >
                    
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                </select>
                {errors.gender && (
                    <div className='error text-red-500'>{errors.gender}</div>
                )}
            </div>
            <div>
                <label >Interest:</label>
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
                    <div className='error text-red-500'>{errors.interest}</div>
                )}
            </div>
            <div>
                <label className='font-bold text-xl'>DOB</label>
                <input
                    type='date'
                    name='birthDate'
                    value={formData.birthDate}
                    onChange={handleChange}
                    className='border border-black mx-6 px-5 font-bold my-2'

                />
                {errors.birthDate && (
                    <div className='error text-red-500'>{errors.birthDate}</div>
                )}
            </div>
            <button type='submit' className='bg-blue-600 text-white font-bold px-6 py-1 rounded'>Submit</button>
        </form>
    );
};

export default FormWithYup;

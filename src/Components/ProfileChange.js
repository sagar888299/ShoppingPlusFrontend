import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateCustomer } from "./ProfileAction";
import * as Yup from "yup";
import { useDispatch,useSelector } from "react-redux";


export default function ProfileChange({customerDetails}) {
    const [isEditing, setIsEditing] = useState(false);
    const phoneNumber = useSelector(
      (state) => state.auth?.user?.customer?.phoneNumber
    );
    const dispatch = useDispatch();
    const [isEditingMobile, setIsEditingMobile] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
  
    const initialValues = {
      fullName: customerDetails.name || '',
      gender: customerDetails.gender || 'male',
      mobile: customerDetails.phoneNumber.slice(-10) || '12345678',
      email: "sagar888299@gmail.com",
    };
  
    const validationSchema = Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      gender: Yup.string().required("Gender is required"),
    });
    const nameAndGender = (values) =>{
      if(isEditing === true){
      dispatch(updateCustomer({phoneNumber : phoneNumber, customerData : values})); }
      setIsEditing(!isEditing)
      console.log(values);
    }
    const onSubmit = (values) => {
      console.log(values);
      
    };
  return (
    <div className="col-span-8 mx-auto p-6 shadow-lg rounded-lg">
    <h1 className="text-2xl mb-6 font-semibold underline">Personal Information</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange }) => (
        <Form className="space-y-4 text-left">
          <div className="py-4 border-b">
            <div className="py-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Full Name
                </label>
                <button
                  type="button"
                  onClick={() => nameAndGender(values)}
                  className="text-blue-500 font-medium mb-2"
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
              <Field
                type="text"
                id="fullName"
                name="fullName"
                disabled={!isEditing}
                className={`lg:w-96 md:w-96 w-full px-4 py-2 border ${
                  isEditing ? "border-blue-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${
                  isEditing ? "focus:ring-blue-500" : ""
                }`}
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>

            <div className="">
              <label className="block text-gray-700 font-medium mb-2">
                Gender
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    name="gender"
                    value="male"
                    disabled={!isEditing}
                    className="form-radio"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    name="gender"
                    value="female"
                    disabled={!isEditing}
                    className="form-radio"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>
          </div>
          <div className="py-4 border-b">
            <div className="flex items-center justify-between">
              <label className="block text-gray-700 font-medium mb-2">
                Mobile
              </label>
              <button
                type="button"
                onClick={() => setIsEditingMobile(!isEditingMobile)}
                className="text-blue-500 font-medium mb-2"
              >
                {isEditingMobile ? "Save" : "Edit"}
              </button>
            </div>
            <Field
              type="text"
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              disabled={!isEditingMobile}
              className={`lg:w-96 md:w-96 w-full py-2 border ${
                isEditingMobile ? "border-blue-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 ${
                isEditingMobile ? "focus:ring-blue-500" : ""
              }`}
            />
          </div>
          <div className="py-4 border-b">
            <div className="flex items-center justify-between">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <button
                type="button"
                onClick={() => setIsEditingEmail(!isEditingEmail)}
                className="text-blue-500 font-medium mb-2"
              >
                {isEditingEmail ? "Save" : "Edit"}
              </button>
            </div>
            <Field
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              disabled={!isEditingEmail}
              className={`lg:w-96 md:w-96 w-full py-2 border ${
                isEditingEmail ? "border-blue-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 ${
                isEditingEmail ? "focus:ring-blue-500" : ""
              }`}
            />
          </div>
        </Form>
      )}
    </Formik>

    {/* FAQ Section */}
    <div className="mt-10 text-left">
      <h2 className="text-xl font-semibold mb-4">FAQs</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-800">
            What happens when I update my email address (or mobile number)?
          </h3>
          <p className="text-gray-600">
            Your login email id (or mobile number) changes, likewise. You'll
            receive all your account-related communication on your updated
            email address (or mobile number).
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-800">
            When will my account be updated with the new email address (or
            mobile number)?
          </h3>
          <p className="text-gray-600">
            It happens as soon as you confirm the verification code sent to
            your email (or mobile) and save the changes.
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-800">
            What happens to my existing account when I update my email
            address (or mobile number)?
          </h3>
          <p className="text-gray-600">
            Updating your email address (or mobile number) doesn't
            invalidate your account. Your account remains fully functional.
            You'll continue seeing your Order history, saved information,
            and personal details.
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

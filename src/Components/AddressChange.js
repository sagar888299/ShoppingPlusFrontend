import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateCustomer } from "./ProfileAction";
import { useDispatch,useSelector } from "react-redux";

export default function AddressChange( {customerDetails}) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const phoneNumber = useSelector(
    (state) => state.auth?.user?.customer?.phoneNumber
  );

  const initialValues = {
    addressLine1: customerDetails.addressLine1 || "Add address here .....",
    addressLine2: customerDetails.addressLine2 || "Add address here .....",
    locality : customerDetails.locality || "Add locality here .....",
    city: customerDetails.city || "Add city here .....",
    state: customerDetails.state || "Add state here .....",
    pinCode: customerDetails.pinCode || 12345 ,
  };

  const validationSchema = Yup.object({
    addressLine1: Yup.string().required("Address Line 1 is required"),
    addressLine2: Yup.string(),
    locality: Yup.string(),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^\d{6}$/, "Pincode must be 6 digits"),
  });

  const handleSubmit = (values) => {
    if(isEditing === true){
      dispatch(updateCustomer({phoneNumber : phoneNumber, customerData : values})); }
    setIsEditing(!isEditing)
    console.log(values);
  };

  const onSubmit = (values) => {
    console.log(values);
    
  };

  return (
      <div className="col-span-7 mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl mb-6 font-semibold underline">Address Information</h1>
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
                      htmlFor="addressLine1"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Address Line 1
                    </label>
                    <button
                      type="submit"
                      onClick={() => handleSubmit(values)}
                      className="text-blue-500 font-medium mb-2"
                    >
                      {isEditing ? "Save" : "Edit"}
                    </button>
                  </div>
                  <Field
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    disabled={!isEditing}
                    className={`lg:w-96 md:w-96 w-full px-4 py-2 border ${
                      isEditing ? "border-blue-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 ${
                      isEditing ? "focus:ring-blue-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="addressLine1"
                    component="div"
                    className="text-red-500 mt-2"
                  />
                </div>

                <div className="py-2">
                  <label
                    htmlFor="addressLine2"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Address Line 2
                  </label>
                  <Field
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    disabled={!isEditing}
                    className={`lg:w-96 md:w-96 w-full px-4 py-2 border ${
                      isEditing ? "border-blue-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 ${
                      isEditing ? "focus:ring-blue-500" : ""
                    }`}
                  />
                </div>

                <div className="py-2">
                  <label
                    htmlFor="locality"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Locality
                  </label>
                  <Field
                    type="text"
                    id="locality"
                    name="locality"
                    disabled={!isEditing}
                    className={`lg:w-96 md:w-96 w-full px-4 py-2 border ${
                      isEditing ? "border-blue-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 ${
                      isEditing ? "focus:ring-blue-500" : ""
                    }`}
                  />
                </div>

                <div className="py-2">
                  <label
                    htmlFor="city"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    City
                  </label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    disabled={!isEditing}
                    className={`lg:w-96 md:w-96 w-full px-4 py-2 border ${
                      isEditing ? "border-blue-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 ${
                      isEditing ? "focus:ring-blue-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 mt-2"
                  />
                </div>

                <div className="py-2">
                  <label
                    htmlFor="state"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    State
                  </label>
                  <Field
                    type="text"
                    id="state"
                    name="state"
                    disabled={!isEditing}
                    className={`lg:w-96 md:w-96 w-full px-4 py-2 border ${
                      isEditing ? "border-blue-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 ${
                      isEditing ? "focus:ring-blue-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-red-500 mt-2"
                  />
                </div>

                <div className="py-2">
                  <label
                    htmlFor="pinCode"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Pincode
                  </label>
                  <Field
                    type="number"
                    id="pinCode"
                    name="pinCode"
                    disabled={!isEditing}
                    className={`lg:w-96 md:w-96 w-full px-4 py-2 border ${
                      isEditing ? "border-blue-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 ${
                      isEditing ? "focus:ring-blue-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="pincode"
                    component="div"
                    className="text-red-500 mt-2"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
  );
}


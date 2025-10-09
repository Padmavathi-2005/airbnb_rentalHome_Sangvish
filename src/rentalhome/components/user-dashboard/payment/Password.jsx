import React, { useState } from "react";
import { motion } from "framer-motion";

// Reusable password input field component
export function PasswordInput({ label, name, value, onChange, error }) {
  return (
    <motion.label
      htmlFor={name}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
      className="block font-semibold text-[16px] text-gray-700 mb-5"
    >
      {label}
      <input
        id={name}
        name={name}
        type="password"
        value={value}
        onChange={onChange}
        className={`block mt-2 w-full rounded-full px-5 py-2 text-base outline-none bg-white border-[2px]
          focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-none ${
            error ? "border-red-500 focus:ring-red-500" : "border border-gray-200"
          }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </motion.label>
  );
}

// Main password form component
export default function PasswordForm() {
  const [values, setValues] = useState({
    oldPwd: "",
    newPwd: "",
    confirmPwd: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!values.oldPwd) errs.oldPwd = "Old password is required";
    if (!values.newPwd) errs.newPwd = "New password is required";
    else if (values.newPwd.length < 6) errs.newPwd = "Minimum 6 characters required";
    if (!values.confirmPwd) errs.confirmPwd = "Please confirm password";
    else if (values.confirmPwd !== values.newPwd) errs.confirmPwd = "Passwords do not match";
    return errs;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      alert("Password updated");
      setValues({ oldPwd: "", newPwd: "", confirmPwd: "" });
    }
  };

  return (
    <div className="w-3/4 mx-auto bg-white shadow-md p-6 rounded-3xl space-y-7">
      <form onSubmit={handleSubmit} noValidate>
        <PasswordInput
          label="Old Password"
          name="oldPwd"
          value={values.oldPwd}
          onChange={handleChange}
          error={errors.oldPwd}
        />
        <div className="grid md:grid-cols-2 gap-4"> 

        
        <PasswordInput
          label="New Password"
          name="newPwd"
          value={values.newPwd}
          onChange={handleChange}
          error={errors.newPwd}
        />
        <PasswordInput
          label="Confirm Password"
          name="confirmPwd"
          value={values.confirmPwd}
          onChange={handleChange}
          error={errors.confirmPwd}
        />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="bg-pink-500 text-white rounded-full px-6 py-2 font-semibold shadow-md transition focus:ring-2 focus:ring-pink-300 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={Object.keys(validate()).length > 0}
        >
          Update Password
        </motion.button>
      </form>
    </div>
  );
}

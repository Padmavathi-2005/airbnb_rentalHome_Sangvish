import React, { useState } from "react";
import { MapPin, Mail, User } from "lucide-react";
import FormInput from "./FormInput";

export default function ExampleForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <FormInput
        label="Full Name"
        icon={User}
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        required
      />

      <FormInput
        label="Email Address"
        icon={Mail}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />

      <FormInput
        label="Location"
        icon={MapPin}
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Enter city or address"
      />
    </div>
  );
}

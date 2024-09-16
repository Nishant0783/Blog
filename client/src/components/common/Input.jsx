// src/components/common/Input.jsx
const Input = ({ label, type = "text", value, onChange, placeholder }) => (
    <div className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500"
        />
    </div>
);

export default Input;

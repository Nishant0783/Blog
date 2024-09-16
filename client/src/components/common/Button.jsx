// src/components/common/Button.jsx
const Button = ({ children, onClick, variant = "primary", ...props }) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium";
    const variants = {
        primary: "bg-blue-500 text-white",
        secondary: "bg-gray-500 text-white",
    };

    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`} {...props}>
            {children}
        </button>
    );
};

export default Button;

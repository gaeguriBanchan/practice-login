import { MdOutlineMailOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa';

interface IFormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  name: string;
  img: string;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors = [],
  name,
  img,
}: IFormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center h-10 bg-white p-2 rounded-3xl border-2 border-black gap-1 ">
        {img === 'email' ? <MdOutlineMailOutline /> : null}
        {img === 'username' ? <FaRegUser /> : null}
        {img === 'password' ? <FaKey /> : null}
        <input
          className="focus:outline-none"
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
        />
      </div>
      <div className="flex flex-col">
        {errors.map((error, index) => (
          <span key={index} className="text-red-500">
            {error}
          </span>
        ))}
      </div>
    </div>
  );
}

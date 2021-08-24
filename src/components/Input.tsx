interface InputProps {
    placeholder: string;
    name: string;
    formRef: any;
  }
  
  export default function Input({ placeholder, name, formRef }: InputProps) {
    return (
      <input
        className="rounded p-4 text-xl w-full"
        name={name}
        placeholder={placeholder}
        ref={formRef}
      />
    );
  }
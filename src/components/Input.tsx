interface InputProps {
    text: string;
    type?: 'text' | 'number';
    value: any;
    readOnly?: boolean;
    handle?: (value: any) => void;
  }
  
  export default function Input(props: InputProps) {
    return (
      <div
        className={`
          flex flex-col
        `}
      >
        <label className="mb-2 text-sm">{props.text}</label>
        <input
          type={props.type ?? 'text'}
          value={props.value}
          readOnly={props.readOnly}
          onChange={(e) => props.handle?.(e.target.value)}
          className={`
            border-2 border-blue-500 rounded-md duration-150
            bg-purple-50 px-4 py-2 mb-4
            focus:outline-none
            ${props.readOnly ? '' : 'focus:bg-white'}
          `}
        />
      </div>
    );
  }
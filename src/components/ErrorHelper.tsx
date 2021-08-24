interface ErrorHelperProps {
    errorMessage: string;
  }
  
  export default function ErrorHelper({ errorMessage }: ErrorHelperProps) {
    return <p className="text-red-300 mt-1">{errorMessage}</p>;
  }
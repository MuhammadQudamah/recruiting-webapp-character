interface AlertModalProps {
    message: string;
    show: boolean;
  }
  
  export const AlertModal = ({ message, show }: AlertModalProps) => (
    show ? (
      <div className="alert-overlay">
        <div className="alert-box">
          {message}
        </div>
      </div>
    ) : null
  );
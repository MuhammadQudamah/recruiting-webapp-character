interface ActionButtonsProps {
    onSave: () => void;
    onLoad: () => void;
    onReset: () => void;
  }
  
  export const ActionButtons = ({ onSave, onLoad, onReset }: ActionButtonsProps) => (
    <div className="action-buttons">
      <button onClick={onSave}>Save Character</button>
      <button onClick={onLoad}>Load Character</button>
      <button 
        onClick={onReset}
        className="reset-button"
      >
        Reset All Characters
      </button>
    </div>
  );
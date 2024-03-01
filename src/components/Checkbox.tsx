import { useEffect, useState } from 'react';
import checkIcon from '../assets/images/icon-check.svg';

type CheckboxProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = () => onChange(!isChecked);
  return (
    <div
      className={`checkbox ${isChecked ? 'checked' : ''}`}
      onClick={() => {
        setIsChecked((prev) => !prev);
        handleClick();
      }}
    >
      <img className="checkIcon" src={checkIcon} alt="" />
    </div>
  );
};
export default Checkbox;

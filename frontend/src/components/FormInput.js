import { useState } from "react";

import "../styles/Form.css";

const FormInput = (props) => {
  const [checked, setChecked] = useState(false);
  const { errormessage, onChange, id, ...input } = props;

  const handleBlur = (e) => {
    setChecked(true);
  };

  return (
    <>
      <input
        {...input}
        onChange={onChange}
        onBlur={handleBlur}
        ischecked={checked.toString()}
      />
      <span>{errormessage}</span>
    </>
  );
};

export default FormInput;

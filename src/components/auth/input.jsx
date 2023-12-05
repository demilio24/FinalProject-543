import React from "react";
import { TextField, InputAdornment } from "@mui/material";

const inputStyle = {
  "& input::-webkit-outer-spin-button,\n input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: "0",
  },
  width: "100%",
  "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
    color: "white",
  },
  "& .css-bpeome-MuiSvgIcon-root-MuiSelect-icon": {
    color: "white",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #000000",
    },
    "&:hover fieldset": {
      border: "1px solid #000000",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #000000",
    },
  },
};

const CustomInput = (props) => {
  return <TextField {...props} sx={inputStyle} />;
};

export default CustomInput;

export const CustomField = ({ placeholder, image, readOnly, onChange }) => {
  return (
    <CustomInput
      type="text"
      required
      placeholder={placeholder}
      onChange={onChange}
      InputProps={{
        readOnly,
        endAdornment: (
          <InputAdornment position="start">
            <img src={image} alt="logo" width="30px" />
          </InputAdornment>
        ),
      }}
    />
  );
};

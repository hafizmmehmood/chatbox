import { Button } from '@mui/material';

const CustomButton = ({ value, type = 'submit', onClick = null }) => {
  return (
    <Button
      variant="contained"
      type={type}
      onClick={onClick ? onClick : undefined}
      className="text-sm font-semibold! bg-indigo-100">
      {value}
    </Button>
  );
};

export default CustomButton;

import { useState } from "react";
import { ReactComponent as InfoIcon } from '../../Icons/Info.svg';
import Popover from '@mui/material/Popover';

export default function ChangePopup() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
        <button
            onClick={handleClick}
            className="w-[16px] text-warning hover:brightness-90 transition-all"
        >
            <InfoIcon />
        </button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        
      </Popover>
    </div>
  );
}
import { useState } from "react";
import { ReactComponent as InfoIcon } from '../../Icons/Info.svg';
import Popover from '@mui/material/Popover';
import { Change } from "../../../types/newSchools.types";

export default function ChangePopup({
    change,
}: {
    change: Change
}) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className="w-full max-w-[300px] flex flex-col gap-8 justify-start items-start p-6">
            <div className="flex flex-col gap-1 justify-start items-start">
                <label className="text-[14px] font-medium text-placeholder">Type</label>
                <p>{change.type}</p>
            </div>
            {change.type === 'modified' && change.original !== undefined && (
                <div className="flex flex-col gap-1 justify-start items-start">
                    <label className="text-[14px] font-medium text-placeholder">Original Value</label>
                    <p>{change.original !== '' ? change.original : 'No value'}</p>
                </div>
            )}
            {change.type === 'modified' && change.modified !== undefined && (
                <div className="flex flex-col gap-1 justify-start items-start">
                    <label className="text-[14px] font-medium text-placeholder">Updated Value</label>
                    <p>{change.modified !== '' ? change.modified : 'No value'}</p>
                </div>
            )}
            <div className="flex flex-col gap-1 justify-start items-start">
                <label className="text-[14px] font-medium text-placeholder">Modified By</label>
                <p>{change.editedBy}</p>
            </div>
            <div className="flex flex-col gap-1 justify-start items-start">
                <label className="text-[14px] font-medium text-placeholder">Date Modified</label>
                <p>{new Date(change.timestamp).toLocaleDateString()}</p>
            </div>
        </div>
      </Popover>
    </div>
  );
}
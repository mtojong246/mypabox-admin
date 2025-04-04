import { useState, MouseEvent } from "react";
import { ReactComponent as InfoIcon } from '../../Icons/Info.svg';
import Popover from '@mui/material/Popover';
import { Change } from "../../../types/newSchools.types";
import Button from "../../Buttons/Button";


export default function ChangePopup({
    change,
    name,
    validateIndividualChange,
    revertIndividualChange,
}: {
    change: Change,
    name: string,
    validateIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
    revertIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
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

  const ChangeValueComponent = ({ value }: { value: string | number | boolean | {
    [key: string] : any
} }) => {

    if (typeof value === 'object') {
      return (
        <>
        {Object.entries(value).map(([key, value]) => (
          <p><span className="font-semibold">{key}: </span>{value}</p>
        ))}
        </>
      )
    } else {
      return (
        <p>{value !== '' ? value : 'No value'}</p>
      )
    }
    
  }

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
        <div className="w-full flex flex-col gap-8 justify-start items-start p-6">
            <div className="flex flex-col gap-1 justify-start items-start">
                <label className="text-[14px] font-medium text-placeholder">Type</label>
                <p>{change.type}</p>
            </div>
            {change.type === 'modified' && change.original !== undefined && (
                <div className="flex flex-col gap-1 justify-start items-start">
                    <label className="text-[14px] font-medium text-placeholder">Original Value</label>
                    {/* <p>{change.original !== '' ? change.original : 'No value'}</p> */}
                    <ChangeValueComponent value={change.original}/>
                </div>
            )}
            {change.type === 'modified' && change.modified !== undefined && (
                <div className="flex flex-col gap-1 justify-start items-start">
                    <label className="text-[14px] font-medium text-placeholder">Updated Value</label>
                    {/* <p>{change.modified !== '' ? change.modified : 'No value'}</p> */}
                    <ChangeValueComponent value={change.modified}/>
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

            {revertIndividualChange && validateIndividualChange && (
              <div className="flex w-full justify-between items-center gap-4">
                <Button 
                    type="warning"
                    styling="outline"
                    label="Reject"
                    action={(e: MouseEvent<HTMLButtonElement>) => {revertIndividualChange(e, name, change); handleClose()}}
                />
                <Button 
                    type="success"
                    styling="outline"
                    label="Accept"
                    action={(e: MouseEvent<HTMLButtonElement>) => {validateIndividualChange(e, name, change); handleClose()}}
                />
            </div>
            )}
        </div>
      </Popover>
    </div>
  );
}
import { memo, useState, useRef } from 'react';
import './ColumnSelector.css';
import { SelectColumnsButton } from '../SelectColumnsButton';
import { Modal } from '../Modal';

interface Props {
  allColumns: string[];
  selected: string[];
  onChange: (col: string) => void;
}

export const ColumnSelector = memo(function ColumnSelector({
  allColumns,
  selected,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const required = ['population', 'co2', 'co2_per_capita'];
  const optional = allColumns.filter(
    (col) => !required.includes(col) && col !== 'year'
  );

  return (
    <>
      <SelectColumnsButton
        buttonRef={buttonRef}
        onClick={() => setOpen(true)}
      />

      <Modal
        isShowing={open}
        hide={() => setOpen(false)}
        triggerRef={buttonRef}
      >
        <div className="column-selector">
          <h2>Choose Additional Columns</h2>
          <div>
            {optional.map((col) => (
              <label key={col}>
                <input
                  type="checkbox"
                  checked={selected.includes(col)}
                  onChange={() => onChange(col)}
                />
                {col.replace(/_/g, ' ')}
              </label>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
});

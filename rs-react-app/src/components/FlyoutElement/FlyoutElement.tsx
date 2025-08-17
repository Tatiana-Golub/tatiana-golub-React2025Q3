import { useDispatch, useSelector } from 'react-redux';
import styles from './FlyoutElement.module.css';
import {
  selectSelectedItemsIds,
  unselectAll,
} from '../../store/slices/cardSlice';
import type { FlyoutElementProps } from '../../types';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { filterData } from '../../utils/utils';

function FlyoutElement({ items }: FlyoutElementProps) {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const t = useTranslations('Flyout');
  const dispatch = useDispatch();
  const selectedItemsIds = useSelector(selectSelectedItemsIds);

  function onUnselectClick() {
    dispatch(unselectAll());
  }

  async function handleDownload() {
    const response = await fetch('/api/export-csv', {
      method: 'POST',
      body: JSON.stringify(filterData(selectedItemsIds, items)),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = `${selectedItemsCount}_items.csv`;
      linkRef.current.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  }

  const selectedItemsCount = selectedItemsIds.length;

  if (selectedItemsCount === 0) return null;

  return (
    <div className={styles.flyoutElement}>
      <span className={styles.selectedItemsInfo}>
        {t('message')}: {selectedItemsCount}
      </span>
      <div className={styles.flyoutButtons}>
        <button className={styles.flyoutButton} onClick={onUnselectClick}>
          {t('unselect')}
        </button>
        <button
          className={`${styles.flyoutButton} ${styles.downloadButton}`}
          onClick={handleDownload}
        >
          {t('download')}
        </button>
        <a ref={linkRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export default FlyoutElement;

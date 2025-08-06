import styles from './AboutLink.module.css';

export function getClassname({ isActive }: { isActive: boolean }): string {
  return isActive
    ? `${styles.aboutLink} ${styles.active}`
    : `${styles.aboutLink}`;
}

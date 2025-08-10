import BackButton from '../BackButton';
import styles from './About.module.css';

function About() {
  return (
    <div className={styles.about}>
      <h1 className={styles.aboutTitle}>About Breeds Cat-alog App</h1>
      <p className={styles.aboutDescription}>
        This application is developed by <strong>Tatiana Golub</strong>, a
        passionate English translator and web developer.
      </p>
      <p className={styles.aboutDescription}>
        It is part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          className={styles.schoolLink}
          rel="noreferrer"
        >
          RS School React Course
        </a>{' '}
        task.
      </p>
      <BackButton />
    </div>
  );
}

export default About;

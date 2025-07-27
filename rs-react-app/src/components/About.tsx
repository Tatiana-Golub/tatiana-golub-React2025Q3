import BackButton from './BackButton';

function About() {
  return (
    <div className="about">
      <h1 className="about-title">About Breeds Cat-alog App</h1>
      <p className="about-description">
        This application is developed by <strong>Tatiana Golub</strong>, a
        passionate English translator and web developer.
      </p>
      <p className="about-description">
        It is part of the {}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          style={{ color: '#5c6bc0' }}
          rel="noreferrer"
        >
          RS School React Course
        </a>{' '}
        {}
        task.
      </p>
      <BackButton />
    </div>
  );
}

export default About;

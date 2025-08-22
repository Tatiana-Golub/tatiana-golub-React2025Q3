import { useRef } from 'react';
import './UncontrolledForm.css';

interface IFormInput {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  terms: boolean;
}

export function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRefs = {
    male: useRef<HTMLInputElement>(null),
    female: useRef<HTMLInputElement>(null),
  };
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  return (
    <div className="form-wrapper">
      <form className="form-container">
        <div className="form-group full-width">
          <label htmlFor="name">Name</label>
          <input ref={nameRef} id="name" name="name" type="text" />
        </div>

        <div className="form-group half-width">
          <label htmlFor="age">Age</label>
          <input ref={ageRef} id="age" name="age" type="number" />
        </div>

        <div className="form-group half-width">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} id="email" name="email" type="email" />
        </div>

        <div className="form-group half-width">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
          />
        </div>

        <div className="form-group half-width">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            ref={confirmPasswordRef}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
          />
        </div>

        <div className="radio-group full-width">
          <p className="radio-title">Gender</p>
          <div className="radio-options">
            <label htmlFor="male" className="radio-option">
              <input
                ref={genderRefs.male}
                id="male"
                name="gender"
                type="radio"
                value="male"
              />
              Male
            </label>
            <label htmlFor="female" className="radio-option">
              <input
                ref={genderRefs.female}
                id="female"
                name="gender"
                type="radio"
                value="female"
              />
              Female
            </label>
          </div>
        </div>

        <div className="country-group full-width">
          <label htmlFor="country">Country</label>
          <select ref={countryRef} id="country" name="country">
            <option value="">--Select Country--</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="picture">Upload Picture</label>
          <div className="file-input">
            <input
              ref={pictureRef}
              type="file"
              id="picture"
              name="picture"
              accept=".png, .jpeg, .jpg"
            />
            <span className="file-button">Choose File</span>
            <span className="file-name">No file chosen</span>
          </div>
        </div>

        <div className="checkbox-group">
          <label htmlFor="terms">
            <input ref={termsRef} id="terms" name="terms" type="checkbox" />
            Accept Terms & Conditions.
          </label>
        </div>

        <div className="form-submit full-width">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

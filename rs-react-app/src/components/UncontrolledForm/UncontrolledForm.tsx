import { useRef, useState } from 'react';
import '../shared/Form.css';
import * as yup from 'yup';
import { IFormInput } from '../../types/interface';
import { schema } from '../../utils/validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCountries,
  setUncontrolledFormData,
} from '../../store/slices/formSlice';
import { formDataToUserData } from '../../utils/dataConverter';

interface UncontrolledFormProps {
  onSubmitSuccess?: () => void;
}

export function UncontrolledForm({ onSubmitSuccess }: UncontrolledFormProps) {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const countries = useSelector(selectCountries);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const gender = genderRefs.male.current?.checked
      ? 'male'
      : genderRefs.female.current?.checked
        ? 'female'
        : '';

    const file = imageRef.current?.files || null;

    const formData: IFormInput = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value ? Number(ageRef.current.value) : 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender,
      country: countryRef.current?.value || '',
      terms: termsRef.current?.checked || false,
      image: file as FileList,
    };

    try {
      await schema.validate(formData, { abortEarly: false });
      const userData = await formDataToUserData(formData);
      dispatch(setUncontrolledFormData(userData));
      onSubmitSuccess?.();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Uncontrolled Form</h2>
        <div className="form-group full-width">
          <label htmlFor="name">Name</label>
          <input ref={nameRef} id="name" name="name" type="text" />
          {errors.name ? (
            <p className="error" data-testid="name-error">
              {errors.name}
            </p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="form-group half-width">
          <label htmlFor="age">Age</label>
          <input ref={ageRef} id="age" name="age" type="number" />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>

        <div className="form-group half-width">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} id="email" name="email" type="email" />
          {errors.email ? (
            <p className="error" data-testid="email-error">
              {errors.email}
            </p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="form-group half-width">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
          />
          {errors.password ? (
            <p className="password-error" data-testid="password-error">
              {errors.password}
            </p>
          ) : (
            <p className="password-error">&nbsp;</p>
          )}
        </div>

        <div className="form-group half-width">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            ref={confirmPasswordRef}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
          />
          {errors.confirmPassword ? (
            <p className="error">{errors.confirmPassword}</p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
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
          {errors.gender ? (
            <p className="error">{errors.gender}</p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="country-group full-width">
          <label htmlFor="country">Country</label>
          <select ref={countryRef} id="country" name="country">
            {countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
          {errors.counry ? (
            <p className="error">{errors.country}</p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="form-group full-width">
          <label htmlFor="image">Upload Image</label>
          <div className="file-input">
            <input
              ref={imageRef}
              type="file"
              id="image"
              name="image"
              accept=".png, .jpeg, .jpg"
              onChange={handleFileChange}
            />
            <span className="file-button">Choose File</span>
            <span className="file-name">
              {selectedFile ? 'File uploaded' : 'Upload a file'}
            </span>
          </div>
          {errors.image ? (
            <p className="error">{errors.image}</p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="checkbox-group">
          <label htmlFor="terms">
            <input ref={termsRef} id="terms" name="terms" type="checkbox" />
            Accept Terms & Conditions.
          </label>
          {errors.terms ? (
            <p className="error">{errors.terms}</p>
          ) : (
            <p className="error">&nbsp;</p>
          )}
        </div>

        <div className="form-submit full-width">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

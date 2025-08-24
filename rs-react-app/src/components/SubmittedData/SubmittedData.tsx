import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { clearHighlight } from '../../store/slices/formSlice';
import { useEffect } from 'react';
import './SubmittedData.css';

export function SubmittedData() {
  const uncontrolledData = useSelector(
    (state: RootState) => state.form.uncontrolledFormData
  );
  const reactHookData = useSelector(
    (state: RootState) => state.form.reactHookFormData
  );
  const highlight = useSelector((state: RootState) => state.form.highlight);
  const dispatch = useDispatch();

  useEffect(() => {
    if (highlight) {
      const timer = setTimeout(() => {
        dispatch(clearHighlight());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [highlight, dispatch]);

  return (
    <div className="tiles">
      {uncontrolledData && (
        <div
          className={`tile ${highlight === 'uncontrolled' ? 'highlight' : ''}`}
        >
          <h3 className="data-title">Uncontrolled Form Data</h3>
          <div className="item-container">
            <strong>Name:</strong> {uncontrolledData.name}
          </div>
          <div className="item-container">
            <strong>Age:</strong> {uncontrolledData.age}
          </div>
          <div className="item-container">
            <strong>Email:</strong> {uncontrolledData.email}
          </div>
          <div className="item-container">
            <strong>Password:</strong> {uncontrolledData.password}
          </div>
          <div className="item-container">
            <strong> Confirmed password:</strong>{' '}
            {uncontrolledData.confirmPassword}
          </div>
          <div className="item-container">
            <strong>Gender:</strong> {uncontrolledData.gender}
          </div>
          <div className="item-container">
            <strong>Country:</strong> {uncontrolledData.country}
          </div>
          <div className="item-container">
            <strong>Terms accepted:</strong>{' '}
            {uncontrolledData.terms ? 'Yes' : 'No'}
          </div>
          <div className="item-container">
            <strong>Image:</strong>{' '}
            <div className="image-preview">
              <img src={uncontrolledData.image} alt={'user image'} />
            </div>
          </div>
        </div>
      )}
      {reactHookData && (
        <div className={`tile ${highlight === 'reactHook' ? 'highlight' : ''}`}>
          <h3 className="data-title">React Hook Form Data</h3>
          <div className="item-container">
            <strong>Name:</strong> {reactHookData.name}
          </div>
          <div className="item-container">
            <strong>Age:</strong> {reactHookData.age}
          </div>
          <div className="item-container">
            <strong>Email:</strong> {reactHookData.email}
          </div>
          <div className="item-container">
            <strong>Password:</strong> {reactHookData.password}
          </div>
          <div className="item-container">
            <strong> Confirmed password:</strong>{' '}
            {reactHookData.confirmPassword}
          </div>
          <div className="item-container">
            <strong>Gender:</strong> {reactHookData.gender}
          </div>
          <div className="item-container">
            <strong>Country:</strong> {reactHookData.country}
          </div>
          <div className="item-container">
            <strong>Terms accepted:</strong>{' '}
            {reactHookData.terms ? 'Yes' : 'No'}
          </div>
          <div className="item-container">
            <strong>Image:</strong>{' '}
            <div className="image-preview">
              <img src={reactHookData.image} alt={'user image'} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

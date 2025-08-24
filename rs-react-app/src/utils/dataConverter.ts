import { IFormInput, IUserData } from '../types/interface';

export const formDataToUserData = async (
  formData: IFormInput
): Promise<IUserData> => {
  const image = formData.image[0];
  const base64Image = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  return {
    name: formData.name,
    age: formData.age,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    gender: formData.gender,
    country: formData.country,
    terms: formData.terms,
    image: base64Image,
  };
};

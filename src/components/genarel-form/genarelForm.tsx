import { useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  age: number;
  gender: string;
  address: { city: string; state: string };
  dob: string; // Changed to string for <input type='date'>
  file: File | null; // Changed to File | null for file input
  skills: { name: string }[];
  agree: boolean;
}

interface Errors {
  fullName?: string;
  email?: string;
  age?: string;
  gender?: string;
  city?: string;
  state?: string;
  dob?: string;
  file?: string;
  skills?: string;
  agree?: string;
}

const GenarelForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    age: 0,
    gender: '',
    address: { city: '', state: '' },
    dob: '', // Initialize as empty string
    file: null, // Initialize as null
    skills: [{ name: '' }],
    agree: false,
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'city' || name === 'state') {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = { ...newSkills[index], name: value };
    setFormData((prev) => ({ ...prev, skills: newSkills }));
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: '' }],
    }));
  };

  const removeSkill = (index: number) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agree: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.age || formData.age <= 0) {
      newErrors.age = 'Valid age is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.address.city) {
      newErrors.city = 'City is required';
    }

    if (!formData.address.state) {
      newErrors.state = 'State is required';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of Birth is required';
    }

    if (formData.file) {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(formData.file.type)) {
        newErrors.file = 'File must be a JPEG, PNG, or PDF';
      }
    }

    if (
      formData.skills.length === 0 ||
      formData.skills.every((skill) => !skill.name)
    ) {
      newErrors.skills = 'At least one non-empty skill is required';
    }

    if (!formData.agree) {
      newErrors.agree = 'You must agree to the terms';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully:', formData);
    } else {
      console.log('Form errors:', newErrors);
    }
  };

  return (
    <div className='flex justify-center'>
      <div>
        <h2 className='underline text-2xl'>General Form</h2>

        <form className='mt-4' onSubmit={handleSubmit}>
          <section className='mt-2'>
            <div>
              <label>Full Name:</label>
            </div>
            <div>
              <input
                type='text'
                className='border border-black'
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className='text-red-500 text-sm'>{errors.fullName}</p>
              )}
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label>Email:</label>
            </div>
            <div>
              <input
                type='email'
                className='border border-black'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email}</p>
              )}
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label>Age:</label>
            </div>
            <div>
              <input
                type='number'
                className='border border-black'
                name='age'
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && (
                <p className='text-red-500 text-sm'>{errors.age}</p>
              )}
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label>Gender:</label>
            </div>
            <div>
              <select
                className='border border-black'
                name='gender'
                value={formData.gender}
                onChange={handleChange}
              >
                <option value=''>Select</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
              {errors.gender && (
                <p className='text-red-500 text-sm'>{errors.gender}</p>
              )}
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label>Address:</label>
            </div>
            <div>
              <label>City:</label>
              <input
                type='text'
                name='city'
                value={formData.address.city}
                onChange={handleChange}
                className='border border-black'
                placeholder='City'
              />
              {errors.city && (
                <p className='text-red-500 text-sm'>{errors.city}</p>
              )}
              <label>State:</label>
              <input
                type='text'
                name='state'
                value={formData.address.state}
                onChange={handleChange}
                className='border border-black'
                placeholder='State'
              />
              {errors.state && (
                <p className='text-red-500 text-sm'>{errors.state}</p>
              )}
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label>DOB:</label>
            </div>
            <div>
              <input
                type='date'
                className='border border-black'
                name='dob'
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && (
                <p className='text-red-500 text-sm'>{errors.dob}</p>
              )}
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label>File:</label>
            </div>
            <div>
              <input
                type='file'
                className='border border-black'
                name='file'
                onChange={handleFileChange}
                accept='image/jpeg,image/png,application/pdf'
              />
              {errors.file && (
                <p className='text-red-500 text-sm'>{errors.file}</p>
              )}
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label>Skills:</label>
            </div>
            {formData.skills.map((skill, index) => (
              <div key={index} className='flex items-center'>
                <input
                  type='text'
                  className='border border-black'
                  value={skill.name}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  placeholder={`Skill ${index + 1}`}
                />
                {formData.skills.length > 1 && (
                  <button
                    type='button'
                    className='ml-2 border border-black'
                    onClick={() => removeSkill(index)}
                  >
                    Remove Skill
                  </button>
                )}
              </div>
            ))}
            {errors.skills && (
              <p className='text-red-500 text-sm'>{errors.skills}</p>
            )}
            <button
              type='button'
              className='border border-black mt-2'
              onClick={addSkill}
            >
              Add Skill
            </button>
          </section>

          <section className='mt-2'>
            <label className='mr-2'>I agree:</label>
            <input
              type='checkbox'
              id='agree'
              className='border border-black'
              checked={formData.agree}
              onChange={handleCheckboxChange}
            />
            {errors.agree && (
              <p className='text-red-500 text-sm'>{errors.agree}</p>
            )}
          </section>

          <button type='submit' className='border border-black mt-4'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenarelForm;

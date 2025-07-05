import { useState } from 'react';

const GenarelForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: 0,
    gender: '',
    address: { city: '', state: '' },
    dob: new Date(),
    file: '',
    skills: [{ name: '' }] as any,
    agree: false,
  });

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
    console.log(`📌 ~ GenarelForm ~ formData:`, formData);
  };

  return (
    <div className='flex justify-center'>
      <div>
        <h2 className='underline text-2xl '>Genarel Form</h2>

        <form action='' className='mt-4' onSubmit={handleSubmit}>
          <section className='mt-2'>
            <div>
              <label htmlFor=''>Full Name:</label>
            </div>
            <div>
              <input
                type='text'
                className='border border-black'
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label htmlFor=''>Email:</label>
            </div>
            <div>
              <input
                type='email'
                className='border border-black'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label htmlFor=''>Age:</label>
            </div>
            <div>
              <input
                type='number'
                className='border border-black'
                name='age'
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label htmlFor=''>Gender:</label>
            </div>
            <div>
              <select
                id=''
                className='border border-black'
                name='gender'
                value={formData.gender}
                onChange={handleChange}
              >
                <option value=''>Select</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label htmlFor=''>Adress:</label>
            </div>
            <div>
              <label htmlFor=''>City:</label>

              <input
                type='text'
                name='city'
                value={formData.address.city}
                onChange={handleChange}
                className='border border-black'
                placeholder='city'
              />

              <label htmlFor=''>State:</label>

              <input
                type='text'
                name='state'
                value={formData.address.state}
                onChange={handleChange}
                className='border border-black'
                placeholder='state'
              />
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label htmlFor=''>DOB:</label>
            </div>
            <div>
              <input
                type='date'
                className='border border-black'
                name='dob'
                value={formData.dob as any}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label htmlFor=''>File:</label>
            </div>
            <div>
              <input
                type='file'
                className='border border-black'
                name='file'
                value={formData.file}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label>Skills:</label>
            </div>
            {formData.skills.map((skill: any, index: any) => (
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
                    onClick={() => removeSkill(index)} // Pass the correct index
                  >
                    Remove Skill
                  </button>
                )}
              </div>
            ))}
            <button
              type='button'
              className='border border-black mt-2'
              onClick={addSkill}
            >
              Add Skill
            </button>
          </section>

          <section className='mt-2'>
            <label htmlFor='' className='mr-2'>
              I agree:
            </label>

            <input
              type='checkbox'
              id='agree'
              className='border border-black'
              checked={formData.agree}
              onChange={handleCheckboxChange}
            />
          </section>

          <button className='border border-black'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default GenarelForm;

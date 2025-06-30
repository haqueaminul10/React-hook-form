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
    skill: [],
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
              <label htmlFor=''>Skill:</label>
            </div>
            <div>
              <input type='text' className='border border-black ' />
              <button className='border border-black ml-2'>Add Skill</button>
            </div>
          </section>

          <section className='mt-2'>
            <label htmlFor='' className='mr-2'>
              I agree:
            </label>

            <input type='checkbox' className='border border-black ' />
          </section>

          <button className='border border-black'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default GenarelForm;

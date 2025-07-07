import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';

interface Skill {
  name: string;
}
interface formData {
  fullName: string;
  email: string;
  age: number;
  gender: string;
  address: {
    city: string;
    state: string;
  };
  dob: Date;
  file: string;
  skills: Skill[];
  agree: Boolean;
}

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<formData>({
    defaultValues: {
      fullName: '',
      email: '',
      age: undefined,
      gender: '',
      address: { city: '', state: '' },
      dob: new Date(),
      file: '',
      skills: [{ name: '' }],
      agree: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const onSubmit: SubmitHandler<formData> = (data) => {
    try {
      console.log(`📌 ~ ReactHookForm ~ data:`, data);
    } catch (err) {
      console.log(`📌 ~ ReactHookForm ~ err:`, err);
    }
  };

  console.log(watch('fullName'));

  return (
    <div className='flex justify-center'>
      <div>
        <h2 className='text-2xl underline'>React-Hook-Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className='mt-2'>
            <div>
              <label>Full Name:</label>
            </div>
            <div>
              <input
                type='text'
                className='border border-black'
                {...register('fullName', { required: 'Full Name is required' })}
              />
              {errors.fullName && (
                <p className='text-red-500'>{errors.fullName.message}</p>
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
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
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
                {...register('age', {
                  required: 'Age is required',
                  min: { value: 1, message: 'Age must be greater than 0' },
                  valueAsNumber: true,
                })}
              />
              {errors.age && (
                <p className='text-red-500'>{errors.age.message}</p>
              )}
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label htmlFor='gender'>Gender:</label>
            </div>
            <div>
              <select
                id='gender'
                className='border border-black'
                {...register('gender', { required: 'Gender is required' })}
              >
                <option value=''>Select...</option>

                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='others'>Others</option>
              </select>
              {errors.gender && (
                <p className='text-red-500'>{errors.gender.message}</p>
              )}
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label htmlFor='address'>Address:</label>
            </div>

            <div>
              <label>City:</label>
              <input
                type='text'
                className='border border-black'
                {...register('address.city', { required: 'City is required' })}
              />
              {errors.address?.city && (
                <p className='text-red-500'>{errors.address.city.message}</p>
              )}
              <label>State:</label>
              <input
                type='text'
                className='border border-black'
                {...register('address.state', {
                  required: 'state is required',
                })}
              />
              {errors.address?.state && (
                <p className='text-red-500'>{errors.address.state.message}</p>
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
                {...register('dob', { required: 'DOB is required' })}
              />
              {errors.dob && (
                <p className='text-red-500 '>{errors.dob.message}</p>
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
                {...register('file', { required: 'File need to uploaded' })}
              />
              {errors.file && (
                <p className='text-red-500 text-sm'>{errors.file.message}</p>
              )}
            </div>
          </section>

          <section className='mt-2'>
            <div>
              <label htmlFor='skill'>Skills:</label>

              {fields.map((item, index) => (
                <div key={item.id} className='flex items-center'>
                  <input
                    type='text'
                    className='border border-black'
                    {...register(`skills.${index}.name`, {
                      required: 'skill is required',
                    })}
                  />

                  {errors.skills?.[index]?.name && (
                    <p style={{ color: 'orangered' }}>
                      {errors.skills[index].name.message}
                    </p>
                  )}

                  {fields.length > 1 && (
                    <button
                      type='button'
                      className='ml-2 border border-black'
                      onClick={() => remove(index)}
                    >
                      Remove Skill
                    </button>
                  )}
                </div>
              ))}
              <button
                type='button'
                className='border border-black mt-2'
                onClick={() => append({ name: '' })}
              >
                Add Hobby
              </button>
            </div>
          </section>

          <section className='mt-2'>
            <label className='mr-2'>I agree:</label>
            <input
              type='checkbox'
              id='agree'
              {...register('agree', { required: 'Do you agree' })}
            />
            {errors.agree && (
              <p className='text-red-500 text-sm'>{errors.agree.message}</p>
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

export default ReactHookForm;

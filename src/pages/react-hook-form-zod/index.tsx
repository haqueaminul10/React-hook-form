import { fields } from '@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  fullName: z.string().min(1, 'First Name is required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(1, 'age is required'),
  gender: z.enum(['male', 'female', 'other'], {
    message: 'gender is required',
  }),
  address: z.object({
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
  }),
  dob: z.date({ message: 'Date of Birth is required' }),
  file: z.string().optional(),
  skills: z.array(z.object({ name: z.string().min(1, 'Skill is required') })),
  agree: z
    .boolean()
    .refine((val) => val === true, { message: 'You must agree to the terms' }),
});

type FormData = z.infer<typeof formSchema>;

const ReactHookFormZod = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      age: 0,
      gender: undefined,
      address: { city: '', state: '' },
      dob: undefined,
      file: '',
      skills: [{ name: '' }],
      agree: false,
    },
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(`📌 ~ ReactHookFormZod ~ data:`, data);
  };
  return (
    <div className='flex justify-center'>
      <div>
        <h2 className='text-2xl underline'>React Hook Form(Zod)</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <section className='mt-2'>
            <div>
              <label>Full Name:</label>
            </div>
            <div>
              <input
                type='text'
                className='border border-black'
                {...register('fullName')}
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
                {...register('email')}
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
                {...register('age', { valueAsNumber: true })}
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
                {...register('gender')}
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
            <label>Address:</label>
            <div className='space-y-2'>
              <div>
                <label htmlFor='address.city'>City:</label>
                <input
                  id='address.city'
                  type='text'
                  className='border border-black w-full py-2 px-3'
                  {...register('address.city')}
                />
                {errors.address?.city && (
                  <p className='text-red-500'>{errors.address.city.message}</p>
                )}
              </div>
              <div>
                <label htmlFor='address.state'>State:</label>
                <input
                  id='address.state'
                  type='text'
                  className='border border-black w-full py-2 px-3'
                  {...register('address.state')}
                />
                {errors.address?.state && (
                  <p className='text-red-500'>{errors.address.state.message}</p>
                )}
              </div>
            </div>
          </section>

          <section className='mt-2'>
            <label htmlFor='dob'>DOB:</label>
            <input
              id='dob'
              type='date'
              className='border border-black w-full py-2 px-3'
              {...register('dob', {
                setValueAs: (value) => (value ? new Date(value) : undefined),
              })}
            />
            {errors.dob && <p className='text-red-500'>{errors.dob.message}</p>}
          </section>

          <section className='mt-2'>
            <div>
              <label>File:</label>
            </div>
            <div>
              <input
                type='file'
                className='border border-black'
                {...register('file')}
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
                    {...register(`skills.${index}.name`)}
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
            <input type='checkbox' id='agree' {...register('agree')} />
            {errors.agree && (
              <p className='text-red-500 text-sm'>{errors.agree.message}</p>
            )}
          </section>

          <button
            type='submit'
            className='border border-black mt-4'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReactHookFormZod;

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { supabase } from '../../../supabase-ram';

type Props = {
  onSignIn: () => void;
};

type SignInFormData = {
  email: string;
  password: string;
};

const SignInForm = ({ onSignIn }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  // const navigate = useNavigate();
  const [signInError, setSignInError] = useState('');

  const onSubmit: SubmitHandler<SignInFormData> = async (values) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: "000000",
    });

    if (error) {
      setSignInError('Kunne ikke logge ind. Er din information korrekt?');
    } else {
      setSignInError('');
      onSignIn();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Email
        <input
          type="text"
          {...register('email', {
            required: 'skal udfyldes',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'ugyldig email',
            },
          })}
          placeholder="Email..."
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </label>

      {signInError !== '' && <p className="error">{signInError}</p>}

      <button className="button primary" type="submit">
        LOG IND
      </button>
    </form>
  );
};

export default SignInForm;

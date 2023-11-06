import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ResetPassword = {
  email: string;
  code: string;
  password: string;
};

type ForgotPassword = {
  email: string;
};

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const navigate = useNavigate();

  const sendVerificationCode = async ({ email }: ForgotPassword) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/auth/forgot-password', { email });
      toast({
        description: data.message,
      });
      setLoading(false);
      return true;
    } catch (error) {
      const err = error as any;
      toast({
        variant: 'destructive',
        description: err?.response?.data?.message,
      });
      setLoading(false);
      throw new Error(err.response.data.message);
    }
  };

  const resetPassword = async ({ email, code, password }: ResetPassword) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/auth/reset-password', {
        email,
        code,
        password,
      });
      toast({
        description: data.message,
      });
      setLoading(false);
      navigate('/login');
    } catch (error) {
      const err = error as any;
      toast({
        variant: 'destructive',
        description: err?.response?.data?.message,
      });
      setLoading(false);
      throw new Error(err.response.data.message);
    }
  };

  return { sendVerificationCode, resetPassword, loading };
};

export default useForgotPassword;

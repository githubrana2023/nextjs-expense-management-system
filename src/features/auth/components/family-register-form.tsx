
'use client';
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { registerSchema } from '../schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export function FamilyRegisterForm() {
  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
  });

  const {
    handleSubmit,
    control
  } = registerForm

  const onSubmit = handleSubmit(async (values) => {
    console.log(values)
  })

  return (
    <Form {...registerForm}>
      <form onSubmit={onSubmit} className='space-y-6'>
        <FormField
          control={control}
          name='name'
          render={({ field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Rana Miah' {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='email'
          render={({ field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='password' placeholder='example@example.com' {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='password'
          render={({field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='********' {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='confirmPassword'
          render={({ field}) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='********' {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Login</Button>
        <Link href='/'>Home</Link>
      </form>
    </Form>
  );
}

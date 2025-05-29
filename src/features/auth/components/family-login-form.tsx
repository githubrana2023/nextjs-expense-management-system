'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { familyLoginInAction } from '../actions';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FamilyLoginFormValue, familyLoginSchema } from '../schema';
import Link from 'next/link';

export function FamilyLoginForm() {
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  const loginForm = useForm<FamilyLoginFormValue>({
    resolver: zodResolver(familyLoginSchema),
    defaultValues: {
      email: "rtrana2023@gmail.com",
      password: "123456789"
    },
  });

  const { handleSubmit, control,reset } = loginForm

  const onSubmit = handleSubmit((v) => {
    startTransition(
      async () => {
        const result = await familyLoginInAction(v)
        if(!result.success){
          reset()
          return 
        }

        router.push('/')
        console.log(result, 'login in action result');
      }
    )

  })

  return (
    <Form {...loginForm}>
      <form onSubmit={onSubmit} className='space-y-6'>
        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='example@example.com' {...field} disabled={pending}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='********' {...field} disabled={pending}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={pending}>Login</Button>
        <Link href='/'>Home</Link>
      </form>
    </Form>
  );
}

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

type payloads = {
  username: string;
  password: string;
};

const form = ref<payloads>({
  username: '',
  password: ''
});

const errors = ref({
  username: '',
  password: ''
});

const showPassword = ref(false);
const router = useRouter();

const validateForm = () => {
  let valid = true;

  if (!form.value.username) {
    errors.value.username = 'Username is required';
    valid = false;
  } else {
    errors.value.username = '';
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required';
    valid = false;
  } else {
    errors.value.password = '';
  }

  return valid;
}

const onSubmit = async () => {
  if (validateForm()) {
    try {
      // Perform your login logic here
      console.log('Submitted')
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }
}

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
}
</script>

<template>
  <div class="flex flex-col justify-center item-center min-h-screen px-4 sm:px-6 lg:px-8">
    <div class="mx-auto w-full max-w-96">
      <form @submit.prevent="onSubmit">
        <Card class="overflow-y-auto">
          <CardHeader class="space-y-1">
            <CardTitle class="text-2xl">Login</CardTitle>
            <CardDescription>Welcome Back!</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <Label for="username">Email</Label>
              <Input id="username" type="email" placeholder="m@example.com" v-model="form.username"/>
              <p v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</p>
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <div class="relative">
                <Input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="********"
                  v-model="form.password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  class="absolute inset-y-0 right-0 px-3 flex items-center text-sm"
                  @click="toggleShowPassword"
                >
                <i :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line' "></i>
                </Button>
              </div>
              <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
            </div>
            <RouterLink to="/auth/reset" class="text-right">
              <Button variant="link" class="ml-auto md:text-sm">Forgot your password?</Button>
            </RouterLink>
          </CardContent>
          <CardFooter class="flex-col space-y-2">
            <Button class="w-full" type="submit">Login</Button>
            <p class="text-sm">
              Don't have an account?
              <RouterLink 
                to="/auth/register"
                class="border-b border-gray-500 text-muted-foreground hover:text-primary"
              >
                Register
              </RouterLink>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>

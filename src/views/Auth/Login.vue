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
import { h } from 'vue';

import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster, ToastAction } from '@/components/ui/toast'
import useAuthStore from '@/stores/authSore';
import { Loader2 } from 'lucide-vue-next';


const loading = ref(false)

const { toast } = useToast();

const authStore = useAuthStore()

type payloads = {
  email: string;
  password: string;
};

const form = ref<payloads>({
  email: '',
  password: ''
});

const errors = ref({
  email: '',
  password: ''
});

const showPassword = ref(false);
const router = useRouter();

const validateForm = () => {
  let valid = true;

  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required';
    valid = false;
  } else {
    errors.value.email = '';
  }

  if (!form.value.password.trim()) {
    errors.value.password = 'Password is required';
    valid = false;
  } else {
    errors.value.password = '';
  }

  return valid;
}

const onSubmit = async () => {
  if (!validateForm()) return;
  loading.value = true
  axios.post('https://backend-aurh-production.up.railway.app/api/login', {
    email: form.value.email.trim(),
    password: form.value.password.trim()
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
    })
    .then((res) => {
      authStore.setAuthentication(res.data.token)
      loading.value = false
      router.push('/')
    })
    .catch((err) => {
      loading.value = false
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `${err?.response?.data?.message || err.message}`,
        action: h(ToastAction, {
          altText: 'Try again',
        }, {
          default: () => 'Try again',
        }),
      });
    })
}

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
}
</script>

<template>
  <Toaster />
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
              <Label for="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" v-model="form.email"/>
              <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <div class="relative">
                <Input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="********"
                  v-model="form.password"
                  @keydown.enter="onSubmit"
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
            <a to="/auth/reset" class="text-right">
              <Button variant="link" class="ml-auto md:text-sm">Forgot your password?</Button>
            </a>
          </CardContent>
          <CardFooter class="flex-col space-y-2">
            <Button class="w-full" type="submit">
              <div v-if="loading" class="flex">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </div>
              <div v-else>
                Login
              </div>
            </Button>
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

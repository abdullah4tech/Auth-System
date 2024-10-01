<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Input from '@/components/ui/input/Input.vue'
import { h } from 'vue'
import Label from '@/components/ui/label/Label.vue'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster, ToastAction } from '@/components/ui/toast'

type payloads = {
  name: string
  email: string
  password: string
}

const form = ref<payloads>({
  name: '',
  email: '',
  password: ''
})

const errors = ref({
  name: '',
  email: '',
  password: ''
})

const showPassword = ref(false)

const { toast } = useToast()
const loading = ref(false)

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validateForm = () => {
  let valid = true

  if (!validateEmail(form.value.email)) {
    errors.value.email = 'Invalid email format'
    valid = false
  } else {
    errors.value.email = ''
  }

  if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    valid = false
  } else {
    errors.value.password = ''
  }

  if (!form.value.name.trim()) {
    errors.value.name = 'Invalid name'
    valid = false
  } else {
    errors.value.name = ''
  }

  return valid
}

const onSubmit = async () => {
  if (!validateForm()) return
  loading.value = true

  axios
    .post(
      'http://localhost:5000/api/signup', // https://backend-aurh-production.up.railway.app/api/signup
      {
        fullname: form.value.name.trim(),
        email: form.value.email.trim(),
        password: form.value.password.trim()
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(() => {
      toast({
        title: 'Success',
        description: 'Account created successful'
      })
    })
    .catch((err) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `${err?.response?.data?.message || err.message}`,
        action: h(
          ToastAction,
          {
            altText: 'Try again'
          },
          {
            default: () => 'Try again'
          }
        )
      })
    })
    .finally(() => {
      loading.value = false
    })

  form.value.name = ''
  form.value.email = ''
  form.value.password = ''
}

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <Toaster />
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mx-auto w-96 max-w-md">
      <form @submit.prevent="onSubmit">
        <Card class="overflow-y-auto">
          <CardHeader class="space-y-1">
            <CardTitle class="text-2xl"> Sign Up </CardTitle>
            <CardDescription> Create an account </CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <div class="grid grid-cols-2 gap-6">
              <Button type="button" variant="outline">
                <svg role="img" viewBox="0 0 24 24" class="mr-2 h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M12 0C5.372 0 0 5.372 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 0-.285-.011-1.04-.017-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.467-2.381 1.237-3.221-.124-.304-.536-1.526.117-3.176 0 0 1.01-.323 3.31 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.3-1.553 3.31-1.23 3.31-1.23.653 1.65.241 2.872.118 3.176.77.84 1.237 1.911 1.237 3.221 0 4.61-2.807 5.625-5.48 5.921.429.371.812 1.103.812 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.192.694.801.576C20.565 21.796 24 17.298 24 12c0-6.628-5.373-12-12-12z"
                  />
                </svg>

                GitHub
              </Button>
              <Button type="button" variant="outline">
                <svg role="img" viewBox="0 0 24 24" class="mr-2 h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  />
                </svg>
                Google
              </Button>
            </div>
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
              </div>
            </div>
            <div class="grid gap-2">
              <Label for="name">Name</Label>
              <Input id="name" type="text" placeholder="John Deo" v-model="form.name" />
              <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
            </div>
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" v-model="form.email" />
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
                />
                <Button
                  type="button"
                  variant="ghost"
                  class="absolute inset-y-0 right-0 px-3 flex items-center text-sm"
                  @click="toggleShowPassword"
                >
                  <i :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'"></i>
                </Button>
              </div>
              <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
            </div>
          </CardContent>
          <CardFooter class="flex-col space-y-2">
            <Button class="w-full" type="submit" :disabled="loading">
              <div v-if="loading" class="flex">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </div>
              <div v-else>Sign Up</div>
            </Button>
            <p class="text-sm">
              Already have an account?
              <RouterLink
                to="/auth/login"
                class="border-b border-gray-500 text-muted-foreground hover:text-primary"
              >
                Login
              </RouterLink>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast/use-toast'

import { ref } from 'vue'


const showPassword = ref(false)
const password = ref(null)
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

const formSchema = toTypedSchema(z.object({
  password: z.string().max(6, 'Password must be at least 6 characters'),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  try {
    // Logic
  } catch (err) {
      toast({
        title: 'An error occured',
        description: `${err}`
      })
  }
})
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
    <form class="space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel class="text-2xl">Reset</FormLabel>
          <FormDescription>Create a new password</FormDescription>
          <FormControl>
            <div class="relative">
              <Input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="New Password"
                  v-model="password"
                  v-bind="componentField"
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
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">
        Change Password
      </Button>
    </form>
  </div>
</template>
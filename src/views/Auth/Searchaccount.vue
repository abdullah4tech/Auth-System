<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { h } from 'vue'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast/use-toast'
import { ref } from 'vue'
import ToastAction from '@/components/ui/toast/ToastAction.vue'
import axios from 'axios'


const getCodeBTN = ref<boolean>(false)
const inputVal = ref<boolean>(false)

const formSchema = toTypedSchema(z.object({
  email: z.string().email('required'),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  try {
    inputVal.value = true
    console.log(values.email)
    if (inputVal.value) {
      getCodeBTN.value = true
    }
  } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `${err}`,
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
  }
})
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
    <form class="space-y-8" @submit.prevent="onSubmit">
      <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel>Search for your account</FormLabel>
          <FormControl>
            <Input type="email" placeholder="Email address" :disabled="inputVal" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex gap-3">
        <Button type="submit" disabled>
          search
        </Button>
        <Button type="submit" v-if="getCodeBTN">
          Get code
        </Button>
      </div>
    </form>
  </div>
</template>
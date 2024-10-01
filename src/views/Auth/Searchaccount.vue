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
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster, ToastAction } from '@/components/ui/toast'
import useAuthStore from '@/stores/authStore'


const getCodeBTN = ref<boolean>(false)
const inputVal = ref<boolean>(false)

const { toast } = useToast()

const authStore = useAuthStore()

const formSchema = toTypedSchema(z.object({
  email: z.string().email('required'),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  inputVal.value = true;
  console.log(values.email);

  if (inputVal.value) {
    try {
      // Call findAccount function and store the result
      getCodeBTN.value = await authStore.findAccount(values.email);

      // If account is not found (findAccount returns false)
      if (!getCodeBTN.value) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Account not found.',
          description: 'We could not find an account associated with that email.',
          action: h(
            ToastAction,
            {
              altText: 'Try again',
            },
            {
              default: () => 'Try again',
            }
          ),
        });
        inputVal.value = false
      } else {
        toast({
          variant: 'default',
          title: 'Account found!',
          description: 'Proceed with further steps.',
        });
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `An error occurred: ${err.message}`,
        action: h(
          ToastAction,
          {
            altText: 'Try again',
          },
          {
            default: () => 'Try again',
          }
        ),
      });
    }
  }
});

</script>

<template>
  <Toaster />
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
        <Button type="submit">
          search
        </Button>
        <Button type="button" @click="sendCode" v-if="getCodeBTN">
          Get code
        </Button>
      </div>
    </form>
  </div>
</template>
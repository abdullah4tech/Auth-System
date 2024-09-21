<script setup lang="ts">
import { ref } from 'vue'
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
  PinInputSeparator
} from '@/components/ui/pin-input'

const value = ref<string[]>([])
const handleComplete = (e: string[]) => alert(e.join(''))
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
    <div class="mb-4">
      <p>Verify OTP code</p>
    </div>
    <div>
      <PinInput id="pin-input" v-model="value" placeholder="○" @complete="handleComplete">
        <PinInputGroup class="gap-1">
          <template v-for="(id, index) in 6" :key="id">
            <PinInputInput class="rounded-md border" :index="index" />
            <template v-if="index !== 5">
              <PinInputSeparator />
            </template>
          </template>
        </PinInputGroup>
      </PinInput>
    </div>
    <div class="mt-4">
      <p class="text-xs">Didn't receive OTP? <a href="#" class="underline">Resend</a></p>
    </div>
  </div>
</template>

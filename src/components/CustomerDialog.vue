<script setup lang="ts">
import { reactive, watch, toRaw, watchEffect } from 'vue';
import { ContactMediumType } from '@/types/contact-medium';
import type { Customer } from '@/types/customer';
import type { ContactMedium } from '@/types/contact-medium';
import { Dialog, Button, InputText, Textarea } from 'primevue';
import { Form } from '@primevue/forms';
import ContactMediumForm from '@/components/ContactMediumForm.vue';

// states
const visible = defineModel<boolean>('visible');
const contactMediums = reactive<ContactMedium[]>([])
const customer = reactive<Customer>({
  name: '',
  description: '',
  role: '',
  engagedParty: {
    id: '',
    name: ''
  },
  contactMedium: []
})

// HANDLERS
watch(customer, newVal => {
  console.log(toRaw(newVal))
})

const addContactMedium = (): void => {
  contactMediums.push({
    type: ContactMediumType.BaseType, contactType: ''
  })
}
const deleteContactMedium = (index: number): void => {
  contactMediums.splice(index, 1)
}

watchEffect(() => {
  customer.contactMedium = contactMediums
})
</script>
<template>
  <Dialog v-model:visible="visible" header="Create new customer">
    <Form class="flex flex-col gap-4 w-[35rem] ">
      <div class="flex flex-col gap-1">
        <label class="text-lg font-bold">Name</label>
        <InputText type="text" v-model="customer.name" />

        <label class="text-lg font-bold">Contact medium</label>
        <div v-for="(_, index) in contactMediums">
          <div class="flex justify-between items-center mb-3">
            <label class="text-sm">Medium {{ index + 1 }}</label>
            <Button @click="deleteContactMedium(index)">Delete</Button>
          </div>
          <ContactMediumForm :index v-model="contactMediums[index]"/>
        </div>
        <Button @click="addContactMedium">Add new contact medium</Button>

        <label class="text-lg font-bold">Engaged party</label>
        <div class="flex justify-between ml-2">
          <div class="flex flex-col">
            <label class="text-sm">Name</label>
            <InputText type="text" v-model="customer.engagedParty.name"/>
          </div>
          <div class="flex flex-col">
            <label class="text-sm">Id</label>
            <InputText type="text" v-model="customer.engagedParty.id"/>
          </div>
        </div>

        <label class="text-lg font-bold">Description</label>
        <Textarea v-model="customer.description"/>

        <label class="text-lg font-bold">Role</label>
        <InputText v-model="customer.role"/>
      </div>
      <div class="flex justify-end">
        <Button type="submit" severity="secondary" label="Submit" />
        <Button class="mr-3" label="Close" @click="visible = false" />
      </div>
    </Form>
  </Dialog>
</template>
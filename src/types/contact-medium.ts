import type { TimePeriod } from './time-period'

export enum ContactMediumType {
  EmailContactMedium = 'EmailContactMedium',
  FaxContactMedium = 'FaxContactMedium',
  GeographicAddressContactMedium = 'GeographicAddressContactMedium',
  PhoneContactMedium = 'PhoneContactMedium',
  SocialContactMedium = 'SocialContactMedium',
}
export interface BaseContactMedium {
  contactType: string
  preferred: boolean
  validFor: TimePeriod
  '@type': ContactMediumType
}

export interface EmailContactMedium extends BaseContactMedium {
  type: ContactMediumType.EmailContactMedium
  emailAddress: string
}
export interface FaxContactMedium extends BaseContactMedium {
  type: ContactMediumType.FaxContactMedium
  faxNumber: string
}
export interface GeographicAddressContactMedium extends BaseContactMedium {
  type: ContactMediumType.GeographicAddressContactMedium
  city: string
  country: string
  postCode: string
  stateOrProvince: string
  street1: string
  street2: string
}
export interface PhoneContactMedium extends BaseContactMedium {
  type: ContactMediumType.PhoneContactMedium
  phoneNumber: string
}
export interface SocialContactMedium extends BaseContactMedium {
  type: ContactMediumType.SocialContactMedium
  socialNetworkId: string
}

export type ContactMedium =
  | EmailContactMedium
  | FaxContactMedium
  | GeographicAddressContactMedium
  | PhoneContactMedium
  | SocialContactMedium
  | BaseContactMedium

export const contactOptions = [
  { name: 'Email', type: ContactMediumType.EmailContactMedium },
  { name: 'Fax', type: ContactMediumType.FaxContactMedium },
  {
    name: 'Geographic Address',
    type: ContactMediumType.GeographicAddressContactMedium,
  },
  { name: 'Phone', type: ContactMediumType.PhoneContactMedium },
  { name: 'Social', type: ContactMediumType.SocialContactMedium },
]

export const contactMediumMapping: Record<string, { key: string; label: string; id: string }[]> = {
  [ContactMediumType.EmailContactMedium]: [{ key: 'emailAddress', label: 'Email address', id: 'email' }],
  [ContactMediumType.FaxContactMedium]: [{ key: 'faxNumber', label: 'Fax number', id: 'fax' }],
  [ContactMediumType.GeographicAddressContactMedium]: [
    { key: 'city', label: 'City', id: 'city' },
    { key: 'country', label: 'Country', id: 'country' },
    { key: 'postCode', label: 'Postcode', id: 'postcode' },
    { key: 'stateOrProvince', label: 'State or province', id: 'state' },
    { key: 'street1', label: 'Street 1', id: 'street1' },
    { key: 'street2', label: 'Street 2', id: 'street2' },
  ],
  [ContactMediumType.PhoneContactMedium]: [{ key: 'phoneNumber', label: 'Phone number', id: 'phone' }],
  [ContactMediumType.SocialContactMedium]: [{ key: 'socialNetworkId', label: 'Social network id', id: 'social' }],
} as const

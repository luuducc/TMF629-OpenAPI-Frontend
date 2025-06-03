export enum ContactMediumType {
  EmailContactMedium = 'EmailContactMedium',
  FaxContactMedium = 'FaxContactMedium',
  GeographicAddressContactMedium = 'GeographicAddressContactMedium',
  PhoneContactMedium = 'PhoneContactMedium',
  SocialContactMedium = 'SocialContactMedium',
}
export interface BaseContactMedium {
  contactType: string
  '@type': ContactMediumType | undefined
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

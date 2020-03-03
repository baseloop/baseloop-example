import { Atom } from '@baseloop/atom'
import { createReactiveElement } from '@baseloop/core'
import { of } from 'rxjs'
import { EmailType, Gender, Profile } from './profile'
import { ProfileView } from './profile-view'

export function ProfileController() {
  const profile = new Atom<Profile>({
    annualIncome: 1500000,
    birthday: new Date(),
    emails: [
      { address: 'bar@baz.foo', type: EmailType.PERSONAL },
      { address: 'foo@bar.baz', type: EmailType.BUSINESS },
    ],
    gender: null,
    name: 'John Doe',
    profession: 'Plumber',
  })

  profile.subscribe(p => console.log('Profile was updated:', p))

  return {
    view: createReactiveElement(ProfileView, {
      genderOptions: [
        { id: Gender.FEMALE, label: 'Female' },
        { id: Gender.MALE, label: 'Male' },
      ],
      profile: of(profile),
    }),
  }
}

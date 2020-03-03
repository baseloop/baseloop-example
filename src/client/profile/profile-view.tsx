import { Atom, ImmutableAtom } from '@baseloop/atom'
import * as React from 'react'
import { Input } from '../form/input'
import { NumberInput } from '../form/number-input'
import { Select, SelectOption } from '../form/select'
import { Gender, Profile } from './profile'
import { useAtom } from '@baseloop/hooks'

export interface Props {
  profile: Atom<Profile>
  genderOptions: SelectOption<Gender>[]
}

export function ProfileView({ profile, genderOptions }: Props) {
  return (
    <section>
      <h1>Profile</h1>
      <p>On this page you may edit your profile.</p>

      <div>
        <label>Name</label>
        <Input value={profile.lens('name')} inputProps={{ autoFocus: true }} />
      </div>

      <div>
        <label>Profession</label>
        <Input value={profile.lens('profession')} />
      </div>

      <div>
        <label>Gender</label>
        <Select value={profile.lens('gender')} options={genderOptions} />
      </div>

      <div>
        <label>Annual income</label>
        <NumberInput value={profile.lens('annualIncome')} />
      </div>

      <Summary
        genderOptions={genderOptions}
        name={profile.view('name')}
        gender={profile.view('gender')}
        profession={profile.view('profession')}
      />
    </section>
  )
}

interface SummaryProps {
  genderOptions: SelectOption<Gender>[]
  name: ImmutableAtom<string>
  gender: ImmutableAtom<Gender | null>
  profession: ImmutableAtom<string>
}

function Summary({ name: nameAtom, gender: genderAtom, profession: professionAtom, genderOptions }: SummaryProps) {
  const [name, gender, profession] = useAtom(nameAtom, genderAtom, professionAtom)
  const selectedGender = genderOptions.find(option => option.id === gender)
  return (
    <>
      <h1>Summary</h1>
      <p>
        {name || 'Mister X'} is a {selectedGender ? selectedGender.label : ''} professional {profession || 'freeloader'}
        .
      </p>
    </>
  )
}

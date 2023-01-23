import { getAge } from './helpers.js'

export const manifest = {
  questions: [
    {
      header: 'All About You',
      items: [
        {
          key: 'Name',
          label: 'Full Name',
          type: 'string',
          optional: false
        },
        {
          key: 'Email',
          label: 'Contact Email',
          type: 'string',
          inputType: 'email',
          sublabel: `We'll be in touch using this email, so make sure you check it regularly.`,
          optional: false
        },
        {
          key: 'Pronouns',
          label: 'Your Pronouns',
          type: 'string',
          sublabel: `Eg. she/her/hers, he/him/his`,
          optional: false
        },
        {
          key: 'Birthday',
          label: 'Birthday',
          type: 'string',
          inputType: 'date',
          sublabel: `Any eighteen or below is welcome to come to Reboot!`,
          optional: false
        },
        {
          key: 'High School / College',
          label: 'I am currently attending a...',
          type: 'select',
          options: ['School / Junior College', 'College / University'],
          optional: false
        },
        {
          key: 'Shirt',
          label: 'T-Shirt Size',
          type: 'select',
          sublabel: `We'll be having awesome swag, so you won't want to miss out.`,
          options: ['130', '140', '150', '160', '170', '180', '190'],
          optional: false
        },
        {
          key: 'Skill Level',
          label: 'How would you describe your technical skills?',
          sublabel: `Everyone's welcome! This question is just to help us gauge what resources we need to support attendees.`,
          type: 'select',
          options: [
            'Beginner: have never coded before or just started learning',
            'Intermediate: I have taken CS classes OR worked on small individual projects',
            'Advanced: I’m comfortable with my skill set and can work on a project without much guidance'
          ],
          optional: false
        },
        {
          key: 'Dietary Restrictions',
          label: 'Please list any dietary restrictions of yours.',
          type: 'paragraph',
          optional: true
        },
        {
          key: `Stipend-Q3 (GitHub / Web)`,
          label: `Do you have a GitHub or website we could check out?`,
          type: 'string',
          optional: true
        }
      ]
    },
    {
      header: 'Guardian Details',
      label: `Please provide us with the details of a parent/guardian. We'll contact them with a consent form and a participant waiver. This will be sent out two weeks before the event.`,
      check: data =>
        data['Birthday'] === undefined || getAge(data['Birthday']) > 17,
      items: [
        {
          key: 'Parent Name',
          label: "What's your guardian's name?",
          type: 'string',
          optional: false,
          check: data =>
            data['Birthday'] === undefined || getAge(data['Birthday']) > 17
        },
        {
          key: 'Parent Email',
          label: "What's your guardian's email?",
          type: 'string',
          optional: false,
          check: data =>
            data['Birthday'] === undefined || getAge(data['Birthday']) > 17
        }
      ]
    },
    {
      header: 'Now for a bit of fun!',
      items: [
        {
          key: 'Tabs or spaces?',
          label: 'Tabs or spaces?',
          sublabel: `It's just for fun.`,
          type: 'select',
          options: ['Tabs', 'Spaces'],
          optional: true
        }
      ]
    }
  ]
}

export default manifest

export const requiredList = (() => {
  const list = {}
  for (const section of manifest.questions) {
    section.items
      .filter(item => !item.optional)
      .forEach(item => {
        list[item.key] = item.check
          ? data => {
              console.log(item.key)
              console.log(!item.check(data) || data[item.key])
              console.log(!item.check(data))
              console.log(data[item.key])
              return item.check(data) || data[item.key]
            }
          : data => data[item.key]
      })
  }
  return list
})

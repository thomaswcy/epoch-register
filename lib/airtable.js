const AirtablePlus = require('airtable-plus')

const API_KEY = process.env.AIRTABLE;

export const registrationsAirtable = new AirtablePlus({
  baseID: 'keyQkvQ7RdOa6yBYW',
  apiKey: API_KEY,
  tableName: 'Registrations',
})

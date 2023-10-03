const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(__dirname)
const uppdateContact = (allContacts) =>
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, null, 2);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
 const id = String(contactId)
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};
const addContact = async (data) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContact);
  await uppdateContact(allContacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const id = String(contactId);
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if(index === -1){
    return null
  }
  const [result] = allContacts.splice(index, 1);
  await uppdateContact(allContacts);
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

// index.js
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const contacts = require("./contacts");
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allList = await contacts.listContacts();
      return console.table(allList);

    case "get":
      const getId = await contacts.getContactById(id);
      return console.log(getId);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const deliteContact = await contacts.removeContact(id);
      return console.log(deliteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({action: "list"});
// invokeAction({action: "get" ,id: "AeHIrLTr6JkxGE6SN-0Rw"})
// invokeAction({ action: "add", name: "Allin Decatlon", email: "all.dellon@gmail.com", phone: "(313) 313-3131"});
// invokeAction({ action: "remove", id: "P4NGv7j4BS5JiR2XM9Qqq" });

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);

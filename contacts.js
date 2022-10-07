const fs = require("fs").promises
const path = require("path")
const {nanoid} = require("nanoid")

const contactsPath = path.join("db", "contacts.json")

async function listContacts() {
    const result = await fs.readFile(contactsPath, "utf-8")
    return JSON.parse(result)
}

async function getContactById(contactId) {
    const list = await listContacts()
    const queryItem = list.find(item => item.id === contactId)
    return queryItem || 'There is no contact with such an ID.'
}

async function removeContact(contactId) {
    const list = await listContacts()
    const index = list.findIndex(item => item.id === contactId)
    
    if (index === -1) {
        return 'There is no contact with such an ID.'
    }
    
    const [result] = list.splice(index, 1)

    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2))

    return result
}

async function addContact(name, email, phone) {
    const list = await listContacts()
    const id = nanoid()
    const newContact = { id, name, email, phone }
    list.push(newContact)

    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2))
    return newContact
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}

const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");


const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async(contacts)=>{
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const getAll = async()=>{
    const data = await fs.readFile(contactsPath);
return JSON.parse( data);
}
const getById = async(id) => {
    const contacts = await getAll();
    const result = contacts.find(item => item.id === id);
    if(!result){
        return null;
    }
    return result;
}



const add = async(name, email, phone)=>{
    const contacts = await getAll();
    const newContact = {
        name, 
        email, 
        phone,
        id: nanoid(),

    }
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}
const updateById = async(id,  name, email, phone)=>{
    const contacts = await getAll();
    const idx = contacts.findIndex(item => item.id === id);
    if(idx === -1 ){
        return null;
    }
    contacts[idx] = {id,  name, email, phone};
    await updateContacts(contacts);
    return contacts[idx];
}

const remove =  async(id) =>{
    const contacts = await getAll();
    const idx =  contacts.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    updateContacts(contacts);
    return removeContact;
}


module.exports={
    getAll,
    getById,
    add,
    updateById,
    remove
}
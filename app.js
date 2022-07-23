// const yargs = require("yargs");
// const {hideBin} = require("yargs/helpers");
const {program} = require("commander");
const contacts = require("./contacts");

const invokeAction = async({action, id, name, email, phone}) => {
    switch(action) {
        case "getAll":
            const allContacts = await contacts.getAll();
            console.table(allContacts);
            break;
            case "getById":
                const oneContact = await contacts.getById(id);
               
                console.log(oneContact);
                break;
                case "add":
                    const newContact = await contacts.add(name, email, phone);
                  
                    console.log(newContact);
                    break;
                  
                        case "remove":
                            const removeContact = await contacts.remove(id);
                            console.log(removeContact);
                            // ... id
                            break;
                default:
                    console.warn("\x1B[31m Unknown action type!");
       
    }
}
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
  program.parse(process.argv);
  const argv = program.opts();
  invokeAction(argv);
// const arr = hideBin(process.argv);
// const {argv} = yargs(arr);
// invokeAction(argv);

// console.log(process.argv);
// invokeAction({action: "getAll"});
// invokeAction({action: "getById", id:"2"});
// invokeAction({action: "add", name:"Mark", email:"alex@gmail.com", phone:"478-258"});
;
// invokeAction({action: "remove", id:"2"});


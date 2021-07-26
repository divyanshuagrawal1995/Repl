const prompt = require('prompt-sync')({ sigint: true });
const process = require('process');
const eol = require('os').EOL;

let question = "1) What is your name ?: "
let next = false
let name = prompt(question)
if (name.toLowerCase() === "divyanshu") {
    console.log('correct Answer')
    next = true
} else {
    console.log('wrong Answer')
    next = false
}
function optionValue() {
    return new Promise((resolve, reject) => {
        next = false;
        question = '2) What is your favourite language?: press Enter to continue ? :'
        console.log(question)
        const keymap = {
            'a': 'Javascript',
            'b': 'Python',
            'c': 'Rust',
            'd': 'Ruby'
        }
        process.stdin.on('keypress', async (str, key) => {
            if (key.name === "return") {
                Object.keys(keymap).forEach(key => {
                    console.log(`${key})${keymap[key]}`)
                })
                let value = prompt('Enter an valid option: ')
                if (['a', 'b', 'c', 'd'].includes(value.toLocaleLowerCase())) {
                    console.log('Thank you for the response !!!')
                    next = true
                } else {
                    next = false
                    console.log('Please select an valid option')
                    resolve(await optionValue())
                }
                resolve(next && (Register()))

            }
        })
    })

}
(async () => {
    if (!next) return;
    await optionValue()
    
    
})()
function Register() {
    let key;
    if(!next) return
    key = prompt('Enter your Email Address: ')
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(key.toLowerCase())) {
        return Register()
    }
    next && (key = prompt('Enter your password. Password must contain at least one special char and atleast one num: '))
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(key)) {
        next = false
        return Register()
    } else {
        next = false
        console.log('Thank you for Signing up')
        process.exit()
    }


}

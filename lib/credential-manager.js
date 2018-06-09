const Configstore = require('configstore');
const inquirer = require('inquirer');
const keytar = require('keytar-prebuild')

class CredentialManager {
    constructor(name) {
        this.config = new Configstore(name)
        this.service = name
    }


    async getKeyAndSecret(prop) {
        let key = this.config.get(prop);
        if (key) {
            let secret = await keytar.getPassword(this.service, key);
            // let secret = this.config.get('apiScret');
            return [key, secret]
        } else {
            let answer = await inquirer.prompt([
                { type: "input", name: "key", message: "Entrer your twitter app key" },
                { type: "password", name: "secret", message: "Entrer your twitter app password" },
            ])

            this.config.set(prop, answer.key)
            // this.config.set('apiScret', answer.secret)

            await keytar.setPassword(this.service, answer.key, answer.secret);

            return [answer.key, answer.secret]
        }


    }

    async storeKeyAndSecret(prop, key, secret) {
        this.config.set(prop, key)
        await keytar.setPassword(this.service, key, secret);
    }

    async clearKeyandSecret(prop) {
        let key = this.config.get(prop);
        this.config.delete(prop);
        await keytar.deletePassword(this.service, key)
    }
}

module.exports = CredentialManager
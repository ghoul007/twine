const Configstore = require('configstore');
const inquirer = require('inquirer');
class CredentialManager {
    constructor(name) {
        this.config = new Configstore(name)
    }


    async getKeyAndSecret() {
        let key = this.config.get('apiKey');
        if (key) {
            let secret = this.config.get('apiScret');
            return [key, secret]
        } else {
            let answer = await inquirer.prompt([
                { type: "input", name: "key", message: "Entrer your twitter app key" },
                { type: "password", name: "secret", message: "Entrer your twitter app password" },
            ])

            this.config.set('apiKey', answer.key)
            this.config.set('apiScret', answer.secret)

            return [answer.key, answer.secret]
        }
    }
}

module.exports = CredentialManager
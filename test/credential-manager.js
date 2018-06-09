const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const inquirer = require('inquirer')
const CredentialManager = require('../lib/credential-manager')


describe('a crdential manager', () => {
    var creds;
    beforeEach(() => {
        creds = new CredentialManager('twine-test')
    });

    it('should popmt the user', async () => {
        sinon.stub(inquirer, 'prompt').resolves({ key: 'foo', secret: "bar" })
        let [key, secret] = await creds.getKeyAndSecret('apiKey');
        expect(key).to.equal('foo')
        expect(secret).to.equal('bar')
        inquirer.prompt.restore()
    });

    after(async ()=>{
        await creds.clearKeyandSecret('apiKey')
    })
});
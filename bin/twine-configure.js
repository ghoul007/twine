const program = require('commander')
const pkg = require('../package.json')
const configure = require('../commands/configure')
program
    .version(pkg.version)
    .description('add a twitter API key and scret')
    .action(async () => {
        await configure.consumer(pkg.name)
    })


program
    .command('account')
    .description('Authorization access to Twitter account')
    .action(async () => {
        await configure.account(pkg.name)
    })

program
    .parse(process.argv)


if (!process.argv.slice(2).length) {
    program.outputHelp();
}
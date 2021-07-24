import { Command } from "commander"
import initAction from "./commands/init"

export default class Cli {
    appPath: string
    program: Command
    constructor(appPath) {
        this.appPath = appPath || process.cwd()
        this.program = new Command()
        this.init()
    }

    init() {
        this.program
            .command('init [dirPath]')
            .description('create a project with template project')
            .option('-t, --type <type>', 'template project type, only accept "custom-component", "miniprogram", "plugin", "game"')
            .option('-f, --force', 'all files will be overrided whether it already exists or not')
            .option('-p, --proxy <url>', 'http/https request proxy')
            .option('-n, --newest', 'use newest template to initialize project')
            .action(initAction)
    }
    run () {
        this.program.parse(process.argv)
    }
}
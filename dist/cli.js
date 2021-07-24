"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("./commands/init");
class Cli {
    constructor(appPath) {
        this.appPath = appPath || process.cwd();
        this.program = new commander_1.Command();
        this.init();
    }
    init() {
        this.program
            .command('init [dirPath]')
            .description('create a project with template project')
            .option('-t, --type <type>', 'template project type, only accept "custom-component", "miniprogram", "plugin", "game"')
            .option('-f, --force', 'all files will be overrided whether it already exists or not')
            .option('-p, --proxy <url>', 'http/https request proxy')
            .option('-n, --newest', 'use newest template to initialize project')
            .action(init_1.default);
    }
    run() {
        this.program.parse(process.argv);
    }
}
exports.default = Cli;

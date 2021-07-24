"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import chalk from 'chalk';
// import shell from 'shelljs';
// import inquirer from 'inquirer';
// import fs from'fs';
// import path from 'path';
// import rm from 'rimraf';
const questions_1 = require("../constants/questions");
const resources_1 = require("../resources");
const chalk = require('chalk');
const shell = require('shelljs');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const rm = require('rimraf');
const initAction = (dirName, options) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk.yellow('web脚手架初始化模板 \n'));
    // 执行操作
    console.log('目录位置', dirName);
    if (!dirName) {
        console.log(chalk.red('目录名称不能为空'));
        shell.exit(1);
    }
    try {
        // 通过inquirer获取到用户输入的内容
        const answers = yield inquirer.prompt(questions_1.default);
        // console.log('answers', answers);
        let confirm = yield inquirer.prompt([
            {
                type: 'confirm',
                message: '确认创建？',
                default: 'Y',
                name: 'isConfirm',
            },
        ]);
        if (!confirm.isConfirm)
            return;
        // 1. 检查是否有安装git
        if (!shell.which('git')) {
            console.log(chalk.red('git 命令不可以'));
            shell.exit(1);
        }
        // 2.检查项目名称是否存在
        if (fs.existsSync(dirName)) {
            console.log(chalk.red('项目名称已存在'));
            shell.exit(1);
        }
        // 2.校验项目名称
        if ((/[^A-Za-z0-9\u4e00-\u9fa5_-]/g.test(dirName))) {
            console.log(chalk.red('项目名称存在非法字符'));
            return;
        }
        // 3. 下载模版
        const template = resources_1.default.find(item => {
            return item.name == answers.type;
        });
        if (template) {
            let branch = options.branch || template.branch;
            const commandStr = `git clone ${template.git} -b ${branch} ${dirName}`;
            shell.exec(commandStr);
        }
        else {
            console.log(chalk.red(`${answers.type}模版不存在`));
            shell.exit(1);
        }
        // 清理文件
        rm(path.join(process.cwd(), dirName, '/.git/'), err => {
            if (err)
                throw err;
        });
    }
    catch (error) {
        console.log(chalk.red('error', error));
    }
});
exports.default = initAction;

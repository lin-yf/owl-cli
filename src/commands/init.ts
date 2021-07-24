// import chalk from 'chalk';
// import shell from 'shelljs';
// import inquirer from 'inquirer';
// import fs from'fs';
// import path from 'path';
// import rm from 'rimraf';
import questions from '../constants/questions';
import resources from '../resources';
const chalk = require('chalk');
const shell = require('shelljs');
const inquirer = require('inquirer');
const fs =require('fs');
const path =require('path');
const rm =require('rimraf');

const initAction = async (dirName, options) => {
    console.log(chalk.yellow('web脚手架初始化模板 \n'));
    // 执行操作
    console.log('目录位置',dirName);
    if(!dirName) {
        console.log(chalk.red('目录名称不能为空'));
        shell.exit(1);
    }
    try {
        // 通过inquirer获取到用户输入的内容
        const answers = await inquirer.prompt(questions);
        // console.log('answers', answers);
        let confirm = await inquirer.prompt([
            {
                type: 'confirm',
                message: '确认创建？',
                default: 'Y',
                name: 'isConfirm',
            },
        ]);
        if (!confirm.isConfirm) return ;
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
        const template = resources.find(item => {
            return item.name == answers.type;
        });
        if(template) {
            let branch = options.branch || template.branch;
            const commandStr = `git clone ${template.git} -b ${branch} ${dirName}`;
            shell.exec(commandStr);
        } else {
            console.log(chalk.red(`${answers.type}模版不存在`));
            shell.exit(1); 
        }
        // 清理文件
        rm(path.join(process.cwd(), dirName, '/.git/'), err => {
            if (err) throw err;
        });
    } catch (error) {
        console.log(chalk.red('error', error));
    }
};

export default initAction;

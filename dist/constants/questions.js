"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resources_1 = require("../resources");
const choices = resources_1.default.map(item => {
    return item.name;
});
// 定义模版的问题
exports.default = [
    {
        type: 'list',
        message: '请选择项目类型:',
        choices: choices,
        name: 'type',
    },
    // {
    //     type: 'input',
    //     message: '请输入项目名称:',
    //     name: 'name',
    //     validate(val) {
    //         if (!val) return '项目名称不能为空！';
    //         if (val.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) return '项目名称包含非法字符，请重新输入';
    //         return true;
    //     }
    // },
    // {
    //     type: 'input',
    //     message: '请输入模板关键词(;分割):',
    //     name: 'keywords'
    // },
    // {
    //     type: 'input',
    //     message: '请输入模板简介:',
    //     name: 'description'
    // }
];

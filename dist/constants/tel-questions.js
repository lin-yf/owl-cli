"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 页面生成问题
// 定义模版的问题
exports.default = [
    {
        type: 'list',
        message: '请选择页面类型:',
        choices: ['vue', 'react'],
        name: 'type',
    },
    {
        type: 'input',
        message: '请输入文件名称:',
        name: 'name',
        validate(val) {
            if (!val)
                return '文件名称不能为空！';
            if (val.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g))
                return '文件名称包含非法字符，请重新输入';
            return true;
        },
    },
    {
        type: 'input',
        message: '请输入组件或页面名称(默认与文件名称相同):',
        name: 'componentName',
    },
    {
        type: 'input',
        message: '页面描述',
        name: 'desc',
    },
    // {
    //     type: 'input',
    //     message: '请输入模板简介:',
    //     name: 'description'
    // }
];

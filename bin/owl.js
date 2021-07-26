#!/usr/bin/env node
"use strict";
const cli_1 = require("../dist/cli");
let instance = new cli_1.default('.');
instance.run();
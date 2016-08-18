/**
 * @fileoverview Enforce newlines between operands of ternary expressions
 * @author Kai Cataldo
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/lines-around-directive");
const RuleTester = require("../../../lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("lines-around-directive", rule, {
    valid: [

        // use "always" by default
        "//comment\n\n'use strict';\n\nvar foo;",

        // "always"
        // at top of file
        {
            code: "'use strict';\n\nvar foo;",
            options: ["always"]
        },
        {
            code: "\n'use strict';\n\nvar foo;",
            options: ["always"]
        },
        {
            code: "\n\n'use strict';\n\nvar foo;",
            options: ["always"]
        },
        {
            code: "'use strict';\n\n//comment",
            options: ["always"]
        },
        {
            code: "'use strict';\n\n/*comment*/",
            options: ["always"]
        },

        // after comment at top of file
        {
            code: "#!/usr/bin/env node\n\n'use strict';\n\nvar foo;",
            options: ["always"]
        },
        {
            code: "#!/usr/bin/env node\n//comment\n\n'use strict';\n\nvar foo;",
            options: ["always"]
        },
        {
            code: "//comment\n\n'use strict';\n\nvar foo;",
            options: ["always"]
        },
        {
            code: "/*comment*/\n\n'use strict';\n\nvar foo;",
            options: ["always"]
        },
        {
            code: "/*\nmultiline comment\n*/\n\n'use strict';\n\nvar foo;",
            options: ["always"]
        },

        // at the top of function blocks
        {
            code: "function foo() {\n'use strict';\n\nvar bar;\n}",
            options: ["always"]
        },
        {
            code: "function foo() {\n\n'use strict';\n\nvar bar;\n}",
            options: ["always"]
        },
        {
            code: "() => {\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["always"]
        },
        {
            code: "() => {\n\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["always"]
        },

        // is not affected by JSDoc comments when at top of function block
        {
            code: "/*\n * JSDoc comment\n */\nfunction foo() {\n'use strict';\n\nvar bar;\n}",
            options: ["always"]
        },
        {
            code: "/*\n * JSDoc comment\n */\n\nfunction foo() {\n'use strict';\n\nvar bar;\n}",
            options: ["always"]
        },

        // ignores if the directive is the only statement in the function block
        {
            code: "function foo() {\n'use strict';\n}",
            options: ["always"]
        },

        // after comment at top of function blocks
        {
            code: "function foo() {\n//comment\n\n'use strict';\n\nvar bar;\n}",
            options: ["always"]
        },
        {
            code: "function foo() {\n/*\nmultiline comment\n*/\n\n'use strict';\n\nvar bar;\n}",
            options: ["always"]
        },
        {
            code: "() => {\n//comment\n\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["always"]
        },
        {
            code: "() => {\n/*\nmultiline comment\n*/\n\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["always"]
        },

        // "never"
        // at top of file
        {
            code: "'use strict';\nvar foo;",
            options: ["never"]
        },
        {
            code: "'use strict';\n//comment",
            options: ["never"]
        },
        {
            code: "'use strict';\n/*comment*/",
            options: ["never"]
        },

        // after comment at top of file
        {
            code: "#!/usr/bin/env node\n'use strict';\nvar foo;",
            options: ["never"]
        },
        {
            code: "#!/usr/bin/env node\n//comment\n'use strict';\nvar foo;",
            options: ["never"]
        },
        {
            code: "//comment\n'use strict';\nvar foo;",
            options: ["never"]
        },
        {
            code: "/*comment*/\n'use strict';\nvar foo;",
            options: ["never"]
        },
        {
            code: "/*\nmultiline comment\n*/\n'use strict';\nvar foo;",
            options: ["never"]
        },

        // at the top of function blocks
        {
            code: "function foo() {\n'use strict';\nvar bar;\n}",
            options: ["never"]
        },
        {
            code: "function foo() {\n\n'use strict';\nvar bar;\n}",
            options: ["never"]
        },
        {
            code: "() => {\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["never"]
        },
        {
            code: "() => {\n\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["never"]
        },

        // is not affected by JSDoc comments when at top of function block
        {
            code: "/*\n * JSDoc comment\n */\nfunction foo() {\n'use strict';\nvar bar;\n}",
            options: ["never"]
        },
        {
            code: "/*\n * JSDoc comment\n */\n\nfunction foo() {\n'use strict';\nvar bar;\n}",
            options: ["never"]
        },

        // does not throw if the directive is the only statement in the function block
        {
            code: "function foo() {\n'use strict';\n}",
            options: ["never"]
        },

        // after comment at top of function blocks
        {
            code: "function foo() {\n//comment\n'use strict';\nvar bar;\n}",
            options: ["never"]
        },
        {
            code: "function foo() {\n/*\nmultiline comment\n*/\n'use strict';\nvar bar;\n}",
            options: ["never"]
        },
        {
            code: "() => {\n//comment\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["never"]
        },
        {
            code: "() => {\n/*\nmultiline comment\n*/\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["never"]
        },

        // { "before": "never", "after": "always" }
        // at top of file
        {
            code: "'use strict';\n\nvar foo;",
            options: [{ before: "never", after: "always" }]
        },
        {
            code: "'use strict';\n\n//comment",
            options: [{ before: "never", after: "always" }]
        },
        {
            code: "'use strict';\n\n/*comment*/",
            options: [{ before: "never", after: "always" }]
        },

        // after comment at top of file
        {
            code: "#!/usr/bin/env node\n'use strict';\n\nvar foo;",
            options: [{ before: "never", after: "always" }]
        },
        {
            code: "//comment\n'use strict';\n\nvar foo;",
            options: [{ before: "never", after: "always" }]
        },
        {
            code: "/*comment*/\n'use strict';\n\nvar foo;",
            options: [{ before: "never", after: "always" }]
        },
        {
            code: "/*\nmultiline comment\n*/\n'use strict';\n\nvar foo;",
            options: [{ before: "never", after: "always" }]
        },

        // at the top of function blocks
        {
            code: "function foo() {\n'use strict';\n\nvar bar;\n}",
            options: [{ before: "never", after: "always" }]
        },
        {
            code: "function foo() {\n\n'use strict';\n\nvar bar;\n}",
            options: [{ before: "never", after: "always" }]
        },
        {
            code: "() => {\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "never", after: "always" }]
        },
        {
            code: "() => {\n\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "never", after: "always" }]
        },

        // after comment at top of function blocks
        {
            code: "function foo() {\n//comment\n'use strict';\n\nvar bar;\n}",
            options: [{ before: "never", after: "always" }]
        },
        {
            code: "function foo() {\n/*\nmultiline comment\n*/\n'use strict';\n\nvar bar;\n}",
            options: [{ before: "never", after: "always" }]
        },
        {
            code: "() => {\n//comment\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "never", after: "always" }]
        },
        {
            code: "() => {\n/*\nmultiline comment\n*/\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "never", after: "always" }]
        },

        // { "before": "always", "after": "never" }
        // at top of file
        {
            code: "'use strict';\nvar foo;",
            options: [{ before: "always", after: "never" }]
        },
        {
            code: "\n'use strict';\nvar foo;",
            options: [{ before: "always", after: "never" }]
        },
        {
            code: "\n\n'use strict';\nvar foo;",
            options: [{ before: "always", after: "never" }]
        },
        {
            code: "'use strict';\n//comment",
            options: [{ before: "always", after: "never" }]
        },
        {
            code: "'use strict';\n/*comment*/",
            options: [{ before: "always", after: "never" }]
        },

        // after comment at top of file
        {
            code: "#!/usr/bin/env node\n\n'use strict';\nvar foo;",
            options: [{ before: "always", after: "never" }]
        },
        {
            code: "//comment\n\n'use strict';\nvar foo;",
            options: [{ before: "always", after: "never" }]
        },
        {
            code: "/*comment*/\n\n'use strict';\nvar foo;",
            options: [{ before: "always", after: "never" }]
        },
        {
            code: "/*\nmultiline comment\n*/\n\n'use strict';\nvar foo;",
            options: [{ before: "always", after: "never" }]
        },

        // at the top of function blocks
        {
            code: "function foo() {\n'use strict';\nvar bar;\n}",
            options: [{ before: "always", after: "never" }]
        },
        {
            code: "function foo() {\n\n'use strict';\nvar bar;\n}",
            options: [{ before: "always", after: "never" }]
        },
        {
            code: "() => {\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "always", after: "never" }]
        },
        {
            code: "() => {\n\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "always", after: "never" }]
        },

        // after comment at top of function blocks
        {
            code: "function foo() {\n//comment\n\n'use strict';\nvar bar;\n}",
            options: [{ before: "always", after: "never" }]
        },
        {
            code: "function foo() {\n/*\nmultiline comment\n*/\n\n'use strict';\nvar bar;\n}",
            options: [{ before: "always", after: "never" }]
        },
        {
            code: "() => {\n//comment\n\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "always", after: "never" }]
        },
        {
            code: "() => {\n/*\nmultiline comment\n*/\n\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "always", after: "never" }]
        },
    ],

    invalid: [

        // uses "always" by default
        {
            code: "//comment\n'use strict';\n\nvar foo;",
            errors: ["Expected newline before \"use strict\" directive."]
        },
        {
            code: "//comment\n\n'use strict';\nvar foo;",
            errors: ["Expected newline after \"use strict\" directive."]
        },
        {
            code: "//comment\n'use strict';\nvar foo;",
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },

        // "always"
        // at top of file
        {
            code: "'use strict';\nvar foo;",
            options: ["always"],
            errors: ["Expected newline after \"use strict\" directive."]
        },
        {
            code: "'use strict';\n//comment",
            options: ["always"],
            errors: ["Expected newline after \"use strict\" directive."]
        },
        {
            code: "'use strict';\n/*comment*/",
            options: ["always"],
            errors: ["Expected newline after \"use strict\" directive."]
        },

        // after comment at top of file
        {
            code: "#!/usr/bin/env node\n'use strict';\nvar foo;",
            options: ["always"],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },
        {
            code: "#!/usr/bin/env node\n//comment\n'use strict';\nvar foo;",
            options: ["always"],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },
        {
            code: "//comment\n'use strict';\nvar foo;",
            options: ["always"],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },
        {
            code: "/*comment*/\n'use strict';\nvar foo;",
            options: ["always"],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },
        {
            code: "/*\nmultiline comment\n*/\n'use strict';\nvar foo;",
            options: ["always"],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },

        // at the top of function blocks
        {
            code: "function foo() {\n'use strict';\nvar bar;\n}",
            options: ["always"],
            errors: ["Expected newline after \"use strict\" directive."]
        },
        {
            code: "() => {\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["always"],
            errors: ["Expected newline after \"use strict\" directive."]
        },

        // after comment at top of function blocks
        {
            code: "function foo() {\n//comment\n'use strict';\nvar bar;\n}",
            options: ["always"],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },
        {
            code: "function foo() {\n/*\nmultiline comment\n*/\n'use strict';\nvar bar;\n}",
            options: ["always"],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },
        {
            code: "() => {\n//comment\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["always"],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },
        {
            code: "() => {\n/*\nmultiline comment\n*/\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["always"],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },

        // "never"
        // at top of file
        {
            code: "'use strict';\n\nvar foo;",
            options: ["never"],
            errors: ["Unexpected newline after \"use strict\" directive."]
        },
        {
            code: "'use strict';\n\n//comment",
            options: ["never"],
            errors: ["Unexpected newline after \"use strict\" directive."]
        },
        {
            code: "'use strict';\n\n/*comment*/",
            options: ["never"],
            errors: ["Unexpected newline after \"use strict\" directive."]
        },

        // after comment at top of file
        {
            code: "#!/usr/bin/env node\n\n'use strict';\n\nvar foo;",
            options: ["never"],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },
        {
            code: "#!/usr/bin/env node\n//comment\n\n'use strict';\n\nvar foo;",
            options: ["never"],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },
        {
            code: "//comment\n\n'use strict';\n\nvar foo;",
            options: ["never"],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },
        {
            code: "/*comment*/\n\n'use strict';\n\nvar foo;",
            options: ["never"],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },
        {
            code: "/*\nmultiline comment\n*/\n\n'use strict';\n\nvar foo;",
            options: ["never"],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },

        // at the top of function blocks
        {
            code: "function foo() {\n'use strict';\n\nvar bar;\n}",
            options: ["never"],
            errors: ["Unexpected newline after \"use strict\" directive."]
        },
        {
            code: "() => {\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["never"],
            errors: ["Unexpected newline after \"use strict\" directive."]
        },

        // after comment at top of function blocks
        {
            code: "function foo() {\n//comment\n\n'use strict';\n\nvar bar;\n}",
            options: ["never"],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },
        {
            code: "function foo() {\n/*\nmultiline comment\n*/\n\n'use strict';\n\nvar bar;\n}",
            options: ["never"],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },
        {
            code: "() => {\n//comment\n\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["never"],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },
        {
            code: "() => {\n/*\nmultiline comment\n*/\n\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: ["never"],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },

        // { "before": "never", "after": "always" }
        // at top of file
        {
            code: "'use strict';\nvar foo;",
            options: [{ before: "never", after: "always" }],
            errors: ["Expected newline after \"use strict\" directive."]
        },
        {
            code: "'use strict';\n//comment",
            options: [{ before: "never", after: "always" }],
            errors: ["Expected newline after \"use strict\" directive."]
        },
        {
            code: "'use strict';\n/*comment*/",
            options: [{ before: "never", after: "always" }],
            errors: ["Expected newline after \"use strict\" directive."]
        },

        // after comment at top of file
        {
            code: "#!/usr/bin/env node\n\n'use strict';\nvar foo;",
            options: [{ before: "never", after: "always" }],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },
        {
            code: "//comment\n\n'use strict';\nvar foo;",
            options: [{ before: "never", after: "always" }],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },
        {
            code: "/*comment*/\n\n'use strict';\nvar foo;",
            options: [{ before: "never", after: "always" }],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },
        {
            code: "/*\nmultiline comment\n*/\n\n'use strict';\nvar foo;",
            options: [{ before: "never", after: "always" }],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },

        // at the top of function blocks
        {
            code: "function foo() {\n'use strict';\nvar bar;\n}",
            options: [{ before: "never", after: "always" }],
            errors: ["Expected newline after \"use strict\" directive."]
        },
        {
            code: "function foo() {\n\n'use strict';\nvar bar;\n}",
            options: [{ before: "never", after: "always" }],
            errors: ["Expected newline after \"use strict\" directive."]
        },
        {
            code: "() => {\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "never", after: "always" }],
            errors: ["Expected newline after \"use strict\" directive."]
        },
        {
            code: "() => {\n\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "never", after: "always" }],
            errors: ["Expected newline after \"use strict\" directive."]
        },

        // after comment at top of function blocks
        {
            code: "function foo() {\n//comment\n\n'use strict';\nvar bar;\n}",
            options: [{ before: "never", after: "always" }],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },
        {
            code: "function foo() {\n/*\nmultiline comment\n*/\n\n'use strict';\nvar bar;\n}",
            options: [{ before: "never", after: "always" }],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },
        {
            code: "() => {\n//comment\n\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "never", after: "always" }],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },
        {
            code: "() => {\n/*\nmultiline comment\n*/\n\n'use strict';\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "never", after: "always" }],
            errors: [
                "Unexpected newline before \"use strict\" directive.",
                "Expected newline after \"use strict\" directive."
            ]
        },

        // { "before": "always", "after": "never" }
        // at top of file
        {
            code: "'use strict';\n\nvar foo;",
            options: [{ before: "always", after: "never" }],
            errors: ["Unexpected newline after \"use strict\" directive."]
        },
        {
            code: "'use strict';\n\n//comment",
            options: [{ before: "always", after: "never" }],
            errors: ["Unexpected newline after \"use strict\" directive."]
        },
        {
            code: "'use strict';\n\n/*comment*/",
            options: [{ before: "always", after: "never" }],
            errors: ["Unexpected newline after \"use strict\" directive."]
        },

        // after comment at top of file
        {
            code: "#!/usr/bin/env node\n'use strict';\n\nvar foo;",
            options: [{ before: "always", after: "never" }],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },
        {
            code: "//comment\n'use strict';\n\nvar foo;",
            options: [{ before: "always", after: "never" }],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },
        {
            code: "/*comment*/\n'use strict';\n\nvar foo;",
            options: [{ before: "always", after: "never" }],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },
        {
            code: "/*\nmultiline comment\n*/\n'use strict';\n\nvar foo;",
            options: [{ before: "always", after: "never" }],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },

        // at the top of function blocks
        {
            code: "function foo() {\n'use strict';\n\nvar bar;\n}",
            options: [{ before: "always", after: "never" }],
            errors: ["Unexpected newline after \"use strict\" directive."]
        },
        {
            code: "function foo() {\n\n'use strict';\n\nvar bar;\n}",
            options: [{ before: "always", after: "never" }],
            errors: ["Unexpected newline after \"use strict\" directive."]
        },
        {
            code: "() => {\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "always", after: "never" }],
            errors: ["Unexpected newline after \"use strict\" directive."]
        },
        {
            code: "() => {\n\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "always", after: "never" }],
            errors: ["Unexpected newline after \"use strict\" directive."]
        },

        // after comment at top of function blocks
        {
            code: "function foo() {\n//comment\n'use strict';\n\nvar bar;\n}",
            options: [{ before: "always", after: "never" }],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },
        {
            code: "function foo() {\n/*\nmultiline comment\n*/\n'use strict';\n\nvar bar;\n}",
            options: [{ before: "always", after: "never" }],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },
        {
            code: "() => {\n//comment\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "always", after: "never" }],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        },
        {
            code: "() => {\n/*\nmultiline comment\n*/\n'use strict';\n\nvar foo;\n}",
            parserOptions: { ecmaVersion: 6 },
            options: [{ before: "always", after: "never" }],
            errors: [
                "Expected newline before \"use strict\" directive.",
                "Unexpected newline after \"use strict\" directive."
            ]
        }
    ]
});

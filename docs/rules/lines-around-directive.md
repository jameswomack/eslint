# enforce or disallow newlines around directives (lines-around-directive)

The `"strict mode";` directive is used in JavaScript to invoke strict mode. It must occur either at the top of a file or function block and is applied to the scope in which it occurs.

```js
// Strict mode is invoked for the entire script
"use strict";

var foo;

function bar() {
  var baz;
}
```

```js
var foo;

// Strict mode is only invoked within the following function
function bar() {
  "use strict";

  var baz;
}
```

## Rule Details

This rule enforces or disallows blank newlines around directives. It does not enforce blank newlines before directives unless they are preceded by a comment. Please use the [padded-blocks](padded-blocks.md) rule if this is a style you would like to enforce.

## Options

This rule has one option. It can either be a string or an object:

* `"always"` (default) enforces blank newlines around directives.
* `"never"` disallows blank newlines around directives.

or

```js
{
  "before": "always" or "never"
  "after": "always" or "never",
}
```

### always

This is the default option.

Examples of **incorrect** code for this rule with the `"always"` option:

```js
/* eslint lines-around-directive: ["error", "always"] */

/* Top of file */
"use strict";
var foo;

/* Top of file */
// comment
"use strict";
var foo;

function foo() {
  "use strict";
  var bar;
}

function foo() {
  // comment
  "use strict";
  var bar;
}
```

Examples of **correct** code for this rule with the `"always"` option:

```js
/* eslint lines-around-directive: ["error", "always"] */

/* Top of file */
"use strict";

var foo;

/* Top of file */
// comment

"use strict";

var foo;

function foo() {
  "use strict";

  var bar;
}

function foo() {
  // comment

  "use strict";

  var bar;
}
```

### never

Examples of **incorrect** code for this rule with the `"never"` option:

```js
/* eslint lines-around-directive: ["error", "never"] */

/* Top of file */

"use strict";

var foo;


/* Top of file */
// comment

"use strict";

var foo;


function foo() {
  "use strict";

  var bar;
}


function foo() {
  // comment

  "use strict";

  var bar;
}
```

Examples of **correct** code for this rule with the `"never"` option:

```js
/* eslint lines-around-directive: ["error", "never"] */

/* Top of file */
"use strict";
var foo;

/* Top of file */
// comment
"use strict";
var foo;

function foo() {
  "use strict";
  var bar;
}

function foo() {
  // comment
  "use strict";
  var bar;
}
```

### before & after

Examples of **incorrect** code for this rule with the `{ "before": "never", "after": "always" }` option:

```js
/* eslint lines-around-directive: ["error", { "before": "never", "after": "always" }] */

/* Top of file */

"use strict";
var foo;

/* Top of file */
// comment

"use strict";
var foo;

function foo() {
  "use strict";
  var bar;
}

function foo() {
  // comment

  "use strict";
  var bar;
}
```

Examples of **correct** code for this rule with the `{ "before": "never", "after": "always" }`  option:

```js
/* eslint lines-around-directive: ["error", { "before": "never", "after": "always" }] */

/* Top of file */
"use strict";

var foo;

/* Top of file */
// comment
"use strict";

var foo;

function foo() {
  "use strict";

  var bar;
}

function foo() {
  // comment
  "use strict";

  var bar;
}
```

Examples of **incorrect** code for this rule with the `{ "before": "always", "after": "never" }` option:

```js
/* eslint lines-around-directive: ["error", { "before": "always", "after": "never" }] */

/* Top of file */
"use strict";

var foo;

/* Top of file */
// comment
"use strict";

var foo;

function foo() {
  "use strict";

  var bar;
}

function foo() {
  // comment
  "use strict";

  var bar;
}
```

Examples of **correct** code for this rule with the `{ "before": "always", "after": "never" }` option:

```js
/* eslint lines-around-directive: ["error", { "before": "always", "after": "never" }] */

/* Top of file */
"use strict";
var foo;

/* Top of file */
// comment

"use strict";
var foo;

function foo() {
  "use strict";
  var bar;
}

function foo() {
  // comment

  "use strict";
  var bar;
}
```

## When Not To Use It

You can safely disable this rule if you do not have any strict conventions about whether or not directives should have blank newlines before or after them.

## Related Rules

* [lines-around-comment](lines-around-comment.md)
* [padded-blocks](padded-blocks.md)

## Compatibility

* **JSCS**: [requirePaddingNewLinesAfterUseStrict](http://jscs.info/rule/requirePaddingNewLinesAfterUseStrict)
* **JSCS**: [disallowPaddingNewLinesAfterUseStrict](http://jscs.info/rule/disallowPaddingNewLinesAfterUseStrict)

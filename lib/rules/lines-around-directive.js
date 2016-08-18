/**
 * @fileoverview Enforce or disallow newlines around directives
 * @author Kai Cataldo
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "enforce or disallow newlines around directives",
            category: "Stylistic Issues",
            recommended: false
        },
        schema: [{
            oneOf: [
                {
                    enum: ["always", "never"]
                },
                {
                    type: "object",
                    properties: {
                        before: {
                            enum: ["always", "never"]
                        },
                        after: {
                            enum: ["always", "never"]
                        },
                    },
                    additionalProperties: false,
                    minProperties: 2
                }
            ]
        }]
    },

    create(context) {
        const sourceCode = context.getSourceCode();
        const config = context.options[0] || "always";
        let checkBefore;
        let checkAfter;

        if (typeof config === "string") {
            checkBefore = config;
            checkAfter = config;
        } else if (typeof config === "object") {
            checkBefore = config.before;
            checkAfter = config.after;
        }

        //--------------------------------------------------------------------------
        // Helpers
        //--------------------------------------------------------------------------

        /**
         * Check if node is a "use strict" directive.
         * @param {ASTNode} node Node to check.
         * @returns {boolean} Whether or not the passed in node is a "use strict" directive.
         */
        function isNodeUseStrictDirective(node) {
            return node.type === "ExpressionStatement" &&
              node.expression.type === "Literal" &&
              node.expression.value === "use strict";
        }

        /**
         * Get "use strict" directive from node body.
         * @param {ASTNode[]} body Body of node to check.
         * @returns {boolean} Whether or not the passed in node is preceded by a blank newline.
         */
        function getUseStrictDirective(body) {
            const firstStatement = body[0];

            return isNodeUseStrictDirective(firstStatement) ? firstStatement : null;
        }

        /**
         * Check if node is preceded by a blank newline.
         * @param {ASTNode} node Node to check.
         * @returns {boolean} Whether or not the passed in node is preceded by a blank newline.
         */
        function hasNewlineBefore(node) {
            const tokenBefore = sourceCode.getTokenOrCommentBefore(node);
            const tokenLineBefore = tokenBefore ? tokenBefore.loc.end.line : 0;

            return node.loc.start.line - tokenLineBefore >= 2;
        }

        /**
         * Check if node is followed by a blank newline.
         * @param {ASTNode} node Node to check.
         * @returns {boolean} Whether or not the passed in node is followed by a blank newline.
         */
        function hasNewlineAfter(node) {
            const tokenAfter = sourceCode.getTokenOrCommentAfter(node);

            return tokenAfter.loc.start.line - node.loc.end.line >= 2;
        }

        /**
         * Report errors for newlines around directives.
         * @param {ASTNode} node Node to check.
         * @param {string} location Whether the error was found before or after the directive.
         * @param {boolean} expected Whether or not a newline was expected or unexpected.
         * @returns {void}
         */
        function reportError(node, location, expected) {
            context.report({
                node,
                message: "{{expected}} newline {{location}} \"use strict\" directive.",
                data: {
                    expected: expected ? "Expected" : "Unexpected",
                    location
                }
            });
        }

        /**
         * Check lines around directives in node
         * @param {ASTNode} node - node to check
         * @returns {void}
         */
        function checkDirectives(node) {

            // Skip arrow functions with implicit return.
            // `() => "use strict";` returns the string `"use strict"`.
            if (node.type === "ArrowFunctionExpression" && node.body.type !== "BlockStatement") {
                return;
            }

            const body = node.type === "Program" ? node.body : node.body.body;
            const directive = getUseStrictDirective(body);

            if (!directive) {
                return;
            }

            // Only check before if directive has a leading comment or if it is at the top of
            // the file and checkBefore is set to "never". This is to not force a newline at the top of
            // the file if there are no comments as well as for compatibility with padded-blocks.
            if (
                directive.leadingComments && directive.leadingComments.length ||

                // Shebangs are not added to leading comments but are accounted for by the following
                node.type === "Program" && !!sourceCode.getTokenOrCommentBefore(directive)
            ) {
                if (checkBefore === "always" && !hasNewlineBefore(directive)) {
                    reportError(directive, "before", true);
                }

                if (checkBefore === "never" && hasNewlineBefore(directive)) {
                    reportError(directive, "before", false);
                }
            } else if (
                node.type === "Program" &&
                checkBefore === "never" &&
                hasNewlineBefore(directive)
            ) {
                reportError(directive, "before", false);
            }

            // Do not check after if the directive is the only statement in the body
            // of a Program or Block and isn't followed by a comment to ensure
            // this rule behaves well with padded-blocks.
            if (directive === body[body.length - 1] && !directive.trailingComments) {
                return;
            }

            if (checkAfter === "always" && !hasNewlineAfter(directive)) {
                reportError(directive, "after", true);
            }

            if (checkAfter === "never" && hasNewlineAfter(directive)) {
                reportError(directive, "after", false);
            }
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            Program: checkDirectives,
            FunctionDeclaration: checkDirectives,
            FunctionExpression: checkDirectives,
            ArrowFunctionExpression: checkDirectives
        };
    }
};

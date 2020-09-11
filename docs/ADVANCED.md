This page contains documentation on some more advanced capabilities of
the Container Run Skill.

## Extracting problems

### Regular Expression matching

A container skill can write a JSON file to `$ATOMIST_MATCHER_DIR` containing match instructions on how to extract
problems from log output.

The structure of the JSON document needs to follow this TypeScript interface:

```typescript
export interface Matcher {
    name: string;
    severity?:
        | "success"
        | "failure"
        | "neutral"
        | "cancelled"
        | "skipped"
        | "timed_out"
        | "action_required";
    report?: "always" | "error";
    pattern: [
        {
            regexp: string;
            groups: {
                path: number;
                line: number;
                column: number;
                severity: number;
                message: number;
                title: number;
            };
        }
    ];
}
```

Here is an example matcher JSON from the [markdownlint-skill][]:

```json
{
    "name": "markdownlint",
    "severity": "action_required",
    "report": "error",
    "pattern": [
        {
            "regexp": "^([^:]*):(\\d+):?(\\d+)?\\s([\\w-\\/]*)\\s(.*)$",
            "groups": {
                "path": 1,
                "line": 2,
                "column": 3,
                "title": 4,
                "message": 5
            }
        }
    ]
}
```

[markdownlink-skill]: https://github.com/atomist-skills/markdownlint-skill

### JavaScript-based extraction

Any JavaScript file written into `$ATOMIST_MATCHERS_DIR` will be dynamically loaded and executed. The script needs to
export a `matcher` const of type `JavaScriptMatcher`.

```typescript
export interface Annotation {
    path: string;
    line: number;
    column: number;
    severity: "failure" | "notice" | "warning";
    title: string;
    message: string;
}

export interface Check {
    name: string;
    summary?: string;
    annotations?: Annotation[];
    severity?:
        | "success"
        | "failure"
        | "neutral"
        | "cancelled"
        | "skipped"
        | "timed_out"
        | "action_required";
    report?: "error" | "always";
}

export type JavaScriptMatcher = (ctx: Contextual<any, any>) => Promise<Check>;
```

`Contextual` provides access to a GraphQL, Message and Storage client. But let's ignore that for now.

Here is an example matcher from the [dockerfilelint-skill][]:

```js
exports.matcher = async () => {
    const result = require(`${process.env.ATOMIST_OUTPUT_DIR}/dockerfilelint.json`);

    return check;
};
```

The matcher .js file should be written to the output locations as follows:

```shell script
cp /app/dockerfilelint.matcher.js "$ATOMIST_MATCHERS_DIR"
```

[dockerfilelint-skill]: https://github.com/atomist-skills/dockerfilelint-skill

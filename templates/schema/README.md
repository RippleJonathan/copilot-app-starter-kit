Template manifest schema
------------------------

Files under `templates/*/template.json` describe variables an agent or the generator can request when creating a feature.

Supported fields for each variable:
- `name` (string, required): environment-style variable name, e.g. `PROJECT_NAME`.
- `prompt` (string): user-facing prompt shown when asking interactively.
- `type` (string): one of `string`, `boolean`, `number`.
- `default` (any): default value used in non-interactive runs.
- `choices` (array of strings): optional list of choices presented as a list prompt.
- `secret` (boolean): if true, prompt will hide input (password style).
- `required` (boolean): when true, value must be provided or the manifest should not have a default.

Example:

```
{
  "name": "auth",
  "variables": [
    { "name": "PROJECT_NAME", "prompt": "Project name", "type": "string", "default": "MyApp" },
    { "name": "DB_CHOICE", "prompt": "Database", "choices": ["none","sqlite","postgres"], "default": "sqlite" }
  ]
}
```

module.exports = {
  "env": {
    "browser": true,
    "es6": true,
  },
  "extends": [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 2021,
    "sourceType": "module",
  },
  "plugins": [
    "react",
    "import",
    "@typescript-eslint",
  ],
  "settings": {
    react: {
      version: "detect",
    },
  },
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "indent": ["error", 4],
    "max-len": ["error", { "code": 240 }],
    "require-jsdoc": 0,
    "react/prop-types": 0,
    "react/display-name": "off",
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal"],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before",
          },
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true,
        },
      },
    ],
    "react-hooks/exhaustive-deps": "off",
  },
  "parser": "@typescript-eslint/parser",
};

module.exports = {
    root: true,
    "parser": "babel-eslint",
    "extends": "airbnb",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "rules": {
        "no-console": 0,
        "no-debugger": 0,
        "indent": 0,
        "eqeqeq": 0,
        "consistent-return": 0,
//    "eol-last":0,
        "comma-dangle": [2, "never"],
        "semi": [2, "always"],
        "max-len": 0,
        "object-curly-spacing": 0,
        "react/jsx-no-bind": [1],
        "array-bracket-spacing": 0,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/display-name": 1,
        "react/jsx-indent": 0,
        "react/prop-types": [0],
        "react/jsx-indent-props": 0,
        "react/jsx-boolean-value": 1,
        "react/jsx-space-before-closing": 0,
        "react/jsx-first-prop-new-line": 0,
        "react/jsx-closing-bracket-location": 0,
        "prefer-template": 0,
        "no-global-assign": [0],
        "no-unsafe-negation": 0,
        "no-mixed-operators":[0],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    },

    "plugins": [
        "react"
    ]
}
# Loopback Component Model Extender

A loopback component that enables componentized model customisation.

By default, loopback allows you to customise models by providing a `model.js` file in the same directory as `model.json`. Whilst this is sufficient for small applications it can be cumbersome for larger applications with complex models.

This component allows you to break large model customization files down into multiple smaller ones.

By default, it will look for model cusomization files in the directory `src/common/models/${modelName}/*`. All files found in that directory will be applied to the model.

Models can specify an alternate location by setting `Model.settings.components` to the location of your model customization files.

All paths are relative to your project root (or the value of the `basePath` component configuration option).

All model customization carried out by this component takes place after all models have been initialized and attached to the app (but before boot scripts run). This ensures that all models are already available on the app at the time the customizations are applied.

## Installation

1. Install in you loopback project:

  `npm install --save loopback-component-model-extender`

2. Create a component-config.json file in your server folder (if you don't already have one)

3. Enable the component inside `component-config.json`.

  ```json
  {
    "loopback-component-model-extender": {
      "key": "value"
    }
  }
  ```

**Options:**

- `log`

  [String] : Name of the logging class to use for log messages. *(default: 'console')*

- `basePath`

  [String] : Directory containing loopback application. *(default: null)*



## Testing

Run the tests in the `test` directory.

```bash
  npm test
```

# Debugging

Run with debugging output on:

```bash
  DEBUG='loopback:component:model-extender' npm test

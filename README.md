# Comment Doc

Configurable CLI docs for js/ts comments

# Example

Run `yarn build` and `yarn generate` to run the example

## Configuration

On your `.eventconfigrc` you can use the following configuration

| Value          | Default                | Description                                    |
| -------------- | ---------------------- | ---------------------------------------------- |
| filePaths      | [ ' ./**/*.{js,ts} ' ] | Regex to the files you want to track           |
| ignorePaths    | [ ' node_modules ' ]   | Regex with th paths to ignore                  |
| tags           | []                     | @ comment params you want to track. Ex: @route |
| outputDir      | out                    | Output directory                               |
| outputFileName | index.json             | Output file name                               |

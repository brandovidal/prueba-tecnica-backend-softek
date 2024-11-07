/**
 * don't forget to set the `"type": "module"` property in `package.json`
 * and install the `esbuild-plugin-env` package
 */
import env from 'esbuild-plugin-env'
export default (serverless) => {
  return {
    external: [],
    plugins: [env()],
  }
}

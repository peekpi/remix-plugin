import { PluginOptions } from "./client"

// Old link: 'https://raw.githubusercontent.com/ethereum/remix-plugin/master/projects/client/assets/origins.json'
export const remixOrgins = 'https://gist.githubusercontent.com/EthereumRemix/091ccc57986452bbb33f57abfb13d173/raw/3367e019335746b73288e3710af2922d4c8ef5a3/origins.json'

/** Fetch the default origins for remix */
export async function getDefaultOrigins() {
  //const res = await fetch('https://raw.githubusercontent.com/ethereum/remix-plugin/master/projects/client/assets/origins.json')
  //return res.json()
  return [];
}

/** Get all the origins */
export async function getAllOrigins(options: Partial<PluginOptions<any>>): Promise<string[]> {
  const { devMode, allowOrigins } = options
  const localhost = devMode.port ? [
    `http://127.0.0.1:${devMode.port}`,
    `http://localhost:${devMode.port}`,
    `https://127.0.0.1:${devMode.port}`,
    `https://localhost:${devMode.port}`,
  ] : []
  const devOrigins = devMode.origins
    ? (typeof devMode.origins === 'string') ? [devMode.origins] : devMode.origins
    : []
  const defaultOrigins = await getOriginsFromUrl(allowOrigins as string)
  return [ ...defaultOrigins, ...localhost, ...devOrigins]
}

/**
 * Check if the sender has the right origin
 * @param origin The origin of the incoming message
 * @param options client plugin options
 */
export async function checkOrigin(origin: string, options: Partial<PluginOptions<any>> = {}) {
  if (options.allowOrigins) {
    if (Array.isArray(options.allowOrigins)) {
      return options.allowOrigins.includes(origin)
    } else {
      const allOrigins = await getAllOrigins(options)
      return allOrigins.includes(origin)
    }
  }
  return true;
}

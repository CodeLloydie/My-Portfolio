export const useAssetUrl = (path: string) => {
  const { app } = useRuntimeConfig()
  return app.baseURL.replace(/\/$/, '') + path
}

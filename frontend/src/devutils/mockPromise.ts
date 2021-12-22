export const mockPromise = async <T>(value: T) => {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, 500)
  })
}

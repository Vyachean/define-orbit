const emptyReject = Symbol('emptyReject')
const emptyResolve = Symbol('emptyResolve')

export const asyncOnce = <
  R,
  /* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment */
  F extends(...args: any[]) => Promise<R>
  >(func: F): (...args: Parameters<F>) => ReturnType<F> => {
  let calling = false

  const resolveSet = new Set<(p:any)=>void>()
  let resForResolve: R | typeof emptyResolve = emptyResolve

  const rejectSet = new Set<(p:any)=>void>()
  let resForReject: any = emptyReject

  const onced = (args: Parameters<F>) => {
    if (calling) {
      return
    }
    calling = true
    func(...args)
      .then((res) => {
        resForResolve = res
        resolveSet.forEach((resolve) => resolve(resForResolve))
        resolveSet.clear()
      })
      .catch((res) => {
        resForReject = res
        rejectSet.forEach((reject) => reject(resForReject))
        rejectSet.clear()
      })
  }

  return (...args: Parameters<F>): ReturnType<F> => new Promise((resolve, reject) => {
    if (resForResolve !== emptyResolve) {
      resolve(resForResolve)
      return
    }
    if (resForReject !== emptyReject) {
      reject(resForReject)
      return
    }
    resolveSet.add(resolve)
    rejectSet.add(reject)
    onced(args)
  }) as ReturnType<F>
}

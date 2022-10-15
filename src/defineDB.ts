import OrbitStore from 'orbit-db-store'

/**
 * Общее состояние для всех модулей
 */
export type GeneralOrbitState = {
  /**
   * Время последнего изменения, для реактивной зависимости
   */
  updated: number
}

/**
 * Интерфейс для собственных геттеров к базе
 */
type QueryGetter<DB> = (db?: DB) => any

/**
 * Массив геттеров
 */
export type QueryGetters<DB> = Record<string, QueryGetter<DB>> | {}

export type GeneralOrbitGetters = {
  address: OrbitStore['address'] | undefined
}

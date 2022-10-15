import EventStore from 'orbit-db-eventstore'
import CounterStore from 'orbit-db-counterstore'
import FeedStore from 'orbit-db-feedstore'
import OrbitStore from 'orbit-db-store'
import { Identity } from 'orbit-db-identity-provider'
import DocumentStore from 'orbit-db-docstore'
import KeyValueStore from 'orbit-db-kvstore'

export type OrbitDBTypes<I> = {
  eventlog: EventStore<I>;
  counter: CounterStore;
  feed: FeedStore<I>;
  docstore: DocumentStore<I>;
  keyvalue: KeyValueStore<I>;
}

export type OrbitID = `orbit-${string}`

type GeneralOptions = {
  identity?: Identity,
}

type OpenOptions = GeneralOptions & {
  address: string,
}

type CreateOptions = GeneralOptions & {
  name: string,
}

export type Options = OpenOptions | CreateOptions

export type StaticState<T extends keyof OrbitDBTypes<any>> = { db?:OrbitDBTypes<any>[T] }

export interface GeneralOrbitPinia {
  updateTime(): void;

  updated: number;
  address: OrbitStore['address'] | undefined;
}

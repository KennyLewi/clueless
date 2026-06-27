
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Hackathon
 * 
 */
export type Hackathon = $Result.DefaultSelection<Prisma.$HackathonPayload>
/**
 * Model UserProfile
 * 
 */
export type UserProfile = $Result.DefaultSelection<Prisma.$UserProfilePayload>
/**
 * Model RankedEvent
 * 
 */
export type RankedEvent = $Result.DefaultSelection<Prisma.$RankedEventPayload>
/**
 * Model RegistrationRun
 * 
 */
export type RegistrationRun = $Result.DefaultSelection<Prisma.$RegistrationRunPayload>
/**
 * Model PendingNotification
 * 
 */
export type PendingNotification = $Result.DefaultSelection<Prisma.$PendingNotificationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Hackathons
 * const hackathons = await prisma.hackathon.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Hackathons
   * const hackathons = await prisma.hackathon.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.hackathon`: Exposes CRUD operations for the **Hackathon** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Hackathons
    * const hackathons = await prisma.hackathon.findMany()
    * ```
    */
  get hackathon(): Prisma.HackathonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userProfile`: Exposes CRUD operations for the **UserProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProfiles
    * const userProfiles = await prisma.userProfile.findMany()
    * ```
    */
  get userProfile(): Prisma.UserProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rankedEvent`: Exposes CRUD operations for the **RankedEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RankedEvents
    * const rankedEvents = await prisma.rankedEvent.findMany()
    * ```
    */
  get rankedEvent(): Prisma.RankedEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.registrationRun`: Exposes CRUD operations for the **RegistrationRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RegistrationRuns
    * const registrationRuns = await prisma.registrationRun.findMany()
    * ```
    */
  get registrationRun(): Prisma.RegistrationRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pendingNotification`: Exposes CRUD operations for the **PendingNotification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PendingNotifications
    * const pendingNotifications = await prisma.pendingNotification.findMany()
    * ```
    */
  get pendingNotification(): Prisma.PendingNotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Hackathon: 'Hackathon',
    UserProfile: 'UserProfile',
    RankedEvent: 'RankedEvent',
    RegistrationRun: 'RegistrationRun',
    PendingNotification: 'PendingNotification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "hackathon" | "userProfile" | "rankedEvent" | "registrationRun" | "pendingNotification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Hackathon: {
        payload: Prisma.$HackathonPayload<ExtArgs>
        fields: Prisma.HackathonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HackathonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HackathonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HackathonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HackathonPayload>
          }
          findFirst: {
            args: Prisma.HackathonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HackathonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HackathonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HackathonPayload>
          }
          findMany: {
            args: Prisma.HackathonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HackathonPayload>[]
          }
          create: {
            args: Prisma.HackathonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HackathonPayload>
          }
          createMany: {
            args: Prisma.HackathonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HackathonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HackathonPayload>[]
          }
          delete: {
            args: Prisma.HackathonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HackathonPayload>
          }
          update: {
            args: Prisma.HackathonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HackathonPayload>
          }
          deleteMany: {
            args: Prisma.HackathonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HackathonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HackathonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HackathonPayload>[]
          }
          upsert: {
            args: Prisma.HackathonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HackathonPayload>
          }
          aggregate: {
            args: Prisma.HackathonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHackathon>
          }
          groupBy: {
            args: Prisma.HackathonGroupByArgs<ExtArgs>
            result: $Utils.Optional<HackathonGroupByOutputType>[]
          }
          count: {
            args: Prisma.HackathonCountArgs<ExtArgs>
            result: $Utils.Optional<HackathonCountAggregateOutputType> | number
          }
        }
      }
      UserProfile: {
        payload: Prisma.$UserProfilePayload<ExtArgs>
        fields: Prisma.UserProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findFirst: {
            args: Prisma.UserProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findMany: {
            args: Prisma.UserProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          create: {
            args: Prisma.UserProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          createMany: {
            args: Prisma.UserProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          delete: {
            args: Prisma.UserProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          update: {
            args: Prisma.UserProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          deleteMany: {
            args: Prisma.UserProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          upsert: {
            args: Prisma.UserProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          aggregate: {
            args: Prisma.UserProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProfile>
          }
          groupBy: {
            args: Prisma.UserProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProfileCountArgs<ExtArgs>
            result: $Utils.Optional<UserProfileCountAggregateOutputType> | number
          }
        }
      }
      RankedEvent: {
        payload: Prisma.$RankedEventPayload<ExtArgs>
        fields: Prisma.RankedEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RankedEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankedEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RankedEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankedEventPayload>
          }
          findFirst: {
            args: Prisma.RankedEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankedEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RankedEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankedEventPayload>
          }
          findMany: {
            args: Prisma.RankedEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankedEventPayload>[]
          }
          create: {
            args: Prisma.RankedEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankedEventPayload>
          }
          createMany: {
            args: Prisma.RankedEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RankedEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankedEventPayload>[]
          }
          delete: {
            args: Prisma.RankedEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankedEventPayload>
          }
          update: {
            args: Prisma.RankedEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankedEventPayload>
          }
          deleteMany: {
            args: Prisma.RankedEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RankedEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RankedEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankedEventPayload>[]
          }
          upsert: {
            args: Prisma.RankedEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RankedEventPayload>
          }
          aggregate: {
            args: Prisma.RankedEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRankedEvent>
          }
          groupBy: {
            args: Prisma.RankedEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<RankedEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.RankedEventCountArgs<ExtArgs>
            result: $Utils.Optional<RankedEventCountAggregateOutputType> | number
          }
        }
      }
      RegistrationRun: {
        payload: Prisma.$RegistrationRunPayload<ExtArgs>
        fields: Prisma.RegistrationRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegistrationRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegistrationRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationRunPayload>
          }
          findFirst: {
            args: Prisma.RegistrationRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegistrationRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationRunPayload>
          }
          findMany: {
            args: Prisma.RegistrationRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationRunPayload>[]
          }
          create: {
            args: Prisma.RegistrationRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationRunPayload>
          }
          createMany: {
            args: Prisma.RegistrationRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegistrationRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationRunPayload>[]
          }
          delete: {
            args: Prisma.RegistrationRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationRunPayload>
          }
          update: {
            args: Prisma.RegistrationRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationRunPayload>
          }
          deleteMany: {
            args: Prisma.RegistrationRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegistrationRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegistrationRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationRunPayload>[]
          }
          upsert: {
            args: Prisma.RegistrationRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationRunPayload>
          }
          aggregate: {
            args: Prisma.RegistrationRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistrationRun>
          }
          groupBy: {
            args: Prisma.RegistrationRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistrationRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegistrationRunCountArgs<ExtArgs>
            result: $Utils.Optional<RegistrationRunCountAggregateOutputType> | number
          }
        }
      }
      PendingNotification: {
        payload: Prisma.$PendingNotificationPayload<ExtArgs>
        fields: Prisma.PendingNotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PendingNotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PendingNotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNotificationPayload>
          }
          findFirst: {
            args: Prisma.PendingNotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PendingNotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNotificationPayload>
          }
          findMany: {
            args: Prisma.PendingNotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNotificationPayload>[]
          }
          create: {
            args: Prisma.PendingNotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNotificationPayload>
          }
          createMany: {
            args: Prisma.PendingNotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PendingNotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNotificationPayload>[]
          }
          delete: {
            args: Prisma.PendingNotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNotificationPayload>
          }
          update: {
            args: Prisma.PendingNotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNotificationPayload>
          }
          deleteMany: {
            args: Prisma.PendingNotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PendingNotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PendingNotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNotificationPayload>[]
          }
          upsert: {
            args: Prisma.PendingNotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingNotificationPayload>
          }
          aggregate: {
            args: Prisma.PendingNotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePendingNotification>
          }
          groupBy: {
            args: Prisma.PendingNotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PendingNotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PendingNotificationCountArgs<ExtArgs>
            result: $Utils.Optional<PendingNotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    hackathon?: HackathonOmit
    userProfile?: UserProfileOmit
    rankedEvent?: RankedEventOmit
    registrationRun?: RegistrationRunOmit
    pendingNotification?: PendingNotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type HackathonCountOutputType
   */

  export type HackathonCountOutputType = {
    rankedEvents: number
    registrationRuns: number
  }

  export type HackathonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rankedEvents?: boolean | HackathonCountOutputTypeCountRankedEventsArgs
    registrationRuns?: boolean | HackathonCountOutputTypeCountRegistrationRunsArgs
  }

  // Custom InputTypes
  /**
   * HackathonCountOutputType without action
   */
  export type HackathonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HackathonCountOutputType
     */
    select?: HackathonCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HackathonCountOutputType without action
   */
  export type HackathonCountOutputTypeCountRankedEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RankedEventWhereInput
  }

  /**
   * HackathonCountOutputType without action
   */
  export type HackathonCountOutputTypeCountRegistrationRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrationRunWhereInput
  }


  /**
   * Count Type UserProfileCountOutputType
   */

  export type UserProfileCountOutputType = {
    rankedEvents: number
    registrationRuns: number
  }

  export type UserProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rankedEvents?: boolean | UserProfileCountOutputTypeCountRankedEventsArgs
    registrationRuns?: boolean | UserProfileCountOutputTypeCountRegistrationRunsArgs
  }

  // Custom InputTypes
  /**
   * UserProfileCountOutputType without action
   */
  export type UserProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileCountOutputType
     */
    select?: UserProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserProfileCountOutputType without action
   */
  export type UserProfileCountOutputTypeCountRankedEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RankedEventWhereInput
  }

  /**
   * UserProfileCountOutputType without action
   */
  export type UserProfileCountOutputTypeCountRegistrationRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrationRunWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Hackathon
   */

  export type AggregateHackathon = {
    _count: HackathonCountAggregateOutputType | null
    _min: HackathonMinAggregateOutputType | null
    _max: HackathonMaxAggregateOutputType | null
  }

  export type HackathonMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    organizer: string | null
    url: string | null
    contentHash: string | null
    locationMode: string | null
    locationCity: string | null
    locationCountry: string | null
    locationTz: string | null
    startsAt: Date | null
    endsAt: Date | null
    registrationOpensAt: Date | null
    registrationClosesAt: Date | null
    prizesTotal: string | null
    prizesRaw: string | null
    eligibility: string | null
    registrationProvider: string | null
    registrationFormUrl: string | null
    requiresTeam: boolean | null
    requiresAuth: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HackathonMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    organizer: string | null
    url: string | null
    contentHash: string | null
    locationMode: string | null
    locationCity: string | null
    locationCountry: string | null
    locationTz: string | null
    startsAt: Date | null
    endsAt: Date | null
    registrationOpensAt: Date | null
    registrationClosesAt: Date | null
    prizesTotal: string | null
    prizesRaw: string | null
    eligibility: string | null
    registrationProvider: string | null
    registrationFormUrl: string | null
    requiresTeam: boolean | null
    requiresAuth: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HackathonCountAggregateOutputType = {
    id: number
    title: number
    description: number
    organizer: number
    url: number
    contentHash: number
    locationMode: number
    locationCity: number
    locationCountry: number
    locationTz: number
    startsAt: number
    endsAt: number
    registrationOpensAt: number
    registrationClosesAt: number
    prizesTotal: number
    prizesRaw: number
    themes: number
    eligibility: number
    registrationProvider: number
    registrationFormUrl: number
    requiresTeam: number
    requiresAuth: number
    knownFields: number
    sources: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HackathonMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    organizer?: true
    url?: true
    contentHash?: true
    locationMode?: true
    locationCity?: true
    locationCountry?: true
    locationTz?: true
    startsAt?: true
    endsAt?: true
    registrationOpensAt?: true
    registrationClosesAt?: true
    prizesTotal?: true
    prizesRaw?: true
    eligibility?: true
    registrationProvider?: true
    registrationFormUrl?: true
    requiresTeam?: true
    requiresAuth?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HackathonMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    organizer?: true
    url?: true
    contentHash?: true
    locationMode?: true
    locationCity?: true
    locationCountry?: true
    locationTz?: true
    startsAt?: true
    endsAt?: true
    registrationOpensAt?: true
    registrationClosesAt?: true
    prizesTotal?: true
    prizesRaw?: true
    eligibility?: true
    registrationProvider?: true
    registrationFormUrl?: true
    requiresTeam?: true
    requiresAuth?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HackathonCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    organizer?: true
    url?: true
    contentHash?: true
    locationMode?: true
    locationCity?: true
    locationCountry?: true
    locationTz?: true
    startsAt?: true
    endsAt?: true
    registrationOpensAt?: true
    registrationClosesAt?: true
    prizesTotal?: true
    prizesRaw?: true
    themes?: true
    eligibility?: true
    registrationProvider?: true
    registrationFormUrl?: true
    requiresTeam?: true
    requiresAuth?: true
    knownFields?: true
    sources?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HackathonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hackathon to aggregate.
     */
    where?: HackathonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hackathons to fetch.
     */
    orderBy?: HackathonOrderByWithRelationInput | HackathonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HackathonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hackathons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hackathons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Hackathons
    **/
    _count?: true | HackathonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HackathonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HackathonMaxAggregateInputType
  }

  export type GetHackathonAggregateType<T extends HackathonAggregateArgs> = {
        [P in keyof T & keyof AggregateHackathon]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHackathon[P]>
      : GetScalarType<T[P], AggregateHackathon[P]>
  }




  export type HackathonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HackathonWhereInput
    orderBy?: HackathonOrderByWithAggregationInput | HackathonOrderByWithAggregationInput[]
    by: HackathonScalarFieldEnum[] | HackathonScalarFieldEnum
    having?: HackathonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HackathonCountAggregateInputType | true
    _min?: HackathonMinAggregateInputType
    _max?: HackathonMaxAggregateInputType
  }

  export type HackathonGroupByOutputType = {
    id: string
    title: string
    description: string
    organizer: string | null
    url: string
    contentHash: string
    locationMode: string
    locationCity: string | null
    locationCountry: string | null
    locationTz: string | null
    startsAt: Date | null
    endsAt: Date | null
    registrationOpensAt: Date | null
    registrationClosesAt: Date | null
    prizesTotal: string | null
    prizesRaw: string | null
    themes: string[]
    eligibility: string | null
    registrationProvider: string
    registrationFormUrl: string | null
    requiresTeam: boolean | null
    requiresAuth: boolean | null
    knownFields: JsonValue
    sources: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: HackathonCountAggregateOutputType | null
    _min: HackathonMinAggregateOutputType | null
    _max: HackathonMaxAggregateOutputType | null
  }

  type GetHackathonGroupByPayload<T extends HackathonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HackathonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HackathonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HackathonGroupByOutputType[P]>
            : GetScalarType<T[P], HackathonGroupByOutputType[P]>
        }
      >
    >


  export type HackathonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    organizer?: boolean
    url?: boolean
    contentHash?: boolean
    locationMode?: boolean
    locationCity?: boolean
    locationCountry?: boolean
    locationTz?: boolean
    startsAt?: boolean
    endsAt?: boolean
    registrationOpensAt?: boolean
    registrationClosesAt?: boolean
    prizesTotal?: boolean
    prizesRaw?: boolean
    themes?: boolean
    eligibility?: boolean
    registrationProvider?: boolean
    registrationFormUrl?: boolean
    requiresTeam?: boolean
    requiresAuth?: boolean
    knownFields?: boolean
    sources?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rankedEvents?: boolean | Hackathon$rankedEventsArgs<ExtArgs>
    registrationRuns?: boolean | Hackathon$registrationRunsArgs<ExtArgs>
    _count?: boolean | HackathonCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hackathon"]>

  export type HackathonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    organizer?: boolean
    url?: boolean
    contentHash?: boolean
    locationMode?: boolean
    locationCity?: boolean
    locationCountry?: boolean
    locationTz?: boolean
    startsAt?: boolean
    endsAt?: boolean
    registrationOpensAt?: boolean
    registrationClosesAt?: boolean
    prizesTotal?: boolean
    prizesRaw?: boolean
    themes?: boolean
    eligibility?: boolean
    registrationProvider?: boolean
    registrationFormUrl?: boolean
    requiresTeam?: boolean
    requiresAuth?: boolean
    knownFields?: boolean
    sources?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["hackathon"]>

  export type HackathonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    organizer?: boolean
    url?: boolean
    contentHash?: boolean
    locationMode?: boolean
    locationCity?: boolean
    locationCountry?: boolean
    locationTz?: boolean
    startsAt?: boolean
    endsAt?: boolean
    registrationOpensAt?: boolean
    registrationClosesAt?: boolean
    prizesTotal?: boolean
    prizesRaw?: boolean
    themes?: boolean
    eligibility?: boolean
    registrationProvider?: boolean
    registrationFormUrl?: boolean
    requiresTeam?: boolean
    requiresAuth?: boolean
    knownFields?: boolean
    sources?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["hackathon"]>

  export type HackathonSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    organizer?: boolean
    url?: boolean
    contentHash?: boolean
    locationMode?: boolean
    locationCity?: boolean
    locationCountry?: boolean
    locationTz?: boolean
    startsAt?: boolean
    endsAt?: boolean
    registrationOpensAt?: boolean
    registrationClosesAt?: boolean
    prizesTotal?: boolean
    prizesRaw?: boolean
    themes?: boolean
    eligibility?: boolean
    registrationProvider?: boolean
    registrationFormUrl?: boolean
    requiresTeam?: boolean
    requiresAuth?: boolean
    knownFields?: boolean
    sources?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HackathonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "organizer" | "url" | "contentHash" | "locationMode" | "locationCity" | "locationCountry" | "locationTz" | "startsAt" | "endsAt" | "registrationOpensAt" | "registrationClosesAt" | "prizesTotal" | "prizesRaw" | "themes" | "eligibility" | "registrationProvider" | "registrationFormUrl" | "requiresTeam" | "requiresAuth" | "knownFields" | "sources" | "createdAt" | "updatedAt", ExtArgs["result"]["hackathon"]>
  export type HackathonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rankedEvents?: boolean | Hackathon$rankedEventsArgs<ExtArgs>
    registrationRuns?: boolean | Hackathon$registrationRunsArgs<ExtArgs>
    _count?: boolean | HackathonCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HackathonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type HackathonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $HackathonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Hackathon"
    objects: {
      rankedEvents: Prisma.$RankedEventPayload<ExtArgs>[]
      registrationRuns: Prisma.$RegistrationRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      organizer: string | null
      url: string
      contentHash: string
      locationMode: string
      locationCity: string | null
      locationCountry: string | null
      locationTz: string | null
      startsAt: Date | null
      endsAt: Date | null
      registrationOpensAt: Date | null
      registrationClosesAt: Date | null
      prizesTotal: string | null
      prizesRaw: string | null
      themes: string[]
      eligibility: string | null
      registrationProvider: string
      registrationFormUrl: string | null
      requiresTeam: boolean | null
      requiresAuth: boolean | null
      knownFields: Prisma.JsonValue
      sources: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["hackathon"]>
    composites: {}
  }

  type HackathonGetPayload<S extends boolean | null | undefined | HackathonDefaultArgs> = $Result.GetResult<Prisma.$HackathonPayload, S>

  type HackathonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HackathonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HackathonCountAggregateInputType | true
    }

  export interface HackathonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Hackathon'], meta: { name: 'Hackathon' } }
    /**
     * Find zero or one Hackathon that matches the filter.
     * @param {HackathonFindUniqueArgs} args - Arguments to find a Hackathon
     * @example
     * // Get one Hackathon
     * const hackathon = await prisma.hackathon.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HackathonFindUniqueArgs>(args: SelectSubset<T, HackathonFindUniqueArgs<ExtArgs>>): Prisma__HackathonClient<$Result.GetResult<Prisma.$HackathonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Hackathon that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HackathonFindUniqueOrThrowArgs} args - Arguments to find a Hackathon
     * @example
     * // Get one Hackathon
     * const hackathon = await prisma.hackathon.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HackathonFindUniqueOrThrowArgs>(args: SelectSubset<T, HackathonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HackathonClient<$Result.GetResult<Prisma.$HackathonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hackathon that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackathonFindFirstArgs} args - Arguments to find a Hackathon
     * @example
     * // Get one Hackathon
     * const hackathon = await prisma.hackathon.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HackathonFindFirstArgs>(args?: SelectSubset<T, HackathonFindFirstArgs<ExtArgs>>): Prisma__HackathonClient<$Result.GetResult<Prisma.$HackathonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hackathon that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackathonFindFirstOrThrowArgs} args - Arguments to find a Hackathon
     * @example
     * // Get one Hackathon
     * const hackathon = await prisma.hackathon.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HackathonFindFirstOrThrowArgs>(args?: SelectSubset<T, HackathonFindFirstOrThrowArgs<ExtArgs>>): Prisma__HackathonClient<$Result.GetResult<Prisma.$HackathonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Hackathons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackathonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Hackathons
     * const hackathons = await prisma.hackathon.findMany()
     * 
     * // Get first 10 Hackathons
     * const hackathons = await prisma.hackathon.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hackathonWithIdOnly = await prisma.hackathon.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HackathonFindManyArgs>(args?: SelectSubset<T, HackathonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HackathonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Hackathon.
     * @param {HackathonCreateArgs} args - Arguments to create a Hackathon.
     * @example
     * // Create one Hackathon
     * const Hackathon = await prisma.hackathon.create({
     *   data: {
     *     // ... data to create a Hackathon
     *   }
     * })
     * 
     */
    create<T extends HackathonCreateArgs>(args: SelectSubset<T, HackathonCreateArgs<ExtArgs>>): Prisma__HackathonClient<$Result.GetResult<Prisma.$HackathonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Hackathons.
     * @param {HackathonCreateManyArgs} args - Arguments to create many Hackathons.
     * @example
     * // Create many Hackathons
     * const hackathon = await prisma.hackathon.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HackathonCreateManyArgs>(args?: SelectSubset<T, HackathonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Hackathons and returns the data saved in the database.
     * @param {HackathonCreateManyAndReturnArgs} args - Arguments to create many Hackathons.
     * @example
     * // Create many Hackathons
     * const hackathon = await prisma.hackathon.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Hackathons and only return the `id`
     * const hackathonWithIdOnly = await prisma.hackathon.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HackathonCreateManyAndReturnArgs>(args?: SelectSubset<T, HackathonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HackathonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Hackathon.
     * @param {HackathonDeleteArgs} args - Arguments to delete one Hackathon.
     * @example
     * // Delete one Hackathon
     * const Hackathon = await prisma.hackathon.delete({
     *   where: {
     *     // ... filter to delete one Hackathon
     *   }
     * })
     * 
     */
    delete<T extends HackathonDeleteArgs>(args: SelectSubset<T, HackathonDeleteArgs<ExtArgs>>): Prisma__HackathonClient<$Result.GetResult<Prisma.$HackathonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Hackathon.
     * @param {HackathonUpdateArgs} args - Arguments to update one Hackathon.
     * @example
     * // Update one Hackathon
     * const hackathon = await prisma.hackathon.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HackathonUpdateArgs>(args: SelectSubset<T, HackathonUpdateArgs<ExtArgs>>): Prisma__HackathonClient<$Result.GetResult<Prisma.$HackathonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Hackathons.
     * @param {HackathonDeleteManyArgs} args - Arguments to filter Hackathons to delete.
     * @example
     * // Delete a few Hackathons
     * const { count } = await prisma.hackathon.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HackathonDeleteManyArgs>(args?: SelectSubset<T, HackathonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hackathons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackathonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Hackathons
     * const hackathon = await prisma.hackathon.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HackathonUpdateManyArgs>(args: SelectSubset<T, HackathonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hackathons and returns the data updated in the database.
     * @param {HackathonUpdateManyAndReturnArgs} args - Arguments to update many Hackathons.
     * @example
     * // Update many Hackathons
     * const hackathon = await prisma.hackathon.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Hackathons and only return the `id`
     * const hackathonWithIdOnly = await prisma.hackathon.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HackathonUpdateManyAndReturnArgs>(args: SelectSubset<T, HackathonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HackathonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Hackathon.
     * @param {HackathonUpsertArgs} args - Arguments to update or create a Hackathon.
     * @example
     * // Update or create a Hackathon
     * const hackathon = await prisma.hackathon.upsert({
     *   create: {
     *     // ... data to create a Hackathon
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Hackathon we want to update
     *   }
     * })
     */
    upsert<T extends HackathonUpsertArgs>(args: SelectSubset<T, HackathonUpsertArgs<ExtArgs>>): Prisma__HackathonClient<$Result.GetResult<Prisma.$HackathonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Hackathons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackathonCountArgs} args - Arguments to filter Hackathons to count.
     * @example
     * // Count the number of Hackathons
     * const count = await prisma.hackathon.count({
     *   where: {
     *     // ... the filter for the Hackathons we want to count
     *   }
     * })
    **/
    count<T extends HackathonCountArgs>(
      args?: Subset<T, HackathonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HackathonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Hackathon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackathonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HackathonAggregateArgs>(args: Subset<T, HackathonAggregateArgs>): Prisma.PrismaPromise<GetHackathonAggregateType<T>>

    /**
     * Group by Hackathon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackathonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HackathonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HackathonGroupByArgs['orderBy'] }
        : { orderBy?: HackathonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HackathonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHackathonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Hackathon model
   */
  readonly fields: HackathonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Hackathon.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HackathonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rankedEvents<T extends Hackathon$rankedEventsArgs<ExtArgs> = {}>(args?: Subset<T, Hackathon$rankedEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RankedEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    registrationRuns<T extends Hackathon$registrationRunsArgs<ExtArgs> = {}>(args?: Subset<T, Hackathon$registrationRunsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Hackathon model
   */
  interface HackathonFieldRefs {
    readonly id: FieldRef<"Hackathon", 'String'>
    readonly title: FieldRef<"Hackathon", 'String'>
    readonly description: FieldRef<"Hackathon", 'String'>
    readonly organizer: FieldRef<"Hackathon", 'String'>
    readonly url: FieldRef<"Hackathon", 'String'>
    readonly contentHash: FieldRef<"Hackathon", 'String'>
    readonly locationMode: FieldRef<"Hackathon", 'String'>
    readonly locationCity: FieldRef<"Hackathon", 'String'>
    readonly locationCountry: FieldRef<"Hackathon", 'String'>
    readonly locationTz: FieldRef<"Hackathon", 'String'>
    readonly startsAt: FieldRef<"Hackathon", 'DateTime'>
    readonly endsAt: FieldRef<"Hackathon", 'DateTime'>
    readonly registrationOpensAt: FieldRef<"Hackathon", 'DateTime'>
    readonly registrationClosesAt: FieldRef<"Hackathon", 'DateTime'>
    readonly prizesTotal: FieldRef<"Hackathon", 'String'>
    readonly prizesRaw: FieldRef<"Hackathon", 'String'>
    readonly themes: FieldRef<"Hackathon", 'String[]'>
    readonly eligibility: FieldRef<"Hackathon", 'String'>
    readonly registrationProvider: FieldRef<"Hackathon", 'String'>
    readonly registrationFormUrl: FieldRef<"Hackathon", 'String'>
    readonly requiresTeam: FieldRef<"Hackathon", 'Boolean'>
    readonly requiresAuth: FieldRef<"Hackathon", 'Boolean'>
    readonly knownFields: FieldRef<"Hackathon", 'Json'>
    readonly sources: FieldRef<"Hackathon", 'Json'>
    readonly createdAt: FieldRef<"Hackathon", 'DateTime'>
    readonly updatedAt: FieldRef<"Hackathon", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Hackathon findUnique
   */
  export type HackathonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hackathon
     */
    select?: HackathonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hackathon
     */
    omit?: HackathonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HackathonInclude<ExtArgs> | null
    /**
     * Filter, which Hackathon to fetch.
     */
    where: HackathonWhereUniqueInput
  }

  /**
   * Hackathon findUniqueOrThrow
   */
  export type HackathonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hackathon
     */
    select?: HackathonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hackathon
     */
    omit?: HackathonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HackathonInclude<ExtArgs> | null
    /**
     * Filter, which Hackathon to fetch.
     */
    where: HackathonWhereUniqueInput
  }

  /**
   * Hackathon findFirst
   */
  export type HackathonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hackathon
     */
    select?: HackathonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hackathon
     */
    omit?: HackathonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HackathonInclude<ExtArgs> | null
    /**
     * Filter, which Hackathon to fetch.
     */
    where?: HackathonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hackathons to fetch.
     */
    orderBy?: HackathonOrderByWithRelationInput | HackathonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hackathons.
     */
    cursor?: HackathonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hackathons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hackathons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hackathons.
     */
    distinct?: HackathonScalarFieldEnum | HackathonScalarFieldEnum[]
  }

  /**
   * Hackathon findFirstOrThrow
   */
  export type HackathonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hackathon
     */
    select?: HackathonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hackathon
     */
    omit?: HackathonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HackathonInclude<ExtArgs> | null
    /**
     * Filter, which Hackathon to fetch.
     */
    where?: HackathonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hackathons to fetch.
     */
    orderBy?: HackathonOrderByWithRelationInput | HackathonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hackathons.
     */
    cursor?: HackathonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hackathons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hackathons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hackathons.
     */
    distinct?: HackathonScalarFieldEnum | HackathonScalarFieldEnum[]
  }

  /**
   * Hackathon findMany
   */
  export type HackathonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hackathon
     */
    select?: HackathonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hackathon
     */
    omit?: HackathonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HackathonInclude<ExtArgs> | null
    /**
     * Filter, which Hackathons to fetch.
     */
    where?: HackathonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hackathons to fetch.
     */
    orderBy?: HackathonOrderByWithRelationInput | HackathonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Hackathons.
     */
    cursor?: HackathonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hackathons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hackathons.
     */
    skip?: number
    distinct?: HackathonScalarFieldEnum | HackathonScalarFieldEnum[]
  }

  /**
   * Hackathon create
   */
  export type HackathonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hackathon
     */
    select?: HackathonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hackathon
     */
    omit?: HackathonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HackathonInclude<ExtArgs> | null
    /**
     * The data needed to create a Hackathon.
     */
    data: XOR<HackathonCreateInput, HackathonUncheckedCreateInput>
  }

  /**
   * Hackathon createMany
   */
  export type HackathonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Hackathons.
     */
    data: HackathonCreateManyInput | HackathonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hackathon createManyAndReturn
   */
  export type HackathonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hackathon
     */
    select?: HackathonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hackathon
     */
    omit?: HackathonOmit<ExtArgs> | null
    /**
     * The data used to create many Hackathons.
     */
    data: HackathonCreateManyInput | HackathonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hackathon update
   */
  export type HackathonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hackathon
     */
    select?: HackathonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hackathon
     */
    omit?: HackathonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HackathonInclude<ExtArgs> | null
    /**
     * The data needed to update a Hackathon.
     */
    data: XOR<HackathonUpdateInput, HackathonUncheckedUpdateInput>
    /**
     * Choose, which Hackathon to update.
     */
    where: HackathonWhereUniqueInput
  }

  /**
   * Hackathon updateMany
   */
  export type HackathonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Hackathons.
     */
    data: XOR<HackathonUpdateManyMutationInput, HackathonUncheckedUpdateManyInput>
    /**
     * Filter which Hackathons to update
     */
    where?: HackathonWhereInput
    /**
     * Limit how many Hackathons to update.
     */
    limit?: number
  }

  /**
   * Hackathon updateManyAndReturn
   */
  export type HackathonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hackathon
     */
    select?: HackathonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hackathon
     */
    omit?: HackathonOmit<ExtArgs> | null
    /**
     * The data used to update Hackathons.
     */
    data: XOR<HackathonUpdateManyMutationInput, HackathonUncheckedUpdateManyInput>
    /**
     * Filter which Hackathons to update
     */
    where?: HackathonWhereInput
    /**
     * Limit how many Hackathons to update.
     */
    limit?: number
  }

  /**
   * Hackathon upsert
   */
  export type HackathonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hackathon
     */
    select?: HackathonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hackathon
     */
    omit?: HackathonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HackathonInclude<ExtArgs> | null
    /**
     * The filter to search for the Hackathon to update in case it exists.
     */
    where: HackathonWhereUniqueInput
    /**
     * In case the Hackathon found by the `where` argument doesn't exist, create a new Hackathon with this data.
     */
    create: XOR<HackathonCreateInput, HackathonUncheckedCreateInput>
    /**
     * In case the Hackathon was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HackathonUpdateInput, HackathonUncheckedUpdateInput>
  }

  /**
   * Hackathon delete
   */
  export type HackathonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hackathon
     */
    select?: HackathonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hackathon
     */
    omit?: HackathonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HackathonInclude<ExtArgs> | null
    /**
     * Filter which Hackathon to delete.
     */
    where: HackathonWhereUniqueInput
  }

  /**
   * Hackathon deleteMany
   */
  export type HackathonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hackathons to delete
     */
    where?: HackathonWhereInput
    /**
     * Limit how many Hackathons to delete.
     */
    limit?: number
  }

  /**
   * Hackathon.rankedEvents
   */
  export type Hackathon$rankedEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventInclude<ExtArgs> | null
    where?: RankedEventWhereInput
    orderBy?: RankedEventOrderByWithRelationInput | RankedEventOrderByWithRelationInput[]
    cursor?: RankedEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RankedEventScalarFieldEnum | RankedEventScalarFieldEnum[]
  }

  /**
   * Hackathon.registrationRuns
   */
  export type Hackathon$registrationRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunInclude<ExtArgs> | null
    where?: RegistrationRunWhereInput
    orderBy?: RegistrationRunOrderByWithRelationInput | RegistrationRunOrderByWithRelationInput[]
    cursor?: RegistrationRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrationRunScalarFieldEnum | RegistrationRunScalarFieldEnum[]
  }

  /**
   * Hackathon without action
   */
  export type HackathonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hackathon
     */
    select?: HackathonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hackathon
     */
    omit?: HackathonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HackathonInclude<ExtArgs> | null
  }


  /**
   * Model UserProfile
   */

  export type AggregateUserProfile = {
    _count: UserProfileCountAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  export type UserProfileMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    school: string | null
    resumeUrl: string | null
    locationCity: string | null
    locationCountry: string | null
    willingToTravel: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserProfileMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    school: string | null
    resumeUrl: string | null
    locationCity: string | null
    locationCountry: string | null
    willingToTravel: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserProfileCountAggregateOutputType = {
    id: number
    name: number
    email: number
    school: number
    resumeUrl: number
    skills: number
    interests: number
    locationCity: number
    locationCountry: number
    willingToTravel: number
    travelRegions: number
    formAnswers: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserProfileMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    school?: true
    resumeUrl?: true
    locationCity?: true
    locationCountry?: true
    willingToTravel?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserProfileMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    school?: true
    resumeUrl?: true
    locationCity?: true
    locationCountry?: true
    willingToTravel?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserProfileCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    school?: true
    resumeUrl?: true
    skills?: true
    interests?: true
    locationCity?: true
    locationCountry?: true
    willingToTravel?: true
    travelRegions?: true
    formAnswers?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfile to aggregate.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProfiles
    **/
    _count?: true | UserProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProfileMaxAggregateInputType
  }

  export type GetUserProfileAggregateType<T extends UserProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProfile[P]>
      : GetScalarType<T[P], AggregateUserProfile[P]>
  }




  export type UserProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProfileWhereInput
    orderBy?: UserProfileOrderByWithAggregationInput | UserProfileOrderByWithAggregationInput[]
    by: UserProfileScalarFieldEnum[] | UserProfileScalarFieldEnum
    having?: UserProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProfileCountAggregateInputType | true
    _min?: UserProfileMinAggregateInputType
    _max?: UserProfileMaxAggregateInputType
  }

  export type UserProfileGroupByOutputType = {
    id: string
    name: string
    email: string
    school: string | null
    resumeUrl: string | null
    skills: string[]
    interests: string[]
    locationCity: string | null
    locationCountry: string | null
    willingToTravel: boolean
    travelRegions: string[]
    formAnswers: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: UserProfileCountAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  type GetUserProfileGroupByPayload<T extends UserProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
            : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
        }
      >
    >


  export type UserProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    school?: boolean
    resumeUrl?: boolean
    skills?: boolean
    interests?: boolean
    locationCity?: boolean
    locationCountry?: boolean
    willingToTravel?: boolean
    travelRegions?: boolean
    formAnswers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rankedEvents?: boolean | UserProfile$rankedEventsArgs<ExtArgs>
    registrationRuns?: boolean | UserProfile$registrationRunsArgs<ExtArgs>
    _count?: boolean | UserProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    school?: boolean
    resumeUrl?: boolean
    skills?: boolean
    interests?: boolean
    locationCity?: boolean
    locationCountry?: boolean
    willingToTravel?: boolean
    travelRegions?: boolean
    formAnswers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    school?: boolean
    resumeUrl?: boolean
    skills?: boolean
    interests?: boolean
    locationCity?: boolean
    locationCountry?: boolean
    willingToTravel?: boolean
    travelRegions?: boolean
    formAnswers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    school?: boolean
    resumeUrl?: boolean
    skills?: boolean
    interests?: boolean
    locationCity?: boolean
    locationCountry?: boolean
    willingToTravel?: boolean
    travelRegions?: boolean
    formAnswers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "school" | "resumeUrl" | "skills" | "interests" | "locationCity" | "locationCountry" | "willingToTravel" | "travelRegions" | "formAnswers" | "createdAt" | "updatedAt", ExtArgs["result"]["userProfile"]>
  export type UserProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rankedEvents?: boolean | UserProfile$rankedEventsArgs<ExtArgs>
    registrationRuns?: boolean | UserProfile$registrationRunsArgs<ExtArgs>
    _count?: boolean | UserProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProfile"
    objects: {
      rankedEvents: Prisma.$RankedEventPayload<ExtArgs>[]
      registrationRuns: Prisma.$RegistrationRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      school: string | null
      resumeUrl: string | null
      skills: string[]
      interests: string[]
      locationCity: string | null
      locationCountry: string | null
      willingToTravel: boolean
      travelRegions: string[]
      formAnswers: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userProfile"]>
    composites: {}
  }

  type UserProfileGetPayload<S extends boolean | null | undefined | UserProfileDefaultArgs> = $Result.GetResult<Prisma.$UserProfilePayload, S>

  type UserProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProfileCountAggregateInputType | true
    }

  export interface UserProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProfile'], meta: { name: 'UserProfile' } }
    /**
     * Find zero or one UserProfile that matches the filter.
     * @param {UserProfileFindUniqueArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProfileFindUniqueArgs>(args: SelectSubset<T, UserProfileFindUniqueArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProfileFindUniqueOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProfileFindFirstArgs>(args?: SelectSubset<T, UserProfileFindFirstArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProfiles
     * const userProfiles = await prisma.userProfile.findMany()
     * 
     * // Get first 10 UserProfiles
     * const userProfiles = await prisma.userProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProfileFindManyArgs>(args?: SelectSubset<T, UserProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProfile.
     * @param {UserProfileCreateArgs} args - Arguments to create a UserProfile.
     * @example
     * // Create one UserProfile
     * const UserProfile = await prisma.userProfile.create({
     *   data: {
     *     // ... data to create a UserProfile
     *   }
     * })
     * 
     */
    create<T extends UserProfileCreateArgs>(args: SelectSubset<T, UserProfileCreateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProfiles.
     * @param {UserProfileCreateManyArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProfileCreateManyArgs>(args?: SelectSubset<T, UserProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProfiles and returns the data saved in the database.
     * @param {UserProfileCreateManyAndReturnArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProfile.
     * @param {UserProfileDeleteArgs} args - Arguments to delete one UserProfile.
     * @example
     * // Delete one UserProfile
     * const UserProfile = await prisma.userProfile.delete({
     *   where: {
     *     // ... filter to delete one UserProfile
     *   }
     * })
     * 
     */
    delete<T extends UserProfileDeleteArgs>(args: SelectSubset<T, UserProfileDeleteArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProfile.
     * @param {UserProfileUpdateArgs} args - Arguments to update one UserProfile.
     * @example
     * // Update one UserProfile
     * const userProfile = await prisma.userProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProfileUpdateArgs>(args: SelectSubset<T, UserProfileUpdateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProfiles.
     * @param {UserProfileDeleteManyArgs} args - Arguments to filter UserProfiles to delete.
     * @example
     * // Delete a few UserProfiles
     * const { count } = await prisma.userProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProfileDeleteManyArgs>(args?: SelectSubset<T, UserProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProfileUpdateManyArgs>(args: SelectSubset<T, UserProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles and returns the data updated in the database.
     * @param {UserProfileUpdateManyAndReturnArgs} args - Arguments to update many UserProfiles.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProfile.
     * @param {UserProfileUpsertArgs} args - Arguments to update or create a UserProfile.
     * @example
     * // Update or create a UserProfile
     * const userProfile = await prisma.userProfile.upsert({
     *   create: {
     *     // ... data to create a UserProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProfile we want to update
     *   }
     * })
     */
    upsert<T extends UserProfileUpsertArgs>(args: SelectSubset<T, UserProfileUpsertArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileCountArgs} args - Arguments to filter UserProfiles to count.
     * @example
     * // Count the number of UserProfiles
     * const count = await prisma.userProfile.count({
     *   where: {
     *     // ... the filter for the UserProfiles we want to count
     *   }
     * })
    **/
    count<T extends UserProfileCountArgs>(
      args?: Subset<T, UserProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProfileAggregateArgs>(args: Subset<T, UserProfileAggregateArgs>): Prisma.PrismaPromise<GetUserProfileAggregateType<T>>

    /**
     * Group by UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProfileGroupByArgs['orderBy'] }
        : { orderBy?: UserProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProfile model
   */
  readonly fields: UserProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rankedEvents<T extends UserProfile$rankedEventsArgs<ExtArgs> = {}>(args?: Subset<T, UserProfile$rankedEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RankedEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    registrationRuns<T extends UserProfile$registrationRunsArgs<ExtArgs> = {}>(args?: Subset<T, UserProfile$registrationRunsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProfile model
   */
  interface UserProfileFieldRefs {
    readonly id: FieldRef<"UserProfile", 'String'>
    readonly name: FieldRef<"UserProfile", 'String'>
    readonly email: FieldRef<"UserProfile", 'String'>
    readonly school: FieldRef<"UserProfile", 'String'>
    readonly resumeUrl: FieldRef<"UserProfile", 'String'>
    readonly skills: FieldRef<"UserProfile", 'String[]'>
    readonly interests: FieldRef<"UserProfile", 'String[]'>
    readonly locationCity: FieldRef<"UserProfile", 'String'>
    readonly locationCountry: FieldRef<"UserProfile", 'String'>
    readonly willingToTravel: FieldRef<"UserProfile", 'Boolean'>
    readonly travelRegions: FieldRef<"UserProfile", 'String[]'>
    readonly formAnswers: FieldRef<"UserProfile", 'Json'>
    readonly createdAt: FieldRef<"UserProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"UserProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserProfile findUnique
   */
  export type UserProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findUniqueOrThrow
   */
  export type UserProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findFirst
   */
  export type UserProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findFirstOrThrow
   */
  export type UserProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findMany
   */
  export type UserProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfiles to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile create
   */
  export type UserProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a UserProfile.
     */
    data: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
  }

  /**
   * UserProfile createMany
   */
  export type UserProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile createManyAndReturn
   */
  export type UserProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile update
   */
  export type UserProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a UserProfile.
     */
    data: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
    /**
     * Choose, which UserProfile to update.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile updateMany
   */
  export type UserProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile updateManyAndReturn
   */
  export type UserProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile upsert
   */
  export type UserProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the UserProfile to update in case it exists.
     */
    where: UserProfileWhereUniqueInput
    /**
     * In case the UserProfile found by the `where` argument doesn't exist, create a new UserProfile with this data.
     */
    create: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
    /**
     * In case the UserProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
  }

  /**
   * UserProfile delete
   */
  export type UserProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter which UserProfile to delete.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile deleteMany
   */
  export type UserProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfiles to delete
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to delete.
     */
    limit?: number
  }

  /**
   * UserProfile.rankedEvents
   */
  export type UserProfile$rankedEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventInclude<ExtArgs> | null
    where?: RankedEventWhereInput
    orderBy?: RankedEventOrderByWithRelationInput | RankedEventOrderByWithRelationInput[]
    cursor?: RankedEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RankedEventScalarFieldEnum | RankedEventScalarFieldEnum[]
  }

  /**
   * UserProfile.registrationRuns
   */
  export type UserProfile$registrationRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunInclude<ExtArgs> | null
    where?: RegistrationRunWhereInput
    orderBy?: RegistrationRunOrderByWithRelationInput | RegistrationRunOrderByWithRelationInput[]
    cursor?: RegistrationRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrationRunScalarFieldEnum | RegistrationRunScalarFieldEnum[]
  }

  /**
   * UserProfile without action
   */
  export type UserProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
  }


  /**
   * Model RankedEvent
   */

  export type AggregateRankedEvent = {
    _count: RankedEventCountAggregateOutputType | null
    _avg: RankedEventAvgAggregateOutputType | null
    _sum: RankedEventSumAggregateOutputType | null
    _min: RankedEventMinAggregateOutputType | null
    _max: RankedEventMaxAggregateOutputType | null
  }

  export type RankedEventAvgAggregateOutputType = {
    score: number | null
  }

  export type RankedEventSumAggregateOutputType = {
    score: number | null
  }

  export type RankedEventMinAggregateOutputType = {
    id: string | null
    hackathonId: string | null
    userId: string | null
    score: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RankedEventMaxAggregateOutputType = {
    id: string | null
    hackathonId: string | null
    userId: string | null
    score: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RankedEventCountAggregateOutputType = {
    id: number
    hackathonId: number
    userId: number
    score: number
    reasons: number
    matchedThemes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RankedEventAvgAggregateInputType = {
    score?: true
  }

  export type RankedEventSumAggregateInputType = {
    score?: true
  }

  export type RankedEventMinAggregateInputType = {
    id?: true
    hackathonId?: true
    userId?: true
    score?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RankedEventMaxAggregateInputType = {
    id?: true
    hackathonId?: true
    userId?: true
    score?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RankedEventCountAggregateInputType = {
    id?: true
    hackathonId?: true
    userId?: true
    score?: true
    reasons?: true
    matchedThemes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RankedEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RankedEvent to aggregate.
     */
    where?: RankedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RankedEvents to fetch.
     */
    orderBy?: RankedEventOrderByWithRelationInput | RankedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RankedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RankedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RankedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RankedEvents
    **/
    _count?: true | RankedEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RankedEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RankedEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RankedEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RankedEventMaxAggregateInputType
  }

  export type GetRankedEventAggregateType<T extends RankedEventAggregateArgs> = {
        [P in keyof T & keyof AggregateRankedEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRankedEvent[P]>
      : GetScalarType<T[P], AggregateRankedEvent[P]>
  }




  export type RankedEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RankedEventWhereInput
    orderBy?: RankedEventOrderByWithAggregationInput | RankedEventOrderByWithAggregationInput[]
    by: RankedEventScalarFieldEnum[] | RankedEventScalarFieldEnum
    having?: RankedEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RankedEventCountAggregateInputType | true
    _avg?: RankedEventAvgAggregateInputType
    _sum?: RankedEventSumAggregateInputType
    _min?: RankedEventMinAggregateInputType
    _max?: RankedEventMaxAggregateInputType
  }

  export type RankedEventGroupByOutputType = {
    id: string
    hackathonId: string
    userId: string
    score: number
    reasons: string[]
    matchedThemes: string[]
    createdAt: Date
    updatedAt: Date
    _count: RankedEventCountAggregateOutputType | null
    _avg: RankedEventAvgAggregateOutputType | null
    _sum: RankedEventSumAggregateOutputType | null
    _min: RankedEventMinAggregateOutputType | null
    _max: RankedEventMaxAggregateOutputType | null
  }

  type GetRankedEventGroupByPayload<T extends RankedEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RankedEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RankedEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RankedEventGroupByOutputType[P]>
            : GetScalarType<T[P], RankedEventGroupByOutputType[P]>
        }
      >
    >


  export type RankedEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hackathonId?: boolean
    userId?: boolean
    score?: boolean
    reasons?: boolean
    matchedThemes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hackathon?: boolean | HackathonDefaultArgs<ExtArgs>
    user?: boolean | UserProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rankedEvent"]>

  export type RankedEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hackathonId?: boolean
    userId?: boolean
    score?: boolean
    reasons?: boolean
    matchedThemes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hackathon?: boolean | HackathonDefaultArgs<ExtArgs>
    user?: boolean | UserProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rankedEvent"]>

  export type RankedEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hackathonId?: boolean
    userId?: boolean
    score?: boolean
    reasons?: boolean
    matchedThemes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hackathon?: boolean | HackathonDefaultArgs<ExtArgs>
    user?: boolean | UserProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rankedEvent"]>

  export type RankedEventSelectScalar = {
    id?: boolean
    hackathonId?: boolean
    userId?: boolean
    score?: boolean
    reasons?: boolean
    matchedThemes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RankedEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hackathonId" | "userId" | "score" | "reasons" | "matchedThemes" | "createdAt" | "updatedAt", ExtArgs["result"]["rankedEvent"]>
  export type RankedEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hackathon?: boolean | HackathonDefaultArgs<ExtArgs>
    user?: boolean | UserProfileDefaultArgs<ExtArgs>
  }
  export type RankedEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hackathon?: boolean | HackathonDefaultArgs<ExtArgs>
    user?: boolean | UserProfileDefaultArgs<ExtArgs>
  }
  export type RankedEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hackathon?: boolean | HackathonDefaultArgs<ExtArgs>
    user?: boolean | UserProfileDefaultArgs<ExtArgs>
  }

  export type $RankedEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RankedEvent"
    objects: {
      hackathon: Prisma.$HackathonPayload<ExtArgs>
      user: Prisma.$UserProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      hackathonId: string
      userId: string
      score: number
      reasons: string[]
      matchedThemes: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rankedEvent"]>
    composites: {}
  }

  type RankedEventGetPayload<S extends boolean | null | undefined | RankedEventDefaultArgs> = $Result.GetResult<Prisma.$RankedEventPayload, S>

  type RankedEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RankedEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RankedEventCountAggregateInputType | true
    }

  export interface RankedEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RankedEvent'], meta: { name: 'RankedEvent' } }
    /**
     * Find zero or one RankedEvent that matches the filter.
     * @param {RankedEventFindUniqueArgs} args - Arguments to find a RankedEvent
     * @example
     * // Get one RankedEvent
     * const rankedEvent = await prisma.rankedEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RankedEventFindUniqueArgs>(args: SelectSubset<T, RankedEventFindUniqueArgs<ExtArgs>>): Prisma__RankedEventClient<$Result.GetResult<Prisma.$RankedEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RankedEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RankedEventFindUniqueOrThrowArgs} args - Arguments to find a RankedEvent
     * @example
     * // Get one RankedEvent
     * const rankedEvent = await prisma.rankedEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RankedEventFindUniqueOrThrowArgs>(args: SelectSubset<T, RankedEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RankedEventClient<$Result.GetResult<Prisma.$RankedEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RankedEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankedEventFindFirstArgs} args - Arguments to find a RankedEvent
     * @example
     * // Get one RankedEvent
     * const rankedEvent = await prisma.rankedEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RankedEventFindFirstArgs>(args?: SelectSubset<T, RankedEventFindFirstArgs<ExtArgs>>): Prisma__RankedEventClient<$Result.GetResult<Prisma.$RankedEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RankedEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankedEventFindFirstOrThrowArgs} args - Arguments to find a RankedEvent
     * @example
     * // Get one RankedEvent
     * const rankedEvent = await prisma.rankedEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RankedEventFindFirstOrThrowArgs>(args?: SelectSubset<T, RankedEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__RankedEventClient<$Result.GetResult<Prisma.$RankedEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RankedEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankedEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RankedEvents
     * const rankedEvents = await prisma.rankedEvent.findMany()
     * 
     * // Get first 10 RankedEvents
     * const rankedEvents = await prisma.rankedEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rankedEventWithIdOnly = await prisma.rankedEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RankedEventFindManyArgs>(args?: SelectSubset<T, RankedEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RankedEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RankedEvent.
     * @param {RankedEventCreateArgs} args - Arguments to create a RankedEvent.
     * @example
     * // Create one RankedEvent
     * const RankedEvent = await prisma.rankedEvent.create({
     *   data: {
     *     // ... data to create a RankedEvent
     *   }
     * })
     * 
     */
    create<T extends RankedEventCreateArgs>(args: SelectSubset<T, RankedEventCreateArgs<ExtArgs>>): Prisma__RankedEventClient<$Result.GetResult<Prisma.$RankedEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RankedEvents.
     * @param {RankedEventCreateManyArgs} args - Arguments to create many RankedEvents.
     * @example
     * // Create many RankedEvents
     * const rankedEvent = await prisma.rankedEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RankedEventCreateManyArgs>(args?: SelectSubset<T, RankedEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RankedEvents and returns the data saved in the database.
     * @param {RankedEventCreateManyAndReturnArgs} args - Arguments to create many RankedEvents.
     * @example
     * // Create many RankedEvents
     * const rankedEvent = await prisma.rankedEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RankedEvents and only return the `id`
     * const rankedEventWithIdOnly = await prisma.rankedEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RankedEventCreateManyAndReturnArgs>(args?: SelectSubset<T, RankedEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RankedEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RankedEvent.
     * @param {RankedEventDeleteArgs} args - Arguments to delete one RankedEvent.
     * @example
     * // Delete one RankedEvent
     * const RankedEvent = await prisma.rankedEvent.delete({
     *   where: {
     *     // ... filter to delete one RankedEvent
     *   }
     * })
     * 
     */
    delete<T extends RankedEventDeleteArgs>(args: SelectSubset<T, RankedEventDeleteArgs<ExtArgs>>): Prisma__RankedEventClient<$Result.GetResult<Prisma.$RankedEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RankedEvent.
     * @param {RankedEventUpdateArgs} args - Arguments to update one RankedEvent.
     * @example
     * // Update one RankedEvent
     * const rankedEvent = await prisma.rankedEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RankedEventUpdateArgs>(args: SelectSubset<T, RankedEventUpdateArgs<ExtArgs>>): Prisma__RankedEventClient<$Result.GetResult<Prisma.$RankedEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RankedEvents.
     * @param {RankedEventDeleteManyArgs} args - Arguments to filter RankedEvents to delete.
     * @example
     * // Delete a few RankedEvents
     * const { count } = await prisma.rankedEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RankedEventDeleteManyArgs>(args?: SelectSubset<T, RankedEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RankedEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankedEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RankedEvents
     * const rankedEvent = await prisma.rankedEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RankedEventUpdateManyArgs>(args: SelectSubset<T, RankedEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RankedEvents and returns the data updated in the database.
     * @param {RankedEventUpdateManyAndReturnArgs} args - Arguments to update many RankedEvents.
     * @example
     * // Update many RankedEvents
     * const rankedEvent = await prisma.rankedEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RankedEvents and only return the `id`
     * const rankedEventWithIdOnly = await prisma.rankedEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RankedEventUpdateManyAndReturnArgs>(args: SelectSubset<T, RankedEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RankedEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RankedEvent.
     * @param {RankedEventUpsertArgs} args - Arguments to update or create a RankedEvent.
     * @example
     * // Update or create a RankedEvent
     * const rankedEvent = await prisma.rankedEvent.upsert({
     *   create: {
     *     // ... data to create a RankedEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RankedEvent we want to update
     *   }
     * })
     */
    upsert<T extends RankedEventUpsertArgs>(args: SelectSubset<T, RankedEventUpsertArgs<ExtArgs>>): Prisma__RankedEventClient<$Result.GetResult<Prisma.$RankedEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RankedEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankedEventCountArgs} args - Arguments to filter RankedEvents to count.
     * @example
     * // Count the number of RankedEvents
     * const count = await prisma.rankedEvent.count({
     *   where: {
     *     // ... the filter for the RankedEvents we want to count
     *   }
     * })
    **/
    count<T extends RankedEventCountArgs>(
      args?: Subset<T, RankedEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RankedEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RankedEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankedEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RankedEventAggregateArgs>(args: Subset<T, RankedEventAggregateArgs>): Prisma.PrismaPromise<GetRankedEventAggregateType<T>>

    /**
     * Group by RankedEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RankedEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RankedEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RankedEventGroupByArgs['orderBy'] }
        : { orderBy?: RankedEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RankedEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRankedEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RankedEvent model
   */
  readonly fields: RankedEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RankedEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RankedEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hackathon<T extends HackathonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HackathonDefaultArgs<ExtArgs>>): Prisma__HackathonClient<$Result.GetResult<Prisma.$HackathonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserProfileDefaultArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RankedEvent model
   */
  interface RankedEventFieldRefs {
    readonly id: FieldRef<"RankedEvent", 'String'>
    readonly hackathonId: FieldRef<"RankedEvent", 'String'>
    readonly userId: FieldRef<"RankedEvent", 'String'>
    readonly score: FieldRef<"RankedEvent", 'Float'>
    readonly reasons: FieldRef<"RankedEvent", 'String[]'>
    readonly matchedThemes: FieldRef<"RankedEvent", 'String[]'>
    readonly createdAt: FieldRef<"RankedEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"RankedEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RankedEvent findUnique
   */
  export type RankedEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventInclude<ExtArgs> | null
    /**
     * Filter, which RankedEvent to fetch.
     */
    where: RankedEventWhereUniqueInput
  }

  /**
   * RankedEvent findUniqueOrThrow
   */
  export type RankedEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventInclude<ExtArgs> | null
    /**
     * Filter, which RankedEvent to fetch.
     */
    where: RankedEventWhereUniqueInput
  }

  /**
   * RankedEvent findFirst
   */
  export type RankedEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventInclude<ExtArgs> | null
    /**
     * Filter, which RankedEvent to fetch.
     */
    where?: RankedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RankedEvents to fetch.
     */
    orderBy?: RankedEventOrderByWithRelationInput | RankedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RankedEvents.
     */
    cursor?: RankedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RankedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RankedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RankedEvents.
     */
    distinct?: RankedEventScalarFieldEnum | RankedEventScalarFieldEnum[]
  }

  /**
   * RankedEvent findFirstOrThrow
   */
  export type RankedEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventInclude<ExtArgs> | null
    /**
     * Filter, which RankedEvent to fetch.
     */
    where?: RankedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RankedEvents to fetch.
     */
    orderBy?: RankedEventOrderByWithRelationInput | RankedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RankedEvents.
     */
    cursor?: RankedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RankedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RankedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RankedEvents.
     */
    distinct?: RankedEventScalarFieldEnum | RankedEventScalarFieldEnum[]
  }

  /**
   * RankedEvent findMany
   */
  export type RankedEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventInclude<ExtArgs> | null
    /**
     * Filter, which RankedEvents to fetch.
     */
    where?: RankedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RankedEvents to fetch.
     */
    orderBy?: RankedEventOrderByWithRelationInput | RankedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RankedEvents.
     */
    cursor?: RankedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RankedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RankedEvents.
     */
    skip?: number
    distinct?: RankedEventScalarFieldEnum | RankedEventScalarFieldEnum[]
  }

  /**
   * RankedEvent create
   */
  export type RankedEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventInclude<ExtArgs> | null
    /**
     * The data needed to create a RankedEvent.
     */
    data: XOR<RankedEventCreateInput, RankedEventUncheckedCreateInput>
  }

  /**
   * RankedEvent createMany
   */
  export type RankedEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RankedEvents.
     */
    data: RankedEventCreateManyInput | RankedEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RankedEvent createManyAndReturn
   */
  export type RankedEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * The data used to create many RankedEvents.
     */
    data: RankedEventCreateManyInput | RankedEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RankedEvent update
   */
  export type RankedEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventInclude<ExtArgs> | null
    /**
     * The data needed to update a RankedEvent.
     */
    data: XOR<RankedEventUpdateInput, RankedEventUncheckedUpdateInput>
    /**
     * Choose, which RankedEvent to update.
     */
    where: RankedEventWhereUniqueInput
  }

  /**
   * RankedEvent updateMany
   */
  export type RankedEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RankedEvents.
     */
    data: XOR<RankedEventUpdateManyMutationInput, RankedEventUncheckedUpdateManyInput>
    /**
     * Filter which RankedEvents to update
     */
    where?: RankedEventWhereInput
    /**
     * Limit how many RankedEvents to update.
     */
    limit?: number
  }

  /**
   * RankedEvent updateManyAndReturn
   */
  export type RankedEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * The data used to update RankedEvents.
     */
    data: XOR<RankedEventUpdateManyMutationInput, RankedEventUncheckedUpdateManyInput>
    /**
     * Filter which RankedEvents to update
     */
    where?: RankedEventWhereInput
    /**
     * Limit how many RankedEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RankedEvent upsert
   */
  export type RankedEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventInclude<ExtArgs> | null
    /**
     * The filter to search for the RankedEvent to update in case it exists.
     */
    where: RankedEventWhereUniqueInput
    /**
     * In case the RankedEvent found by the `where` argument doesn't exist, create a new RankedEvent with this data.
     */
    create: XOR<RankedEventCreateInput, RankedEventUncheckedCreateInput>
    /**
     * In case the RankedEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RankedEventUpdateInput, RankedEventUncheckedUpdateInput>
  }

  /**
   * RankedEvent delete
   */
  export type RankedEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventInclude<ExtArgs> | null
    /**
     * Filter which RankedEvent to delete.
     */
    where: RankedEventWhereUniqueInput
  }

  /**
   * RankedEvent deleteMany
   */
  export type RankedEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RankedEvents to delete
     */
    where?: RankedEventWhereInput
    /**
     * Limit how many RankedEvents to delete.
     */
    limit?: number
  }

  /**
   * RankedEvent without action
   */
  export type RankedEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RankedEvent
     */
    select?: RankedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RankedEvent
     */
    omit?: RankedEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RankedEventInclude<ExtArgs> | null
  }


  /**
   * Model RegistrationRun
   */

  export type AggregateRegistrationRun = {
    _count: RegistrationRunCountAggregateOutputType | null
    _min: RegistrationRunMinAggregateOutputType | null
    _max: RegistrationRunMaxAggregateOutputType | null
  }

  export type RegistrationRunMinAggregateOutputType = {
    id: string | null
    userId: string | null
    hackathonId: string | null
    runner: string | null
    status: string | null
    finalScreenshot: string | null
    errorStage: string | null
    errorMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RegistrationRunMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    hackathonId: string | null
    runner: string | null
    status: string | null
    finalScreenshot: string | null
    errorStage: string | null
    errorMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RegistrationRunCountAggregateOutputType = {
    id: number
    userId: number
    hackathonId: number
    runner: number
    status: number
    plannedActions: number
    resolvedFields: number
    screenshots: number
    finalScreenshot: number
    errorStage: number
    errorMessage: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RegistrationRunMinAggregateInputType = {
    id?: true
    userId?: true
    hackathonId?: true
    runner?: true
    status?: true
    finalScreenshot?: true
    errorStage?: true
    errorMessage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RegistrationRunMaxAggregateInputType = {
    id?: true
    userId?: true
    hackathonId?: true
    runner?: true
    status?: true
    finalScreenshot?: true
    errorStage?: true
    errorMessage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RegistrationRunCountAggregateInputType = {
    id?: true
    userId?: true
    hackathonId?: true
    runner?: true
    status?: true
    plannedActions?: true
    resolvedFields?: true
    screenshots?: true
    finalScreenshot?: true
    errorStage?: true
    errorMessage?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RegistrationRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegistrationRun to aggregate.
     */
    where?: RegistrationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistrationRuns to fetch.
     */
    orderBy?: RegistrationRunOrderByWithRelationInput | RegistrationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegistrationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistrationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistrationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RegistrationRuns
    **/
    _count?: true | RegistrationRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistrationRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistrationRunMaxAggregateInputType
  }

  export type GetRegistrationRunAggregateType<T extends RegistrationRunAggregateArgs> = {
        [P in keyof T & keyof AggregateRegistrationRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistrationRun[P]>
      : GetScalarType<T[P], AggregateRegistrationRun[P]>
  }




  export type RegistrationRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrationRunWhereInput
    orderBy?: RegistrationRunOrderByWithAggregationInput | RegistrationRunOrderByWithAggregationInput[]
    by: RegistrationRunScalarFieldEnum[] | RegistrationRunScalarFieldEnum
    having?: RegistrationRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistrationRunCountAggregateInputType | true
    _min?: RegistrationRunMinAggregateInputType
    _max?: RegistrationRunMaxAggregateInputType
  }

  export type RegistrationRunGroupByOutputType = {
    id: string
    userId: string
    hackathonId: string
    runner: string
    status: string
    plannedActions: JsonValue
    resolvedFields: JsonValue
    screenshots: string[]
    finalScreenshot: string | null
    errorStage: string | null
    errorMessage: string | null
    createdAt: Date
    updatedAt: Date
    _count: RegistrationRunCountAggregateOutputType | null
    _min: RegistrationRunMinAggregateOutputType | null
    _max: RegistrationRunMaxAggregateOutputType | null
  }

  type GetRegistrationRunGroupByPayload<T extends RegistrationRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistrationRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistrationRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistrationRunGroupByOutputType[P]>
            : GetScalarType<T[P], RegistrationRunGroupByOutputType[P]>
        }
      >
    >


  export type RegistrationRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    hackathonId?: boolean
    runner?: boolean
    status?: boolean
    plannedActions?: boolean
    resolvedFields?: boolean
    screenshots?: boolean
    finalScreenshot?: boolean
    errorStage?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hackathon?: boolean | HackathonDefaultArgs<ExtArgs>
    user?: boolean | UserProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registrationRun"]>

  export type RegistrationRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    hackathonId?: boolean
    runner?: boolean
    status?: boolean
    plannedActions?: boolean
    resolvedFields?: boolean
    screenshots?: boolean
    finalScreenshot?: boolean
    errorStage?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hackathon?: boolean | HackathonDefaultArgs<ExtArgs>
    user?: boolean | UserProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registrationRun"]>

  export type RegistrationRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    hackathonId?: boolean
    runner?: boolean
    status?: boolean
    plannedActions?: boolean
    resolvedFields?: boolean
    screenshots?: boolean
    finalScreenshot?: boolean
    errorStage?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hackathon?: boolean | HackathonDefaultArgs<ExtArgs>
    user?: boolean | UserProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registrationRun"]>

  export type RegistrationRunSelectScalar = {
    id?: boolean
    userId?: boolean
    hackathonId?: boolean
    runner?: boolean
    status?: boolean
    plannedActions?: boolean
    resolvedFields?: boolean
    screenshots?: boolean
    finalScreenshot?: boolean
    errorStage?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RegistrationRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "hackathonId" | "runner" | "status" | "plannedActions" | "resolvedFields" | "screenshots" | "finalScreenshot" | "errorStage" | "errorMessage" | "createdAt" | "updatedAt", ExtArgs["result"]["registrationRun"]>
  export type RegistrationRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hackathon?: boolean | HackathonDefaultArgs<ExtArgs>
    user?: boolean | UserProfileDefaultArgs<ExtArgs>
  }
  export type RegistrationRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hackathon?: boolean | HackathonDefaultArgs<ExtArgs>
    user?: boolean | UserProfileDefaultArgs<ExtArgs>
  }
  export type RegistrationRunIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hackathon?: boolean | HackathonDefaultArgs<ExtArgs>
    user?: boolean | UserProfileDefaultArgs<ExtArgs>
  }

  export type $RegistrationRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RegistrationRun"
    objects: {
      hackathon: Prisma.$HackathonPayload<ExtArgs>
      user: Prisma.$UserProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      hackathonId: string
      runner: string
      status: string
      plannedActions: Prisma.JsonValue
      resolvedFields: Prisma.JsonValue
      screenshots: string[]
      finalScreenshot: string | null
      errorStage: string | null
      errorMessage: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["registrationRun"]>
    composites: {}
  }

  type RegistrationRunGetPayload<S extends boolean | null | undefined | RegistrationRunDefaultArgs> = $Result.GetResult<Prisma.$RegistrationRunPayload, S>

  type RegistrationRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegistrationRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegistrationRunCountAggregateInputType | true
    }

  export interface RegistrationRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RegistrationRun'], meta: { name: 'RegistrationRun' } }
    /**
     * Find zero or one RegistrationRun that matches the filter.
     * @param {RegistrationRunFindUniqueArgs} args - Arguments to find a RegistrationRun
     * @example
     * // Get one RegistrationRun
     * const registrationRun = await prisma.registrationRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegistrationRunFindUniqueArgs>(args: SelectSubset<T, RegistrationRunFindUniqueArgs<ExtArgs>>): Prisma__RegistrationRunClient<$Result.GetResult<Prisma.$RegistrationRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RegistrationRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegistrationRunFindUniqueOrThrowArgs} args - Arguments to find a RegistrationRun
     * @example
     * // Get one RegistrationRun
     * const registrationRun = await prisma.registrationRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegistrationRunFindUniqueOrThrowArgs>(args: SelectSubset<T, RegistrationRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegistrationRunClient<$Result.GetResult<Prisma.$RegistrationRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegistrationRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationRunFindFirstArgs} args - Arguments to find a RegistrationRun
     * @example
     * // Get one RegistrationRun
     * const registrationRun = await prisma.registrationRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegistrationRunFindFirstArgs>(args?: SelectSubset<T, RegistrationRunFindFirstArgs<ExtArgs>>): Prisma__RegistrationRunClient<$Result.GetResult<Prisma.$RegistrationRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegistrationRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationRunFindFirstOrThrowArgs} args - Arguments to find a RegistrationRun
     * @example
     * // Get one RegistrationRun
     * const registrationRun = await prisma.registrationRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegistrationRunFindFirstOrThrowArgs>(args?: SelectSubset<T, RegistrationRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegistrationRunClient<$Result.GetResult<Prisma.$RegistrationRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RegistrationRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RegistrationRuns
     * const registrationRuns = await prisma.registrationRun.findMany()
     * 
     * // Get first 10 RegistrationRuns
     * const registrationRuns = await prisma.registrationRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const registrationRunWithIdOnly = await prisma.registrationRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegistrationRunFindManyArgs>(args?: SelectSubset<T, RegistrationRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RegistrationRun.
     * @param {RegistrationRunCreateArgs} args - Arguments to create a RegistrationRun.
     * @example
     * // Create one RegistrationRun
     * const RegistrationRun = await prisma.registrationRun.create({
     *   data: {
     *     // ... data to create a RegistrationRun
     *   }
     * })
     * 
     */
    create<T extends RegistrationRunCreateArgs>(args: SelectSubset<T, RegistrationRunCreateArgs<ExtArgs>>): Prisma__RegistrationRunClient<$Result.GetResult<Prisma.$RegistrationRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RegistrationRuns.
     * @param {RegistrationRunCreateManyArgs} args - Arguments to create many RegistrationRuns.
     * @example
     * // Create many RegistrationRuns
     * const registrationRun = await prisma.registrationRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegistrationRunCreateManyArgs>(args?: SelectSubset<T, RegistrationRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RegistrationRuns and returns the data saved in the database.
     * @param {RegistrationRunCreateManyAndReturnArgs} args - Arguments to create many RegistrationRuns.
     * @example
     * // Create many RegistrationRuns
     * const registrationRun = await prisma.registrationRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RegistrationRuns and only return the `id`
     * const registrationRunWithIdOnly = await prisma.registrationRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegistrationRunCreateManyAndReturnArgs>(args?: SelectSubset<T, RegistrationRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RegistrationRun.
     * @param {RegistrationRunDeleteArgs} args - Arguments to delete one RegistrationRun.
     * @example
     * // Delete one RegistrationRun
     * const RegistrationRun = await prisma.registrationRun.delete({
     *   where: {
     *     // ... filter to delete one RegistrationRun
     *   }
     * })
     * 
     */
    delete<T extends RegistrationRunDeleteArgs>(args: SelectSubset<T, RegistrationRunDeleteArgs<ExtArgs>>): Prisma__RegistrationRunClient<$Result.GetResult<Prisma.$RegistrationRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RegistrationRun.
     * @param {RegistrationRunUpdateArgs} args - Arguments to update one RegistrationRun.
     * @example
     * // Update one RegistrationRun
     * const registrationRun = await prisma.registrationRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegistrationRunUpdateArgs>(args: SelectSubset<T, RegistrationRunUpdateArgs<ExtArgs>>): Prisma__RegistrationRunClient<$Result.GetResult<Prisma.$RegistrationRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RegistrationRuns.
     * @param {RegistrationRunDeleteManyArgs} args - Arguments to filter RegistrationRuns to delete.
     * @example
     * // Delete a few RegistrationRuns
     * const { count } = await prisma.registrationRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegistrationRunDeleteManyArgs>(args?: SelectSubset<T, RegistrationRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegistrationRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RegistrationRuns
     * const registrationRun = await prisma.registrationRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegistrationRunUpdateManyArgs>(args: SelectSubset<T, RegistrationRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegistrationRuns and returns the data updated in the database.
     * @param {RegistrationRunUpdateManyAndReturnArgs} args - Arguments to update many RegistrationRuns.
     * @example
     * // Update many RegistrationRuns
     * const registrationRun = await prisma.registrationRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RegistrationRuns and only return the `id`
     * const registrationRunWithIdOnly = await prisma.registrationRun.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegistrationRunUpdateManyAndReturnArgs>(args: SelectSubset<T, RegistrationRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RegistrationRun.
     * @param {RegistrationRunUpsertArgs} args - Arguments to update or create a RegistrationRun.
     * @example
     * // Update or create a RegistrationRun
     * const registrationRun = await prisma.registrationRun.upsert({
     *   create: {
     *     // ... data to create a RegistrationRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RegistrationRun we want to update
     *   }
     * })
     */
    upsert<T extends RegistrationRunUpsertArgs>(args: SelectSubset<T, RegistrationRunUpsertArgs<ExtArgs>>): Prisma__RegistrationRunClient<$Result.GetResult<Prisma.$RegistrationRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RegistrationRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationRunCountArgs} args - Arguments to filter RegistrationRuns to count.
     * @example
     * // Count the number of RegistrationRuns
     * const count = await prisma.registrationRun.count({
     *   where: {
     *     // ... the filter for the RegistrationRuns we want to count
     *   }
     * })
    **/
    count<T extends RegistrationRunCountArgs>(
      args?: Subset<T, RegistrationRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistrationRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RegistrationRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegistrationRunAggregateArgs>(args: Subset<T, RegistrationRunAggregateArgs>): Prisma.PrismaPromise<GetRegistrationRunAggregateType<T>>

    /**
     * Group by RegistrationRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegistrationRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegistrationRunGroupByArgs['orderBy'] }
        : { orderBy?: RegistrationRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegistrationRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistrationRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RegistrationRun model
   */
  readonly fields: RegistrationRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RegistrationRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegistrationRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hackathon<T extends HackathonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HackathonDefaultArgs<ExtArgs>>): Prisma__HackathonClient<$Result.GetResult<Prisma.$HackathonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserProfileDefaultArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RegistrationRun model
   */
  interface RegistrationRunFieldRefs {
    readonly id: FieldRef<"RegistrationRun", 'String'>
    readonly userId: FieldRef<"RegistrationRun", 'String'>
    readonly hackathonId: FieldRef<"RegistrationRun", 'String'>
    readonly runner: FieldRef<"RegistrationRun", 'String'>
    readonly status: FieldRef<"RegistrationRun", 'String'>
    readonly plannedActions: FieldRef<"RegistrationRun", 'Json'>
    readonly resolvedFields: FieldRef<"RegistrationRun", 'Json'>
    readonly screenshots: FieldRef<"RegistrationRun", 'String[]'>
    readonly finalScreenshot: FieldRef<"RegistrationRun", 'String'>
    readonly errorStage: FieldRef<"RegistrationRun", 'String'>
    readonly errorMessage: FieldRef<"RegistrationRun", 'String'>
    readonly createdAt: FieldRef<"RegistrationRun", 'DateTime'>
    readonly updatedAt: FieldRef<"RegistrationRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RegistrationRun findUnique
   */
  export type RegistrationRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunInclude<ExtArgs> | null
    /**
     * Filter, which RegistrationRun to fetch.
     */
    where: RegistrationRunWhereUniqueInput
  }

  /**
   * RegistrationRun findUniqueOrThrow
   */
  export type RegistrationRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunInclude<ExtArgs> | null
    /**
     * Filter, which RegistrationRun to fetch.
     */
    where: RegistrationRunWhereUniqueInput
  }

  /**
   * RegistrationRun findFirst
   */
  export type RegistrationRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunInclude<ExtArgs> | null
    /**
     * Filter, which RegistrationRun to fetch.
     */
    where?: RegistrationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistrationRuns to fetch.
     */
    orderBy?: RegistrationRunOrderByWithRelationInput | RegistrationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegistrationRuns.
     */
    cursor?: RegistrationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistrationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistrationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegistrationRuns.
     */
    distinct?: RegistrationRunScalarFieldEnum | RegistrationRunScalarFieldEnum[]
  }

  /**
   * RegistrationRun findFirstOrThrow
   */
  export type RegistrationRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunInclude<ExtArgs> | null
    /**
     * Filter, which RegistrationRun to fetch.
     */
    where?: RegistrationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistrationRuns to fetch.
     */
    orderBy?: RegistrationRunOrderByWithRelationInput | RegistrationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegistrationRuns.
     */
    cursor?: RegistrationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistrationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistrationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegistrationRuns.
     */
    distinct?: RegistrationRunScalarFieldEnum | RegistrationRunScalarFieldEnum[]
  }

  /**
   * RegistrationRun findMany
   */
  export type RegistrationRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunInclude<ExtArgs> | null
    /**
     * Filter, which RegistrationRuns to fetch.
     */
    where?: RegistrationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegistrationRuns to fetch.
     */
    orderBy?: RegistrationRunOrderByWithRelationInput | RegistrationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RegistrationRuns.
     */
    cursor?: RegistrationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegistrationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegistrationRuns.
     */
    skip?: number
    distinct?: RegistrationRunScalarFieldEnum | RegistrationRunScalarFieldEnum[]
  }

  /**
   * RegistrationRun create
   */
  export type RegistrationRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunInclude<ExtArgs> | null
    /**
     * The data needed to create a RegistrationRun.
     */
    data: XOR<RegistrationRunCreateInput, RegistrationRunUncheckedCreateInput>
  }

  /**
   * RegistrationRun createMany
   */
  export type RegistrationRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RegistrationRuns.
     */
    data: RegistrationRunCreateManyInput | RegistrationRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegistrationRun createManyAndReturn
   */
  export type RegistrationRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * The data used to create many RegistrationRuns.
     */
    data: RegistrationRunCreateManyInput | RegistrationRunCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RegistrationRun update
   */
  export type RegistrationRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunInclude<ExtArgs> | null
    /**
     * The data needed to update a RegistrationRun.
     */
    data: XOR<RegistrationRunUpdateInput, RegistrationRunUncheckedUpdateInput>
    /**
     * Choose, which RegistrationRun to update.
     */
    where: RegistrationRunWhereUniqueInput
  }

  /**
   * RegistrationRun updateMany
   */
  export type RegistrationRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RegistrationRuns.
     */
    data: XOR<RegistrationRunUpdateManyMutationInput, RegistrationRunUncheckedUpdateManyInput>
    /**
     * Filter which RegistrationRuns to update
     */
    where?: RegistrationRunWhereInput
    /**
     * Limit how many RegistrationRuns to update.
     */
    limit?: number
  }

  /**
   * RegistrationRun updateManyAndReturn
   */
  export type RegistrationRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * The data used to update RegistrationRuns.
     */
    data: XOR<RegistrationRunUpdateManyMutationInput, RegistrationRunUncheckedUpdateManyInput>
    /**
     * Filter which RegistrationRuns to update
     */
    where?: RegistrationRunWhereInput
    /**
     * Limit how many RegistrationRuns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RegistrationRun upsert
   */
  export type RegistrationRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunInclude<ExtArgs> | null
    /**
     * The filter to search for the RegistrationRun to update in case it exists.
     */
    where: RegistrationRunWhereUniqueInput
    /**
     * In case the RegistrationRun found by the `where` argument doesn't exist, create a new RegistrationRun with this data.
     */
    create: XOR<RegistrationRunCreateInput, RegistrationRunUncheckedCreateInput>
    /**
     * In case the RegistrationRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegistrationRunUpdateInput, RegistrationRunUncheckedUpdateInput>
  }

  /**
   * RegistrationRun delete
   */
  export type RegistrationRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunInclude<ExtArgs> | null
    /**
     * Filter which RegistrationRun to delete.
     */
    where: RegistrationRunWhereUniqueInput
  }

  /**
   * RegistrationRun deleteMany
   */
  export type RegistrationRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegistrationRuns to delete
     */
    where?: RegistrationRunWhereInput
    /**
     * Limit how many RegistrationRuns to delete.
     */
    limit?: number
  }

  /**
   * RegistrationRun without action
   */
  export type RegistrationRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationRun
     */
    select?: RegistrationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegistrationRun
     */
    omit?: RegistrationRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationRunInclude<ExtArgs> | null
  }


  /**
   * Model PendingNotification
   */

  export type AggregatePendingNotification = {
    _count: PendingNotificationCountAggregateOutputType | null
    _min: PendingNotificationMinAggregateOutputType | null
    _max: PendingNotificationMaxAggregateOutputType | null
  }

  export type PendingNotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    kind: string | null
    payloadRef: string | null
    sentAt: Date | null
    createdAt: Date | null
  }

  export type PendingNotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    kind: string | null
    payloadRef: string | null
    sentAt: Date | null
    createdAt: Date | null
  }

  export type PendingNotificationCountAggregateOutputType = {
    id: number
    userId: number
    kind: number
    payloadRef: number
    sentAt: number
    createdAt: number
    _all: number
  }


  export type PendingNotificationMinAggregateInputType = {
    id?: true
    userId?: true
    kind?: true
    payloadRef?: true
    sentAt?: true
    createdAt?: true
  }

  export type PendingNotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    kind?: true
    payloadRef?: true
    sentAt?: true
    createdAt?: true
  }

  export type PendingNotificationCountAggregateInputType = {
    id?: true
    userId?: true
    kind?: true
    payloadRef?: true
    sentAt?: true
    createdAt?: true
    _all?: true
  }

  export type PendingNotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingNotification to aggregate.
     */
    where?: PendingNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingNotifications to fetch.
     */
    orderBy?: PendingNotificationOrderByWithRelationInput | PendingNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PendingNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PendingNotifications
    **/
    _count?: true | PendingNotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PendingNotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PendingNotificationMaxAggregateInputType
  }

  export type GetPendingNotificationAggregateType<T extends PendingNotificationAggregateArgs> = {
        [P in keyof T & keyof AggregatePendingNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePendingNotification[P]>
      : GetScalarType<T[P], AggregatePendingNotification[P]>
  }




  export type PendingNotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendingNotificationWhereInput
    orderBy?: PendingNotificationOrderByWithAggregationInput | PendingNotificationOrderByWithAggregationInput[]
    by: PendingNotificationScalarFieldEnum[] | PendingNotificationScalarFieldEnum
    having?: PendingNotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PendingNotificationCountAggregateInputType | true
    _min?: PendingNotificationMinAggregateInputType
    _max?: PendingNotificationMaxAggregateInputType
  }

  export type PendingNotificationGroupByOutputType = {
    id: string
    userId: string
    kind: string
    payloadRef: string
    sentAt: Date | null
    createdAt: Date
    _count: PendingNotificationCountAggregateOutputType | null
    _min: PendingNotificationMinAggregateOutputType | null
    _max: PendingNotificationMaxAggregateOutputType | null
  }

  type GetPendingNotificationGroupByPayload<T extends PendingNotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PendingNotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PendingNotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PendingNotificationGroupByOutputType[P]>
            : GetScalarType<T[P], PendingNotificationGroupByOutputType[P]>
        }
      >
    >


  export type PendingNotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    kind?: boolean
    payloadRef?: boolean
    sentAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pendingNotification"]>

  export type PendingNotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    kind?: boolean
    payloadRef?: boolean
    sentAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pendingNotification"]>

  export type PendingNotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    kind?: boolean
    payloadRef?: boolean
    sentAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pendingNotification"]>

  export type PendingNotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    kind?: boolean
    payloadRef?: boolean
    sentAt?: boolean
    createdAt?: boolean
  }

  export type PendingNotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "kind" | "payloadRef" | "sentAt" | "createdAt", ExtArgs["result"]["pendingNotification"]>

  export type $PendingNotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PendingNotification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      kind: string
      payloadRef: string
      sentAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["pendingNotification"]>
    composites: {}
  }

  type PendingNotificationGetPayload<S extends boolean | null | undefined | PendingNotificationDefaultArgs> = $Result.GetResult<Prisma.$PendingNotificationPayload, S>

  type PendingNotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PendingNotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PendingNotificationCountAggregateInputType | true
    }

  export interface PendingNotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PendingNotification'], meta: { name: 'PendingNotification' } }
    /**
     * Find zero or one PendingNotification that matches the filter.
     * @param {PendingNotificationFindUniqueArgs} args - Arguments to find a PendingNotification
     * @example
     * // Get one PendingNotification
     * const pendingNotification = await prisma.pendingNotification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PendingNotificationFindUniqueArgs>(args: SelectSubset<T, PendingNotificationFindUniqueArgs<ExtArgs>>): Prisma__PendingNotificationClient<$Result.GetResult<Prisma.$PendingNotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PendingNotification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PendingNotificationFindUniqueOrThrowArgs} args - Arguments to find a PendingNotification
     * @example
     * // Get one PendingNotification
     * const pendingNotification = await prisma.pendingNotification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PendingNotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, PendingNotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PendingNotificationClient<$Result.GetResult<Prisma.$PendingNotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PendingNotification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNotificationFindFirstArgs} args - Arguments to find a PendingNotification
     * @example
     * // Get one PendingNotification
     * const pendingNotification = await prisma.pendingNotification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PendingNotificationFindFirstArgs>(args?: SelectSubset<T, PendingNotificationFindFirstArgs<ExtArgs>>): Prisma__PendingNotificationClient<$Result.GetResult<Prisma.$PendingNotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PendingNotification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNotificationFindFirstOrThrowArgs} args - Arguments to find a PendingNotification
     * @example
     * // Get one PendingNotification
     * const pendingNotification = await prisma.pendingNotification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PendingNotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, PendingNotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PendingNotificationClient<$Result.GetResult<Prisma.$PendingNotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PendingNotifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PendingNotifications
     * const pendingNotifications = await prisma.pendingNotification.findMany()
     * 
     * // Get first 10 PendingNotifications
     * const pendingNotifications = await prisma.pendingNotification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pendingNotificationWithIdOnly = await prisma.pendingNotification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PendingNotificationFindManyArgs>(args?: SelectSubset<T, PendingNotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingNotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PendingNotification.
     * @param {PendingNotificationCreateArgs} args - Arguments to create a PendingNotification.
     * @example
     * // Create one PendingNotification
     * const PendingNotification = await prisma.pendingNotification.create({
     *   data: {
     *     // ... data to create a PendingNotification
     *   }
     * })
     * 
     */
    create<T extends PendingNotificationCreateArgs>(args: SelectSubset<T, PendingNotificationCreateArgs<ExtArgs>>): Prisma__PendingNotificationClient<$Result.GetResult<Prisma.$PendingNotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PendingNotifications.
     * @param {PendingNotificationCreateManyArgs} args - Arguments to create many PendingNotifications.
     * @example
     * // Create many PendingNotifications
     * const pendingNotification = await prisma.pendingNotification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PendingNotificationCreateManyArgs>(args?: SelectSubset<T, PendingNotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PendingNotifications and returns the data saved in the database.
     * @param {PendingNotificationCreateManyAndReturnArgs} args - Arguments to create many PendingNotifications.
     * @example
     * // Create many PendingNotifications
     * const pendingNotification = await prisma.pendingNotification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PendingNotifications and only return the `id`
     * const pendingNotificationWithIdOnly = await prisma.pendingNotification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PendingNotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, PendingNotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingNotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PendingNotification.
     * @param {PendingNotificationDeleteArgs} args - Arguments to delete one PendingNotification.
     * @example
     * // Delete one PendingNotification
     * const PendingNotification = await prisma.pendingNotification.delete({
     *   where: {
     *     // ... filter to delete one PendingNotification
     *   }
     * })
     * 
     */
    delete<T extends PendingNotificationDeleteArgs>(args: SelectSubset<T, PendingNotificationDeleteArgs<ExtArgs>>): Prisma__PendingNotificationClient<$Result.GetResult<Prisma.$PendingNotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PendingNotification.
     * @param {PendingNotificationUpdateArgs} args - Arguments to update one PendingNotification.
     * @example
     * // Update one PendingNotification
     * const pendingNotification = await prisma.pendingNotification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PendingNotificationUpdateArgs>(args: SelectSubset<T, PendingNotificationUpdateArgs<ExtArgs>>): Prisma__PendingNotificationClient<$Result.GetResult<Prisma.$PendingNotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PendingNotifications.
     * @param {PendingNotificationDeleteManyArgs} args - Arguments to filter PendingNotifications to delete.
     * @example
     * // Delete a few PendingNotifications
     * const { count } = await prisma.pendingNotification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PendingNotificationDeleteManyArgs>(args?: SelectSubset<T, PendingNotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PendingNotifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PendingNotifications
     * const pendingNotification = await prisma.pendingNotification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PendingNotificationUpdateManyArgs>(args: SelectSubset<T, PendingNotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PendingNotifications and returns the data updated in the database.
     * @param {PendingNotificationUpdateManyAndReturnArgs} args - Arguments to update many PendingNotifications.
     * @example
     * // Update many PendingNotifications
     * const pendingNotification = await prisma.pendingNotification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PendingNotifications and only return the `id`
     * const pendingNotificationWithIdOnly = await prisma.pendingNotification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PendingNotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, PendingNotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingNotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PendingNotification.
     * @param {PendingNotificationUpsertArgs} args - Arguments to update or create a PendingNotification.
     * @example
     * // Update or create a PendingNotification
     * const pendingNotification = await prisma.pendingNotification.upsert({
     *   create: {
     *     // ... data to create a PendingNotification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PendingNotification we want to update
     *   }
     * })
     */
    upsert<T extends PendingNotificationUpsertArgs>(args: SelectSubset<T, PendingNotificationUpsertArgs<ExtArgs>>): Prisma__PendingNotificationClient<$Result.GetResult<Prisma.$PendingNotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PendingNotifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNotificationCountArgs} args - Arguments to filter PendingNotifications to count.
     * @example
     * // Count the number of PendingNotifications
     * const count = await prisma.pendingNotification.count({
     *   where: {
     *     // ... the filter for the PendingNotifications we want to count
     *   }
     * })
    **/
    count<T extends PendingNotificationCountArgs>(
      args?: Subset<T, PendingNotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PendingNotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PendingNotification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PendingNotificationAggregateArgs>(args: Subset<T, PendingNotificationAggregateArgs>): Prisma.PrismaPromise<GetPendingNotificationAggregateType<T>>

    /**
     * Group by PendingNotification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingNotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PendingNotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PendingNotificationGroupByArgs['orderBy'] }
        : { orderBy?: PendingNotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PendingNotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPendingNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PendingNotification model
   */
  readonly fields: PendingNotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PendingNotification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PendingNotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PendingNotification model
   */
  interface PendingNotificationFieldRefs {
    readonly id: FieldRef<"PendingNotification", 'String'>
    readonly userId: FieldRef<"PendingNotification", 'String'>
    readonly kind: FieldRef<"PendingNotification", 'String'>
    readonly payloadRef: FieldRef<"PendingNotification", 'String'>
    readonly sentAt: FieldRef<"PendingNotification", 'DateTime'>
    readonly createdAt: FieldRef<"PendingNotification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PendingNotification findUnique
   */
  export type PendingNotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNotification
     */
    select?: PendingNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNotification
     */
    omit?: PendingNotificationOmit<ExtArgs> | null
    /**
     * Filter, which PendingNotification to fetch.
     */
    where: PendingNotificationWhereUniqueInput
  }

  /**
   * PendingNotification findUniqueOrThrow
   */
  export type PendingNotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNotification
     */
    select?: PendingNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNotification
     */
    omit?: PendingNotificationOmit<ExtArgs> | null
    /**
     * Filter, which PendingNotification to fetch.
     */
    where: PendingNotificationWhereUniqueInput
  }

  /**
   * PendingNotification findFirst
   */
  export type PendingNotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNotification
     */
    select?: PendingNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNotification
     */
    omit?: PendingNotificationOmit<ExtArgs> | null
    /**
     * Filter, which PendingNotification to fetch.
     */
    where?: PendingNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingNotifications to fetch.
     */
    orderBy?: PendingNotificationOrderByWithRelationInput | PendingNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingNotifications.
     */
    cursor?: PendingNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingNotifications.
     */
    distinct?: PendingNotificationScalarFieldEnum | PendingNotificationScalarFieldEnum[]
  }

  /**
   * PendingNotification findFirstOrThrow
   */
  export type PendingNotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNotification
     */
    select?: PendingNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNotification
     */
    omit?: PendingNotificationOmit<ExtArgs> | null
    /**
     * Filter, which PendingNotification to fetch.
     */
    where?: PendingNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingNotifications to fetch.
     */
    orderBy?: PendingNotificationOrderByWithRelationInput | PendingNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingNotifications.
     */
    cursor?: PendingNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingNotifications.
     */
    distinct?: PendingNotificationScalarFieldEnum | PendingNotificationScalarFieldEnum[]
  }

  /**
   * PendingNotification findMany
   */
  export type PendingNotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNotification
     */
    select?: PendingNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNotification
     */
    omit?: PendingNotificationOmit<ExtArgs> | null
    /**
     * Filter, which PendingNotifications to fetch.
     */
    where?: PendingNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingNotifications to fetch.
     */
    orderBy?: PendingNotificationOrderByWithRelationInput | PendingNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PendingNotifications.
     */
    cursor?: PendingNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingNotifications.
     */
    skip?: number
    distinct?: PendingNotificationScalarFieldEnum | PendingNotificationScalarFieldEnum[]
  }

  /**
   * PendingNotification create
   */
  export type PendingNotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNotification
     */
    select?: PendingNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNotification
     */
    omit?: PendingNotificationOmit<ExtArgs> | null
    /**
     * The data needed to create a PendingNotification.
     */
    data: XOR<PendingNotificationCreateInput, PendingNotificationUncheckedCreateInput>
  }

  /**
   * PendingNotification createMany
   */
  export type PendingNotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PendingNotifications.
     */
    data: PendingNotificationCreateManyInput | PendingNotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PendingNotification createManyAndReturn
   */
  export type PendingNotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNotification
     */
    select?: PendingNotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNotification
     */
    omit?: PendingNotificationOmit<ExtArgs> | null
    /**
     * The data used to create many PendingNotifications.
     */
    data: PendingNotificationCreateManyInput | PendingNotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PendingNotification update
   */
  export type PendingNotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNotification
     */
    select?: PendingNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNotification
     */
    omit?: PendingNotificationOmit<ExtArgs> | null
    /**
     * The data needed to update a PendingNotification.
     */
    data: XOR<PendingNotificationUpdateInput, PendingNotificationUncheckedUpdateInput>
    /**
     * Choose, which PendingNotification to update.
     */
    where: PendingNotificationWhereUniqueInput
  }

  /**
   * PendingNotification updateMany
   */
  export type PendingNotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PendingNotifications.
     */
    data: XOR<PendingNotificationUpdateManyMutationInput, PendingNotificationUncheckedUpdateManyInput>
    /**
     * Filter which PendingNotifications to update
     */
    where?: PendingNotificationWhereInput
    /**
     * Limit how many PendingNotifications to update.
     */
    limit?: number
  }

  /**
   * PendingNotification updateManyAndReturn
   */
  export type PendingNotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNotification
     */
    select?: PendingNotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNotification
     */
    omit?: PendingNotificationOmit<ExtArgs> | null
    /**
     * The data used to update PendingNotifications.
     */
    data: XOR<PendingNotificationUpdateManyMutationInput, PendingNotificationUncheckedUpdateManyInput>
    /**
     * Filter which PendingNotifications to update
     */
    where?: PendingNotificationWhereInput
    /**
     * Limit how many PendingNotifications to update.
     */
    limit?: number
  }

  /**
   * PendingNotification upsert
   */
  export type PendingNotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNotification
     */
    select?: PendingNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNotification
     */
    omit?: PendingNotificationOmit<ExtArgs> | null
    /**
     * The filter to search for the PendingNotification to update in case it exists.
     */
    where: PendingNotificationWhereUniqueInput
    /**
     * In case the PendingNotification found by the `where` argument doesn't exist, create a new PendingNotification with this data.
     */
    create: XOR<PendingNotificationCreateInput, PendingNotificationUncheckedCreateInput>
    /**
     * In case the PendingNotification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PendingNotificationUpdateInput, PendingNotificationUncheckedUpdateInput>
  }

  /**
   * PendingNotification delete
   */
  export type PendingNotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNotification
     */
    select?: PendingNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNotification
     */
    omit?: PendingNotificationOmit<ExtArgs> | null
    /**
     * Filter which PendingNotification to delete.
     */
    where: PendingNotificationWhereUniqueInput
  }

  /**
   * PendingNotification deleteMany
   */
  export type PendingNotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingNotifications to delete
     */
    where?: PendingNotificationWhereInput
    /**
     * Limit how many PendingNotifications to delete.
     */
    limit?: number
  }

  /**
   * PendingNotification without action
   */
  export type PendingNotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingNotification
     */
    select?: PendingNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingNotification
     */
    omit?: PendingNotificationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const HackathonScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    organizer: 'organizer',
    url: 'url',
    contentHash: 'contentHash',
    locationMode: 'locationMode',
    locationCity: 'locationCity',
    locationCountry: 'locationCountry',
    locationTz: 'locationTz',
    startsAt: 'startsAt',
    endsAt: 'endsAt',
    registrationOpensAt: 'registrationOpensAt',
    registrationClosesAt: 'registrationClosesAt',
    prizesTotal: 'prizesTotal',
    prizesRaw: 'prizesRaw',
    themes: 'themes',
    eligibility: 'eligibility',
    registrationProvider: 'registrationProvider',
    registrationFormUrl: 'registrationFormUrl',
    requiresTeam: 'requiresTeam',
    requiresAuth: 'requiresAuth',
    knownFields: 'knownFields',
    sources: 'sources',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HackathonScalarFieldEnum = (typeof HackathonScalarFieldEnum)[keyof typeof HackathonScalarFieldEnum]


  export const UserProfileScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    school: 'school',
    resumeUrl: 'resumeUrl',
    skills: 'skills',
    interests: 'interests',
    locationCity: 'locationCity',
    locationCountry: 'locationCountry',
    willingToTravel: 'willingToTravel',
    travelRegions: 'travelRegions',
    formAnswers: 'formAnswers',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum]


  export const RankedEventScalarFieldEnum: {
    id: 'id',
    hackathonId: 'hackathonId',
    userId: 'userId',
    score: 'score',
    reasons: 'reasons',
    matchedThemes: 'matchedThemes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RankedEventScalarFieldEnum = (typeof RankedEventScalarFieldEnum)[keyof typeof RankedEventScalarFieldEnum]


  export const RegistrationRunScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    hackathonId: 'hackathonId',
    runner: 'runner',
    status: 'status',
    plannedActions: 'plannedActions',
    resolvedFields: 'resolvedFields',
    screenshots: 'screenshots',
    finalScreenshot: 'finalScreenshot',
    errorStage: 'errorStage',
    errorMessage: 'errorMessage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RegistrationRunScalarFieldEnum = (typeof RegistrationRunScalarFieldEnum)[keyof typeof RegistrationRunScalarFieldEnum]


  export const PendingNotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    kind: 'kind',
    payloadRef: 'payloadRef',
    sentAt: 'sentAt',
    createdAt: 'createdAt'
  };

  export type PendingNotificationScalarFieldEnum = (typeof PendingNotificationScalarFieldEnum)[keyof typeof PendingNotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type HackathonWhereInput = {
    AND?: HackathonWhereInput | HackathonWhereInput[]
    OR?: HackathonWhereInput[]
    NOT?: HackathonWhereInput | HackathonWhereInput[]
    id?: StringFilter<"Hackathon"> | string
    title?: StringFilter<"Hackathon"> | string
    description?: StringFilter<"Hackathon"> | string
    organizer?: StringNullableFilter<"Hackathon"> | string | null
    url?: StringFilter<"Hackathon"> | string
    contentHash?: StringFilter<"Hackathon"> | string
    locationMode?: StringFilter<"Hackathon"> | string
    locationCity?: StringNullableFilter<"Hackathon"> | string | null
    locationCountry?: StringNullableFilter<"Hackathon"> | string | null
    locationTz?: StringNullableFilter<"Hackathon"> | string | null
    startsAt?: DateTimeNullableFilter<"Hackathon"> | Date | string | null
    endsAt?: DateTimeNullableFilter<"Hackathon"> | Date | string | null
    registrationOpensAt?: DateTimeNullableFilter<"Hackathon"> | Date | string | null
    registrationClosesAt?: DateTimeNullableFilter<"Hackathon"> | Date | string | null
    prizesTotal?: StringNullableFilter<"Hackathon"> | string | null
    prizesRaw?: StringNullableFilter<"Hackathon"> | string | null
    themes?: StringNullableListFilter<"Hackathon">
    eligibility?: StringNullableFilter<"Hackathon"> | string | null
    registrationProvider?: StringFilter<"Hackathon"> | string
    registrationFormUrl?: StringNullableFilter<"Hackathon"> | string | null
    requiresTeam?: BoolNullableFilter<"Hackathon"> | boolean | null
    requiresAuth?: BoolNullableFilter<"Hackathon"> | boolean | null
    knownFields?: JsonFilter<"Hackathon">
    sources?: JsonFilter<"Hackathon">
    createdAt?: DateTimeFilter<"Hackathon"> | Date | string
    updatedAt?: DateTimeFilter<"Hackathon"> | Date | string
    rankedEvents?: RankedEventListRelationFilter
    registrationRuns?: RegistrationRunListRelationFilter
  }

  export type HackathonOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    organizer?: SortOrderInput | SortOrder
    url?: SortOrder
    contentHash?: SortOrder
    locationMode?: SortOrder
    locationCity?: SortOrderInput | SortOrder
    locationCountry?: SortOrderInput | SortOrder
    locationTz?: SortOrderInput | SortOrder
    startsAt?: SortOrderInput | SortOrder
    endsAt?: SortOrderInput | SortOrder
    registrationOpensAt?: SortOrderInput | SortOrder
    registrationClosesAt?: SortOrderInput | SortOrder
    prizesTotal?: SortOrderInput | SortOrder
    prizesRaw?: SortOrderInput | SortOrder
    themes?: SortOrder
    eligibility?: SortOrderInput | SortOrder
    registrationProvider?: SortOrder
    registrationFormUrl?: SortOrderInput | SortOrder
    requiresTeam?: SortOrderInput | SortOrder
    requiresAuth?: SortOrderInput | SortOrder
    knownFields?: SortOrder
    sources?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rankedEvents?: RankedEventOrderByRelationAggregateInput
    registrationRuns?: RegistrationRunOrderByRelationAggregateInput
  }

  export type HackathonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    url?: string
    AND?: HackathonWhereInput | HackathonWhereInput[]
    OR?: HackathonWhereInput[]
    NOT?: HackathonWhereInput | HackathonWhereInput[]
    title?: StringFilter<"Hackathon"> | string
    description?: StringFilter<"Hackathon"> | string
    organizer?: StringNullableFilter<"Hackathon"> | string | null
    contentHash?: StringFilter<"Hackathon"> | string
    locationMode?: StringFilter<"Hackathon"> | string
    locationCity?: StringNullableFilter<"Hackathon"> | string | null
    locationCountry?: StringNullableFilter<"Hackathon"> | string | null
    locationTz?: StringNullableFilter<"Hackathon"> | string | null
    startsAt?: DateTimeNullableFilter<"Hackathon"> | Date | string | null
    endsAt?: DateTimeNullableFilter<"Hackathon"> | Date | string | null
    registrationOpensAt?: DateTimeNullableFilter<"Hackathon"> | Date | string | null
    registrationClosesAt?: DateTimeNullableFilter<"Hackathon"> | Date | string | null
    prizesTotal?: StringNullableFilter<"Hackathon"> | string | null
    prizesRaw?: StringNullableFilter<"Hackathon"> | string | null
    themes?: StringNullableListFilter<"Hackathon">
    eligibility?: StringNullableFilter<"Hackathon"> | string | null
    registrationProvider?: StringFilter<"Hackathon"> | string
    registrationFormUrl?: StringNullableFilter<"Hackathon"> | string | null
    requiresTeam?: BoolNullableFilter<"Hackathon"> | boolean | null
    requiresAuth?: BoolNullableFilter<"Hackathon"> | boolean | null
    knownFields?: JsonFilter<"Hackathon">
    sources?: JsonFilter<"Hackathon">
    createdAt?: DateTimeFilter<"Hackathon"> | Date | string
    updatedAt?: DateTimeFilter<"Hackathon"> | Date | string
    rankedEvents?: RankedEventListRelationFilter
    registrationRuns?: RegistrationRunListRelationFilter
  }, "id" | "url">

  export type HackathonOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    organizer?: SortOrderInput | SortOrder
    url?: SortOrder
    contentHash?: SortOrder
    locationMode?: SortOrder
    locationCity?: SortOrderInput | SortOrder
    locationCountry?: SortOrderInput | SortOrder
    locationTz?: SortOrderInput | SortOrder
    startsAt?: SortOrderInput | SortOrder
    endsAt?: SortOrderInput | SortOrder
    registrationOpensAt?: SortOrderInput | SortOrder
    registrationClosesAt?: SortOrderInput | SortOrder
    prizesTotal?: SortOrderInput | SortOrder
    prizesRaw?: SortOrderInput | SortOrder
    themes?: SortOrder
    eligibility?: SortOrderInput | SortOrder
    registrationProvider?: SortOrder
    registrationFormUrl?: SortOrderInput | SortOrder
    requiresTeam?: SortOrderInput | SortOrder
    requiresAuth?: SortOrderInput | SortOrder
    knownFields?: SortOrder
    sources?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HackathonCountOrderByAggregateInput
    _max?: HackathonMaxOrderByAggregateInput
    _min?: HackathonMinOrderByAggregateInput
  }

  export type HackathonScalarWhereWithAggregatesInput = {
    AND?: HackathonScalarWhereWithAggregatesInput | HackathonScalarWhereWithAggregatesInput[]
    OR?: HackathonScalarWhereWithAggregatesInput[]
    NOT?: HackathonScalarWhereWithAggregatesInput | HackathonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Hackathon"> | string
    title?: StringWithAggregatesFilter<"Hackathon"> | string
    description?: StringWithAggregatesFilter<"Hackathon"> | string
    organizer?: StringNullableWithAggregatesFilter<"Hackathon"> | string | null
    url?: StringWithAggregatesFilter<"Hackathon"> | string
    contentHash?: StringWithAggregatesFilter<"Hackathon"> | string
    locationMode?: StringWithAggregatesFilter<"Hackathon"> | string
    locationCity?: StringNullableWithAggregatesFilter<"Hackathon"> | string | null
    locationCountry?: StringNullableWithAggregatesFilter<"Hackathon"> | string | null
    locationTz?: StringNullableWithAggregatesFilter<"Hackathon"> | string | null
    startsAt?: DateTimeNullableWithAggregatesFilter<"Hackathon"> | Date | string | null
    endsAt?: DateTimeNullableWithAggregatesFilter<"Hackathon"> | Date | string | null
    registrationOpensAt?: DateTimeNullableWithAggregatesFilter<"Hackathon"> | Date | string | null
    registrationClosesAt?: DateTimeNullableWithAggregatesFilter<"Hackathon"> | Date | string | null
    prizesTotal?: StringNullableWithAggregatesFilter<"Hackathon"> | string | null
    prizesRaw?: StringNullableWithAggregatesFilter<"Hackathon"> | string | null
    themes?: StringNullableListFilter<"Hackathon">
    eligibility?: StringNullableWithAggregatesFilter<"Hackathon"> | string | null
    registrationProvider?: StringWithAggregatesFilter<"Hackathon"> | string
    registrationFormUrl?: StringNullableWithAggregatesFilter<"Hackathon"> | string | null
    requiresTeam?: BoolNullableWithAggregatesFilter<"Hackathon"> | boolean | null
    requiresAuth?: BoolNullableWithAggregatesFilter<"Hackathon"> | boolean | null
    knownFields?: JsonWithAggregatesFilter<"Hackathon">
    sources?: JsonWithAggregatesFilter<"Hackathon">
    createdAt?: DateTimeWithAggregatesFilter<"Hackathon"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Hackathon"> | Date | string
  }

  export type UserProfileWhereInput = {
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    id?: StringFilter<"UserProfile"> | string
    name?: StringFilter<"UserProfile"> | string
    email?: StringFilter<"UserProfile"> | string
    school?: StringNullableFilter<"UserProfile"> | string | null
    resumeUrl?: StringNullableFilter<"UserProfile"> | string | null
    skills?: StringNullableListFilter<"UserProfile">
    interests?: StringNullableListFilter<"UserProfile">
    locationCity?: StringNullableFilter<"UserProfile"> | string | null
    locationCountry?: StringNullableFilter<"UserProfile"> | string | null
    willingToTravel?: BoolFilter<"UserProfile"> | boolean
    travelRegions?: StringNullableListFilter<"UserProfile">
    formAnswers?: JsonFilter<"UserProfile">
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
    rankedEvents?: RankedEventListRelationFilter
    registrationRuns?: RegistrationRunListRelationFilter
  }

  export type UserProfileOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    school?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    skills?: SortOrder
    interests?: SortOrder
    locationCity?: SortOrderInput | SortOrder
    locationCountry?: SortOrderInput | SortOrder
    willingToTravel?: SortOrder
    travelRegions?: SortOrder
    formAnswers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rankedEvents?: RankedEventOrderByRelationAggregateInput
    registrationRuns?: RegistrationRunOrderByRelationAggregateInput
  }

  export type UserProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    name?: StringFilter<"UserProfile"> | string
    school?: StringNullableFilter<"UserProfile"> | string | null
    resumeUrl?: StringNullableFilter<"UserProfile"> | string | null
    skills?: StringNullableListFilter<"UserProfile">
    interests?: StringNullableListFilter<"UserProfile">
    locationCity?: StringNullableFilter<"UserProfile"> | string | null
    locationCountry?: StringNullableFilter<"UserProfile"> | string | null
    willingToTravel?: BoolFilter<"UserProfile"> | boolean
    travelRegions?: StringNullableListFilter<"UserProfile">
    formAnswers?: JsonFilter<"UserProfile">
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
    rankedEvents?: RankedEventListRelationFilter
    registrationRuns?: RegistrationRunListRelationFilter
  }, "id" | "email">

  export type UserProfileOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    school?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    skills?: SortOrder
    interests?: SortOrder
    locationCity?: SortOrderInput | SortOrder
    locationCountry?: SortOrderInput | SortOrder
    willingToTravel?: SortOrder
    travelRegions?: SortOrder
    formAnswers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserProfileCountOrderByAggregateInput
    _max?: UserProfileMaxOrderByAggregateInput
    _min?: UserProfileMinOrderByAggregateInput
  }

  export type UserProfileScalarWhereWithAggregatesInput = {
    AND?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    OR?: UserProfileScalarWhereWithAggregatesInput[]
    NOT?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserProfile"> | string
    name?: StringWithAggregatesFilter<"UserProfile"> | string
    email?: StringWithAggregatesFilter<"UserProfile"> | string
    school?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    resumeUrl?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    skills?: StringNullableListFilter<"UserProfile">
    interests?: StringNullableListFilter<"UserProfile">
    locationCity?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    locationCountry?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    willingToTravel?: BoolWithAggregatesFilter<"UserProfile"> | boolean
    travelRegions?: StringNullableListFilter<"UserProfile">
    formAnswers?: JsonWithAggregatesFilter<"UserProfile">
    createdAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
  }

  export type RankedEventWhereInput = {
    AND?: RankedEventWhereInput | RankedEventWhereInput[]
    OR?: RankedEventWhereInput[]
    NOT?: RankedEventWhereInput | RankedEventWhereInput[]
    id?: StringFilter<"RankedEvent"> | string
    hackathonId?: StringFilter<"RankedEvent"> | string
    userId?: StringFilter<"RankedEvent"> | string
    score?: FloatFilter<"RankedEvent"> | number
    reasons?: StringNullableListFilter<"RankedEvent">
    matchedThemes?: StringNullableListFilter<"RankedEvent">
    createdAt?: DateTimeFilter<"RankedEvent"> | Date | string
    updatedAt?: DateTimeFilter<"RankedEvent"> | Date | string
    hackathon?: XOR<HackathonScalarRelationFilter, HackathonWhereInput>
    user?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
  }

  export type RankedEventOrderByWithRelationInput = {
    id?: SortOrder
    hackathonId?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    reasons?: SortOrder
    matchedThemes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hackathon?: HackathonOrderByWithRelationInput
    user?: UserProfileOrderByWithRelationInput
  }

  export type RankedEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    hackathonId_userId?: RankedEventHackathonIdUserIdCompoundUniqueInput
    AND?: RankedEventWhereInput | RankedEventWhereInput[]
    OR?: RankedEventWhereInput[]
    NOT?: RankedEventWhereInput | RankedEventWhereInput[]
    hackathonId?: StringFilter<"RankedEvent"> | string
    userId?: StringFilter<"RankedEvent"> | string
    score?: FloatFilter<"RankedEvent"> | number
    reasons?: StringNullableListFilter<"RankedEvent">
    matchedThemes?: StringNullableListFilter<"RankedEvent">
    createdAt?: DateTimeFilter<"RankedEvent"> | Date | string
    updatedAt?: DateTimeFilter<"RankedEvent"> | Date | string
    hackathon?: XOR<HackathonScalarRelationFilter, HackathonWhereInput>
    user?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
  }, "id" | "hackathonId_userId">

  export type RankedEventOrderByWithAggregationInput = {
    id?: SortOrder
    hackathonId?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    reasons?: SortOrder
    matchedThemes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RankedEventCountOrderByAggregateInput
    _avg?: RankedEventAvgOrderByAggregateInput
    _max?: RankedEventMaxOrderByAggregateInput
    _min?: RankedEventMinOrderByAggregateInput
    _sum?: RankedEventSumOrderByAggregateInput
  }

  export type RankedEventScalarWhereWithAggregatesInput = {
    AND?: RankedEventScalarWhereWithAggregatesInput | RankedEventScalarWhereWithAggregatesInput[]
    OR?: RankedEventScalarWhereWithAggregatesInput[]
    NOT?: RankedEventScalarWhereWithAggregatesInput | RankedEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RankedEvent"> | string
    hackathonId?: StringWithAggregatesFilter<"RankedEvent"> | string
    userId?: StringWithAggregatesFilter<"RankedEvent"> | string
    score?: FloatWithAggregatesFilter<"RankedEvent"> | number
    reasons?: StringNullableListFilter<"RankedEvent">
    matchedThemes?: StringNullableListFilter<"RankedEvent">
    createdAt?: DateTimeWithAggregatesFilter<"RankedEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RankedEvent"> | Date | string
  }

  export type RegistrationRunWhereInput = {
    AND?: RegistrationRunWhereInput | RegistrationRunWhereInput[]
    OR?: RegistrationRunWhereInput[]
    NOT?: RegistrationRunWhereInput | RegistrationRunWhereInput[]
    id?: StringFilter<"RegistrationRun"> | string
    userId?: StringFilter<"RegistrationRun"> | string
    hackathonId?: StringFilter<"RegistrationRun"> | string
    runner?: StringFilter<"RegistrationRun"> | string
    status?: StringFilter<"RegistrationRun"> | string
    plannedActions?: JsonFilter<"RegistrationRun">
    resolvedFields?: JsonFilter<"RegistrationRun">
    screenshots?: StringNullableListFilter<"RegistrationRun">
    finalScreenshot?: StringNullableFilter<"RegistrationRun"> | string | null
    errorStage?: StringNullableFilter<"RegistrationRun"> | string | null
    errorMessage?: StringNullableFilter<"RegistrationRun"> | string | null
    createdAt?: DateTimeFilter<"RegistrationRun"> | Date | string
    updatedAt?: DateTimeFilter<"RegistrationRun"> | Date | string
    hackathon?: XOR<HackathonScalarRelationFilter, HackathonWhereInput>
    user?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
  }

  export type RegistrationRunOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    hackathonId?: SortOrder
    runner?: SortOrder
    status?: SortOrder
    plannedActions?: SortOrder
    resolvedFields?: SortOrder
    screenshots?: SortOrder
    finalScreenshot?: SortOrderInput | SortOrder
    errorStage?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hackathon?: HackathonOrderByWithRelationInput
    user?: UserProfileOrderByWithRelationInput
  }

  export type RegistrationRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RegistrationRunWhereInput | RegistrationRunWhereInput[]
    OR?: RegistrationRunWhereInput[]
    NOT?: RegistrationRunWhereInput | RegistrationRunWhereInput[]
    userId?: StringFilter<"RegistrationRun"> | string
    hackathonId?: StringFilter<"RegistrationRun"> | string
    runner?: StringFilter<"RegistrationRun"> | string
    status?: StringFilter<"RegistrationRun"> | string
    plannedActions?: JsonFilter<"RegistrationRun">
    resolvedFields?: JsonFilter<"RegistrationRun">
    screenshots?: StringNullableListFilter<"RegistrationRun">
    finalScreenshot?: StringNullableFilter<"RegistrationRun"> | string | null
    errorStage?: StringNullableFilter<"RegistrationRun"> | string | null
    errorMessage?: StringNullableFilter<"RegistrationRun"> | string | null
    createdAt?: DateTimeFilter<"RegistrationRun"> | Date | string
    updatedAt?: DateTimeFilter<"RegistrationRun"> | Date | string
    hackathon?: XOR<HackathonScalarRelationFilter, HackathonWhereInput>
    user?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
  }, "id">

  export type RegistrationRunOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    hackathonId?: SortOrder
    runner?: SortOrder
    status?: SortOrder
    plannedActions?: SortOrder
    resolvedFields?: SortOrder
    screenshots?: SortOrder
    finalScreenshot?: SortOrderInput | SortOrder
    errorStage?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RegistrationRunCountOrderByAggregateInput
    _max?: RegistrationRunMaxOrderByAggregateInput
    _min?: RegistrationRunMinOrderByAggregateInput
  }

  export type RegistrationRunScalarWhereWithAggregatesInput = {
    AND?: RegistrationRunScalarWhereWithAggregatesInput | RegistrationRunScalarWhereWithAggregatesInput[]
    OR?: RegistrationRunScalarWhereWithAggregatesInput[]
    NOT?: RegistrationRunScalarWhereWithAggregatesInput | RegistrationRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RegistrationRun"> | string
    userId?: StringWithAggregatesFilter<"RegistrationRun"> | string
    hackathonId?: StringWithAggregatesFilter<"RegistrationRun"> | string
    runner?: StringWithAggregatesFilter<"RegistrationRun"> | string
    status?: StringWithAggregatesFilter<"RegistrationRun"> | string
    plannedActions?: JsonWithAggregatesFilter<"RegistrationRun">
    resolvedFields?: JsonWithAggregatesFilter<"RegistrationRun">
    screenshots?: StringNullableListFilter<"RegistrationRun">
    finalScreenshot?: StringNullableWithAggregatesFilter<"RegistrationRun"> | string | null
    errorStage?: StringNullableWithAggregatesFilter<"RegistrationRun"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"RegistrationRun"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RegistrationRun"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RegistrationRun"> | Date | string
  }

  export type PendingNotificationWhereInput = {
    AND?: PendingNotificationWhereInput | PendingNotificationWhereInput[]
    OR?: PendingNotificationWhereInput[]
    NOT?: PendingNotificationWhereInput | PendingNotificationWhereInput[]
    id?: StringFilter<"PendingNotification"> | string
    userId?: StringFilter<"PendingNotification"> | string
    kind?: StringFilter<"PendingNotification"> | string
    payloadRef?: StringFilter<"PendingNotification"> | string
    sentAt?: DateTimeNullableFilter<"PendingNotification"> | Date | string | null
    createdAt?: DateTimeFilter<"PendingNotification"> | Date | string
  }

  export type PendingNotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    kind?: SortOrder
    payloadRef?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type PendingNotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_kind_payloadRef?: PendingNotificationUserIdKindPayloadRefCompoundUniqueInput
    AND?: PendingNotificationWhereInput | PendingNotificationWhereInput[]
    OR?: PendingNotificationWhereInput[]
    NOT?: PendingNotificationWhereInput | PendingNotificationWhereInput[]
    userId?: StringFilter<"PendingNotification"> | string
    kind?: StringFilter<"PendingNotification"> | string
    payloadRef?: StringFilter<"PendingNotification"> | string
    sentAt?: DateTimeNullableFilter<"PendingNotification"> | Date | string | null
    createdAt?: DateTimeFilter<"PendingNotification"> | Date | string
  }, "id" | "userId_kind_payloadRef">

  export type PendingNotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    kind?: SortOrder
    payloadRef?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PendingNotificationCountOrderByAggregateInput
    _max?: PendingNotificationMaxOrderByAggregateInput
    _min?: PendingNotificationMinOrderByAggregateInput
  }

  export type PendingNotificationScalarWhereWithAggregatesInput = {
    AND?: PendingNotificationScalarWhereWithAggregatesInput | PendingNotificationScalarWhereWithAggregatesInput[]
    OR?: PendingNotificationScalarWhereWithAggregatesInput[]
    NOT?: PendingNotificationScalarWhereWithAggregatesInput | PendingNotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PendingNotification"> | string
    userId?: StringWithAggregatesFilter<"PendingNotification"> | string
    kind?: StringWithAggregatesFilter<"PendingNotification"> | string
    payloadRef?: StringWithAggregatesFilter<"PendingNotification"> | string
    sentAt?: DateTimeNullableWithAggregatesFilter<"PendingNotification"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PendingNotification"> | Date | string
  }

  export type HackathonCreateInput = {
    id: string
    title: string
    description: string
    organizer?: string | null
    url: string
    contentHash: string
    locationMode: string
    locationCity?: string | null
    locationCountry?: string | null
    locationTz?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    registrationOpensAt?: Date | string | null
    registrationClosesAt?: Date | string | null
    prizesTotal?: string | null
    prizesRaw?: string | null
    themes?: HackathonCreatethemesInput | string[]
    eligibility?: string | null
    registrationProvider: string
    registrationFormUrl?: string | null
    requiresTeam?: boolean | null
    requiresAuth?: boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    rankedEvents?: RankedEventCreateNestedManyWithoutHackathonInput
    registrationRuns?: RegistrationRunCreateNestedManyWithoutHackathonInput
  }

  export type HackathonUncheckedCreateInput = {
    id: string
    title: string
    description: string
    organizer?: string | null
    url: string
    contentHash: string
    locationMode: string
    locationCity?: string | null
    locationCountry?: string | null
    locationTz?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    registrationOpensAt?: Date | string | null
    registrationClosesAt?: Date | string | null
    prizesTotal?: string | null
    prizesRaw?: string | null
    themes?: HackathonCreatethemesInput | string[]
    eligibility?: string | null
    registrationProvider: string
    registrationFormUrl?: string | null
    requiresTeam?: boolean | null
    requiresAuth?: boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    rankedEvents?: RankedEventUncheckedCreateNestedManyWithoutHackathonInput
    registrationRuns?: RegistrationRunUncheckedCreateNestedManyWithoutHackathonInput
  }

  export type HackathonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    organizer?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    locationMode?: StringFieldUpdateOperationsInput | string
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    locationTz?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationOpensAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationClosesAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prizesTotal?: NullableStringFieldUpdateOperationsInput | string | null
    prizesRaw?: NullableStringFieldUpdateOperationsInput | string | null
    themes?: HackathonUpdatethemesInput | string[]
    eligibility?: NullableStringFieldUpdateOperationsInput | string | null
    registrationProvider?: StringFieldUpdateOperationsInput | string
    registrationFormUrl?: NullableStringFieldUpdateOperationsInput | string | null
    requiresTeam?: NullableBoolFieldUpdateOperationsInput | boolean | null
    requiresAuth?: NullableBoolFieldUpdateOperationsInput | boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rankedEvents?: RankedEventUpdateManyWithoutHackathonNestedInput
    registrationRuns?: RegistrationRunUpdateManyWithoutHackathonNestedInput
  }

  export type HackathonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    organizer?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    locationMode?: StringFieldUpdateOperationsInput | string
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    locationTz?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationOpensAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationClosesAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prizesTotal?: NullableStringFieldUpdateOperationsInput | string | null
    prizesRaw?: NullableStringFieldUpdateOperationsInput | string | null
    themes?: HackathonUpdatethemesInput | string[]
    eligibility?: NullableStringFieldUpdateOperationsInput | string | null
    registrationProvider?: StringFieldUpdateOperationsInput | string
    registrationFormUrl?: NullableStringFieldUpdateOperationsInput | string | null
    requiresTeam?: NullableBoolFieldUpdateOperationsInput | boolean | null
    requiresAuth?: NullableBoolFieldUpdateOperationsInput | boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rankedEvents?: RankedEventUncheckedUpdateManyWithoutHackathonNestedInput
    registrationRuns?: RegistrationRunUncheckedUpdateManyWithoutHackathonNestedInput
  }

  export type HackathonCreateManyInput = {
    id: string
    title: string
    description: string
    organizer?: string | null
    url: string
    contentHash: string
    locationMode: string
    locationCity?: string | null
    locationCountry?: string | null
    locationTz?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    registrationOpensAt?: Date | string | null
    registrationClosesAt?: Date | string | null
    prizesTotal?: string | null
    prizesRaw?: string | null
    themes?: HackathonCreatethemesInput | string[]
    eligibility?: string | null
    registrationProvider: string
    registrationFormUrl?: string | null
    requiresTeam?: boolean | null
    requiresAuth?: boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HackathonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    organizer?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    locationMode?: StringFieldUpdateOperationsInput | string
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    locationTz?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationOpensAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationClosesAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prizesTotal?: NullableStringFieldUpdateOperationsInput | string | null
    prizesRaw?: NullableStringFieldUpdateOperationsInput | string | null
    themes?: HackathonUpdatethemesInput | string[]
    eligibility?: NullableStringFieldUpdateOperationsInput | string | null
    registrationProvider?: StringFieldUpdateOperationsInput | string
    registrationFormUrl?: NullableStringFieldUpdateOperationsInput | string | null
    requiresTeam?: NullableBoolFieldUpdateOperationsInput | boolean | null
    requiresAuth?: NullableBoolFieldUpdateOperationsInput | boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HackathonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    organizer?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    locationMode?: StringFieldUpdateOperationsInput | string
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    locationTz?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationOpensAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationClosesAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prizesTotal?: NullableStringFieldUpdateOperationsInput | string | null
    prizesRaw?: NullableStringFieldUpdateOperationsInput | string | null
    themes?: HackathonUpdatethemesInput | string[]
    eligibility?: NullableStringFieldUpdateOperationsInput | string | null
    registrationProvider?: StringFieldUpdateOperationsInput | string
    registrationFormUrl?: NullableStringFieldUpdateOperationsInput | string | null
    requiresTeam?: NullableBoolFieldUpdateOperationsInput | boolean | null
    requiresAuth?: NullableBoolFieldUpdateOperationsInput | boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileCreateInput = {
    id: string
    name: string
    email: string
    school?: string | null
    resumeUrl?: string | null
    skills?: UserProfileCreateskillsInput | string[]
    interests?: UserProfileCreateinterestsInput | string[]
    locationCity?: string | null
    locationCountry?: string | null
    willingToTravel?: boolean
    travelRegions?: UserProfileCreatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    rankedEvents?: RankedEventCreateNestedManyWithoutUserInput
    registrationRuns?: RegistrationRunCreateNestedManyWithoutUserInput
  }

  export type UserProfileUncheckedCreateInput = {
    id: string
    name: string
    email: string
    school?: string | null
    resumeUrl?: string | null
    skills?: UserProfileCreateskillsInput | string[]
    interests?: UserProfileCreateinterestsInput | string[]
    locationCity?: string | null
    locationCountry?: string | null
    willingToTravel?: boolean
    travelRegions?: UserProfileCreatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    rankedEvents?: RankedEventUncheckedCreateNestedManyWithoutUserInput
    registrationRuns?: RegistrationRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    school?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserProfileUpdateskillsInput | string[]
    interests?: UserProfileUpdateinterestsInput | string[]
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    willingToTravel?: BoolFieldUpdateOperationsInput | boolean
    travelRegions?: UserProfileUpdatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rankedEvents?: RankedEventUpdateManyWithoutUserNestedInput
    registrationRuns?: RegistrationRunUpdateManyWithoutUserNestedInput
  }

  export type UserProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    school?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserProfileUpdateskillsInput | string[]
    interests?: UserProfileUpdateinterestsInput | string[]
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    willingToTravel?: BoolFieldUpdateOperationsInput | boolean
    travelRegions?: UserProfileUpdatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rankedEvents?: RankedEventUncheckedUpdateManyWithoutUserNestedInput
    registrationRuns?: RegistrationRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserProfileCreateManyInput = {
    id: string
    name: string
    email: string
    school?: string | null
    resumeUrl?: string | null
    skills?: UserProfileCreateskillsInput | string[]
    interests?: UserProfileCreateinterestsInput | string[]
    locationCity?: string | null
    locationCountry?: string | null
    willingToTravel?: boolean
    travelRegions?: UserProfileCreatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    school?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserProfileUpdateskillsInput | string[]
    interests?: UserProfileUpdateinterestsInput | string[]
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    willingToTravel?: BoolFieldUpdateOperationsInput | boolean
    travelRegions?: UserProfileUpdatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    school?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserProfileUpdateskillsInput | string[]
    interests?: UserProfileUpdateinterestsInput | string[]
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    willingToTravel?: BoolFieldUpdateOperationsInput | boolean
    travelRegions?: UserProfileUpdatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RankedEventCreateInput = {
    id?: string
    score: number
    reasons?: RankedEventCreatereasonsInput | string[]
    matchedThemes?: RankedEventCreatematchedThemesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    hackathon: HackathonCreateNestedOneWithoutRankedEventsInput
    user: UserProfileCreateNestedOneWithoutRankedEventsInput
  }

  export type RankedEventUncheckedCreateInput = {
    id?: string
    hackathonId: string
    userId: string
    score: number
    reasons?: RankedEventCreatereasonsInput | string[]
    matchedThemes?: RankedEventCreatematchedThemesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RankedEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    reasons?: RankedEventUpdatereasonsInput | string[]
    matchedThemes?: RankedEventUpdatematchedThemesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hackathon?: HackathonUpdateOneRequiredWithoutRankedEventsNestedInput
    user?: UserProfileUpdateOneRequiredWithoutRankedEventsNestedInput
  }

  export type RankedEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hackathonId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    reasons?: RankedEventUpdatereasonsInput | string[]
    matchedThemes?: RankedEventUpdatematchedThemesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RankedEventCreateManyInput = {
    id?: string
    hackathonId: string
    userId: string
    score: number
    reasons?: RankedEventCreatereasonsInput | string[]
    matchedThemes?: RankedEventCreatematchedThemesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RankedEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    reasons?: RankedEventUpdatereasonsInput | string[]
    matchedThemes?: RankedEventUpdatematchedThemesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RankedEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hackathonId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    reasons?: RankedEventUpdatereasonsInput | string[]
    matchedThemes?: RankedEventUpdatematchedThemesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationRunCreateInput = {
    id: string
    runner: string
    status: string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunCreatescreenshotsInput | string[]
    finalScreenshot?: string | null
    errorStage?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    hackathon: HackathonCreateNestedOneWithoutRegistrationRunsInput
    user: UserProfileCreateNestedOneWithoutRegistrationRunsInput
  }

  export type RegistrationRunUncheckedCreateInput = {
    id: string
    userId: string
    hackathonId: string
    runner: string
    status: string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunCreatescreenshotsInput | string[]
    finalScreenshot?: string | null
    errorStage?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrationRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    runner?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunUpdatescreenshotsInput | string[]
    finalScreenshot?: NullableStringFieldUpdateOperationsInput | string | null
    errorStage?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hackathon?: HackathonUpdateOneRequiredWithoutRegistrationRunsNestedInput
    user?: UserProfileUpdateOneRequiredWithoutRegistrationRunsNestedInput
  }

  export type RegistrationRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    hackathonId?: StringFieldUpdateOperationsInput | string
    runner?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunUpdatescreenshotsInput | string[]
    finalScreenshot?: NullableStringFieldUpdateOperationsInput | string | null
    errorStage?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationRunCreateManyInput = {
    id: string
    userId: string
    hackathonId: string
    runner: string
    status: string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunCreatescreenshotsInput | string[]
    finalScreenshot?: string | null
    errorStage?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrationRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    runner?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunUpdatescreenshotsInput | string[]
    finalScreenshot?: NullableStringFieldUpdateOperationsInput | string | null
    errorStage?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    hackathonId?: StringFieldUpdateOperationsInput | string
    runner?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunUpdatescreenshotsInput | string[]
    finalScreenshot?: NullableStringFieldUpdateOperationsInput | string | null
    errorStage?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingNotificationCreateInput = {
    id?: string
    userId: string
    kind: string
    payloadRef: string
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PendingNotificationUncheckedCreateInput = {
    id?: string
    userId: string
    kind: string
    payloadRef: string
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PendingNotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    payloadRef?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingNotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    payloadRef?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingNotificationCreateManyInput = {
    id?: string
    userId: string
    kind: string
    payloadRef: string
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PendingNotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    payloadRef?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingNotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    payloadRef?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RankedEventListRelationFilter = {
    every?: RankedEventWhereInput
    some?: RankedEventWhereInput
    none?: RankedEventWhereInput
  }

  export type RegistrationRunListRelationFilter = {
    every?: RegistrationRunWhereInput
    some?: RegistrationRunWhereInput
    none?: RegistrationRunWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RankedEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RegistrationRunOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HackathonCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    organizer?: SortOrder
    url?: SortOrder
    contentHash?: SortOrder
    locationMode?: SortOrder
    locationCity?: SortOrder
    locationCountry?: SortOrder
    locationTz?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    registrationOpensAt?: SortOrder
    registrationClosesAt?: SortOrder
    prizesTotal?: SortOrder
    prizesRaw?: SortOrder
    themes?: SortOrder
    eligibility?: SortOrder
    registrationProvider?: SortOrder
    registrationFormUrl?: SortOrder
    requiresTeam?: SortOrder
    requiresAuth?: SortOrder
    knownFields?: SortOrder
    sources?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HackathonMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    organizer?: SortOrder
    url?: SortOrder
    contentHash?: SortOrder
    locationMode?: SortOrder
    locationCity?: SortOrder
    locationCountry?: SortOrder
    locationTz?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    registrationOpensAt?: SortOrder
    registrationClosesAt?: SortOrder
    prizesTotal?: SortOrder
    prizesRaw?: SortOrder
    eligibility?: SortOrder
    registrationProvider?: SortOrder
    registrationFormUrl?: SortOrder
    requiresTeam?: SortOrder
    requiresAuth?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HackathonMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    organizer?: SortOrder
    url?: SortOrder
    contentHash?: SortOrder
    locationMode?: SortOrder
    locationCity?: SortOrder
    locationCountry?: SortOrder
    locationTz?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    registrationOpensAt?: SortOrder
    registrationClosesAt?: SortOrder
    prizesTotal?: SortOrder
    prizesRaw?: SortOrder
    eligibility?: SortOrder
    registrationProvider?: SortOrder
    registrationFormUrl?: SortOrder
    requiresTeam?: SortOrder
    requiresAuth?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserProfileCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    school?: SortOrder
    resumeUrl?: SortOrder
    skills?: SortOrder
    interests?: SortOrder
    locationCity?: SortOrder
    locationCountry?: SortOrder
    willingToTravel?: SortOrder
    travelRegions?: SortOrder
    formAnswers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    school?: SortOrder
    resumeUrl?: SortOrder
    locationCity?: SortOrder
    locationCountry?: SortOrder
    willingToTravel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    school?: SortOrder
    resumeUrl?: SortOrder
    locationCity?: SortOrder
    locationCountry?: SortOrder
    willingToTravel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type HackathonScalarRelationFilter = {
    is?: HackathonWhereInput
    isNot?: HackathonWhereInput
  }

  export type UserProfileScalarRelationFilter = {
    is?: UserProfileWhereInput
    isNot?: UserProfileWhereInput
  }

  export type RankedEventHackathonIdUserIdCompoundUniqueInput = {
    hackathonId: string
    userId: string
  }

  export type RankedEventCountOrderByAggregateInput = {
    id?: SortOrder
    hackathonId?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    reasons?: SortOrder
    matchedThemes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RankedEventAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type RankedEventMaxOrderByAggregateInput = {
    id?: SortOrder
    hackathonId?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RankedEventMinOrderByAggregateInput = {
    id?: SortOrder
    hackathonId?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RankedEventSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type RegistrationRunCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    hackathonId?: SortOrder
    runner?: SortOrder
    status?: SortOrder
    plannedActions?: SortOrder
    resolvedFields?: SortOrder
    screenshots?: SortOrder
    finalScreenshot?: SortOrder
    errorStage?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegistrationRunMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    hackathonId?: SortOrder
    runner?: SortOrder
    status?: SortOrder
    finalScreenshot?: SortOrder
    errorStage?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegistrationRunMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    hackathonId?: SortOrder
    runner?: SortOrder
    status?: SortOrder
    finalScreenshot?: SortOrder
    errorStage?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PendingNotificationUserIdKindPayloadRefCompoundUniqueInput = {
    userId: string
    kind: string
    payloadRef: string
  }

  export type PendingNotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    kind?: SortOrder
    payloadRef?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PendingNotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    kind?: SortOrder
    payloadRef?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PendingNotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    kind?: SortOrder
    payloadRef?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type HackathonCreatethemesInput = {
    set: string[]
  }

  export type RankedEventCreateNestedManyWithoutHackathonInput = {
    create?: XOR<RankedEventCreateWithoutHackathonInput, RankedEventUncheckedCreateWithoutHackathonInput> | RankedEventCreateWithoutHackathonInput[] | RankedEventUncheckedCreateWithoutHackathonInput[]
    connectOrCreate?: RankedEventCreateOrConnectWithoutHackathonInput | RankedEventCreateOrConnectWithoutHackathonInput[]
    createMany?: RankedEventCreateManyHackathonInputEnvelope
    connect?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
  }

  export type RegistrationRunCreateNestedManyWithoutHackathonInput = {
    create?: XOR<RegistrationRunCreateWithoutHackathonInput, RegistrationRunUncheckedCreateWithoutHackathonInput> | RegistrationRunCreateWithoutHackathonInput[] | RegistrationRunUncheckedCreateWithoutHackathonInput[]
    connectOrCreate?: RegistrationRunCreateOrConnectWithoutHackathonInput | RegistrationRunCreateOrConnectWithoutHackathonInput[]
    createMany?: RegistrationRunCreateManyHackathonInputEnvelope
    connect?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
  }

  export type RankedEventUncheckedCreateNestedManyWithoutHackathonInput = {
    create?: XOR<RankedEventCreateWithoutHackathonInput, RankedEventUncheckedCreateWithoutHackathonInput> | RankedEventCreateWithoutHackathonInput[] | RankedEventUncheckedCreateWithoutHackathonInput[]
    connectOrCreate?: RankedEventCreateOrConnectWithoutHackathonInput | RankedEventCreateOrConnectWithoutHackathonInput[]
    createMany?: RankedEventCreateManyHackathonInputEnvelope
    connect?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
  }

  export type RegistrationRunUncheckedCreateNestedManyWithoutHackathonInput = {
    create?: XOR<RegistrationRunCreateWithoutHackathonInput, RegistrationRunUncheckedCreateWithoutHackathonInput> | RegistrationRunCreateWithoutHackathonInput[] | RegistrationRunUncheckedCreateWithoutHackathonInput[]
    connectOrCreate?: RegistrationRunCreateOrConnectWithoutHackathonInput | RegistrationRunCreateOrConnectWithoutHackathonInput[]
    createMany?: RegistrationRunCreateManyHackathonInputEnvelope
    connect?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type HackathonUpdatethemesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RankedEventUpdateManyWithoutHackathonNestedInput = {
    create?: XOR<RankedEventCreateWithoutHackathonInput, RankedEventUncheckedCreateWithoutHackathonInput> | RankedEventCreateWithoutHackathonInput[] | RankedEventUncheckedCreateWithoutHackathonInput[]
    connectOrCreate?: RankedEventCreateOrConnectWithoutHackathonInput | RankedEventCreateOrConnectWithoutHackathonInput[]
    upsert?: RankedEventUpsertWithWhereUniqueWithoutHackathonInput | RankedEventUpsertWithWhereUniqueWithoutHackathonInput[]
    createMany?: RankedEventCreateManyHackathonInputEnvelope
    set?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    disconnect?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    delete?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    connect?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    update?: RankedEventUpdateWithWhereUniqueWithoutHackathonInput | RankedEventUpdateWithWhereUniqueWithoutHackathonInput[]
    updateMany?: RankedEventUpdateManyWithWhereWithoutHackathonInput | RankedEventUpdateManyWithWhereWithoutHackathonInput[]
    deleteMany?: RankedEventScalarWhereInput | RankedEventScalarWhereInput[]
  }

  export type RegistrationRunUpdateManyWithoutHackathonNestedInput = {
    create?: XOR<RegistrationRunCreateWithoutHackathonInput, RegistrationRunUncheckedCreateWithoutHackathonInput> | RegistrationRunCreateWithoutHackathonInput[] | RegistrationRunUncheckedCreateWithoutHackathonInput[]
    connectOrCreate?: RegistrationRunCreateOrConnectWithoutHackathonInput | RegistrationRunCreateOrConnectWithoutHackathonInput[]
    upsert?: RegistrationRunUpsertWithWhereUniqueWithoutHackathonInput | RegistrationRunUpsertWithWhereUniqueWithoutHackathonInput[]
    createMany?: RegistrationRunCreateManyHackathonInputEnvelope
    set?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    disconnect?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    delete?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    connect?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    update?: RegistrationRunUpdateWithWhereUniqueWithoutHackathonInput | RegistrationRunUpdateWithWhereUniqueWithoutHackathonInput[]
    updateMany?: RegistrationRunUpdateManyWithWhereWithoutHackathonInput | RegistrationRunUpdateManyWithWhereWithoutHackathonInput[]
    deleteMany?: RegistrationRunScalarWhereInput | RegistrationRunScalarWhereInput[]
  }

  export type RankedEventUncheckedUpdateManyWithoutHackathonNestedInput = {
    create?: XOR<RankedEventCreateWithoutHackathonInput, RankedEventUncheckedCreateWithoutHackathonInput> | RankedEventCreateWithoutHackathonInput[] | RankedEventUncheckedCreateWithoutHackathonInput[]
    connectOrCreate?: RankedEventCreateOrConnectWithoutHackathonInput | RankedEventCreateOrConnectWithoutHackathonInput[]
    upsert?: RankedEventUpsertWithWhereUniqueWithoutHackathonInput | RankedEventUpsertWithWhereUniqueWithoutHackathonInput[]
    createMany?: RankedEventCreateManyHackathonInputEnvelope
    set?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    disconnect?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    delete?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    connect?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    update?: RankedEventUpdateWithWhereUniqueWithoutHackathonInput | RankedEventUpdateWithWhereUniqueWithoutHackathonInput[]
    updateMany?: RankedEventUpdateManyWithWhereWithoutHackathonInput | RankedEventUpdateManyWithWhereWithoutHackathonInput[]
    deleteMany?: RankedEventScalarWhereInput | RankedEventScalarWhereInput[]
  }

  export type RegistrationRunUncheckedUpdateManyWithoutHackathonNestedInput = {
    create?: XOR<RegistrationRunCreateWithoutHackathonInput, RegistrationRunUncheckedCreateWithoutHackathonInput> | RegistrationRunCreateWithoutHackathonInput[] | RegistrationRunUncheckedCreateWithoutHackathonInput[]
    connectOrCreate?: RegistrationRunCreateOrConnectWithoutHackathonInput | RegistrationRunCreateOrConnectWithoutHackathonInput[]
    upsert?: RegistrationRunUpsertWithWhereUniqueWithoutHackathonInput | RegistrationRunUpsertWithWhereUniqueWithoutHackathonInput[]
    createMany?: RegistrationRunCreateManyHackathonInputEnvelope
    set?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    disconnect?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    delete?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    connect?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    update?: RegistrationRunUpdateWithWhereUniqueWithoutHackathonInput | RegistrationRunUpdateWithWhereUniqueWithoutHackathonInput[]
    updateMany?: RegistrationRunUpdateManyWithWhereWithoutHackathonInput | RegistrationRunUpdateManyWithWhereWithoutHackathonInput[]
    deleteMany?: RegistrationRunScalarWhereInput | RegistrationRunScalarWhereInput[]
  }

  export type UserProfileCreateskillsInput = {
    set: string[]
  }

  export type UserProfileCreateinterestsInput = {
    set: string[]
  }

  export type UserProfileCreatetravelRegionsInput = {
    set: string[]
  }

  export type RankedEventCreateNestedManyWithoutUserInput = {
    create?: XOR<RankedEventCreateWithoutUserInput, RankedEventUncheckedCreateWithoutUserInput> | RankedEventCreateWithoutUserInput[] | RankedEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RankedEventCreateOrConnectWithoutUserInput | RankedEventCreateOrConnectWithoutUserInput[]
    createMany?: RankedEventCreateManyUserInputEnvelope
    connect?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
  }

  export type RegistrationRunCreateNestedManyWithoutUserInput = {
    create?: XOR<RegistrationRunCreateWithoutUserInput, RegistrationRunUncheckedCreateWithoutUserInput> | RegistrationRunCreateWithoutUserInput[] | RegistrationRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RegistrationRunCreateOrConnectWithoutUserInput | RegistrationRunCreateOrConnectWithoutUserInput[]
    createMany?: RegistrationRunCreateManyUserInputEnvelope
    connect?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
  }

  export type RankedEventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RankedEventCreateWithoutUserInput, RankedEventUncheckedCreateWithoutUserInput> | RankedEventCreateWithoutUserInput[] | RankedEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RankedEventCreateOrConnectWithoutUserInput | RankedEventCreateOrConnectWithoutUserInput[]
    createMany?: RankedEventCreateManyUserInputEnvelope
    connect?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
  }

  export type RegistrationRunUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RegistrationRunCreateWithoutUserInput, RegistrationRunUncheckedCreateWithoutUserInput> | RegistrationRunCreateWithoutUserInput[] | RegistrationRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RegistrationRunCreateOrConnectWithoutUserInput | RegistrationRunCreateOrConnectWithoutUserInput[]
    createMany?: RegistrationRunCreateManyUserInputEnvelope
    connect?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
  }

  export type UserProfileUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserProfileUpdateinterestsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserProfileUpdatetravelRegionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RankedEventUpdateManyWithoutUserNestedInput = {
    create?: XOR<RankedEventCreateWithoutUserInput, RankedEventUncheckedCreateWithoutUserInput> | RankedEventCreateWithoutUserInput[] | RankedEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RankedEventCreateOrConnectWithoutUserInput | RankedEventCreateOrConnectWithoutUserInput[]
    upsert?: RankedEventUpsertWithWhereUniqueWithoutUserInput | RankedEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RankedEventCreateManyUserInputEnvelope
    set?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    disconnect?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    delete?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    connect?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    update?: RankedEventUpdateWithWhereUniqueWithoutUserInput | RankedEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RankedEventUpdateManyWithWhereWithoutUserInput | RankedEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RankedEventScalarWhereInput | RankedEventScalarWhereInput[]
  }

  export type RegistrationRunUpdateManyWithoutUserNestedInput = {
    create?: XOR<RegistrationRunCreateWithoutUserInput, RegistrationRunUncheckedCreateWithoutUserInput> | RegistrationRunCreateWithoutUserInput[] | RegistrationRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RegistrationRunCreateOrConnectWithoutUserInput | RegistrationRunCreateOrConnectWithoutUserInput[]
    upsert?: RegistrationRunUpsertWithWhereUniqueWithoutUserInput | RegistrationRunUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RegistrationRunCreateManyUserInputEnvelope
    set?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    disconnect?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    delete?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    connect?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    update?: RegistrationRunUpdateWithWhereUniqueWithoutUserInput | RegistrationRunUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RegistrationRunUpdateManyWithWhereWithoutUserInput | RegistrationRunUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RegistrationRunScalarWhereInput | RegistrationRunScalarWhereInput[]
  }

  export type RankedEventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RankedEventCreateWithoutUserInput, RankedEventUncheckedCreateWithoutUserInput> | RankedEventCreateWithoutUserInput[] | RankedEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RankedEventCreateOrConnectWithoutUserInput | RankedEventCreateOrConnectWithoutUserInput[]
    upsert?: RankedEventUpsertWithWhereUniqueWithoutUserInput | RankedEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RankedEventCreateManyUserInputEnvelope
    set?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    disconnect?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    delete?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    connect?: RankedEventWhereUniqueInput | RankedEventWhereUniqueInput[]
    update?: RankedEventUpdateWithWhereUniqueWithoutUserInput | RankedEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RankedEventUpdateManyWithWhereWithoutUserInput | RankedEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RankedEventScalarWhereInput | RankedEventScalarWhereInput[]
  }

  export type RegistrationRunUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RegistrationRunCreateWithoutUserInput, RegistrationRunUncheckedCreateWithoutUserInput> | RegistrationRunCreateWithoutUserInput[] | RegistrationRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RegistrationRunCreateOrConnectWithoutUserInput | RegistrationRunCreateOrConnectWithoutUserInput[]
    upsert?: RegistrationRunUpsertWithWhereUniqueWithoutUserInput | RegistrationRunUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RegistrationRunCreateManyUserInputEnvelope
    set?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    disconnect?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    delete?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    connect?: RegistrationRunWhereUniqueInput | RegistrationRunWhereUniqueInput[]
    update?: RegistrationRunUpdateWithWhereUniqueWithoutUserInput | RegistrationRunUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RegistrationRunUpdateManyWithWhereWithoutUserInput | RegistrationRunUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RegistrationRunScalarWhereInput | RegistrationRunScalarWhereInput[]
  }

  export type RankedEventCreatereasonsInput = {
    set: string[]
  }

  export type RankedEventCreatematchedThemesInput = {
    set: string[]
  }

  export type HackathonCreateNestedOneWithoutRankedEventsInput = {
    create?: XOR<HackathonCreateWithoutRankedEventsInput, HackathonUncheckedCreateWithoutRankedEventsInput>
    connectOrCreate?: HackathonCreateOrConnectWithoutRankedEventsInput
    connect?: HackathonWhereUniqueInput
  }

  export type UserProfileCreateNestedOneWithoutRankedEventsInput = {
    create?: XOR<UserProfileCreateWithoutRankedEventsInput, UserProfileUncheckedCreateWithoutRankedEventsInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutRankedEventsInput
    connect?: UserProfileWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RankedEventUpdatereasonsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RankedEventUpdatematchedThemesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type HackathonUpdateOneRequiredWithoutRankedEventsNestedInput = {
    create?: XOR<HackathonCreateWithoutRankedEventsInput, HackathonUncheckedCreateWithoutRankedEventsInput>
    connectOrCreate?: HackathonCreateOrConnectWithoutRankedEventsInput
    upsert?: HackathonUpsertWithoutRankedEventsInput
    connect?: HackathonWhereUniqueInput
    update?: XOR<XOR<HackathonUpdateToOneWithWhereWithoutRankedEventsInput, HackathonUpdateWithoutRankedEventsInput>, HackathonUncheckedUpdateWithoutRankedEventsInput>
  }

  export type UserProfileUpdateOneRequiredWithoutRankedEventsNestedInput = {
    create?: XOR<UserProfileCreateWithoutRankedEventsInput, UserProfileUncheckedCreateWithoutRankedEventsInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutRankedEventsInput
    upsert?: UserProfileUpsertWithoutRankedEventsInput
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutRankedEventsInput, UserProfileUpdateWithoutRankedEventsInput>, UserProfileUncheckedUpdateWithoutRankedEventsInput>
  }

  export type RegistrationRunCreatescreenshotsInput = {
    set: string[]
  }

  export type HackathonCreateNestedOneWithoutRegistrationRunsInput = {
    create?: XOR<HackathonCreateWithoutRegistrationRunsInput, HackathonUncheckedCreateWithoutRegistrationRunsInput>
    connectOrCreate?: HackathonCreateOrConnectWithoutRegistrationRunsInput
    connect?: HackathonWhereUniqueInput
  }

  export type UserProfileCreateNestedOneWithoutRegistrationRunsInput = {
    create?: XOR<UserProfileCreateWithoutRegistrationRunsInput, UserProfileUncheckedCreateWithoutRegistrationRunsInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutRegistrationRunsInput
    connect?: UserProfileWhereUniqueInput
  }

  export type RegistrationRunUpdatescreenshotsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type HackathonUpdateOneRequiredWithoutRegistrationRunsNestedInput = {
    create?: XOR<HackathonCreateWithoutRegistrationRunsInput, HackathonUncheckedCreateWithoutRegistrationRunsInput>
    connectOrCreate?: HackathonCreateOrConnectWithoutRegistrationRunsInput
    upsert?: HackathonUpsertWithoutRegistrationRunsInput
    connect?: HackathonWhereUniqueInput
    update?: XOR<XOR<HackathonUpdateToOneWithWhereWithoutRegistrationRunsInput, HackathonUpdateWithoutRegistrationRunsInput>, HackathonUncheckedUpdateWithoutRegistrationRunsInput>
  }

  export type UserProfileUpdateOneRequiredWithoutRegistrationRunsNestedInput = {
    create?: XOR<UserProfileCreateWithoutRegistrationRunsInput, UserProfileUncheckedCreateWithoutRegistrationRunsInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutRegistrationRunsInput
    upsert?: UserProfileUpsertWithoutRegistrationRunsInput
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutRegistrationRunsInput, UserProfileUpdateWithoutRegistrationRunsInput>, UserProfileUncheckedUpdateWithoutRegistrationRunsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type RankedEventCreateWithoutHackathonInput = {
    id?: string
    score: number
    reasons?: RankedEventCreatereasonsInput | string[]
    matchedThemes?: RankedEventCreatematchedThemesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserProfileCreateNestedOneWithoutRankedEventsInput
  }

  export type RankedEventUncheckedCreateWithoutHackathonInput = {
    id?: string
    userId: string
    score: number
    reasons?: RankedEventCreatereasonsInput | string[]
    matchedThemes?: RankedEventCreatematchedThemesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RankedEventCreateOrConnectWithoutHackathonInput = {
    where: RankedEventWhereUniqueInput
    create: XOR<RankedEventCreateWithoutHackathonInput, RankedEventUncheckedCreateWithoutHackathonInput>
  }

  export type RankedEventCreateManyHackathonInputEnvelope = {
    data: RankedEventCreateManyHackathonInput | RankedEventCreateManyHackathonInput[]
    skipDuplicates?: boolean
  }

  export type RegistrationRunCreateWithoutHackathonInput = {
    id: string
    runner: string
    status: string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunCreatescreenshotsInput | string[]
    finalScreenshot?: string | null
    errorStage?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserProfileCreateNestedOneWithoutRegistrationRunsInput
  }

  export type RegistrationRunUncheckedCreateWithoutHackathonInput = {
    id: string
    userId: string
    runner: string
    status: string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunCreatescreenshotsInput | string[]
    finalScreenshot?: string | null
    errorStage?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrationRunCreateOrConnectWithoutHackathonInput = {
    where: RegistrationRunWhereUniqueInput
    create: XOR<RegistrationRunCreateWithoutHackathonInput, RegistrationRunUncheckedCreateWithoutHackathonInput>
  }

  export type RegistrationRunCreateManyHackathonInputEnvelope = {
    data: RegistrationRunCreateManyHackathonInput | RegistrationRunCreateManyHackathonInput[]
    skipDuplicates?: boolean
  }

  export type RankedEventUpsertWithWhereUniqueWithoutHackathonInput = {
    where: RankedEventWhereUniqueInput
    update: XOR<RankedEventUpdateWithoutHackathonInput, RankedEventUncheckedUpdateWithoutHackathonInput>
    create: XOR<RankedEventCreateWithoutHackathonInput, RankedEventUncheckedCreateWithoutHackathonInput>
  }

  export type RankedEventUpdateWithWhereUniqueWithoutHackathonInput = {
    where: RankedEventWhereUniqueInput
    data: XOR<RankedEventUpdateWithoutHackathonInput, RankedEventUncheckedUpdateWithoutHackathonInput>
  }

  export type RankedEventUpdateManyWithWhereWithoutHackathonInput = {
    where: RankedEventScalarWhereInput
    data: XOR<RankedEventUpdateManyMutationInput, RankedEventUncheckedUpdateManyWithoutHackathonInput>
  }

  export type RankedEventScalarWhereInput = {
    AND?: RankedEventScalarWhereInput | RankedEventScalarWhereInput[]
    OR?: RankedEventScalarWhereInput[]
    NOT?: RankedEventScalarWhereInput | RankedEventScalarWhereInput[]
    id?: StringFilter<"RankedEvent"> | string
    hackathonId?: StringFilter<"RankedEvent"> | string
    userId?: StringFilter<"RankedEvent"> | string
    score?: FloatFilter<"RankedEvent"> | number
    reasons?: StringNullableListFilter<"RankedEvent">
    matchedThemes?: StringNullableListFilter<"RankedEvent">
    createdAt?: DateTimeFilter<"RankedEvent"> | Date | string
    updatedAt?: DateTimeFilter<"RankedEvent"> | Date | string
  }

  export type RegistrationRunUpsertWithWhereUniqueWithoutHackathonInput = {
    where: RegistrationRunWhereUniqueInput
    update: XOR<RegistrationRunUpdateWithoutHackathonInput, RegistrationRunUncheckedUpdateWithoutHackathonInput>
    create: XOR<RegistrationRunCreateWithoutHackathonInput, RegistrationRunUncheckedCreateWithoutHackathonInput>
  }

  export type RegistrationRunUpdateWithWhereUniqueWithoutHackathonInput = {
    where: RegistrationRunWhereUniqueInput
    data: XOR<RegistrationRunUpdateWithoutHackathonInput, RegistrationRunUncheckedUpdateWithoutHackathonInput>
  }

  export type RegistrationRunUpdateManyWithWhereWithoutHackathonInput = {
    where: RegistrationRunScalarWhereInput
    data: XOR<RegistrationRunUpdateManyMutationInput, RegistrationRunUncheckedUpdateManyWithoutHackathonInput>
  }

  export type RegistrationRunScalarWhereInput = {
    AND?: RegistrationRunScalarWhereInput | RegistrationRunScalarWhereInput[]
    OR?: RegistrationRunScalarWhereInput[]
    NOT?: RegistrationRunScalarWhereInput | RegistrationRunScalarWhereInput[]
    id?: StringFilter<"RegistrationRun"> | string
    userId?: StringFilter<"RegistrationRun"> | string
    hackathonId?: StringFilter<"RegistrationRun"> | string
    runner?: StringFilter<"RegistrationRun"> | string
    status?: StringFilter<"RegistrationRun"> | string
    plannedActions?: JsonFilter<"RegistrationRun">
    resolvedFields?: JsonFilter<"RegistrationRun">
    screenshots?: StringNullableListFilter<"RegistrationRun">
    finalScreenshot?: StringNullableFilter<"RegistrationRun"> | string | null
    errorStage?: StringNullableFilter<"RegistrationRun"> | string | null
    errorMessage?: StringNullableFilter<"RegistrationRun"> | string | null
    createdAt?: DateTimeFilter<"RegistrationRun"> | Date | string
    updatedAt?: DateTimeFilter<"RegistrationRun"> | Date | string
  }

  export type RankedEventCreateWithoutUserInput = {
    id?: string
    score: number
    reasons?: RankedEventCreatereasonsInput | string[]
    matchedThemes?: RankedEventCreatematchedThemesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    hackathon: HackathonCreateNestedOneWithoutRankedEventsInput
  }

  export type RankedEventUncheckedCreateWithoutUserInput = {
    id?: string
    hackathonId: string
    score: number
    reasons?: RankedEventCreatereasonsInput | string[]
    matchedThemes?: RankedEventCreatematchedThemesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RankedEventCreateOrConnectWithoutUserInput = {
    where: RankedEventWhereUniqueInput
    create: XOR<RankedEventCreateWithoutUserInput, RankedEventUncheckedCreateWithoutUserInput>
  }

  export type RankedEventCreateManyUserInputEnvelope = {
    data: RankedEventCreateManyUserInput | RankedEventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RegistrationRunCreateWithoutUserInput = {
    id: string
    runner: string
    status: string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunCreatescreenshotsInput | string[]
    finalScreenshot?: string | null
    errorStage?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    hackathon: HackathonCreateNestedOneWithoutRegistrationRunsInput
  }

  export type RegistrationRunUncheckedCreateWithoutUserInput = {
    id: string
    hackathonId: string
    runner: string
    status: string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunCreatescreenshotsInput | string[]
    finalScreenshot?: string | null
    errorStage?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrationRunCreateOrConnectWithoutUserInput = {
    where: RegistrationRunWhereUniqueInput
    create: XOR<RegistrationRunCreateWithoutUserInput, RegistrationRunUncheckedCreateWithoutUserInput>
  }

  export type RegistrationRunCreateManyUserInputEnvelope = {
    data: RegistrationRunCreateManyUserInput | RegistrationRunCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RankedEventUpsertWithWhereUniqueWithoutUserInput = {
    where: RankedEventWhereUniqueInput
    update: XOR<RankedEventUpdateWithoutUserInput, RankedEventUncheckedUpdateWithoutUserInput>
    create: XOR<RankedEventCreateWithoutUserInput, RankedEventUncheckedCreateWithoutUserInput>
  }

  export type RankedEventUpdateWithWhereUniqueWithoutUserInput = {
    where: RankedEventWhereUniqueInput
    data: XOR<RankedEventUpdateWithoutUserInput, RankedEventUncheckedUpdateWithoutUserInput>
  }

  export type RankedEventUpdateManyWithWhereWithoutUserInput = {
    where: RankedEventScalarWhereInput
    data: XOR<RankedEventUpdateManyMutationInput, RankedEventUncheckedUpdateManyWithoutUserInput>
  }

  export type RegistrationRunUpsertWithWhereUniqueWithoutUserInput = {
    where: RegistrationRunWhereUniqueInput
    update: XOR<RegistrationRunUpdateWithoutUserInput, RegistrationRunUncheckedUpdateWithoutUserInput>
    create: XOR<RegistrationRunCreateWithoutUserInput, RegistrationRunUncheckedCreateWithoutUserInput>
  }

  export type RegistrationRunUpdateWithWhereUniqueWithoutUserInput = {
    where: RegistrationRunWhereUniqueInput
    data: XOR<RegistrationRunUpdateWithoutUserInput, RegistrationRunUncheckedUpdateWithoutUserInput>
  }

  export type RegistrationRunUpdateManyWithWhereWithoutUserInput = {
    where: RegistrationRunScalarWhereInput
    data: XOR<RegistrationRunUpdateManyMutationInput, RegistrationRunUncheckedUpdateManyWithoutUserInput>
  }

  export type HackathonCreateWithoutRankedEventsInput = {
    id: string
    title: string
    description: string
    organizer?: string | null
    url: string
    contentHash: string
    locationMode: string
    locationCity?: string | null
    locationCountry?: string | null
    locationTz?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    registrationOpensAt?: Date | string | null
    registrationClosesAt?: Date | string | null
    prizesTotal?: string | null
    prizesRaw?: string | null
    themes?: HackathonCreatethemesInput | string[]
    eligibility?: string | null
    registrationProvider: string
    registrationFormUrl?: string | null
    requiresTeam?: boolean | null
    requiresAuth?: boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    registrationRuns?: RegistrationRunCreateNestedManyWithoutHackathonInput
  }

  export type HackathonUncheckedCreateWithoutRankedEventsInput = {
    id: string
    title: string
    description: string
    organizer?: string | null
    url: string
    contentHash: string
    locationMode: string
    locationCity?: string | null
    locationCountry?: string | null
    locationTz?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    registrationOpensAt?: Date | string | null
    registrationClosesAt?: Date | string | null
    prizesTotal?: string | null
    prizesRaw?: string | null
    themes?: HackathonCreatethemesInput | string[]
    eligibility?: string | null
    registrationProvider: string
    registrationFormUrl?: string | null
    requiresTeam?: boolean | null
    requiresAuth?: boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    registrationRuns?: RegistrationRunUncheckedCreateNestedManyWithoutHackathonInput
  }

  export type HackathonCreateOrConnectWithoutRankedEventsInput = {
    where: HackathonWhereUniqueInput
    create: XOR<HackathonCreateWithoutRankedEventsInput, HackathonUncheckedCreateWithoutRankedEventsInput>
  }

  export type UserProfileCreateWithoutRankedEventsInput = {
    id: string
    name: string
    email: string
    school?: string | null
    resumeUrl?: string | null
    skills?: UserProfileCreateskillsInput | string[]
    interests?: UserProfileCreateinterestsInput | string[]
    locationCity?: string | null
    locationCountry?: string | null
    willingToTravel?: boolean
    travelRegions?: UserProfileCreatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    registrationRuns?: RegistrationRunCreateNestedManyWithoutUserInput
  }

  export type UserProfileUncheckedCreateWithoutRankedEventsInput = {
    id: string
    name: string
    email: string
    school?: string | null
    resumeUrl?: string | null
    skills?: UserProfileCreateskillsInput | string[]
    interests?: UserProfileCreateinterestsInput | string[]
    locationCity?: string | null
    locationCountry?: string | null
    willingToTravel?: boolean
    travelRegions?: UserProfileCreatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    registrationRuns?: RegistrationRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserProfileCreateOrConnectWithoutRankedEventsInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutRankedEventsInput, UserProfileUncheckedCreateWithoutRankedEventsInput>
  }

  export type HackathonUpsertWithoutRankedEventsInput = {
    update: XOR<HackathonUpdateWithoutRankedEventsInput, HackathonUncheckedUpdateWithoutRankedEventsInput>
    create: XOR<HackathonCreateWithoutRankedEventsInput, HackathonUncheckedCreateWithoutRankedEventsInput>
    where?: HackathonWhereInput
  }

  export type HackathonUpdateToOneWithWhereWithoutRankedEventsInput = {
    where?: HackathonWhereInput
    data: XOR<HackathonUpdateWithoutRankedEventsInput, HackathonUncheckedUpdateWithoutRankedEventsInput>
  }

  export type HackathonUpdateWithoutRankedEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    organizer?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    locationMode?: StringFieldUpdateOperationsInput | string
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    locationTz?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationOpensAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationClosesAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prizesTotal?: NullableStringFieldUpdateOperationsInput | string | null
    prizesRaw?: NullableStringFieldUpdateOperationsInput | string | null
    themes?: HackathonUpdatethemesInput | string[]
    eligibility?: NullableStringFieldUpdateOperationsInput | string | null
    registrationProvider?: StringFieldUpdateOperationsInput | string
    registrationFormUrl?: NullableStringFieldUpdateOperationsInput | string | null
    requiresTeam?: NullableBoolFieldUpdateOperationsInput | boolean | null
    requiresAuth?: NullableBoolFieldUpdateOperationsInput | boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationRuns?: RegistrationRunUpdateManyWithoutHackathonNestedInput
  }

  export type HackathonUncheckedUpdateWithoutRankedEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    organizer?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    locationMode?: StringFieldUpdateOperationsInput | string
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    locationTz?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationOpensAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationClosesAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prizesTotal?: NullableStringFieldUpdateOperationsInput | string | null
    prizesRaw?: NullableStringFieldUpdateOperationsInput | string | null
    themes?: HackathonUpdatethemesInput | string[]
    eligibility?: NullableStringFieldUpdateOperationsInput | string | null
    registrationProvider?: StringFieldUpdateOperationsInput | string
    registrationFormUrl?: NullableStringFieldUpdateOperationsInput | string | null
    requiresTeam?: NullableBoolFieldUpdateOperationsInput | boolean | null
    requiresAuth?: NullableBoolFieldUpdateOperationsInput | boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationRuns?: RegistrationRunUncheckedUpdateManyWithoutHackathonNestedInput
  }

  export type UserProfileUpsertWithoutRankedEventsInput = {
    update: XOR<UserProfileUpdateWithoutRankedEventsInput, UserProfileUncheckedUpdateWithoutRankedEventsInput>
    create: XOR<UserProfileCreateWithoutRankedEventsInput, UserProfileUncheckedCreateWithoutRankedEventsInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutRankedEventsInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutRankedEventsInput, UserProfileUncheckedUpdateWithoutRankedEventsInput>
  }

  export type UserProfileUpdateWithoutRankedEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    school?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserProfileUpdateskillsInput | string[]
    interests?: UserProfileUpdateinterestsInput | string[]
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    willingToTravel?: BoolFieldUpdateOperationsInput | boolean
    travelRegions?: UserProfileUpdatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationRuns?: RegistrationRunUpdateManyWithoutUserNestedInput
  }

  export type UserProfileUncheckedUpdateWithoutRankedEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    school?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserProfileUpdateskillsInput | string[]
    interests?: UserProfileUpdateinterestsInput | string[]
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    willingToTravel?: BoolFieldUpdateOperationsInput | boolean
    travelRegions?: UserProfileUpdatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationRuns?: RegistrationRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type HackathonCreateWithoutRegistrationRunsInput = {
    id: string
    title: string
    description: string
    organizer?: string | null
    url: string
    contentHash: string
    locationMode: string
    locationCity?: string | null
    locationCountry?: string | null
    locationTz?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    registrationOpensAt?: Date | string | null
    registrationClosesAt?: Date | string | null
    prizesTotal?: string | null
    prizesRaw?: string | null
    themes?: HackathonCreatethemesInput | string[]
    eligibility?: string | null
    registrationProvider: string
    registrationFormUrl?: string | null
    requiresTeam?: boolean | null
    requiresAuth?: boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    rankedEvents?: RankedEventCreateNestedManyWithoutHackathonInput
  }

  export type HackathonUncheckedCreateWithoutRegistrationRunsInput = {
    id: string
    title: string
    description: string
    organizer?: string | null
    url: string
    contentHash: string
    locationMode: string
    locationCity?: string | null
    locationCountry?: string | null
    locationTz?: string | null
    startsAt?: Date | string | null
    endsAt?: Date | string | null
    registrationOpensAt?: Date | string | null
    registrationClosesAt?: Date | string | null
    prizesTotal?: string | null
    prizesRaw?: string | null
    themes?: HackathonCreatethemesInput | string[]
    eligibility?: string | null
    registrationProvider: string
    registrationFormUrl?: string | null
    requiresTeam?: boolean | null
    requiresAuth?: boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    rankedEvents?: RankedEventUncheckedCreateNestedManyWithoutHackathonInput
  }

  export type HackathonCreateOrConnectWithoutRegistrationRunsInput = {
    where: HackathonWhereUniqueInput
    create: XOR<HackathonCreateWithoutRegistrationRunsInput, HackathonUncheckedCreateWithoutRegistrationRunsInput>
  }

  export type UserProfileCreateWithoutRegistrationRunsInput = {
    id: string
    name: string
    email: string
    school?: string | null
    resumeUrl?: string | null
    skills?: UserProfileCreateskillsInput | string[]
    interests?: UserProfileCreateinterestsInput | string[]
    locationCity?: string | null
    locationCountry?: string | null
    willingToTravel?: boolean
    travelRegions?: UserProfileCreatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    rankedEvents?: RankedEventCreateNestedManyWithoutUserInput
  }

  export type UserProfileUncheckedCreateWithoutRegistrationRunsInput = {
    id: string
    name: string
    email: string
    school?: string | null
    resumeUrl?: string | null
    skills?: UserProfileCreateskillsInput | string[]
    interests?: UserProfileCreateinterestsInput | string[]
    locationCity?: string | null
    locationCountry?: string | null
    willingToTravel?: boolean
    travelRegions?: UserProfileCreatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    rankedEvents?: RankedEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserProfileCreateOrConnectWithoutRegistrationRunsInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutRegistrationRunsInput, UserProfileUncheckedCreateWithoutRegistrationRunsInput>
  }

  export type HackathonUpsertWithoutRegistrationRunsInput = {
    update: XOR<HackathonUpdateWithoutRegistrationRunsInput, HackathonUncheckedUpdateWithoutRegistrationRunsInput>
    create: XOR<HackathonCreateWithoutRegistrationRunsInput, HackathonUncheckedCreateWithoutRegistrationRunsInput>
    where?: HackathonWhereInput
  }

  export type HackathonUpdateToOneWithWhereWithoutRegistrationRunsInput = {
    where?: HackathonWhereInput
    data: XOR<HackathonUpdateWithoutRegistrationRunsInput, HackathonUncheckedUpdateWithoutRegistrationRunsInput>
  }

  export type HackathonUpdateWithoutRegistrationRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    organizer?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    locationMode?: StringFieldUpdateOperationsInput | string
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    locationTz?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationOpensAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationClosesAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prizesTotal?: NullableStringFieldUpdateOperationsInput | string | null
    prizesRaw?: NullableStringFieldUpdateOperationsInput | string | null
    themes?: HackathonUpdatethemesInput | string[]
    eligibility?: NullableStringFieldUpdateOperationsInput | string | null
    registrationProvider?: StringFieldUpdateOperationsInput | string
    registrationFormUrl?: NullableStringFieldUpdateOperationsInput | string | null
    requiresTeam?: NullableBoolFieldUpdateOperationsInput | boolean | null
    requiresAuth?: NullableBoolFieldUpdateOperationsInput | boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rankedEvents?: RankedEventUpdateManyWithoutHackathonNestedInput
  }

  export type HackathonUncheckedUpdateWithoutRegistrationRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    organizer?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    locationMode?: StringFieldUpdateOperationsInput | string
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    locationTz?: NullableStringFieldUpdateOperationsInput | string | null
    startsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationOpensAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationClosesAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    prizesTotal?: NullableStringFieldUpdateOperationsInput | string | null
    prizesRaw?: NullableStringFieldUpdateOperationsInput | string | null
    themes?: HackathonUpdatethemesInput | string[]
    eligibility?: NullableStringFieldUpdateOperationsInput | string | null
    registrationProvider?: StringFieldUpdateOperationsInput | string
    registrationFormUrl?: NullableStringFieldUpdateOperationsInput | string | null
    requiresTeam?: NullableBoolFieldUpdateOperationsInput | boolean | null
    requiresAuth?: NullableBoolFieldUpdateOperationsInput | boolean | null
    knownFields?: JsonNullValueInput | InputJsonValue
    sources?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rankedEvents?: RankedEventUncheckedUpdateManyWithoutHackathonNestedInput
  }

  export type UserProfileUpsertWithoutRegistrationRunsInput = {
    update: XOR<UserProfileUpdateWithoutRegistrationRunsInput, UserProfileUncheckedUpdateWithoutRegistrationRunsInput>
    create: XOR<UserProfileCreateWithoutRegistrationRunsInput, UserProfileUncheckedCreateWithoutRegistrationRunsInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutRegistrationRunsInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutRegistrationRunsInput, UserProfileUncheckedUpdateWithoutRegistrationRunsInput>
  }

  export type UserProfileUpdateWithoutRegistrationRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    school?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserProfileUpdateskillsInput | string[]
    interests?: UserProfileUpdateinterestsInput | string[]
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    willingToTravel?: BoolFieldUpdateOperationsInput | boolean
    travelRegions?: UserProfileUpdatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rankedEvents?: RankedEventUpdateManyWithoutUserNestedInput
  }

  export type UserProfileUncheckedUpdateWithoutRegistrationRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    school?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserProfileUpdateskillsInput | string[]
    interests?: UserProfileUpdateinterestsInput | string[]
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationCountry?: NullableStringFieldUpdateOperationsInput | string | null
    willingToTravel?: BoolFieldUpdateOperationsInput | boolean
    travelRegions?: UserProfileUpdatetravelRegionsInput | string[]
    formAnswers?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rankedEvents?: RankedEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RankedEventCreateManyHackathonInput = {
    id?: string
    userId: string
    score: number
    reasons?: RankedEventCreatereasonsInput | string[]
    matchedThemes?: RankedEventCreatematchedThemesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrationRunCreateManyHackathonInput = {
    id: string
    userId: string
    runner: string
    status: string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunCreatescreenshotsInput | string[]
    finalScreenshot?: string | null
    errorStage?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RankedEventUpdateWithoutHackathonInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    reasons?: RankedEventUpdatereasonsInput | string[]
    matchedThemes?: RankedEventUpdatematchedThemesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserProfileUpdateOneRequiredWithoutRankedEventsNestedInput
  }

  export type RankedEventUncheckedUpdateWithoutHackathonInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    reasons?: RankedEventUpdatereasonsInput | string[]
    matchedThemes?: RankedEventUpdatematchedThemesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RankedEventUncheckedUpdateManyWithoutHackathonInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    reasons?: RankedEventUpdatereasonsInput | string[]
    matchedThemes?: RankedEventUpdatematchedThemesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationRunUpdateWithoutHackathonInput = {
    id?: StringFieldUpdateOperationsInput | string
    runner?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunUpdatescreenshotsInput | string[]
    finalScreenshot?: NullableStringFieldUpdateOperationsInput | string | null
    errorStage?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserProfileUpdateOneRequiredWithoutRegistrationRunsNestedInput
  }

  export type RegistrationRunUncheckedUpdateWithoutHackathonInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    runner?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunUpdatescreenshotsInput | string[]
    finalScreenshot?: NullableStringFieldUpdateOperationsInput | string | null
    errorStage?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationRunUncheckedUpdateManyWithoutHackathonInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    runner?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunUpdatescreenshotsInput | string[]
    finalScreenshot?: NullableStringFieldUpdateOperationsInput | string | null
    errorStage?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RankedEventCreateManyUserInput = {
    id?: string
    hackathonId: string
    score: number
    reasons?: RankedEventCreatereasonsInput | string[]
    matchedThemes?: RankedEventCreatematchedThemesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrationRunCreateManyUserInput = {
    id: string
    hackathonId: string
    runner: string
    status: string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunCreatescreenshotsInput | string[]
    finalScreenshot?: string | null
    errorStage?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RankedEventUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    reasons?: RankedEventUpdatereasonsInput | string[]
    matchedThemes?: RankedEventUpdatematchedThemesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hackathon?: HackathonUpdateOneRequiredWithoutRankedEventsNestedInput
  }

  export type RankedEventUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hackathonId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    reasons?: RankedEventUpdatereasonsInput | string[]
    matchedThemes?: RankedEventUpdatematchedThemesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RankedEventUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hackathonId?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    reasons?: RankedEventUpdatereasonsInput | string[]
    matchedThemes?: RankedEventUpdatematchedThemesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationRunUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    runner?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunUpdatescreenshotsInput | string[]
    finalScreenshot?: NullableStringFieldUpdateOperationsInput | string | null
    errorStage?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hackathon?: HackathonUpdateOneRequiredWithoutRegistrationRunsNestedInput
  }

  export type RegistrationRunUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hackathonId?: StringFieldUpdateOperationsInput | string
    runner?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunUpdatescreenshotsInput | string[]
    finalScreenshot?: NullableStringFieldUpdateOperationsInput | string | null
    errorStage?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationRunUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    hackathonId?: StringFieldUpdateOperationsInput | string
    runner?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plannedActions?: JsonNullValueInput | InputJsonValue
    resolvedFields?: JsonNullValueInput | InputJsonValue
    screenshots?: RegistrationRunUpdatescreenshotsInput | string[]
    finalScreenshot?: NullableStringFieldUpdateOperationsInput | string | null
    errorStage?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
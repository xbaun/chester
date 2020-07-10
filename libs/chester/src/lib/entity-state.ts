export type EntityIdProp = string;
export type EntityIdType = string | number;

/**
 * Entity type discriminant for {@link Entity} and {@link EntityState}
 * @internal
 */
export type MetaEntity<
  TIdProp extends EntityIdProp,
  TIdType extends EntityIdType
> = {
  /** @internal */
  __ID_PROP__?: TIdProp;
  /** @internal */
  __ID_TYPE__?: TIdType;
};

export type Entity<
  TIdProp extends EntityIdProp,
  TIdType extends EntityIdType
> = MetaEntity<TIdProp, TIdType> & {
  [K in TIdProp]: TIdType;
};


export type EntityState<
  TEntity extends Entity<TIdProp, TIdType>,
  TIdProp extends EntityIdProp = GetMetaEntityVal<TEntity, '__ID_PROP__'>,
  TIdType extends EntityIdType = GetMetaEntityVal<TEntity, '__ID_TYPE__'>
  > = MetaEntity<TIdProp, TIdType> & {
  entities: { [id in TIdType]: TEntity },
  ids: TIdType[]
};



export type MetaEntityStateKey = '__ID_PROP__' | '__ID_TYPE__';

export type GetMetaEntityVal<
  T extends MetaEntity<any, any>,
  K extends MetaEntityStateKey
  > = NonNullable<T[K]>;

export type EntityStoreStatePropsOf<T extends EntityState<any, any>>
  = Exclude<keyof T, MetaEntityStateKey>;




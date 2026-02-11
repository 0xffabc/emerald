## Using weapons

> [!WARN]
> Having received the default avatar role ID, you can now spawn weapons and perform various actions in the game.
> This is mandatory, since the client will have no way to decide for whom the fake packet was to.

The weapon set packet is defined as follows:

```
| MagicHeader(Type=SERVER,Id=USE_WEAPON) | PIDu32 | String('ID') | WEAPON_TYPEu32 | String('currentItem') | 68raw | DATA_TYPEu32-raw | String('type') | WEAPON_IDu32 | String('variantId') | 0u32 | String('updateItemState') | 4u32, 254u32 | RANDOMu32 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
```

Where USE_WEAPON is 30, WEAPON_TYPE is 1 is the weapon doesn't modify the player's appearance and 2 otherwise, DATA_TYPE is a constant (3), and RANDOMu32 is likely a random number.

For more information, see the `ServerPackets`, `WeaponImplServerSerializer` and `Weapon` classes.

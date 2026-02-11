# Initialization

The server sends a bunch of large messages to the client, that include the map data

The last initialization messages contain avatar username and default avatar role ID (later, PID)

Typically, the default avatar role ID packet looks like this:

```
ó>
õs8{"activeSpawnRole":265667,"spawnRoleAvatarIds":[265667]}
DiDb
âsö{"IsAdmin":false,"UserName":"grievedstranger","Gold":30,"IsTourist":false,"IsUnderAge":false,"SubscriptionData":{"SubscriptionType":0,"ExpiredSubscriptionType":0,"SubscriptionActivateTime":"0001-01-01T00:00:00","SubscriptionDuration":"00:00:00"}}i'ö¨·\i¬isen_US¾bÔoGbás*{"highScoreGamePoints":0,"gamePassTier":0}õs8{"activeSpawnRole":265667,"spawnRoleAvatarIds":[265667]}DiEi Fi2ñU¡x]DiDboiDboiDboiDbo$iÁi
ÄÑsD{"spawnRolesDefaultTypeWoIDMap":{"DefaultPlayModeSpawnRole":265667}}
```

You're to manually parse every JSON object in the packet, and extract the default avatar role ID.

This PID will later help you to spawn weapons and perform basically every action in the game.

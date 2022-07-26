# USER ENDPOINTS

- /api/users/@meh                                           GET user
- /api/users/@meh/myVehicles                                GET user vehicles   
- /api/users/@meh/enjoyedVehicle                            GET user enjoyed vehicle      

- /api/users/@meh                                           DELETE user

- /api/users/@meh/nickName                                  PATCH nickname update
- /api/users/@meh/email                                     PATCH email update 
- /api/users/@meh/password                                  PATCH user psw update
- /api/users/@meh/enjoyedVehicle?action=<action>            PATCH user enjoyed Vehicle


# AUTH ENDPOINTS

- /api/auth/signout                                                     GET user data 
- /api/auth/myVehicle/signout                                           GET vehicle data

- /api/auth/signin                                                      POST user data 
- /api/auth/myVehicle/signin                                            POST vehicle data
- /api/auth/signup                                                      POST user data creation


# MY VEHICLE ENDPOINTS

- /api/myVehicle/@it                                         GET vehicle
- /api/myVehicle/@it/owner                                   GET vehicle owner
- /api/myVehicle/@it/enjoyers                                GET vehicle enjoyers

- /api/myVehicle/@it/password                                PATCH vehicle psw update
- /api/myVehicle/@it/saucer/routines                         PATCH retrieve routines vehicle user
- /api/myVehicle/vehicleId                                   PATCH retrieve a vehicle 
- /api/myVehicle/vehicleId/owner                             PATCH retrieve vehicle owner
- /api/myVehicle/vehicleId/enjoyers                          PATCH retrieve vehicle enjoyers    

- /api/myVehicle/vehicleId                                   DELETE vehicle

- /api/myVehicle/create                                      POST vehicle creation

- /api/myVehicle/vehicleId/enjoyers?action=<action>          PUT vehicle enjoyers update
- /api/myVehicle/vehicleId/owner                             PUT vehicle owner update


# ROUTINE ENDPOINTS

- /api/users/@meh/routines                 GET user routines
- /api/users/@meh/routines/name            GET user routine

- /api/users/@meh/routines/name            PUT user routine update   

- /api/users/@meh/routines/name            DELETE user routine  


# SETTING ENDPOINTS

- /api/users/@meh/setting                           GET user setting
- /api/users/@meh/setting/language                  GET user language 
- /api/users/@meh/setting/size                      GET user text size 
- /api/users/@meh/setting/theme                     GET user theme 
- /api/users/@meh/setting/gamification              GET user gamification  

- /api/users/@meh/setting/language                  PATCH user language update
- /api/users/@meh/setting/size                      PATCH user text size update
- /api/users/@meh/setting/theme                     PATCH user theme update
- /api/users/@meh/setting/gamification              PATCH user gamification update  


# NOTIFICATION ENDPOINTS
poi adda hai fatto una get una post e una delete


# STATS ENDPOINTS

- /api/users/@meh/stats                     GET user stats

- /api/users/@meh/stats                     PUT user stats update





# DOCUMENT ENDPOINTS do when it's needed

- /api/users/@meh/documents                GET user documents [get preview documents]
- /api/users/@meh/documents/:docId         GET user document [get whole document]

- /api/users/@meh/documents/:docId         DELETE user document


# LEGAL INFOS ENDPOINTS do when it's needed

- /api/myVeichle/vehicleId/legalInfos       PATCH retrieve vehicle legal infos

- /api/myVeichle/vehicleId/legalInfos       PUT vehicle legal infos update

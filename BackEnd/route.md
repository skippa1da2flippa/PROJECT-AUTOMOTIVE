# USER ENDPOINTS

- /api/users/@meh                                           GET user
- /api/users/@meh/myVehicles                                GET user vehicles   
- /api/users/@meh/enjoyedVehicle                            GET user enjoyed vehicle      

- /api/users/@meh                                           DELETE user

- /api/users/@meh/nickName                                  PATCH user name update
- /api/users/@meh/email                                     PATCH email update 
- /api/users/@meh/password                                  PATCH user psw update
- /api/users/@meh/enjoyedVehicle?action=<action>            PATCH user enjoyed Vehicle


# AUTH ENDPOINTS

- /api/auth/signout                                           GET user data 

- /api/auth/signin                                            POST user data 
- /api/auth/signup                                            POST user data creation


# MY VEHICLE ENDPOINTS

- /api/myVehicle/vehicleId                   PATCH retrieve a vehicle 
- /api/myVehicle/vehicleId/owner             PATCH retrieve vehicle owner
- /api/myVehicle/vehicleId/enjoyers          PATCH retrieve vehicle enjoyers    

- /api/myVehicle/vehicleId                   DELETE vehicle

- /api/myVehicle/vehicleId                   POST vehicle creation

- /api/myVehicle/vehicleId/enjoyers          PUT vehicle enjoyers update
- /api/myVehicle/vehicleId/owner             PUT vehicle owner update


# ROUTINE ENDPOINTS

- /api/users/@meh/routines                 GET user routines
- /api/users/@meh/routines/:routineId      GET user routine

- /api/users/@meh/routines/:routineId      PUT user routine update   

- /api/users/@meh/routines/:routineId      DELETE user routine  


# LEGAL INFOS ENDPOINTS

- /api/myVeichle/vehicleId/legalInfos       PATCH retrieve vehicle legal infos   

- /api/myVeichle/vehicleId/legalInfos       PUT vehicle legal infos update


# DOCUMENT ENDPOINTS

- /api/users/@meh/documents                GET user documents [get preview documents]
- /api/users/@meh/documents/:docId         GET user document [get whole document]

- /api/users/@meh/documents/:docId         DELETE user document

# SETTING ENDPOINTS

- /api/users/@meh/setting/language                  GET user language 
- /api/users/@meh/setting/size                      GET user text size 
- /api/users/@meh/setting/theme                     GET user theme 
- /api/users/@meh/setting/gamification              GET user gamification  

- /api/users/@meh/setting/language                  PATCH user language update
- /api/users/@meh/setting/size                      PATCH user text size update
- /api/users/@meh/setting/theme                     PATCH user theme update
- /api/users/@meh/setting/gamification              PATCH user gamification update  

# STATS ENDPOINTS 

- /api/users/@meh/stats                     GET user stats

- /api/users/@meh/stats                     PUT user stats update

# NOTIFICATION ENDPOINTS
DA VEDERE SE SERVE

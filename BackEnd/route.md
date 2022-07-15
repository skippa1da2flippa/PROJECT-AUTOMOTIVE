# USER ENDPOINTS

- /api/users/:userId                           GET user
- /api/users/:userId/myVehicles                GET user vehicles         

- /api/users/:userId                           DELETE user

- /api/users/:userId/nickName                  PATCH user name update
- /api/users/:userId/password                  PATCH user psw update


# AUTH ENDPOINTS

- /api/auth/signin                                            POST user data 
O
- /api/auth/signin?name=<name>&surname=<surname>&psw=<psw>    GET user data 

- /api/auth/signup                                            POST user data creation

- /api/auth/signout                                           POST user data 
O
- /api/auth/signout                                           GET user data 


# MY VEHICLE ENDPOINTS

- /api/myVehicle/:vehicleId                   GET vehicle
- /api/myVehicle/:vehicleId/owner             GET vehicle owner
- /api/myVehicle/:vehicleId/enjoyers          GET vehicle enjoyers    

- /api/myVehicle/:vehicleId                   DELETE vehicle

- /api/myVehicle/:vehicleId                   POST vehicle creation

- /api/myVehicle/:vehicleId/enjoyers          PATCH vehicle enjoyers update
- /api/myVehicle/:vehicleId/owner             PATCH vehicle owner update


# ROUTINE ENDPOINTS

- /api/users/:userId/routines                 GET user routines
- /api/users/:userId/routines/:routineId      GET user routine

- /api/users/:userId/routines/:routineId      PUT user routine update   

- /api/users/:userId/routines/:routineId      DELETE user routine  


# LEGAL INFOS ENDPOINTS

- /api/myVeichle/:vehicleId/legalInfos       GET vehicle legal infos   

- /api/myVeichle/:vehicleId/legalInfos       PUT vehicle legal infos update


# DOCUMENT ENDPOINTS

- /api/users/:userId/documents                GET user documents 
- /api/users/:userId/documents/:docId         GET user document 

- /api/users/:userId/documents/:docId         DELETE user document

# SETTING ENDPOINTS

- /api/users/:userId/setting/language                  GET user language 
- /api/users/:userId/setting/size                      GET user text size 
- /api/users/:userId/setting/theme                     GET user theme 
- /api/users/:userId/setting/gamification              GET user gamification  

- /api/users/:userId/setting/language                  PATCH user language update
- /api/users/:userId/setting/size                      PATCH user text size update
- /api/users/:userId/setting/theme                     PATCH user theme update
- /api/users/:userId/setting/gamification              PATCH user gamification update  

# STATS ENDPOINTS 

- /api/users/:userId/stats                     GET user stats

- /api/users/:userId/stats                     PUT user stats update

# NOTIFICATION ENDPOINTS
DA VEDERE SE SERVE

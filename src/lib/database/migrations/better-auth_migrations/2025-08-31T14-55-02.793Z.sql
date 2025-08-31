create table "user_roles" (
    "id" text not null primary key, 
    "userId" text not null unique references "user" ("id") on delete cascade, 
    "role" text not null, 
    "createdAt" timestamp not null, 
    "updatedAt" timestamp not null
);
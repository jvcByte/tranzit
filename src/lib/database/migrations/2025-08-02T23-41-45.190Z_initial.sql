create table "user" (
    "id" text not null primary key, 
    "name" text not null, 
    "email" text not null unique, 
    "emailVerified" boolean not null, 
    "image" text, 
    "createdAt" timestamp not null, 
    "updatedAt" timestamp not null
    );

create table "session" (
    "id" text not null primary key, 
    "expiresAt" timestamp not null, 
    "token" text not null unique, 
    "createdAt" timestamp not null, 
    "updatedAt" timestamp not null, 
    "ipAddress" text, 
    "userAgent" text, 
    "userId" text not null references "user" ("id")
    );

create table "account" (
    "id" text not null primary key, 
    "accountId" text not null, 
    "providerId" text not null, 
    "userId" text not null references "user" ("id"), 
    "accessToken" text, 
    "refreshToken" text, 
    "idToken" text, 
    "accessTokenExpiresAt" timestamp, 
    "refreshTokenExpiresAt" timestamp, 
    "scope" text, 
    "password" text, 
    "createdAt" timestamp not null, 
    "updatedAt" timestamp not null
    );

create table "verification" (
    "id" text not null primary key, 
    "identifier" text not null, 
    "value" text not null, 
    "expiresAt" timestamp not null, 
    "createdAt" timestamp, 
    "updatedAt" timestamp
    );

create table "waitlist" (
    "id" text not null primary key, 
    "name" text not null, 
    "email" text not null unique, 
    "userType" text default 'driver',
    "status" text not null default 'pending',
    "createdAt" timestamp not null, 
    "updatedAt" timestamp not null
    );

create table "partners" (
    "id" text not null primary key,
    "userId" text not null unique references "user" ("id") on delete cascade,
    "referralCode" text not null unique,
    "totalEarnings" real not null default 0,
    "type" text not null default 'partner',
    "status" text not null default 'active',
    "createdAt" timestamp not null default current_timestamp,
    "updatedAt" timestamp not null default current_timestamp
);

create table "referrals" (
    "id" text not null primary key,
    "partnerId" text not null references "partners" ("id") on delete cascade,
    "referredUserId" text references "user" ("id") on delete cascade,
    "referralCode" text not null,
    "commission" real,
    "status" text,
    "createdAt" timestamp not null default current_timestamp,
    "updatedAt" timestamp not null default current_timestamp
);
create table if not exists users (
    id serial primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(100) unique not null,
    phone varchar(15),
    password_hash varchar(255) not null,
    account_type varchar(20),
    created_at timestamp default current_timestamp
);
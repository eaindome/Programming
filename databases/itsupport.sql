-- create database
create database itsupport;

-- create users table
create table users(
    user_id serial primary key,
    username varchar(30) unique not null,
    user_role varchar(20) check (role in ('Admin', 'Worker', 'Intern'))
);

-- create staff table
create table staff_pcs(
    staff_record_id serial primary key,
    staff_num int not null,
    district varchar(50) ,
    pc_brand varchar(30) not null,
    pc_serial_num varchar(50) not null,
    complaint text not null,
    date_in date not null, 
    sign_in VARCHAR(255),
    date_out date not null,
    sign_out VARCHAR(255),
    user_id references users(user_id)
);

-- create password reset table
create table password_reset(
    reset_id serial primary key,
    staff_name varchar(30) not null,
    staff_username varchar(30) not null,
    district varchar(50),
    data_reset date not null,
    remarks text,
    reset_by int references users(user_id)
);

-- create vendor book table
create table vendor_book(
    vendor_book_id serial primary key,
    company_name varchar(255) not null,
    phone_number varchar(20) not null,
    district varchar(50),
    pc_brand varchar(30) not null,
    pc_serial_num varchar(50) not null,
    complaint text not null,
    date_in date not null, 
    sign_in VARCHAR(255),
    date_out date not null,
    sign_out varchar(255),
    user_id int references users(user_id)
);

-- create forticlient vpn table
create table forticlient_vpn(
    vpn_id serial primary key,
    company_name varchar(255) not null,
    owners_name varchar(30) not null,
    initial_phone varchar(255) not null,
    current_phone varchar(255) not null,
    email varchar(255) not null,
    new_phone varchar(5) check (new_phone in ('yes', 'no')) not null,
    date_requested date not null,
    sign varchar(255),
    user_id int references users(user_id)
);
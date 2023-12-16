create database itsupport
create table users(
user_id int primary key not null,
username varchar(30) unique not null,
user_role varchar(20) not null
);

create table staff_pcs(
    staff_record_id int primary key not null,
    staff_num int not null,
    district varchar(30) ,
    device_brand varchar(30) not null,
    serial_num varchar(30) not null,
    complaint varchar(30) not null,
    user_id foreign key references users(user_id) not null
    )

create table password_reset(
    reset_id int primary key not null,
    staff_name varchar(30) not null,
    staff_username varchar(30) not null,
    district varchar(30),
    data_reset date not null,
    reset_by varchar(30) not null,
    remarks varchar(30) not null
    reset_by foreign key references users(user_id)
)

create table vendor_book(
    vendor_bookid int primary key not null,
    company_name varchar(30) not null,
    phone_number int not null,
    district varchar(30),
    pc_brand varchar(30) not null,
    serial_num varchar(30) not null,
    complaint varchar(30) not null,
    date_in date not null, 
    sign_in VARCHAR(30) not null,
    date_out date not null,
    sihn_out VARCHAR(30) not null,
    user_id varchar(30) foreign key references users(user_id) not null
    )

create table forticlient_vpn(
    vpn_id int primary key not null,
    company_name varchar(30) not null,
    owners_name varchar(30) not null,
    authorized_agent varchar(30) not null,
    initial_phone int not null,
    current_phone int not null,
    email varchar(30) not null,
    new_phone boolean not null,
    date_requested date not null,
    )
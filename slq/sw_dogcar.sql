use sweet;
create table sw_dogcar(iid int auto_increment primary key,
                        id int，
			foreign key(id) references sw_viplist(id),
                        eid int,
			count int,
			is_checked bool
			);
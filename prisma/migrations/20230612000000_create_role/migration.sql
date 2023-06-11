INSERT INTO "role" ("name", "description")
VALUES ('ADMIN', 'Admin role'), ('USER', 'User role');

INSERT INTO "permission" ("name", "description") 
VALUES
('document.read','Read document'),
('document.update','Update document'),
('document.create','Create document'),
('document.delete','Delete document');

INSERT INTO role_permission (role_id, permission_id)
(select r.id as role_id, p.id as permission_id from "role" r 
join (select id from "permission" p) p on true
where r."name" = 'ADMIN');
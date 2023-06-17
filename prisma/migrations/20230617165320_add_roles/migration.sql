INSERT INTO "resource" 
	("id", "name","description")
VALUES 
	(1,'user','User services'),
	(2,'document','Document services'),
	(3,'certificate','Certificate services'),
	(4,'signature_template','Signature services'),
	(5,'email','Email services');

INSERT INTO "role" 
	("id", "name", "description")
VALUES 
 	(1,'Admin','All access to resource, and all user in the systems'),
 	(2,'Manager', 'A mid-level role, can create, modify, delete and view users or resources within their assigned domain'),
 	(3,'Accountant', 'Access to document and signature_template, email services'),
 	(4,'Viewer', 'A read-only role, can only view users or resources within their assigned domain'),
	(5,'Guest','Temporary roles');


INSERT INTO "role_resource_permission" 
	("role_id", "resource_id", "permission_id")
VALUES
    (1,1,574),
    (1,2,574),
    (1,3,574),
    (1,4,574),
    (1,5,574),

    (2,1,570),
    (2,2,570),
    (2,3,570),
    (2,4,570),
    (2,5,570),

    (3,1,574),
    (3,2,574),
    (3,3,574),
    (3,4,574),
    (3,5,574),

    (4,1,570),
    (4,2,570),
    (4,3,570),
    (4,4,570),
    (4,5,570),

    (5,1,570),
    (5,2,570),
    (5,3,570),
    (5,4,570),
    (5,5,570);

INSERT INTO "resource" 
	("id", "name","description")
VALUES 
	(1,'user','User services'),
	(2,'document','Document services'),
	(3,'certificate','Certificate services'),
	(4,'signature_template','Signature services'),
	(5,'email','Email services');
    (6,'certificant','Certificant Management services');

INSERT INTO "role" 
	("id", "name", "description")
VALUES 
 	(1,'Admin','All access to resource, and all user in the systems'),
 	(2,'User', 'A mid-level role, can create, modify, delete and view users or resources within their assigned domain'),
 	(3,'Accountant', 'Access to document and signature_template, email services'),
 	(4,'Viewer', 'A read-only role, can only view users or resources within their assigned domain'),
	(5,'Certificant','Person who possesses a certificatee');


INSERT INTO "role_resource_permission" 
	("role_id", "resource_id", "permission_id")
VALUES
    (1,1,1016),
    (1,2,1016),
    (1,3,1016),
    (1,4,1016),
    (1,5,1016),
    (1,6,1016)

    (2,1,0),
    (2,2,1016),
    (2,3,1016),
    (2,4,1016),
    (2,5,1016),

    (3,1,0),
    (3,2,1016),
    (3,3,1016),
    (3,4,1016),
    (3,5,1016),

    (4,1,0),
    (4,2,1016),
    (4,3,1016),
    (4,4,1016),
    (4,5,1016),

    (5,1,0),
    (5,2,0),
    (5,3,1016),
    (5,4,1016),
    (5,5,1016),
    (5,6,1016);

SELECT * FROM db_smp.seller_post;

INSERT INTO `db_smp`.`seller_post`
(`seller_id`,
`description`,
`qty`,
`unit_price`,
`created_At`,
`updated_At`)
VALUES
(
    (SELECT id FROM db_smp.tbl_seller),
    "This is 4",
    3,
    500000.00,
    now(),
    now()
);
SELECT id FROM seller_post WHERE seller_id = 57;

DELETE FROM seller_post WHERE (SELECT id WHERE seller_id = 34);

SELECT * FROM seller_post WHERE seller_id = 55;

SELECT * FROM seller_post WHERE seller_id = 55;
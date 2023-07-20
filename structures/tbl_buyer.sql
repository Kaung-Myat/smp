
INSERT INTO `db_smp`.`tbl_buyer`
(`buyer_name`,
`buyer_email`,
`buyer_password`,
`buyer_phoneNumber`,
`buyer_address`,
`buyer_profile`,
`created_At`,
`updated_At`)
VALUES
();


UPDATE `db_smp`.`tbl_buyer`
SET
`id` = <{id: }>,
`buyer_name` = <{buyer_name: }>,
`buyer_email` = <{buyer_email: }>,
`buyer_password` = <{buyer_password: }>,
`buyer_phoneNumber` = <{buyer_phoneNumber: }>,
`buyer_address` = <{buyer_address: }>,
`buyer_profile` = <{buyer_profile: }>,
`created_At` = <{created_At: }>,
`updated_At` = <{updated_At: }>
WHERE `id` = <{expr}>;


DELETE FROM `db_smp`.`tbl_buyer`
WHERE <{where_expression}>;

SELECT `tbl_buyer`.`id`,
    `tbl_buyer`.`buyer_name`,
    `tbl_buyer`.`buyer_email`,
    `tbl_buyer`.`buyer_password`,
    `tbl_buyer`.`buyer_phoneNumber`,
    `tbl_buyer`.`buyer_address`,
    `tbl_buyer`.`buyer_profile`,
    `tbl_buyer`.`created_At`,
    `tbl_buyer`.`updated_At`
FROM `db_smp`.`tbl_buyer`;


SELECT id FROM tbl_buyer;

SELECT id FROM tbl_buyer WHERE id = (SELECT MAX(id) FROM tbl_buyer);

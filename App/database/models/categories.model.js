const categories = (data) => {
    let define = {
        id: {
            type: "INTEGER",
            primaryKey: true,
        },
        created_at: {
            type: "INTEGER",
        },
        modified_at: {
            type: "INTEGER",
        },
        name: {
            type: "TEXT",
        },


    }
}

let x = `CREATE TABLE orders (
    id bigint AUTO_INCREMENT,
    created_at bigint NOT NULL,
    modified_at bigint NOT NULL,
    total_amount bigint NOT NULL,
    items text NOT NULL,
    payment_status text NOT NULL,
    shop_id text NOT NULL);`

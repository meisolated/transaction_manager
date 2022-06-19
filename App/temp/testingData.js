export const _tempCompany = ["Amul", "Madhusudan"]
export const _tempCategories = [{ Milk: "Full Cream, Toned..." }, { Curd: "Lite, Cup ..." }, { Chaach: "Plain, Masala" }]
export const _tempProducts = [
    { id: 1, name: "Full Cream", category: "milk" },
    { id: 2, name: "Cow Milk", category: "milk" },
    { id: 3, name: "Toned Milk", category: "milk" },
    { id: 4, name: "Plain Chaach", category: "chaach" },
    { id: 5, name: "Masala Chaach", category: "chaach" },
    { id: 6, name: "Curd", category: "curd" },
    { id: 7, name: "Lite Curd", category: "curd" },
    { id: 8, name: "Lite Curd Jar", category: "curd" },
    { id: 9, name: "Lite Curd Cup", category: "curd" },
]
export const _tempProductsAttribute = [
    { id: 1, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 2, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 3, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 4, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 5, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 6, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 7, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 8, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 9, product_id: 1, quantity: 500, unit: "ml", price: 100 },
]

export const _tempOrder = [
    { id: 1, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 2, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 3, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 4, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 5, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 6, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 7, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 8, product_id: 1, quantity: 500, unit: "ml", price: 100 },
    { id: 9, product_id: 1, quantity: 500, unit: "ml", price: 100 },
]

export function _getProductName(product_id) {
    let product = _tempProducts.find(product => product.id === product_id)
    return product.name
}

// ----------------------------
// 1. Mock import.meta.env (Vite environment)
// ----------------------------
globalThis.import = {
  meta: {
    env: {
      VITE_API_URL: 'http://localhost:8000', // CHANGE if backend on different port
    },
  },
}

// ----------------------------
// 2. Ensure fetch exists in Node.
// Node 18+ already has fetch.
// ----------------------------
if (typeof fetch === 'undefined') {
  globalThis.fetch = (await import('node-fetch')).default
}

// ----------------------------
// 3. Import your API module
// ----------------------------
const api = await import('./new_api.js')

// If your file has default + named exports:
const {
  getSidebar,
  getDashboardKpis,
  getProducts,
  getProduct,
  getWarehouses,
  getStock,
  getStockByWarehouse,
  getTransactions,
  createReceipt,
  createDeliveryOrder,
  validateTransaction,
  getStockLedger,
  getUsers,
  searchProducts,
} = api

// ----------------------------
// 4. Test everything
// ----------------------------
async function runTests() {
  console.log('🔹 Testing getSidebar()')
  console.log(await getSidebar())

  console.log('\n🔹 Testing getDashboardKpis()')
  console.log(await getDashboardKpis())

  console.log('\n🔹 Testing getProducts()')
  const p = await getProducts()
  console.log(p)

  console.log('\n🔹 Testing getProduct(1)')
  console.log(await getProduct(1))

  console.log('\n🔹 Testing getWarehouses()')
  console.log(await getWarehouses())

  console.log('\n🔹 Testing getStock()')
  console.log(await getStock())

  console.log('\n🔹 Testing getStockByWarehouse(1)')
  console.log(await getStockByWarehouse(1))

  console.log('\n🔹 Testing getTransactions()')
  console.log(await getTransactions())

  console.log('\n🔹 Testing createReceipt()')
  console.log(
    await createReceipt({
      product_id: 1,
      supplier: 'Test Supplier',
      quantity: 10,
      to_warehouse_id: 1,
    })
  )

  console.log('\n🔹 Testing createDeliveryOrder()')
  console.log(
    await createDeliveryOrder({
      product_id: 1,
      quantity: 5,
      from_warehouse_id: 1,
    })
  )

  console.log('\n🔹 Testing validateTransaction(1)')
  try {
    console.log(await validateTransaction(8))
  } catch (err) {
    console.error(
      'validateTransaction failed → backend probably expected POST:',
      err.message
    )
  }

  console.log('\n🔹 Testing getStockLedger()')
  console.log(await getStockLedger())

  console.log('\n🔹 Testing getUsers()')
  console.log(await getUsers())

  console.log("\n🔹 Testing searchProducts('test')")
  console.log(await searchProducts('test'))

  console.log('\n✅ All tests done.')
}

runTests()

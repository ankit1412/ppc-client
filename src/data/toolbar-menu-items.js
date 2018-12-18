export const masterDataItems = {
  title: 'Master Data',
  group: 'master',
  icon: 'mdi-apps',
  children: [
    { header: 'Party' },
    { name: 'Customers', title: 'Customers', icon: 'mdi-face' },
    { name: 'Suppliers', title: 'Suppliers', icon: 'mdi-account' },
    { name: 'Vendors', title: 'Vendors', icon: 'mdi-account-child' },
    { divider: true },
    { header: 'Material' },
    { name: 'Consumables', title: 'Consumables', icon: 'mdi-google-circles-communities' },
    { name: 'FinishedMaterials', title: 'Finished materials', icon: 'mdi-circle-slice-8' },
    { name: 'RawMaterials', title: 'Raw materials', icon: 'mdi-checkbox-blank-circle-outline' },
    { name: 'SemiFinishedMaterials', title: 'Semi-finished materials', icon: 'mdi-circle-slice-4' },
    { divider: true },
    { header: 'Production' },
    { name: 'Machines', title: 'Machines', icon: 'mdi-amplifier' },
    { name: 'Operators', title: 'Operators', icon: 'mdi-worker' },
    { name: 'Processes', title: 'Processes', icon: 'mdi-chart-timeline' },
  ],
};

export const createNewDataItems = {
  title: 'Create New Data',
  icon: 'mdi-plus',
  children: [
    { header: 'Create new' },
    { name: 'CreateInventory', title: 'Inventory', icon: 'mdi-file-cabinet' },
    { name: 'CreateJobCard', title: 'Job card', icon: 'mdi-briefcase-outline' },
    { name: 'CreateJobWork', title: 'Job work', icon: 'mdi-account-network' },
    { name: 'CreateOrder', title: 'Order', icon: 'mdi-package-variant-closed' },
    { name: 'CreatePurchaseOrder', title: 'Purchase order', icon: 'mdi-package' },
    { name: 'CreateStoreIssueNote', title: 'Store issue note', icon: 'mdi-content-paste' },
    { name: 'CreateStoreReceiptNote', title: 'Store receipt note', icon: 'mdi-receipt' },
  ],
};

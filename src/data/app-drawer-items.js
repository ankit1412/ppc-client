export default [
  { header: 'Primary' },
  {
    title: 'Inventory',
    group: 'inventory',
    icon: 'mdi-file-cabinet',
    children: [
      { name: 'ConsumableInventory', title: 'Consumables', icon: 'mdi-google-circles-communities' },
      { name: 'FinishedMaterialInventory', title: 'Finished Materials', icon: 'mdi-circle-slice-8' },
      { name: 'RawMaterialInventory', title: 'Raw Materials', icon: 'mdi-checkbox-blank-circle-outline' },
      { name: 'RejectedMaterialInventory', title: 'Rejected Materials', icon: 'mdi-close-circle-outline' },
      { name: 'SemiFinishedMaterialInventory', title: 'Semi-finished Materials', icon: 'mdi-circle-slice-4' },
    ],
  },
  {
    title: 'Job cards',
    icon: 'mdi-briefcase-outline',
    name: 'JobCards',
  },
  {
    title: 'Job works',
    icon: 'mdi-account-network',
    name: 'JobWorks',
  },
  {
    title: 'Orders',
    icon: 'mdi-package-variant-closed',
    name: 'Orders',
  },
  {
    title: 'Purchase orders',
    icon: 'mdi-package',
    name: 'PurchaseOrders',
  },
  {
    title: 'Store issue notes',
    icon: 'mdi-content-paste',
    name: 'StoreIssueNotes',
  },
  {
    title: 'Store receipt notes',
    icon: 'mdi-receipt',
    name: 'StoreReceiptNotes',
  },
  { divider: true },
  { header: 'Reporting' },
  {
    title: 'Machine load',
    icon: 'mdi-timetable',
    name: 'MachineLoad',
  },
  {
    title: 'Operator timesheet',
    icon: 'mdi-clock-outline',
    name: 'OperatorTimesheet',
  },
  {
    title: 'Reports',
    icon: 'mdi-chart-arc',
    name: 'Reports',
  },
];

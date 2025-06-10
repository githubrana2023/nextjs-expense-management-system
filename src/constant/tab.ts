import { DefaultActiveTab } from "@/interface/tab";

export const defaultActiveTab: DefaultActiveTab = {
    family: {
        familyTrxName: {
            defaultActive: {
                assign: 'assign',
                details: 'details',
                update: 'update'
            },
            queryString: {
                assignTab: '?tab=assign',
                detailsTab: "?tab=details",
                updateTab: "?tab=update"
            }
        },
        familyTrx: {
            defaultActive: {
                transaction: 'transaction',
                trxName: 'trx-name'
            },
            queryString: {
                transactionTab: '?tab=transaction',
                trxNameTab: '?tab=trx-name'
            }
        },
        familyBank: {
            defaultActive: {
                details: "details",
                update: 'update'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update',
            }
        },
        familyLoan: {
            defaultActive: {
                details: "details",
                update: 'update'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update'
            }
        },
        familyShopkeeper: {
            defaultActive: {
                shopkeeper: 'shopkeeper',
                shopkeeperBill: 'shopkeeper-bill',
                purchaseDue: 'purchase-due'
            },
            queryString: {
                shopkeeperBillTab: '?tab=shopkeeper-bill',
                shopkeeperTab: "?tab=shopkeeper",
                purchaseDueTab: '?tab=purchase-due'
            }
        }
    },
    member: {
        memberTrx: {
            defaultActive: {
                transaction: 'transaction',
                trxName: 'trx-name'
            },
            queryString: {
                transactionTab: '?tab=transaction',
                trxNameTab: '?tab=trx-name'
            }
        },
        memberTrxName: {
            defaultActive: {
                assign: "assign",
                details: 'details',
                update: "update"
            },
            queryString: {
                assignTab: "?tab=assign",
                detailsTab: "?tab=details",
                updateTab: '?tab=update'
            }
        },
        memberBank: {
            defaultActive: {
                details: "details",
                update: 'update'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update',
            }
        },
        memberLoan: {
            defaultActive: {
                details: "details",
                update: 'update'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update'
            }
        },
        memberShopkeeper: {
            defaultActive: {
                shopkeeper: 'shopkeeper',
                shopkeeperBill: 'shopkeeper-bill',
                purchaseDue: 'purchase-due'
            },
            queryString: {
                shopkeeperBillTab: '?tab=shopkeeper-bill',
                shopkeeperTab: "?tab=shopkeeper",
                purchaseDueTab: '?tab=purchase-due'
            }
        }
    }
}

export const { family: familyTab, member: memberTab } = defaultActiveTab
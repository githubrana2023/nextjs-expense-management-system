import { DefaultActiveTab } from "@/interface/tab";

export const defaultActiveTab: DefaultActiveTab = {
    family: {
        trxName: {
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
        trx: {
            defaultActive: {
                transaction: 'transaction',
                trxName: 'trx-name'
            },
            queryString: {
                transactionTab: '?tab=transaction',
                trxNameTab: '?tab=trx-name'
            }
        },
        bank: {
            defaultActive: {
                details: "details",
                update: 'update'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update',
            }
        },
        loan: {
            defaultActive: {
                details: "details",
                update: 'update'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update'
            }
        },
        shopkeeper: {
            defaultActive: {
                assign: 'assign',
                details: 'details',
                update: 'update'
            },
            queryString: {
                assignTab: '?tab=assign',
                detailsTab: '?tab=details',
                updateTab: '?tab=update'
            }
        }
    },
    member: {
        trx: {
            defaultActive: {
                transaction: 'transaction',
                trxName: 'trx-name'
            },
            queryString: {
                transactionTab: '?tab=transaction',
                trxNameTab: '?tab=trx-name'
            }
        },
        trxName: {
            defaultActive: { assign: "assign", details: 'details', update: "update" },
            queryString: { assignTab: "?tab=assign", detailsTab: "?tab=details", updateTab: '?tab=update' }
        },
        bank: {
            defaultActive: {
                details: "details",
                update: 'update'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update',
            }
        },
        loan: {
            defaultActive: {
                details: "details",
                update: 'update'
            },
            queryString: {
                detailsTab: '?tab=details',
                updateTab: '?tab=update'
            }
        },
        shopkeeper: {
            defaultActive: {
                assign: 'assign',
                details: 'details',
                update: 'update'
            },
            queryString: {
                assignTab: '?tab=assign',
                detailsTab: '?tab=details',
                updateTab: '?tab=update'
            }
        }
    }
}
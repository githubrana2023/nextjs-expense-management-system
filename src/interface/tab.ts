export type TabType = 'details'|'update'|'assign'
export type DefaultActiveTab = {
    [Tab in TabType as `${Tab}-Tab`]:`?tab=${Tab}`
}

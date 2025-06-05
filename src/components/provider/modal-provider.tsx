'use client'
import { FamilyTrxNameModal } from "../modals/family-trx-name-modal"
import { MemberLoginModal } from "../modals/member-login-modal"
import { MemberRegisterModal } from "../modals/member-register-modal"

export const ModalProvider = () => {

    return <>
        <MemberLoginModal />
        <MemberRegisterModal />
        <FamilyTrxNameModal/>
    </>
}
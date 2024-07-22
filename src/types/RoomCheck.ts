export interface RoomCheck {
    id: number
    site_id: number
    date: string
    detail: RoomCheckDetail[]
    done_by_id: number
    verified_by_id: number
    is_verified: boolean
}

export interface RoomCheckDetail {
    room_name: string
    light: boolean
    server_lock: boolean
    number_of_apars: number
    apar_check: boolean
    floor: boolean
    glass: boolean
    wireless_phone: number
    note: string
}
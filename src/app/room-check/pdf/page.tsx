'use client'

import { RoomCheck } from '@/types/RoomCheck'
import moment from 'moment'
import { useEffect, useState } from 'react'
import './style.css'

export default function RoomCheckPDF() {
    const [data, setData] = useState<RoomCheck>({
        id: 0,
        site_id: 0,
        date: moment().format('YYYY-MM-DD'),
        detail: [],
        done_by_id: 0,
        verified_by_id: 0,
        is_verified: false
    })

    useEffect(() => {
        const newData: RoomCheck = JSON.parse(window.sessionStorage.getItem('room-check-data') || '{}')
        setData(newData)
    }, [])

    useEffect(() => {
        if (data.site_id && data.detail.length) {
            window.print()
        }
    }, [data])

    return <div className='sheet A4'>
        {data ? <section className='page custom'>
            <table className='table'>
                <thead className='table-header'>
                    <tr>
                        <th rowSpan={2} className='table-cell font-md'>Ruangan</th>
                        <th rowSpan={2} className='table-cell font-md'>Lampu Menyala</th>
                        <th rowSpan={2} className='table-cell font-md'>Rak Server Terkunci</th>
                        <th colSpan={2} className='table-cell font-md'>Jumlah APAR</th>
                        <th colSpan={2} className='table-cell font-md'>Kondisi</th>
                        <th rowSpan={2} className='table-cell font-md'>Wireless Phone</th>
                        <th rowSpan={2} className='table-cell font-md'>Keterangan</th>
                    </tr>
                    <tr>
                        <th className='table-cell font-md'>Default</th>
                        <th className='table-cell font-md'>Check</th>
                        <th className='table-cell font-md'>Lantai</th>
                        <th className='table-cell font-md'>Kaca</th>
                    </tr>
                </thead>
                <tbody>
                    {data.detail.map(value => (
                        <tr key={value.room_name}>
                            <td className='table-cell font-md text-left'>{value.room_name}</td>
                            <td className='table-cell text-center'>
                                {value.light ? `\u2714` : `\u2718`}
                            </td>
                            <td className='table-cell text-center'>
                                {value.server_lock ? `\u2714` : `\u2718`}
                            </td>
                            <td className='table-cell text-center'>
                                {value.number_of_apars}
                            </td>
                            <td className='table-cell text-center'>
                                {value.apar_check ? `\u2714` : `\u2718`}
                            </td>
                            <td className='table-cell text-center'>
                                {value.floor ? `\u2714` : `\u2718`}
                            </td>
                            <td className='table-cell text-center'>
                                {value.glass ? `\u2714` : `\u2718`}
                            </td>
                            <td className='table-cell text-center'>
                                {value.wireless_phone}
                            </td>
                            <td className='table-cell text-center'>
                                {value.note}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section> : <></>}
    </div>
}
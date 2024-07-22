import { BaseResp } from '@/types/BaseResp'
import { Room } from '@/types/Room'
import fetchSql from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams
    const site_id: string = params.get('site_id') || ''
    try {
        if (site_id) {
            const query = await fetchSql(`SELECT * FROM room WHERE site_id = '${site_id}' ORDER BY name ASC`)
            const room: Room[] = query.rows as Room[]
            const result: BaseResp = {
                status: 200,
                message: 'OK',
                data: room
            }
            return NextResponse.json(result)
        } else {
            const result: BaseResp = {
                status: 400,
                message: `Bad Request - 'site_id' is required`
            }
            return NextResponse.json(result)

        }
    } catch (err) {
        console.error('Error:', err)
        const error: BaseResp = {
            status: 500,
            message: 'Internal Server Error'
        }
        return NextResponse.json(error, { status: 500 })
    }
}
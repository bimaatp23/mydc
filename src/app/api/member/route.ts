import { BaseResp } from '@/types/BaseResp'
import { Member } from '@/types/Member'
import fetchSql from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams
    const site_id: string = params.get('site_id') || ''
    try {
        if (site_id) {
            const query = await fetchSql(`SELECT * FROM member WHERE site_id = '${site_id}' ORDER BY name ASC`)
            const member: Member[] = query.rows as Member[]
            const result: BaseResp = {
                status: 200,
                message: 'OK',
                data: member
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